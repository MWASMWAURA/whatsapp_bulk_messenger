"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ProfileCard from "@/components/ui/profilecard";
import ExpandableDock from "@/components/ui/expandable-dock";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  ChevronDown,
  Sparkles,
  RefreshCw,
  Search,
  ChevronsUpDown,
  Plus,
} from "lucide-react";

interface TableData {
  [key: string]: string | number;
}

interface ExcelSpreadsheetProps {
  tableData: TableData[];
  tableColumns: any[];
  onClose: () => void;
}

export function ExcelSpreadsheet({ tableData, tableColumns, onClose }: ExcelSpreadsheetProps) {
  const [excelCells, setExcelCells] = useState<{ [key: string]: string }>({});
  const [selectedExcelCell, setSelectedExcelCell] = useState<string | null>(null);
  const [drawerHeight, setDrawerHeight] = useState(40);
  const [isDragging, setIsDragging] = useState(false);
  const [currentPolicyPage, setCurrentPolicyPage] = useState(1);
  const [dockExpanded, setDockExpanded] = useState(false);
  const [selectedNameColumn, setSelectedNameColumn] = useState<string>("");
  const [selectedPhoneColumn, setSelectedPhoneColumn] = useState<string>("");
  const [messageTemplate, setMessageTemplate] = useState<string>("");
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const excelInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);

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

  const groupedNavigation = [
    {
      title: "CONNECT WHATSAPP",
      icon: MessageSquare,
      children: [
        {
          title: "Scan QR Code",
          description: "Link your WhatsApp account",
          category: "new",
          content: {
            type: "qr_scanner",
            title: "Scan QR Code",
            data: null
          }
        },
      ],
    },
    {
      title: "FREQUENTLY ASKED QUESTIONS",
      icon: HelpCircle,
      children: [
        {
          title: "How to Connect WhatsApp",
          description: "Step-by-step connection guide",
          content: {
            type: "text",
            title: "How to Connect WhatsApp",
            data: "1. Open WhatsApp on your phone\n2. Go to Settings → Linked Devices\n3. Tap 'Link a Device'\n4. Scan the QR code shown above\n5. Your WhatsApp is now connected!\n\nTip: Make sure your phone and computer are on the same Wi-Fi network for faster connection."
          }
        },
        {
          title: "Why connect WhatsApp?",
          description: "Benefits of linking your account",
          content: {
            type: "text",
            title: "Benefits of Connecting WhatsApp",
            data: "Connecting your WhatsApp account allows you to send bulk messages directly from your computer. This provides a more efficient workflow for managing large contact lists and enables features like message scheduling, contact validation, and delivery tracking."
          }
        },
        {
          title: "Is it secure?",
          description: "Security and privacy information",
          content: {
            type: "text",
            title: "Security & Privacy",
            data: "Your WhatsApp connection is secured with end-to-end encryption. Messages are sent directly through WhatsApp's official servers, and we never store your personal messages or contact information. Your data remains private and secure."
          }
        },
        {
          title: "Supported devices",
          description: "Compatible phones and computers",
          content: {
            type: "text",
            title: "Device Compatibility",
            data: "Works with iPhone, Android phones, and all major computer operating systems including Windows, macOS, and Linux. Your phone must have WhatsApp installed and an active internet connection."
          }
        },
        {
          title: "Connection limits",
          description: "How many devices can be linked",
          content: {
            type: "text",
            title: "Device Connection Limits",
            data: "WhatsApp allows up to 4 devices to be linked to a single WhatsApp account simultaneously. You can manage linked devices from your WhatsApp settings on your phone."
          }
        },
        {
          title: "Data usage",
          description: "Network requirements",
          content: {
            type: "text",
            title: "Network & Data Requirements",
            data: "A stable internet connection is required for both your phone and computer. Data usage depends on the number of messages sent. We recommend using Wi-Fi for large campaigns to minimize mobile data costs."
          }
        },
        {
          title: "Troubleshooting",
          description: "Common connection issues",
          content: {
            type: "list",
            title: "Common Issues & Solutions",
            data: [
              { issue: "QR code not scanning", solution: "Ensure good lighting and hold your phone steady. Try refreshing the QR code." },
              { issue: "Connection timeout", solution: "Check your internet connection and try again. Make sure WhatsApp is updated on your phone." },
              { issue: "Device limit reached", solution: "WhatsApp allows up to 4 linked devices. Unlink unused devices from your WhatsApp settings." },
              { issue: "Phone not recognized", solution: "Ensure your phone's WhatsApp is logged in and has an active internet connection." }
            ]
          }
        },
      ],
    },
  ];



  useEffect(() => {
    // Import table data to Excel spreadsheet
    const newCells = { ...excelCells };

    // Clear existing data first
    Object.keys(newCells).forEach(key => {
      newCells[key] = '';
    });

    // Import column headers (first row)
    tableColumns.forEach((col, colIndex) => {
      if (colIndex < 26) { // Limit to 26 columns (A-Z)
        newCells[`0-${colIndex}`] = (col as any).header;
      }
    });

    // Import data rows
    tableData.forEach((row, rowIndex) => {
      const excelRow = rowIndex + 1; // Start from row 1 (row 0 is headers)
      tableColumns.forEach((col, colIndex) => {
        if (colIndex < 26 && excelRow < 1000) { // Limit bounds
          const columnKey = (col as any).accessorKey;
          newCells[`${excelRow}-${colIndex}`] = String(row[columnKey] || '');
        }
      });
    });

    setExcelCells(newCells);
  }, [tableData, tableColumns]);

  const closeExcelView = () => {
    onClose();
  };

  const handleExcelCellChange = (row: number, col: number, value: string) => {
    setExcelCells(prev => ({
      ...prev,
      [`${row}-${col}`]: value
    }));
  };

  const handleExcelKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextRow = row + 1;
      const nextKey = `${nextRow}-${col}`;
      if (excelInputRefs.current[nextKey]) {
        excelInputRefs.current[nextKey].focus();
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const nextCol = e.shiftKey ? col - 1 : col + 1;
      const nextKey = `${row}-${nextCol}`;
      if (excelInputRefs.current[nextKey]) {
        excelInputRefs.current[nextKey].focus();
      }
    }
  };

  const getColumnLabel = (index: number) => {
    if (index < 26) return String.fromCharCode(65 + index);
    return String.fromCharCode(64 + Math.floor(index / 26)) + String.fromCharCode(65 + (index % 26));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = (containerRef.current as HTMLElement).getBoundingClientRect();
    const newHeight = ((e.clientY - containerRect.top) / containerRect.height) * 100;

    const clampedHeight = Math.max(5, Math.min(95, newHeight));
    setDrawerHeight(clampedHeight);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleDrawer = () => {
    setDrawerHeight(prev => prev > 50 ? 40 : 95);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Expandable Dock */}
      <ExpandableDock
        headerContent={
          <div className="flex items-center gap-3 text-black dark:text-white w-full">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">WhatsApp Connect</span>
            <div className="ml-auto text-xs bg-white/20 dark:bg-black/20 text-black dark:text-white px-2 py-1 rounded">
              Help Center
            </div>
          </div>
        }
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto pr-2 space-y-4" onWheel={(e) => e.stopPropagation()}>
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                <Smartphone className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-xs text-gray-600 text-center mb-2">Scan QR Code</p>
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
                  <span className="text-sm text-gray-400 font-mono">QR CODE</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">Point your phone camera here</p>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="font-semibold text-sm mb-3 text-gray-800">How to Connect:</h4>
                <ol className="text-xs text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="bg-green-100 text-green-800 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                    <span>Open WhatsApp on your phone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-green-100 text-green-800 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                    <span>Go to Settings → Linked Devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-green-100 text-green-800 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                    <span>Tap "Link a Device"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-green-100 text-green-800 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                    <span>Scan the QR code on the left</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-green-100 text-green-800 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">5</span>
                    <span>Your WhatsApp is now connected!</span>
                  </li>
                </ol>
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs text-green-800">
                    <strong>Tip:</strong> Make sure your phone and computer are on the same Wi-Fi network for faster connection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ExpandableDock>

      {/* Top Area - Spreadsheet */}
      <div className="bg-white">
        <div className="bg-green-700 text-white px-4 py-2 font-semibold text-sm flex items-center justify-between">
          <span>Imported Contacts Spreadsheet</span>
          <div className="flex items-center gap-2">
            <span className="text-xs">Tab to move • Enter for next row</span>
            <Button
              onClick={closeExcelView}
              variant="outline"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              ✕ Close
            </Button>
          </div>
        </div>

        <div className="overflow-auto max-h-96">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="bg-gray-200 border border-gray-400 w-12 text-xs font-semibold sticky top-0 left-0 z-10"></th>
                {Array.from({ length: 26 }, (_, i) => (
                  <th key={i} className="bg-gray-200 border border-gray-400 text-xs font-semibold p-1 min-w-[120px] sticky top-0 z-10">
                    {getColumnLabel(i)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.max(100, Object.keys(excelCells).length > 0 ? Math.max(...Object.keys(excelCells).map(key => parseInt(key.split('-')[0]))) + 50 : 100) }, (_, row) => (
                <tr key={row}>
                  <td className="bg-gray-200 border border-gray-400 text-xs font-semibold text-center p-1 sticky left-0 z-10">
                    {row + 1}
                  </td>
                  {Array.from({ length: 26 }, (_, col) => (
                    <td
                      key={col}
                      className={`border border-gray-300 p-0 ${selectedExcelCell === `${row}-${col}` ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
                    >
                      <input
                        ref={(el) => { excelInputRefs.current[`${row}-${col}`] = el; }}
                        type="text"
                        value={excelCells[`${row}-${col}`] || ''}
                        onChange={(e) => handleExcelCellChange(row, col, e.target.value)}
                        onFocus={() => setSelectedExcelCell(`${row}-${col}`)}
                        onBlur={() => setSelectedExcelCell(null)}
                        onKeyDown={(e) => handleExcelKeyDown(e, row, col)}
                        className="w-full h-full px-2 py-1.5 text-sm focus:outline-none bg-transparent"
                        style={{ minHeight: '28px' }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white">
        <div className="p-8">
           <h1 className="text-3xl font-bold mb-4 text-gray-800">Contact Management</h1>
           <p className="text-gray-600 mb-6">
             Your imported contacts are now in the Excel-like spreadsheet above. You can edit, add, or modify any contact information directly in the cells.
           </p>

           <div className="grid grid-cols-2 gap-8">
             {/* Left side - Features and Tips */}
             <div className="space-y-4">
               <div className="bg-gray-50 rounded-lg shadow p-6">
                 <h2 className="text-xl font-semibold mb-3 text-gray-700">Spreadsheet Features</h2>
                 <ul className="space-y-2 text-gray-600">
                   <li>• 100 rows × 26 columns (A-Z)</li>
                   <li>• Fully editable cells</li>
                   <li>• Keyboard navigation support</li>
                   <li>• Excel-like visual design</li>
                   <li>• Sticky headers for easy reference</li>
                 </ul>
               </div>

               <div className="bg-gray-50 rounded-lg shadow p-6">
                 <h2 className="text-xl font-semibold mb-3 text-gray-700">Keyboard Shortcuts</h2>
                 <ul className="space-y-2 text-gray-600">
                   <li>• <strong>Tab</strong> - Move to next cell (right)</li>
                   <li>• <strong>Shift + Tab</strong> - Move to previous cell (left)</li>
                   <li>• <strong>Enter</strong> - Move to cell below</li>
                   <li>• Click any cell to start editing</li>
                 </ul>
               </div>

               <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                 <h3 className="text-lg font-semibold mb-2 text-blue-900">💡 Tips</h3>
                 <p className="text-blue-800 mb-2">
                   Your contact data has been imported with column headers in row 1. You can now:
                 </p>
                 <ul className="text-blue-800 space-y-1">
                   <li>• Edit any contact information directly in the cells</li>
                   <li>• Add new contacts by editing empty rows</li>
                   <li>• Use the drag handle above to resize the spreadsheet view</li>
                   <li>• All changes are saved automatically</li>
                 </ul>
               </div>
             </div>

             {/* Right side - Message Template and Contact Selection */}
             <div className="space-y-4">
               <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
                 <h2 className="text-xl font-semibold mb-4 text-gray-700">Create Message Template</h2>

                 <DropdownMenu>
                   <DropdownMenuTrigger asChild>
                     <Button className="w-full mb-4 bg-green-600 hover:bg-green-700">
                       <Plus className="w-4 h-4 mr-2" />
                       Create Custom Message
                     </Button>
                   </DropdownMenuTrigger>
                   <DropdownMenuContent className="w-80" align="start">
                     <DropdownMenuLabel>Message Template Builder</DropdownMenuLabel>
                     <DropdownMenuItem>
                       <div className="flex flex-col w-full">
                         <span className="font-medium">Message Content</span>
                         <textarea
                           className="mt-2 w-full p-2 border border-gray-300 rounded text-sm"
                           placeholder="Enter your message template. Use {{name}} for personalization..."
                           value={messageTemplate}
                           onChange={(e) => setMessageTemplate(e.target.value)}
                           rows={3}
                         />
                       </div>
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuLabel>Column Headers</DropdownMenuLabel>
                     <DropdownMenuItem>
                       <div className="flex flex-col w-full">
                         <span className="font-medium text-sm">Name Column</span>
                         <select
                           className="mt-1 w-full p-1 border border-gray-300 rounded text-sm"
                           value={selectedNameColumn}
                           onChange={(e) => setSelectedNameColumn(e.target.value)}
                         >
                           <option value="">Select column...</option>
                           {tableColumns.map((col: any, idx: number) => (
                             <option key={idx} value={col.accessorKey}>
                               {col.header} ({col.accessorKey})
                             </option>
                           ))}
                         </select>
                       </div>
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                       <div className="flex flex-col w-full">
                         <span className="font-medium text-sm">Phone Column</span>
                         <select
                           className="mt-1 w-full p-1 border border-gray-300 rounded text-sm"
                           value={selectedPhoneColumn}
                           onChange={(e) => setSelectedPhoneColumn(e.target.value)}
                         >
                           <option value="">Select column...</option>
                           {tableColumns.map((col: any, idx: number) => (
                             <option key={idx} value={col.accessorKey}>
                               {col.header} ({col.accessorKey})
                             </option>
                           ))}
                         </select>
                       </div>
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem>
                       <Button
                         className="w-full bg-green-600 hover:bg-green-700"
                         onClick={() => {
                           toast.success("Message template created successfully!");
                         }}
                       >
                         Save Template
                       </Button>
                     </DropdownMenuItem>
                     </DropdownMenuContent>
                   </DropdownMenu>
                 </div>

                 <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
                   <Collapsible
                     open={isContactsOpen}
                     onOpenChange={setIsContactsOpen}
                     className="w-full"
                   >
                     <div className="flex items-center justify-between">
                       <h3 className="text-lg font-semibold text-gray-700">Select Contacts</h3>
                       <CollapsibleTrigger asChild>
                         <Button variant="ghost" size="sm">
                           <ChevronsUpDown className="h-4 w-4" />
                           <span className="sr-only">Toggle contacts selection</span>
                         </Button>
                       </CollapsibleTrigger>
                     </div>

                     <div className="mt-2 text-sm text-gray-600">
                       Choose which column contains contact information for messaging
                     </div>

                     <CollapsibleContent className="space-y-3 mt-4">
                       <div className="space-y-2">
                         <label className="block text-sm font-medium text-gray-700">
                           Contact Column (Phone Numbers)
                         </label>
                         <select
                           className="w-full p-2 border border-gray-300 rounded text-sm"
                           value={selectedPhoneColumn}
                           onChange={(e) => setSelectedPhoneColumn(e.target.value)}
                         >
                           <option value="">Select contact column...</option>
                           {tableColumns.map((col: any, idx: number) => (
                             <option key={idx} value={col.accessorKey}>
                               {col.header} ({col.accessorKey})
                             </option>
                           ))}
                         </select>
                       </div>

                       <div className="space-y-2">
                         <label className="block text-sm font-medium text-gray-700">
                           Name Column (Optional)
                         </label>
                         <select
                           className="w-full p-2 border border-gray-300 rounded text-sm"
                           value={selectedNameColumn}
                           onChange={(e) => setSelectedNameColumn(e.target.value)}
                         >
                           <option value="">Select name column...</option>
                           {tableColumns.map((col: any, idx: number) => (
                             <option key={idx} value={col.accessorKey}>
                               {col.header} ({col.accessorKey})
                             </option>
                           ))}
                         </select>
                       </div>

                       <div className="pt-2">
                         <Button
                           className="w-full bg-blue-600 hover:bg-blue-700"
                           onClick={() => {
                             toast.success(`${tableData.length} contacts selected for messaging!`);
                           }}
                         >
                           Select {tableData.length} Contacts
                         </Button>
                       </div>
                     </CollapsibleContent>
                   </Collapsible>
                 </div>
               </div>
             </div>
           </div>

           <div className="mt-6 flex items-center justify-between">
             <div className="text-sm text-gray-600">
               {tableData.length} contacts imported • Ready for WhatsApp bulk messaging
             </div>
             <Button
               onClick={() => {
                 toast.success("Contacts ready for WhatsApp messaging!");
                 closeExcelView();
               }}
               className="bg-green-600 hover:bg-green-700"
             >
               Use for WhatsApp Messages
             </Button>
           </div>
         </div>


        {/* Footer */}
        <footer className="bg-slate-900 text-white py-8 mt-8">
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