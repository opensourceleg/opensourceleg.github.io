"use client";

import { PageHero } from "@/components/page-hero";
import { useState } from "react";
import { Download, ExternalLink, Settings, Zap, ZapOff, Mail, FileText, ShoppingCart, DownloadIcon, ArrowUpRight, MessageCircle, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  type DownloadConfig, 
  type JointSelection, 
  type SEASelection,
  jointOptions,
  seaOptions,
  getDownloadInfo,
  defaultConfig
} from "@/lib/hardware/hardware-downloads";
import InteractiveSystemOverview from "@/components/interactive-system-overview";
import { defaultComponentUrls } from "@/lib/hardware/interactive-system-overview";
import { vendors, cardStyles, type VendorButton } from "@/lib/hardware/vendors";
import { datasheets } from "@/lib/hardware/datasheets";

export default function Downloads() {
  const [config, setConfig] = useState<DownloadConfig>(defaultConfig);

  const downloadInfo = getDownloadInfo(config);

  // Helper function to render icons
  const renderIcon = (iconType: 'zap' | 'zap-off', iconColor: string) => {
    const className = `w-4 h-4 ${iconColor}`;
    return iconType === 'zap' ? <Zap className={className} /> : <ZapOff className={className} />;
  };

  // Helper function to render vendor icons
  const renderVendorIcon = (button: VendorButton, index: number) => {
    const getIcon = () => {
      switch (button.type) {
        case 'quote':
          return <FileText className="w-4 h-4" />;
        case 'contact':
          return <Mail className="w-4 h-4" />;
        case 'buy':
          return <ShoppingCart className="w-4 h-4" />;
      }
    };

    const positionClass = index === 0 ? 'top-2 right-2' : 'bottom-2 right-2';
    
    return (
      <a
        key={index}
        href={button.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute ${positionClass} p-2 border border-white/50 bg-transparent hover:bg-white text-white hover:text-black rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 group`}
        title={button.label}
      >
        {getIcon()}
      </a>
    );
  };

  return (
    <div className="min-h-screen pt-12">
      <PageHero 
        title={
          <>
            Hardware{" "}
            <span className="font-bold italic">Downloads</span>
          </>
        }
        description="Configure and download the hardware files for your Open-Source Leg system"
        primaryButton={{
          href: "#datasheets",
          text: "View Datasheets",
          icon: <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />,     
        }}
        secondaryButton={{
          href: "https://docs.google.com/spreadsheets/d/1qVSoAV6mRzleJ215N53O3MT-OEZ30ZFP/edit?usp=drive_link&ouid=101976074095932955884&rtpof=true&sd=true",
          target: "_blank",
          text: "View Bill of Materials",
          icon: <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
        }}
      />

      <div id="configurator" className="bg-[var(--light-blue)] py-24 sm:py-20 px-4 sm:px-6 lg:px-12 xl:px-20 sm:my-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Main Title */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
              <span className="relative font-medium italic">
                Configure
                <svg 
                  className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                  viewBox="0 0 200 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 10C60 6 140 6 198 8" 
                    stroke="var(--light-green)" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
              {" "}your System
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl mx-auto">
              Select the joints you want to build and whether you need Series Elastic Actuators.
            </p>
          </div>

        {/* Configuration Cards */}
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Joint Selection */}
            <Card className="h-full bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-xl italic font-semibold text-gray-900 flex items-center justify-center gap-2">
                  <Settings className="w-5 h-5" />
                  Joint Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {jointOptions.map((option) => (
                    <label key={option.value} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="joints"
                        value={option.value}
                        checked={config.joints === option.value}
                        onChange={(e) => setConfig(prev => ({ ...prev, joints: e.target.value as JointSelection }))}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SEA Selection */}
            <Card className="h-full bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-xl italic font-semibold text-gray-900 flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Series Elasticity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {seaOptions.map((option) => (
                    <label key={option.value} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="sea"
                        value={option.value}
                        checked={config.sea === option.value}
                        onChange={(e) => setConfig(prev => ({ ...prev, sea: e.target.value as SEASelection }))}
                        className="mt-1"
                      />
                      <div className="flex items-start gap-2">
                        {renderIcon(option.iconType, option.iconColor)}
                        <div>
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.desc}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Flowchart Arrows */}
          <div className="hidden md:block absolute -bottom-16 left-0 right-0 h-16 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 800 100" preserveAspectRatio="none">
              {/* Left arrow from Joint Selection */}
              <g stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 200 0 L 200 40 Q 200 50 210 50 L 390 50 Q 400 50 400 60 L 400 76" />
                <path d="M 395 72 L 400 82 L 405 72" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              
              {/* Right arrow from Series Elasticity */}
              <g stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 600 0 L 600 40 Q 600 50 590 50 L 400 50" />
              </g>
            </svg>
          </div>
        </div>

        {/* Downloadable Files Section */}
        <div className="max-w-xl mx-auto">
          <Card className="h-full bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold italic text-gray-900 flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Downloadable Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-gray-900 mb-1 text-center">{downloadInfo.title}</div>
                  <div className="text-sm text-gray-600 text-center">{downloadInfo.description}</div>
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    href={downloadInfo.cadDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[var(--light-green)] text-black border hover:bg-[var(--light-blue)] rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-base flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    Download STEP + DWG Files
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alternative Option */}
        <div className="text-center pt-8 max-w-3xl mx-auto">
          <div className="text-white/90 mb-4">
            <p className="text-base sm:text-lg">
              You can also generate your own STEP files and drawings directly from our Onshape document
            </p>
          </div>
          <Button 
            href="https://cad.onshape.com/documents/3520551dd01cf402179e8687/w/87da2fb0a553b44a27833624/e/d9c95c04904f8d6a753006a4"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            className="bg-transparent text-white border border-white hover:bg-[var(--light-green)] hover:text-black rounded-lg px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base"
          >
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            View Onshape Document
          </Button>
        </div>
        </div>
      </div>

      <div className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8">
              <span className="relative font-medium italic">
              Bill of Materials
                <svg 
                  className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                  viewBox="0 0 200 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 10C60 6 140 6 198 8" 
                    stroke="var(--light-green)" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-xl text-gray-700 leading-relaxed max-w-6xl mx-auto mb-8">
              Click on any component below to access quotes or supplier information.
            </p>
          </div>
          
            {/* Interactive System Overview */}
           <div className="mb-12">
             <InteractiveSystemOverview componentUrls={defaultComponentUrls} />
           </div>

           {/* Vendor-Based BOM Section */}
           <div className="mb-12 py-12">
             <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 text-center">
               <span className="relative font-medium italic">
                 By Supplier
               </span>
             </h3>
             <p className="text-base text-gray-600 text-center mb-16 max-w-4xl mx-auto">
               Browse components organized by supplier for streamlined procurement
             </p>
             
             <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {vendors.map((vendor) => {
                 return (
                   <Card key={vendor.id} className={`${cardStyles.container} relative overflow-hidden shadow-2xl`}>
                     <CardHeader className={cardStyles.header}>
                       <CardDescription className={cardStyles.description}>{vendor.description}</CardDescription>
                       <CardTitle className={cardStyles.price}>
                         {vendor.priceUSD}
                       </CardTitle>
                     </CardHeader>
                     <CardFooter className={cardStyles.footer}>
                       <div className="line-clamp-1 flex gap-2 font-medium">
                         <span className="text-[var(--light-blue)] sm:text-lg">{vendor.name}</span>
                       </div>
                       <div className="text-gray-400 text-xs leading-relaxed">
                         Click icons to view quotes or contact vendor
                       </div>
                     </CardFooter>
                     {vendor.buttons.map((button, index) => renderVendorIcon(button, index))}
                   </Card>
                 );
               })}
             </div>
             
             {/* Pricing Footnote */}
             <div className="mt-8 text-center">
               <p className="text-sm text-gray-500 italic">
                 * All prices shown are estimates for all components required to build one complete Open-Source Leg system
               </p>
             </div>
           </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                href="https://docs.google.com/spreadsheets/d/1qVSoAV6mRzleJ215N53O3MT-OEZ30ZFP/edit?usp=drive_link&ouid=101976074095932955884&rtpof=true&sd=true"
                target="_blank"
                className="bg-[var(--light-green)] text-black border hover:bg-[var(--light-blue)] rounded-lg px-8 py-8 text-base flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Complete BOM
              </Button>
              <Button 
                href="https://cad.onshape.com/documents/3520551dd01cf402179e8687/w/87da2fb0a553b44a27833624/e/d9c95c04904f8d6a753006a4"
                target="_blank"
                variant="outline"
                className="text-black border-black hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-8 py-8 text-base flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View BOM in OnShape
              </Button>
            </div>
            <p className="text-sm text-gray-600 text-center max-w-4xl mx-auto">
              The Bill of Materials is directly linked to our OnShape CAD models for easy reference and part identification.
            </p>
        </div>
      </div>

      {/* Datasheets Section */}
      <div id="datasheets" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 sm:mb-16 text-right">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8">
              Component{" "}
              <span className="relative font-medium italic">
                Datasheets
                <svg 
                  className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                  viewBox="0 0 200 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 10C60 6 140 6 198 8" 
                    stroke="var(--light-green)" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-xl text-gray-700 leading-relaxed max-w-6xl mx-auto mb-8">
              Download technical specifications and datasheets for all components used in the Open-Source Leg system.
            </p>
          </div>

          <div className="bg-white/80 p-6 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-transparent">
                  <TableHead className="font-semibold text-gray-900">Component</TableHead>
                  <TableHead className="font-semibold text-gray-900">Description</TableHead>
                  <TableHead className="font-semibold text-gray-900 text-center">Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datasheets.map((datasheet) => (
                  <TableRow key={datasheet.id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-medium text-gray-900">
                      {datasheet.componentName}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {datasheet.description}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        href={datasheet.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      >
                        <DownloadIcon className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 italic">
              * All datasheets are provided by their respective manufacturers and are updated periodically
            </p>
          </div>
        </div>
      </div>

      {/* Contribute Section */}
      <div className="py-16 sm:py-20 px-4 sm:px-6 bg-[var(--light-blue)]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white">
              <span className="relative font-medium italic">
                Contribute
                <svg 
                  className="absolute -bottom-1 left-0 w-full h-2 sm:h-3" 
                  viewBox="0 0 200 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 10C60 6 140 6 198 8" 
                    stroke="var(--light-green)" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
              {" "}to the Project
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto py-8">
              Found a better-priced component or have suggestions to improve the Open-Source Leg? Share your discoveries with our community and help make our platform more accessible to everyone.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                href="https://opensourceleg.discourse.group/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[var(--light-blue)] border border-white hover:bg-[var(--light-green)] hover:text-black hover:border-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
              >
                Share on Forum <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              <Button
                href="mailto:opensourceleg@gmail.com"
                variant="outline"
                className="bg-transparent text-white border border-white hover:bg-[var(--light-green)] hover:text-black hover:border-black rounded-md px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-medium"
              >
                Contact Us <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}