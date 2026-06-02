import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import InteractivePcb from "@/components/interface-board/InteractivePcb";
import InterfaceBoardFeatures from "@/components/interface-board/interface-board-features";
import { ArrowUpRight, Wind, Shield, Cable } from "lucide-react";

const purchaseHref = "https://available-inventions.umich.edu/product/osl-electronics--interface-pcb-for-rpi-cm-5";
const stepHref = "/electronics/interface-board/RPi_CM_interface_board.step";
const datasheetHref = "/electronics/interface-board/RPi CM5 Interface DataSheet (1.1.0).pdf";
const datasheetHrefV100 = "/downloads/RPi CM5 Interface DataSheet.pdf";

export default function InterfaceBoardContent() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-black/10 pb-8">
          <div className="space-y-3 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900">
              Interface board <span className="font-medium italic">overview</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              The Interface Board is a carrier board for the Raspberry Pi Compute Module 5 (RPi CM5) that provides power
              input, safety, and standardized connectors so the CM5 can be integrated into robotics systems quickly and
              consistently. It consolidates common I/O (GPIO, I2C, SPI, UART, CAN, and fan control), exposes reliable
              power paths, and adds board-level features that simplify bring-up and maintenance. The board is built and
              tested by researchers at the University of Michigan Neurobionics Lab for use across the Open-Source Leg stack.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full max-w-sm">
            <Button
              href={purchaseHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--light-green)] text-black border border-black hover:bg-[var(--light-blue)] hover:text-black"
            >
              Purchase at UM
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              href={stepHref}
              download="RPi_CM_interface_board.step"
              variant="outline"
              className="text-black border-black hover:bg-[var(--light-green)] hover:text-black"
            >
              Download STEP file
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              href={datasheetHref}
              download="RPi CM5 Interface DataSheet (1.1.0).pdf"
              variant="outline"
              className="text-black border-black hover:bg-[var(--light-green)] hover:text-black"
            >
              Download datasheet
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              href="#archive"
              variant="outline"
              className="text-black border-black hover:bg-[var(--light-green)] hover:text-black"
            >
              Archive
            </Button>
          </div>
        </div>
        <section aria-labelledby="pcb-layout" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="space-y-2">
              <SectionHeading
                id="pcb-layout"
                title={
                  <>
                    <span className="not-italic font-semibold text-black">Interactive</span>{" "}
                    <span className="not-italic font-light text-black">PCB layout</span>
                  </>
                }
                accent="light-blue"
              />
              <p className="text-gray-600 text-sm sm:text-base">
                Click the board to explore connectors, features, and pinout callouts.
              </p>
            </div>
            <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold">v1.1.0</span>
          </div>
          <InteractivePcb />
        </section>

        <section className="space-y-6 pb-8 border-b border-black/10">
          <details className="group" open>
            <summary className="flex flex-col gap-2 cursor-pointer list-none sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <SectionHeading title="Power" accent="light-blue" />
                <p className="text-sm text-gray-500 group-open:hidden">
                  Input and output power specifications at a glance.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Expand</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--light-blue)]/20 border border-black/10 text-gray-900 transition-transform duration-200 group-open:rotate-180">
                  v
                </span>
              </span>
            </summary>
            <div className="mt-6 space-y-6">
              <p className="text-gray-600 text-sm sm:text-base">Input and output power specifications.</p>
              <div className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 italic">Input</h4>
                </div>
                <div className="overflow-x-auto border border-black/10 rounded-xl">
                  <table className="w-full text-sm">
                    <thead className="bg-[var(--light-blue)]/25">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-gray-900">Designator</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-900">Connector</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-900">Voltage (V)</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-900">Power (W)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-black/10">
                        <td className="px-3 py-2 font-semibold">J1</td>
                        <td className="px-3 py-2">XT30</td>
                        <td className="px-3 py-2">15 - 53</td>
                        <td className="px-3 py-2">26.67</td>
                      </tr>
                      <tr className="border-t border-black/10">
                        <td className="px-3 py-2 font-semibold">J2*</td>
                        <td className="px-3 py-2">USB-C</td>
                        <td className="px-3 py-2">5</td>
                        <td className="px-3 py-2">26.5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500">
                  *Do not use J7 or J8 USB-C ports for power input. These are for high-speed data transfer only.
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 italic">Output</h4>
                </div>
                <p className="text-sm text-gray-600">The peripheral connectors can provide a combined power output of 1 W at 3.3 V.</p>
              </div>
            </div>
          </details>
        </section>

        <section className="space-y-6 pb-8 border-b border-black/10">
          <details className="group" open>
            <summary className="flex flex-col gap-2 cursor-pointer list-none sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <SectionHeading title="I/O pins" accent="light-blue" />
                <p className="text-sm text-gray-500 group-open:hidden">
                  Connector map, bus details, and mating parts.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Expand</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--light-blue)]/20 border border-black/10 text-gray-900 transition-transform duration-200 group-open:rotate-180">
                  v
                </span>
              </span>
            </summary>
            <div className="mt-6 space-y-4">
              <div className="overflow-x-auto border border-black/10 rounded-xl">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-gray-900">Designator</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-900">Bus details</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-900">Connector</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-900">Mating part no.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-black/10">
                      <td className="px-3 py-2 font-semibold">I2C-2,3</td>
                      <td className="px-3 py-2">I2C-2, I2C-3</td>
                      <td className="px-3 py-2">Molex PicoClasp, 4-Pin</td>
                      <td className="px-3 py-2">
                        <Link
                          href="https://www.digikey.com/en/products/detail/molex/5013300400/1531501"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-[var(--light-blue)] hover:text-[var(--light-green)]"
                        >
                          5013300400
                        </Link>
                      </td>
                    </tr>
                    <tr className="border-t border-black/10">
                      <td className="px-3 py-2 font-semibold">SPI-1</td>
                      <td className="px-3 py-2">SPI-1 (CS0, CS1, CS2)</td>
                      <td className="px-3 py-2">Molex PicoClasp, 8-Pin</td>
                      <td className="px-3 py-2">
                        <Link
                          href="https://www.digikey.com/en/products/detail/molex/5013300800/1531505"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-[var(--light-blue)] hover:text-[var(--light-green)]"
                        >
                          5013300800
                        </Link>
                      </td>
                    </tr>
                    <tr className="border-t border-black/10">
                      <td className="px-3 py-2 font-semibold">UART-1,2</td>
                      <td className="px-3 py-2">UART-1, UART-2</td>
                      <td className="px-3 py-2">Molex PicoClasp, 4-Pin</td>
                      <td className="px-3 py-2">
                        <Link
                          href="https://www.digikey.com/en/products/detail/molex/5013300400/1531501"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-[var(--light-blue)] hover:text-[var(--light-green)]"
                        >
                          5013300400
                        </Link>
                      </td>
                    </tr>
                    <tr className="border-t border-black/10">
                      <td className="px-3 py-2 font-semibold">CAN-0,1</td>
                      <td className="px-3 py-2">CAN-0, CAN-1 (on SPI-0, CS0)</td>
                      <td className="px-3 py-2">Molex PicoClasp, 3-Pin</td>
                      <td className="px-3 py-2">
                        <Link
                          href="https://www.digikey.com/en/products/detail/molex/5013300300/1531500"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-[var(--light-blue)] hover:text-[var(--light-green)]"
                        >
                          5013300300
                        </Link>
                      </td>
                    </tr>
                    <tr className="border-t border-black/10">
                      <td className="px-3 py-2 font-semibold">J4</td>
                      <td className="px-3 py-2">For connecting external switch to RPi safe shutdown button</td>
                      <td className="px-3 py-2">Molex PicoClasp, 2-Pin</td>
                      <td className="px-3 py-2">
                        <Link
                          href="https://www.digikey.com/en/products/detail/molex/501331-0207/1531507"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-[var(--light-blue)] hover:text-[var(--light-green)]"
                        >
                          501331-0207
                        </Link>
                      </td>
                    </tr>
                    <tr className="border-t border-black/10">
                      <td className="px-3 py-2 font-semibold">FAN-1</td>
                      <td className="px-3 py-2">Fan PWM, Fan Tacho</td>
                      <td className="px-3 py-2">JST PH 4-Pin</td>
                      <td className="px-3 py-2">
                        <Link
                          href="https://www.digikey.com/en/products/detail/jst-sales-america-inc/SHR-04V-S-B/759868"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-[var(--light-blue)] hover:text-[var(--light-green)]"
                        >
                          SHR-04V-S-B
                        </Link>
                      </td>
                    </tr>
                    <tr className="border-t border-black/10">
                      <td className="px-3 py-2 font-semibold">J6</td>
                      <td className="px-3 py-2">GPIO 7, 22, 23, 24, 25, 27</td>
                      <td className="px-3 py-2">Header Pins, 8-Pin, 2.54 mm pitch</td>
                      <td className="px-3 py-2 text-gray-500">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-700">
                Note: Pins can be remapped using RPi Device Tree Overlays in <code className="px-2 py-1 rounded text-xs font-mono text-gray-900 bg-white border border-black/10">/boot/firmware/config.txt</code>. For more details, refer to this <Link
                  href="https://github.com/raspberrypi/firmware/blob/master/boot/overlays/README"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[var(--light-blue)] hover:text-[var(--light-green)]"
                >
                  link
                </Link>.
              </p>
            </div>
          </details>
        </section>

        <section className="space-y-6 pb-8 border-b border-black/10">
          <details className="group" open>
            <summary className="flex flex-col gap-2 cursor-pointer list-none sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <SectionHeading title="Features" accent="light-blue" />
                <p className="text-sm text-gray-500 group-open:hidden">
                  Explore onboard features and component details.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Expand</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--light-blue)]/20 border border-black/10 text-gray-900 transition-transform duration-200 group-open:rotate-180">
                  v
                </span>
              </span>
            </summary>
            <div className="mt-6">
              <InterfaceBoardFeatures />
            </div>
          </details>
        </section>

        <section className="space-y-6 pb-8 border-b border-black/10">
          <details className="group" open>
            <summary className="flex flex-col gap-2 cursor-pointer list-none sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <SectionHeading title="Flashing the CM5" accent="light-blue" />
                <p className="text-sm text-gray-500 group-open:hidden">
                  Step-by-step bring-up instructions for first power-on.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Expand</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--light-blue)]/20 border border-black/10 text-gray-900 transition-transform duration-200 group-open:rotate-180">
                  v
                </span>
              </span>
            </summary>
            <div className="mt-6 max-w-3xl">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 justify-items-center">
                <div className="bg-white border border-black rounded-2xl p-5 space-y-2 shadow-xl lg:col-span-2 w-full">
                  <p className="text-sm uppercase tracking-wide text-[var(--light-blue)] font-semibold">Step 1</p>
                  <p className="text-sm text-gray-600">
                    Jump the J3 header pins to put the CM5 into storage mode.
                  </p>
                </div>
                <div className="bg-white border border-black rounded-2xl p-5 space-y-2 shadow-xl lg:col-span-2 w-full">
                  <p className="text-sm uppercase tracking-wide text-[var(--light-blue)] font-semibold">Step 2</p>
                  <p className="text-sm text-gray-600">
                    Set up your host device (personal computer) and install{" "}
                    <code className="px-1.5 py-0.5 rounded text-xs font-mono text-gray-900 bg-gray-100 border border-black/10">rpiboot</code>{" "}
                    to detect the CM5 as a storage device by following these{" "}
                    <Link
                      href="https://www.raspberrypi.com/documentation/computers/compute-module.html#set-up-the-host-device"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[var(--light-blue)] hover:text-[var(--light-green)]"
                    >
                      instructions
                    </Link>
                    .
                  </p>
                </div>
                <div className="bg-white border border-black rounded-2xl p-5 space-y-2 shadow-xl lg:col-span-2 w-full">
                  <p className="text-sm uppercase tracking-wide text-[var(--light-blue)] font-semibold">Step 3</p>
                  <p className="text-sm text-gray-600">
                    Install the CM5 on the interface board and connect to the host device using USB J2.
                  </p>
                </div>
                <div className="bg-white border border-black rounded-2xl p-5 space-y-2 shadow-xl lg:col-span-2 w-full">
                  <p className="text-sm uppercase tracking-wide text-[var(--light-blue)] font-semibold">Step 4</p>
                  <p className="text-sm text-gray-600">
                    Run rpiboot following these{" "}
                    <Link
                      href="https://www.raspberrypi.com/documentation/computers/compute-module.html#set-up-the-host-device"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[var(--light-blue)] hover:text-[var(--light-green)]"
                    >
                      instructions
                    </Link>{" "}
                    and after a few seconds, the CM5 should be detected as a mass-storage device.
                  </p>
                </div>
                <div className="bg-white border border-black rounded-2xl p-5 space-y-2 shadow-xl lg:col-span-2 w-full">
                  <p className="text-sm uppercase tracking-wide text-[var(--light-blue)] font-semibold">Step 5</p>
                  <p className="text-sm text-gray-600">
                    Flash an operating system image using an imaging tool like{" "}
                    <Link
                      href="https://www.raspberrypi.com/software/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[var(--light-blue)] hover:text-[var(--light-green)]"
                    >
                      Raspberry Pi Imager
                    </Link>
                    . We highly recommend using the{" "}
                    <Link
                      href="https://github.com/neurobionics/robot-ci"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[var(--light-blue)] hover:text-[var(--light-green)]"
                    >
                      Robot-CI image
                    </Link>{" "}
                    by the Neurobionics Lab that auto-configures the peripheral ports to function with the interface
                    board. Please follow the instructions in the repository descriptions to generate this image, and
                    make sure to check the Are you using the Neurobionics Interface Board checkbox.
                  </p>
                </div>

              </div>
            </div>
          </details>
        </section>

        <section className="space-y-6 pb-8 border-b border-black/10">
          <details className="group" open>
            <summary className="flex flex-col gap-2 cursor-pointer list-none sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <SectionHeading title="Mechanical specifications" accent="light-blue" />
                <p className="text-sm text-gray-500 group-open:hidden">
                  Mechanical dimensions and mounting details.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Expand</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--light-blue)]/20 border border-black/10 text-gray-900 transition-transform duration-200 group-open:rotate-180">
                  v
                </span>
              </span>
            </summary>
            <div className="mt-4 space-y-3">
              <p className="text-base text-gray-700">
                Mechanical dimensions and mounting specifications for the interface board.
              </p>
              <div className="overflow-x-auto border border-black/10 rounded-xl">
                <Image
                  src="/electronics/interface-board/mechanical_specs.png"
                  alt="Mechanical specifications"
                  width={1600}
                  height={900}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </details>
        </section>

        <section className="space-y-6 pb-8 border-b border-black/10">
          <details className="group" open>
            <summary className="flex flex-col gap-2 cursor-pointer list-none sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <SectionHeading title="Hardware recommendations" accent="light-blue" />
                <p className="text-sm text-gray-500 group-open:hidden">
                  Cooling, grounding, and strain-relief guidance.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Expand</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--light-blue)]/20 border border-black/10 text-gray-900 transition-transform duration-200 group-open:rotate-180">
                  v
                </span>
              </span>
            </summary>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="bg-white border border-black rounded-2xl p-5 shadow-xl space-y-3">
                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-[var(--light-blue)]" />
                  <h3 className="text-lg font-semibold text-gray-900">Cooling</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Since the RPi CM5 tends to run hotter than the standard RPi 5, we strongly recommend using active
                  cooling (via the FAN-1 port) or a passive heatsink, along with ensuring adequate ventilation.
                </p>
              </div>
              <div className="bg-white border border-black rounded-2xl p-5 shadow-xl space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[var(--light-green)]" />
                  <h3 className="text-lg font-semibold text-gray-900">Grounding</h3>
                </div>
                <p className="text-sm text-gray-600">
                  For improved noise immunity in high-interference environments, use shielded cables for sensors and
                  ground the interface board to the hardware chassis.
                </p>
              </div>
              <div className="bg-white border border-black rounded-2xl p-5 shadow-xl space-y-3">
                <div className="flex items-center gap-2">
                  <Cable className="w-5 h-5 text-[var(--light-blue)]" />
                  <h3 className="text-lg font-semibold text-gray-900">Strain Relieving</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Provide adequate strain relief on all wiring to reduce mechanical stress and maintain signal integrity.
                </p>
              </div>
            </div>
          </details>
        </section>

        <section id="archive" className="scroll-mt-24">
          <details className="border border-black/10 rounded-2xl p-4 sm:p-6 bg-white">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                Archive
                <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Version history</span>
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-800">
                Expand
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--light-green)] border border-black/20 text-black">
                  v
                </span>
              </span>
            </summary>
            <p className="mt-4 text-sm text-gray-700">
              Version history and changelog for the RPi CM5 Interface Board:
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-900">Version</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-900">Release Date</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-900">Changes</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-900">Datasheet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-black/10">
                    <td className="px-3 py-2 font-semibold">v1.1.0</td>
                    <td className="px-3 py-2">May 2026</td>
                    <td className="px-3 py-2">
                      <div className="space-y-1">
                        <p className="font-semibold">New Features:</p>
                        <ul className="list-disc ml-4">
                          <li>Added 2nd CAN bus</li>
                          <li>RGB LED now enabled</li>
                          <li>RTC pulled up to remain on when Pi is powered off</li>
                          <li>ESD protection diodes on all USB-C data and power lines</li>
                          <li>TVS diode for surge current protection on XT30 input</li>
                        </ul>
                        <p className="font-semibold mt-2">Changes:</p>
                        <ul className="list-disc ml-4">
                          <li>Modified I2C port configuration</li>
                          <li>Modified IMU location on board</li>
                        </ul>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <Button
                        href="/electronics/interface-board/RPi CM5 Interface DataSheet (1.1.0).pdf"
                        download="RPi CM5 Interface DataSheet (1.1.0).pdf"
                        className="bg-[var(--light-green)] text-black border border-black hover:bg-[var(--light-blue)] hover:text-black"
                      >
                        Download datasheet
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-t border-black/10">
                    <td className="px-3 py-2 font-semibold">v1.0.0</td>
                    <td className="px-3 py-2">October 2025</td>
                    <td className="px-3 py-2">
                      <div className="space-y-1">
                        <p className="font-semibold">New Features</p>
                        <ul className="list-disc ml-4">
                          <li>Programmable RGB LED port</li>
                          <li>IMU integration</li>
                          <li>Multiple SPI chip selects</li>
                          <li>GPIO pin breakouts</li>
                          <li>New OSL symbol</li>
                        </ul>
                        <p className="font-semibold mt-2">Fixes</p>
                        <ul className="list-disc ml-4">
                          <li>Reduced LED brightness</li>
                          <li>SD card functionality restored</li>
                          <li>Improved thermal management</li>
                          <li>Added flipped USB-C support</li>
                          <li>3.3V line enable</li>
                        </ul>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <Button
                        href={datasheetHrefV100}
                        download="RPi CM5 Interface DataSheet.pdf"
                        className="bg-[var(--light-green)] text-black border border-black hover:bg-[var(--light-blue)] hover:text-black"
                      >
                        Download
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
        </section>
      </div>
    </section>
  );
}

function SectionHeading({
  id,
  title,
  accent,
}: {
  id?: string;
  title: ReactNode;
  accent: "light-blue" | "light-green";
}) {
  const accentClass = accent === "light-blue" ? "text-[var(--light-blue)]" : "text-[var(--light-green)]";

  return (
    <h3 id={id} className="text-2xl sm:text-3xl font-light text-gray-900">
      <span className={`font-medium italic ${accentClass}`}>{title}</span>
    </h3>
  );
}
