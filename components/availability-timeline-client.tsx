"use client"

import { useEffect, useMemo, useState } from "react"

type MonthStatus = "free" | "hold" | "booked"
type Availability = { year: number; month: number /* 0-11 */; status: MonthStatus }

function rollingTwelveMonths(): { label: string; year: number; month: number }[] {
  const out: { label: string; year: number; month: number }[] = []
  const start = new Date()
  start.setDate(1)
  for (let i = 0; i < 12; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1)
    out.push({ label: d.toLocaleString(undefined, { month: "short" }), year: d.getFullYear(), month: d.getMonth() })
  }
  return out
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]

    if (ch === "\"") {
      if (inQuotes && text[i + 1] === "\"") {
        current += "\""
        i++
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (ch === "," && !inQuotes) {
      row.push(current.trim())
      current = ""
      continue
    }

    if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (ch === "\r" && text[i + 1] === "\n") i++
      row.push(current.trim())
      current = ""
      if (row.some((cell) => cell.length > 0)) rows.push(row)
      row = []
      continue
    }

    current += ch
  }

  row.push(current.trim())
  if (row.some((cell) => cell.length > 0)) rows.push(row)
  return rows
}

function clampToMonthStart(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function monthEnd(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999)
}

function rangesOverlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  return aStart <= bEnd && bStart <= aEnd
}

function findColumnIndex(headers: string[], needles: string[]) {
  const lower = headers.map((h) => h.toLowerCase())
  for (const needle of needles) {
    const idx = lower.findIndex((h) => h.includes(needle))
    if (idx >= 0) return idx
  }
  return -1
}

function normalizeStatus(raw: string): MonthStatus {
  const s = raw.toLowerCase().trim()
  if (!s) return "hold"

  // Only exact matches: "booked" or "hold"
  if (s === "booked") return "booked"
  if (s === "hold") return "hold"

  return "hold"
}

function buildAvailability(rows: string[][]): Availability[] {
  if (rows.length === 0) return []
  const headers = rows[0]
  const normalizedHeaders = headers.map((h) => h.toLowerCase().trim())
  const startIdx = findColumnIndex(headers, ["desired start month", "start date", "start", "begin"])
  const endIdx = findColumnIndex(headers, ["desired end month", "end date", "end", "finish"])
  // Google Form exports can include multiple "status" fields (e.g., IRB status).
  // Prefer the last exact "status" column, which is typically the program availability status.
  const statusIdx =
    normalizedHeaders.lastIndexOf("status") >= 0
      ? normalizedHeaders.lastIndexOf("status")
      : findColumnIndex(headers, ["loan status", "application status", "status"])

  const dateRows = rows.slice(1).filter((r) => r.length > 0)
  const ranges = dateRows
    .map((row) => {
      const startRaw = row[startIdx] ?? row[1]
      const endRaw = row[endIdx] ?? row[2]
      const start = startRaw ? new Date(startRaw) : null
      const end = endRaw ? new Date(endRaw) : null
      let statusRaw = statusIdx >= 0 ? row[statusIdx] ?? "" : ""

      // If the status column is empty or missing, try to infer status from other cells
      // (some Google Form exports put status text in a different column).
      if (!statusRaw || statusRaw.trim() === "") {
        statusRaw = row.join(" ")
      }

      if (!start || !end || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null
      return { start, end, status: normalizeStatus(statusRaw) }
    })
    .filter((r): r is { start: Date; end: Date; status: MonthStatus } => r !== null)

  const months = rollingTwelveMonths()
  return months.map((m) => {
    const windowStart = clampToMonthStart(new Date(m.year, m.month, 1))
    const windowEnd = monthEnd(windowStart)
    let status: MonthStatus = "free"
    for (const range of ranges) {
      if (!rangesOverlap(range.start, range.end, windowStart, windowEnd)) continue
      if (range.status === "booked") {
        status = "booked"
        break
      }
      status = "hold"
    }
    return { year: m.year, month: m.month, status }
  })
}

export default function AvailabilityTimelineClient({ sheetUrl }: { sheetUrl: string }) {
  const [availability, setAvailability] = useState<Availability[]>([])
  const [error, setError] = useState<string | null>(null)
  const months = useMemo(() => rollingTwelveMonths(), [])

  useEffect(() => {
    let active = true
    async function load() {
      try {
        const res = await fetch(sheetUrl, { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to load availability")
        const csv = await res.text()
        const rows = parseCsv(csv)
        const next = buildAvailability(rows)
        if (active) setAvailability(next)
      } catch (err) {
        if (active) setError("Availability data is unavailable right now.")
      }
    }
    load()
    return () => {
      active = false
    }
  }, [sheetUrl])

  return (
    <div className="space-y-4">
      {error ? (
        <div className="text-sm text-gray-600">{error}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {months.map((m, idx) => {
            const st = availability.find((a) => a.year === m.year && a.month === m.month)?.status ?? "free"
            const styles =
              st === "free"
                ? "bg-[var(--light-green)] text-black"
                : st === "hold"
                ? "bg-[var(--light-blue)] text-black"
                : "bg-[var(--black)] text-white"
            return (
              <div key={idx} className={`rounded-lg border border-black p-3 flex items-center justify-between ${styles}`}>
                <div className="font-medium">{m.label}</div>
                <div className="text-xs opacity-80">{m.year}</div>
              </div>
            )
          })}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded bg-[var(--light-green)] border border-black" />
          Available
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded bg-[var(--light-blue)] border border-black" />
          Tentative Hold
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded bg-[var(--black)] border border-black" />
          Booked
        </span>
      </div>
    </div>
  )
}
