"use client";

import { useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { ExcelSpreadsheet } from "@/components/excel-spreadsheet";
import MotionCards, { MotionCardContent } from "@/components/ui/motioncards";
import NavbarFlow, { FeatureItem, HoverLink } from "@/components/ui/navbar-flow";
import { VercelCard } from "@/components/ui/vercel-card";
import FlipStack from "@/components/ui/flipstack";
import StatsCarouselcount from "@/components/ui/statscarousel";
import { Glass } from "@/components/ui/glass";
import { Gravity } from "@/components/ui/gravity";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { AnimatedTextGenerate } from "@/components/ui/animated-textgenerate";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProfileCard from "@/components/ui/profilecard";
import {
  Upload,
  MessageSquare,
  Users,
  Zap,
  Shield,
  Smartphone,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  Home,
  Phone,
  Mail,
  Database,
} from "lucide-react";

interface TableData {
  [key: string]: string | number;
}

interface ColumnDef {
  accessorKey?: string | number;
  header?: string | any;
  cell?: any;
}

export default function HomePage() {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [tableColumns, setTableColumns] = useState<ColumnDef[]>([]);
  const [currentPolicyPage, setCurrentPolicyPage] = useState(1);

  const policies = [
    {
      id: 1,
      title: "Terms of Service",
      content: [
        {
          heading: "Acceptance of Terms",
          text: "By accessing and using WA Bulk Messenger, you accept and agree to be bound by the terms and provision of this agreement."
        },
        {
          heading: "Use License",
          text: "Permission is granted to temporarily download one copy of the materials on WA Bulk Messenger for personal, non-commercial transitory viewing only."
        },
        {
          heading: "Disclaimer",
          text: "The materials on WA Bulk Messenger are provided on an 'as is' basis. WA Bulk Messenger makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
        }
      ]
    },
    {
      id: 2,
      title: "Privacy Policy",
      content: [
        {
          heading: "Information We Collect",
          text: "We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support."
        },
        {
          heading: "How We Use Your Information",
          text: "We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you."
        },
        {
          heading: "Information Sharing",
          text: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy."
        }
      ]
    },
    {
      id: 3,
      title: "Cookie Policy",
      content: [
        {
          heading: "What Are Cookies",
          text: "Cookies are small text files that are placed on your computer or mobile device when you visit our website."
        },
        {
          heading: "How We Use Cookies",
          text: "We use cookies to improve your browsing experience, analyze site traffic, and personalize content."
        },
        {
          heading: "Managing Cookies",
          text: "You can control and manage cookies through your browser settings. However, disabling cookies may affect the functionality of our website."
        }
      ]
    }
  ];

  const currentPolicy = policies.find(p => p.id === currentPolicyPage);

  const handleDataImported = (data: TableData[], columns: ColumnDef[]) => {
    setTableData(data);
    setTableColumns(columns);
    // Navigate to spreadsheet page
    window.location.href = '/spreadsheet';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Glass Hero Section */}
      <div className="relative select-none w-full h-screen overflow-hidden">
        {/* WhatsApp-inspired gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-500 to-emerald-600"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 via-transparent to-green-400/20"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Glass Navbar */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-6xl">
          <Glass
            width="100%"
            height={60}
            borderRadius={50}
            blur={10}
            tintOpacity={0.08}
          >
            <nav className="flex items-center justify-between h-full px-6 md:px-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white font-semibold text-sm">WA</div>
                <span className="text-white font-semibold text-sm">WA Bulk Messenger</span>
              </div>
              <div className="flex gap-6 items-center">
                <button
                  onClick={() => {
                    const testimonialsSection = document.querySelector('#testimonials');
                    testimonialsSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-white hover:text-white/70 transition-colors font-medium text-sm md:text-base"
                >
                  Testimonials
                </button>
                <button
                  onClick={() => {
                    const featuresSection = document.querySelector('#features');
                    featuresSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-white hover:text-white/70 transition-colors font-medium text-sm md:text-base"
                >
                  Features
                </button>
                <button
                  onClick={() => {
                    const howItWorksSection = document.querySelector('#how-it-works');
                    howItWorksSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-white hover:text-white/70 transition-colors font-medium text-sm md:text-base"
                >
                  How It Works
                </button>
                
                
                <button
                  onClick={() => {
                    const uploadSection = document.querySelector('#upload-section');
                    uploadSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full hover:bg-white/30 transition-all"
                >
                  Get Started
                </button>
              </div>
            </nav>
          </Glass>
        </div>

        {/* Hero Content with Glass Elements */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 md:px-0 pt-20">
          {/* Centered Main Content */}
          <div className="text-center max-w-4xl">
            <Glass
              width="auto"
              height="auto"
              borderRadius={25}
              blur={8}
              tintOpacity={0.1}
              className="mb-6 inline-block"
            >
              <div className="px-4 py-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-green-400" />
                <span className="text-white text-xs md:text-sm font-medium">
                  ⚡ Trusted by 10,000+ businesses worldwide
                </span>
              </div>
            </Glass>

            <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-600 to-white text-3xl md:text-5xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
              WhatsApp
              <br />
              <span className="bg-gradient-to-r from-green-200 to-white bg-clip-text text-transparent">
                Bulk Messenger
              </span>
            </h1>

            <AnimatedTextGenerate
              text="Transform your contact lists into powerful WhatsApp campaigns. Upload, clean, validate, and send personalized messages to thousands of contacts with enterprise-grade security and real-time delivery tracking."
              className="text-center mb-8"
              textClassName="text-green-100 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
              blurEffect={true}
              speed={0.02}
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setTableData([
                    { name: 'John Doe', phone: '+1234567890', email: 'john@example.com' },
                    { name: 'Jane Smith', phone: '+0987654321', email: 'jane@example.com' },
                    { name: 'Alice Johnson', phone: '+1122334455', email: 'alice@example.com' },
                    { name: 'Bob Wilson', phone: '+5566778899', email: 'bob@example.com' },
                    { name: 'Emma Davis', phone: '+9988776655', email: 'emma@example.com' },
                  ]);
                  setTableColumns([
                    { accessorKey: 'name', header: 'Name' },
                    { accessorKey: 'phone', header: 'Phone' },
                    { accessorKey: 'email', header: 'Email' },
                  ]);
                  // Navigate to spreadsheet page
                  window.location.href = '/spreadsheet';
                }}
                className="bg-white text-green-600 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-green-50 transition-all text-sm md:text-base shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Start Free Trial
              </button>

              <Glass
                width="auto"
                height="auto"
                borderRadius={25}
                blur={10}
                tintOpacity={0.1}
              >
                <button
                  onClick={() => {
                    const howItWorksSection = document.querySelector('#how-it-works');
                    howItWorksSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 md:px-8 md:py-4 text-white font-semibold text-sm md:text-base"
                >
                  Watch Demo
                </button>
              </Glass>
            </div>
          </div>

          {/* Invisible Floating Upload Folder */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 opacity-0 pointer-events-none">
            <div className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Upload Your Data</h3>
                <p className="text-green-100 mb-4 text-xs">Import CSV or Excel files</p>
                <FileUpload onDataImported={handleDataImported} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Navbar Flow - Hidden but keeping for reference */}
      <section className="relative min-h-screen flex flex-col px-6 py-16 overflow-hidden hidden">
        {/* Navbar Flow - Suspended in Hero */}
        <div className="relative z-20 mb-8">
          <NavbarFlow
            emblem={
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white font-semibold text-sm">WA</div>
                <span className="text-sm font-semibold">WA Bulk Messenger</span>
              </div>
            }
            links={[
              {
                text: "Features",
                submenu: (
                  <div className="flex flex-col space-y-2">
                    <HoverLink url="#features">Data Import</HoverLink>
                    <HoverLink url="#features">Contact Cleaning</HoverLink>
                    <HoverLink url="#features">Bulk Messaging</HoverLink>
                    <HoverLink url="#features">Analytics</HoverLink>
                  </div>
                ),
              },
              {
                text: "Templates",
                submenu: (
                  <div className="grid grid-cols-1 gap-2 w-48">
                    <FeatureItem
                      heading="Business Contacts"
                      url="#templates"
                      info="Import business contact lists for marketing campaigns."
                    />
                    <FeatureItem
                      heading="Customer Database"
                      url="#templates"
                      info="Manage customer information and communication history."
                    />
                    <FeatureItem
                      heading="Event Attendees"
                      url="#templates"
                      info="Send updates and reminders to event participants."
                    />
                    <FeatureItem
                      heading="Newsletter Subscribers"
                      url="#templates"
                      info="Manage email-to-WhatsApp subscriber conversions."
                    />
                  </div>
                ),
              },
              {
                text: "Tools",
                submenu: (
                  <div className="flex flex-col space-y-2">
                    <HoverLink url="#tools">Data Cleaner</HoverLink>
                    <HoverLink url="#tools">Phone Formatter</HoverLink>
                    <HoverLink url="#tools">Duplicate Remover</HoverLink>
                    <HoverLink url="#tools">Export Manager</HoverLink>
                  </div>
                ),
              },
              { text: "Pricing", url: "#pricing" },
              { text: "About", url: "#about" },
            ]}
            rightComponent={
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full hover:bg-white/30 transition-all">
                  Get Started
                </button>
              </div>
            }
          />
        </div>

        {/* WhatsApp-inspired gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-500 to-emerald-600"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 via-transparent to-green-400/20"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Hero Content */}
        <div className="flex-1 flex items-center">
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            {/* Trust Badge - Centered */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium">Trusted by 10,000+ businesses worldwide</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Left side - Upload Folder */}
              <div className="lg:w-1/2 flex justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Upload Your Data</h3>
                  <p className="text-green-100 mb-6">Import CSV or Excel files to get started</p>
                  <FileUpload onDataImported={handleDataImported} />
                </div>
              </div>

              {/* Right side - Content */}
              <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  WhatsApp
                  <span className="block bg-gradient-to-r from-green-200 to-white bg-clip-text text-transparent">
                    Bulk Messenger
                  </span>
                </h1>

                <p className="text-xl text-green-100 mb-8 leading-relaxed">
                  Transform your contact lists into powerful WhatsApp campaigns. Upload, clean, validate, and send personalized messages to thousands of contacts with enterprise-grade security and real-time delivery tracking.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button className="px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-green-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                    Start Free Trial
                  </button>
                  <button className="px-8 py-4 bg-green-600/20 text-white font-semibold rounded-full border border-white/30 hover:bg-green-600/30 transition-all duration-300 backdrop-blur-sm">
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section with Stats */}
      <section id="upload-section" className="relative py-12 overflow-hidden bg-gradient-to-b from-green-600 via-emerald-400 to-white-200">
        {/* Gravity Rockets Background */}
        <Gravity number={25} />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Section Title and Description */}
          <div className="text-center mb-6">
  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
    Transform Your Contact Lists <span className="text-green-600">Instantly</span>
  </h2>
  <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
    Join <span className="font-semibold text-gray-900">10,000+ businesses</span> who trust our platform to clean, validate, and send personalized WhatsApp messages at scale.
  </p>
</div>

          <div className="flex items-center justify-center gap-6 min-h-[350px]">
            {/* Left side - Upload Folder */}
            <div className="flex-shrink-0">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Your Contacts</h3>
                <p className="text-gray-600 text-sm mb-4">Import CSV or Excel files</p>
                <FileUpload onDataImported={handleDataImported} />
              </div>
            </div>

            {/* Center - Stats Carousel */}
            <div className="flex-1 max-w-md">
              <StatsCarouselcount
                title="Platform Performance"
                stats={[
                  { value: 10000, suffix: "+", label: "Contacts processed daily" },
                  { value: 99, suffix: "%", label: "Message delivery success rate" },
                  { value: 50, suffix: "+", label: "Data transformation tools" },
                ]}
                className="text-center"
              />
              </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-r from-green-50 via-white to-blue-50 dark:from-green-950 dark:via-slate-900 dark:to-blue-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of businesses who trust WA Bulk Messenger for their WhatsApp marketing campaigns
            </p>
          </div>

          <AnimatedTestimonials
          data={[
            {
              description:
                "WA Bulk Messenger transformed our customer outreach. We went from manual messaging to automated campaigns that increased our response rate by 300%!",
              image:
                "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
              name: "Sarah Johnson",
              handle: "@sarahj_retail",
            },
            {
              description:
                "The contact cleaning and validation features saved us hours of work. No more bounced messages or invalid numbers in our campaigns.",
              image:
                "https://plus.unsplash.com/premium_photo-1692340973636-6f2ff926af39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
              name: "Michael Chen",
              handle: "@mikechen_ecom",
            },
            {
              description:
                "Excel-like editing capabilities make it so easy to manage and update our contact lists. The bulk messaging features are incredibly powerful!",
              image:
                "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
              name: "Emma Rodriguez",
              handle: "@emmar_finance",
            },
            {
              description:
                "Setting up automated WhatsApp campaigns has never been easier. The interface is intuitive and the results speak for themselves.",
              image:
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
              name: "David Kim",
              handle: "@davidkim_realty",
            },
            {
              description:
                "The Kenya phone number formatting and validation is perfect for our local market. Compliance and deliverability have improved dramatically.",
              image:
                "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
              name: "Grace Wanjiku",
              handle: "@gracew_ke",
            },
            {
              description:
                "From CSV import to message delivery, the entire workflow is seamless. This tool has become essential for our marketing strategy.",
              image:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
              name: "James Oduya",
              handle: "@jameso_tech",
            },
          ]}
        />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-16 bg-gradient-to-b from-orange-50 to-yellow-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Powerful Features for WhatsApp Marketing
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Our comprehensive WhatsApp bulk messaging platform provides everything you need to manage contacts and run successful marketing campaigns.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 mb-12">
            {/* Left side - Static Vercel Cards */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VercelCard className="h-48" animateOnHover glowEffect>
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">CSV/Excel Import</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Import contacts from CSV or Excel files with automatic data validation
                    </p>
                  </div>
                </VercelCard>

                <VercelCard className="h-48" animateOnHover glowEffect>
                  <div className="text-center">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Contact Data Cleaning</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Clean and validate contact data with duplicate removal and formatting
                    </p>
                  </div>
                </VercelCard>

                <VercelCard className="h-48" animateOnHover glowEffect>
                  <div className="text-center">
                    <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Bulk Message Sending</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Send personalized bulk messages instantly to thousands of contacts
                    </p>
                  </div>
                </VercelCard>

                <VercelCard className="h-48" animateOnHover glowEffect>
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-red-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Data Privacy Protection</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Enterprise-grade security with end-to-end encryption and compliance
                    </p>
                  </div>
                </VercelCard>
              </div>
            </div>

            {/* Right side - Animated Motion Cards */}
            <div className="lg:w-1/2">
              <MotionCards interval={1500}>
                <MotionCardContent key="real-time-1" className="flex gap-3">
                  <Zap className="w-6 h-6 text-yellow-600" />
                  <span className="font-semibold">Real-time Processing</span>
                </MotionCardContent>

                <MotionCardContent key="mobile-2" className="flex gap-3">
                  <Smartphone className="w-6 h-6 text-indigo-600" />
                  <span className="font-semibold">Mobile-Optimized Interface</span>
                </MotionCardContent>

                <MotionCardContent key="analytics-3" className="flex gap-3">
                  <BarChart3 className="w-6 h-6 text-teal-600" />
                  <span className="font-semibold">Advanced Analytics Dashboard</span>
                </MotionCardContent>

                <MotionCardContent key="templates-4" className="flex gap-3">
                  <Settings className="w-6 h-6 text-orange-600" />
                  <span className="font-semibold">Customizable Templates</span>
                </MotionCardContent>

                <MotionCardContent key="storage-5" className="flex gap-3">
                  <Database className="w-6 h-6 text-cyan-600" />
                  <span className="font-semibold">Cloud Data Storage</span>
                </MotionCardContent>

                <MotionCardContent key="support-6" className="flex gap-3">
                  <HelpCircle className="w-6 h-6 text-pink-600" />
                  <span className="font-semibold">24/7 Customer Support</span>
                </MotionCardContent>
              </MotionCards>
            </div>
          </div>

          {/* How It Works Section */}
          <div id="how-it-works" className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              How It Works
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Get started with WhatsApp bulk messaging in just 3 simple steps
            </p>
          </div>

          <FlipStack
            cards={[
              {
                id: 1,
                content: (
                  <div className="p-6 text-center h-full flex flex-col justify-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">1. Import Your Data</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Upload your CSV or Excel file containing contact information. We support various formats and automatically detect column headers.
                    </p>
                  </div>
                ),
              },
              {
                id: 2,
                content: (
                  <div className="p-6 text-center h-full flex flex-col justify-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Database className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">2. Clean & Transform</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Use our powerful data cleaning tools to remove duplicates, format phone numbers, and validate contact information.
                    </p>
                  </div>
                ),
              },
              {
                id: 3,
                content: (
                  <div className="p-6 text-center h-full flex flex-col justify-center">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">3. Send Messages</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Send personalized bulk messages instantly. Track delivery status and manage your WhatsApp marketing campaigns effectively.
                    </p>
                  </div>
                ),
              },
              {
                id: 4,
                content: (
                  <div className="p-6 text-center h-full flex flex-col justify-center">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">4. Analyze Results</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Get detailed analytics on message delivery, open rates, and engagement metrics to optimize your campaigns.
                    </p>
                  </div>
                ),
              },
              {
                id: 5,
                content: (
                  <div className="p-6 text-center h-full flex flex-col justify-center">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-red-600" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">5. Secure & Compliant</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Your data is protected with enterprise-grade security, GDPR compliance, and end-to-end encryption.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-semibold">WA</div>
                <span className="text-xl font-semibold">WA 2 Bulk Messenger</span>
              </div>
              <p className="text-slate-300 mb-4 max-w-md">
                Transform your contact lists into powerful WhatsApp campaigns. Clean, validate, and send messages to thousands of contacts with ease.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-green-400 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-green-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-green-400 transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#templates" className="text-slate-300 hover:text-white transition-colors">Templates</a></li>
                <li><a href="#tools" className="text-slate-300 hover:text-white transition-colors">Tools</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-slate-300 hover:text-white transition-colors text-left">
                        Help Center
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-green-400">Help Center</h4>
                        <p className="text-sm text-slate-300">
                          Find answers to frequently asked questions, troubleshooting guides, and best practices for using WA Bulk Messenger effectively.
                        </p>
                        <div className="space-y-2">
                          <p className="text-xs text-slate-400">Common Topics:</p>
                          <ul className="text-xs text-slate-300 space-y-1 ml-4">
                            <li>• File upload issues</li>
                            <li>• Data cleaning tips</li>
                            <li>• Message delivery problems</li>
                            <li>• Account settings</li>
                          </ul>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </li>
                <li>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-slate-300 hover:text-white transition-colors text-left">
                        Documentation
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-green-400">Documentation</h4>
                        <p className="text-sm text-slate-300">
                          Comprehensive guides and API documentation for developers and advanced users looking to integrate WA Bulk Messenger.
                        </p>
                        <div className="space-y-2">
                          <p className="text-xs text-slate-400">Available Resources:</p>
                          <ul className="text-xs text-slate-300 space-y-1 ml-4">
                            <li>• API Reference</li>
                            <li>• Integration Guides</li>
                            <li>• Webhook Documentation</li>
                            <li>• SDK Downloads</li>
                          </ul>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </li>
                <li>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-slate-300 hover:text-white transition-colors text-left">
                        Contact Us
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-green-400">Contact Us</h4>
                        <p className="text-sm text-slate-300">
                          Need help? Our support team is here to assist you. Get in touch through multiple channels for personalized assistance.
                        </p>
                        <div className="space-y-2">
                          <p className="text-xs text-slate-400">Contact Methods:</p>
                          <ul className="text-xs text-slate-300 space-y-1 ml-4">
                            <li>• support@wabulkmessenger.com</li>
                            <li>• Live chat (9 AM - 6 PM EST)</li>
                            <li>• WhatsApp: +1 (555) 123-4567</li>
                            <li>• Response time: less than 2 hours</li>
                          </ul>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </li>
                <li>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-slate-300 hover:text-white transition-colors text-left">
                        Privacy Policy
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-green-400">Privacy Policy</h4>
                        <p className="text-sm text-slate-300">
                          Your privacy is our priority. Learn how we collect, use, and protect your data in compliance with international privacy standards.
                        </p>
                        <div className="space-y-2">
                          <p className="text-xs text-slate-400">Key Points:</p>
                          <ul className="text-xs text-slate-300 space-y-1 ml-4">
                            <li>• GDPR compliant</li>
                            <li>• End-to-end encryption</li>
                            <li>• Data retention policies</li>
                            <li>• Your rights and choices</li>
                          </ul>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-slate-400 hover:text-white text-sm transition-colors">
                  © 2024 WA 2 Bulk Messenger. All rights reserved.
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <ProfileCard
                  img="/James_Muriuki_passport_photo.jpg"
                  name="James Muriuki"
                  bio="Full-stack developer passionate about creating innovative solutions. Specializing in React, Next.js, and modern web technologies."
                  position="Founder & Developer"
                  skills={[
                    { name: "React", icon: <span>⚛️</span> },
                    { name: "Next.js", icon: <span>▲</span> },
                    { name: "TypeScript", icon: <span>🔷</span> },
                    { name: "Node.js", icon: <span>🟢</span> },
                    { name: "Python", icon: <span>🐍</span> },
                    { name: "AWS", icon: <span>☁️</span> },
                  ]}
                  socialLinks={[
                    { name: "GitHub", url: "https://github.com", icon: <span>🐙</span> },
                    { name: "LinkedIn", url: "https://linkedin.com", icon: <span>💼</span> },
                    { name: "Twitter", url: "https://twitter.com", icon: <span>🐦</span> },
                  ]}
                  spotlight={true}
                  spotlightColor="34, 197, 94"
                />
              </PopoverContent>
            </Popover>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                    onClick={() => setCurrentPolicyPage(1)}
                  >
                    Terms of Service
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-96 max-h-96 overflow-y-auto">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-400 text-center">{currentPolicy?.title}</h4>
                    <div className="space-y-3">
                      {currentPolicy?.content.map((section, index) => (
                        <div key={index}>
                          <h5 className="font-medium text-slate-200 mb-1">{section.heading}</h5>
                          <p className="text-xs text-slate-300 leading-relaxed">{section.text}</p>
                        </div>
                      ))}
                    </div>
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setCurrentPolicyPage(Math.max(1, currentPolicyPage - 1))}
                            className={currentPolicyPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        {policies.map((policy) => (
                          <PaginationItem key={policy.id}>
                            <PaginationLink
                              isActive={currentPolicyPage === policy.id}
                              onClick={() => setCurrentPolicyPage(policy.id)}
                              className="cursor-pointer"
                            >
                              {policy.id}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPolicyPage(Math.min(3, currentPolicyPage + 1))}
                            className={currentPolicyPage === 3 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                    onClick={() => setCurrentPolicyPage(2)}
                  >
                    Privacy Policy
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-96 max-h-96 overflow-y-auto">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-400 text-center">{currentPolicy?.title}</h4>
                    <div className="space-y-3">
                      {currentPolicy?.content.map((section, index) => (
                        <div key={index}>
                          <h5 className="font-medium text-slate-200 mb-1">{section.heading}</h5>
                          <p className="text-xs text-slate-300 leading-relaxed">{section.text}</p>
                        </div>
                      ))}
                    </div>
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setCurrentPolicyPage(Math.max(1, currentPolicyPage - 1))}
                            className={currentPolicyPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        {policies.map((policy) => (
                          <PaginationItem key={policy.id}>
                            <PaginationLink
                              isActive={currentPolicyPage === policy.id}
                              onClick={() => setCurrentPolicyPage(policy.id)}
                              className="cursor-pointer"
                            >
                              {policy.id}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPolicyPage(Math.min(3, currentPolicyPage + 1))}
                            className={currentPolicyPage === 3 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                    onClick={() => setCurrentPolicyPage(3)}
                  >
                    Cookie Policy
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-96 max-h-96 overflow-y-auto">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-400 text-center">{currentPolicy?.title}</h4>
                    <div className="space-y-3">
                      {currentPolicy?.content.map((section, index) => (
                        <div key={index}>
                          <h5 className="font-medium text-slate-200 mb-1">{section.heading}</h5>
                          <p className="text-xs text-slate-300 leading-relaxed">{section.text}</p>
                        </div>
                      ))}
                    </div>
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setCurrentPolicyPage(Math.max(1, currentPolicyPage - 1))}
                            className={currentPolicyPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        {policies.map((policy) => (
                          <PaginationItem key={policy.id}>
                            <PaginationLink
                              isActive={currentPolicyPage === policy.id}
                              onClick={() => setCurrentPolicyPage(policy.id)}
                              className="cursor-pointer"
                            >
                              {policy.id}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPolicyPage(Math.min(3, currentPolicyPage + 1))}
                            className={currentPolicyPage === 3 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
