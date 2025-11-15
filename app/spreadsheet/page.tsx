"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/animated-tabs";
import { SeparatorPro } from "@/components/ui/seperatorpro";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import ProfileCard from "@/components/ui/profilecard";
import { MessageSquare, Mail, Phone, HelpCircle, Smartphone } from "lucide-react";
import ExpandableDock from "@/components/ui/expandable-dock";

function Label({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
    />
  );
}

export default function IntegratedContentManagement() {
  const [excelCells, setExcelCells] = useState({});
  const [selectedExcelCell, setSelectedExcelCell] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [currentPolicyPage, setCurrentPolicyPage] = useState(1);
  const [qrCode, setQrCode] = useState(null);
  const [qrStatus, setQrStatus] = useState('disconnected');
  const [ws, setWs] = useState(null);
  const excelInputRefs = useRef({});
  const [activityLogs, setActivityLogs] = useState([
    { time: '--:--:--', message: 'Waiting for connection...', type: 'info' }
  ]);
  const [selectedNameColumn, setSelectedNameColumn] = useState(0);
  const [selectedPhoneColumn, setSelectedPhoneColumn] = useState(1);
  const [messageTemplate, setMessageTemplate] = useState('Hello {{name}}! Your phone is {{phone}}.');
  const [defaultCountryCode, setDefaultCountryCode] = useState('254');

  const addLog = (message, type = 'info') => {
    const time = new Date().toLocaleTimeString();
    setActivityLogs(prev => [...prev, { time, message, type }]);
  };

  const getColumnLabel = (index) => {
    if (index < 26) return String.fromCharCode(65 + index);
    return String.fromCharCode(64 + Math.floor(index / 26)) + String.fromCharCode(65 + (index % 26));
  };

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
          text: "Permission is granted to temporarily download one copy of the materials on WA Bulk Messenger's website for personal, non-commercial transitory viewing only."
        },
        {
          heading: "Disclaimer",
          text: "The materials on WA Bulk Messenger's website are provided on an 'as is' basis. WA Bulk Messenger makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
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
          heading: "How We Use Information",
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

  const currentPolicy = policies.find(policy => policy.id === currentPolicyPage);

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
      ],
    },
  ];

  // Get table data from session storage or use trial data
const [tableData, setTableData] = useState(() => {
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem('importedTableData');
    if (stored) {
      return JSON.parse(stored);
    }
  }
  // Trial data as fallback
  return [
    { name: 'John Doe', phone: '+1234567890', email: 'john@example.com', title: 'Mr.' },
    { name: 'Jane Smith', phone: '+0987654321', email: 'jane@example.com', title: 'Ms.' },
    { name: 'Alice Johnson', phone: '+1122334455', email: 'alice@example.com', title: 'Dr.' },
    { name: 'Bob Wilson', phone: '+5566778899', email: 'bob@example.com', title: 'Mr.' },
    { name: 'Emma Davis', phone: '+9988776655', email: 'emma@example.com', title: 'Mrs.' },
  ];
});

const [tableColumns, setTableColumns] = useState(() => {
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem('importedTableColumns');
    if (stored) {
      return JSON.parse(stored);
    }
  }
  // Trial columns as fallback
  return [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'title', header: 'Title' },
  ];
});

  useEffect(() => {
    const newCells = {};
    tableColumns.forEach((col, colIndex) => {
      if (colIndex < 26) {
        newCells[`0-${colIndex}`] = col.header;
      }
    });
    tableData.forEach((row, rowIndex) => {
      const excelRow = rowIndex + 1;
      tableColumns.forEach((col, colIndex) => {
        if (colIndex < 26 && excelRow < 1000) {
          const columnKey = col.accessorKey;
          newCells[`${excelRow}-${colIndex}`] = String(row[columnKey] || '');
        }
      });
    });
    setExcelCells(newCells);
  }, [tableData, tableColumns]); // Re-run when data changes

  const availableColumns = useMemo(() => {
    const cols = [];
    for (let i = 0; i < 26; i++) {
      const headerValue = excelCells[`0-${i}`];
      if (headerValue && headerValue.trim()) {
        cols.push({
          index: i,
          label: getColumnLabel(i),
          header: headerValue
        });
      }
    }
    return cols;
  }, [excelCells]);

  const extractedContacts = useMemo(() => {
    const contacts = [];
    
    for (let row = 1; row < 100; row++) {
      const phone = excelCells[`${row}-${selectedPhoneColumn}`];
      
      if (phone && phone.trim()) {
        const contact = {
          phone: phone.trim(),
        };
        
        availableColumns.forEach(col => {
          const value = excelCells[`${row}-${col.index}`];
          contact[col.header.toLowerCase()] = (value || '').trim();
        });
        
        contacts.push(contact);
      }
    }
    
    return contacts;
  }, [excelCells, selectedPhoneColumn, availableColumns]);

  const parseTemplate = (template, contact) => {
    if (!contact) return template;
    
    let parsed = template;
    
    availableColumns.forEach(col => {
      const placeholder = new RegExp(`{{${col.header.toLowerCase()}}}`, 'gi');
      const value = contact[col.header.toLowerCase()] || `[${col.header}]`;
      parsed = parsed.replace(placeholder, value);
    });
    
    return parsed;
  };

  // Format phone number for WhatsApp (remove + and ensure country code)
  const formatPhoneForWhatsApp = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // Remove leading zeros
  cleaned = cleaned.replace(/^0+/, '');
  
  // If it doesn't start with a country code, add the default one
  if (!cleaned.startsWith(defaultCountryCode)) {
    cleaned = defaultCountryCode + cleaned;
  }
  
  // Ensure it's at least 10 digits (without country code)
  if (cleaned.length < 12) { // 254 (3 digits) + 9 digits minimum
    console.warn('Phone number too short:', phone, '→', cleaned);
  }
  
  return cleaned;
};

  // Send campaign function
 const handleSendCampaign = async () => {
  if (qrStatus !== 'connected') {
    alert('Please connect WhatsApp first!');
    return;
  }

  if (extractedContacts.length === 0) {
    alert('No contacts to send messages to!');
    return;
  }

  if (!messageTemplate.trim()) {
    alert('Please create a message template first!');
    return;
  }

  const confirmed = confirm(
    `Send messages to ${extractedContacts.length} contacts?\n\n` +
    `Preview: ${parseTemplate(messageTemplate, extractedContacts[0]).substring(0, 100)}...`
  );

  if (!confirmed) return;

  addLog(`Starting campaign to ${extractedContacts.length} contacts...`, 'info');

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < extractedContacts.length; i++) {
    const contact = extractedContacts[i];
    const message = parseTemplate(messageTemplate, contact);
    const formattedPhone = formatPhoneForWhatsApp(contact.phone);

    // Add this debug line:
console.log('Original phone:', contact.phone, '→ Formatted:', formattedPhone);

       try {
      if (ws && ws.readyState === WebSocket.OPEN) {
        // Create a promise that waits for the server response
        const sendPromise = new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Timeout waiting for response'));
          }, 10000); // 10 second timeout

          // Create a temporary message handler
          const messageHandler = (event) => {
            const data = JSON.parse(event.data);
            
            if (data.type === 'message-sent' && data.to === formattedPhone) {
              clearTimeout(timeout);
              ws.removeEventListener('message', messageHandler);
              resolve(data);
            } else if (data.type === 'message-error') {
              clearTimeout(timeout);
              ws.removeEventListener('message', messageHandler);
              reject(new Error(data.error));
            }
          };

          ws.addEventListener('message', messageHandler);
          
          // Send the message
          ws.send(JSON.stringify({
            type: 'send-message',
            phone: formattedPhone,
            message: message
          }));
        });

        // Wait for the server response
        await sendPromise;
        
        successCount++;
        addLog(`✓ Sent to ${contact.name || formattedPhone}`, 'success');
        
        // Wait 2 seconds before next message
        await new Promise(resolve => setTimeout(resolve, 4000));
      } else {
        throw new Error('WebSocket disconnected');
      }
    } catch (error) {
      failCount++;
      addLog(`✗ Failed to send to ${contact.name || formattedPhone}: ${error.message}`, 'error');
    }
  }

  addLog(`Campaign complete! ✓ ${successCount} sent, ✗ ${failCount} failed`, 
         failCount > 0 ? 'error' : 'success');
  
  alert(`Campaign Complete!\n\nSuccessful: ${successCount}\nFailed: ${failCount}`);
};

  // Generate unique browser fingerprint
function generateBrowserFingerprint() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('fingerprint', 2, 2);
  const canvasData = canvas.toDataURL();

  // Detect browser type
  const getBrowserName = () => {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
    return 'Unknown';
  };


  // Get WebGL fingerprint for more uniqueness
  const getWebGLFingerprint = () => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return 'no-webgl';
      
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        return `${gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)}_${gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)}`;
      }
      return gl.getParameter(gl.VERSION);
    } catch (e) {
      return 'webgl-error';
    }
  };

  const fingerprint = {
    // Browser identification
    browserName: getBrowserName(),
    userAgent: navigator.userAgent,
    
    // Language settings
    language: navigator.language,
    languages: navigator.languages?.join(',') || navigator.language,
    
    // Platform and device
    platform: navigator.platform,
    vendor: navigator.vendor || '',
    maxTouchPoints: navigator.maxTouchPoints || 0,
    
    // Screen details
    screenResolution: `${screen.width}x${screen.height}`,
    screenAvail: `${screen.availWidth}x${screen.availHeight}`,
    colorDepth: screen.colorDepth,
    pixelDepth: screen.pixelDepth || screen.colorDepth,
    screenOrientation: screen.orientation?.type || 'unknown',
    
    // Timezone
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),
    
    // Hardware
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
    deviceMemory: navigator.deviceMemory || 'unknown',
    
    // Canvas and WebGL
    canvas: canvasData.substring(0, 150),
    webgl: getWebGLFingerprint(),
    
    // Plugins
    plugins: Array.from(navigator.plugins || []).map(p => p.name).join(','),
    
    // Additional identifiers
    cookieEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack || 'unknown'
  };

  return JSON.stringify(fingerprint);
}

// Get or create fingerprint
// Get or create fingerprint
function getOrCreateFingerprint() {
  // Detect browser first
  const getBrowserName = () => {
    const ua = navigator.userAgent;
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    return 'Other';
  };

  const browserName = getBrowserName();
  const storageKey = `browser_fingerprint_${browserName}`; // Different key per browser
  
  let fingerprint = localStorage.getItem(storageKey);
  
  if (!fingerprint) {
    fingerprint = generateBrowserFingerprint();
    localStorage.setItem(storageKey, fingerprint);
    console.log(`Generated NEW fingerprint for ${browserName}`);
  } else {
    console.log(`Using EXISTING fingerprint for ${browserName}`);
  }
  
  return fingerprint;
}

// Handle page visibility changes
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      console.log('📱 Page hidden - connection may be maintained');
    } else {
      console.log('📱 Page visible - connection active');
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, []);
  useEffect(() => {
    const fingerprint = getOrCreateFingerprint();
    // DEBUG: Log the fingerprint
  console.log('=== FINGERPRINT DEBUG ===');
  console.log('Raw fingerprint:', fingerprint);
  console.log('Fingerprint length:', fingerprint.length);
  console.log('Browser:', navigator.userAgent.includes('Edg') ? 'Edge' : 
              navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Other');
  console.log('========================');
    // Get WebSocket URL from environment variable
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000';
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected - initializing session');
      setQrStatus('connecting');
      
      // Send fingerprint to initialize session
      ws.send(JSON.stringify({
        type: 'init',
        fingerprint: fingerprint
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch(data.type) {
        case 'qr':
          setQrCode(data.qr);
          setQrStatus('connecting');
          addLog('QR Code received. Please scan with WhatsApp.', 'info');
          break;
        case 'session-created':
          console.log('New session created:', data.sessionId);
          addLog(`Session created: ${data.sessionId}`, 'success');
          break;
        case 'session-restored':
          console.log('Session restored:', data.sessionId);
          addLog(`Session restored: ${data.sessionId}`, 'success');
          break;
        case 'ready':
          setQrStatus('connected');
          addLog('WhatsApp connected successfully!', 'success');
          break;
        case 'logout-started':
          addLog('Logout initiated...', 'info');
          break;
        case 'logged-out':
          setQrCode(null);
          setQrStatus('disconnected');
          addLog('Logged out successfully. Waiting for new connection...', 'info');
          break;
        case 'message-sent':
          addLog(`✓ Message delivered to ${data.phone}`, 'success');
          break;
        case 'message-failed':
          addLog(`✗ Failed to send to ${data.phone}: ${data.error}`, 'error');
          break;
        case 'status':
          console.log('Status:', data.message);
          addLog(data.message, 'info');
          break;
        case 'error':
          console.error('Error:', data.message);
          addLog(`Error: ${data.message}`, 'error');
          setQrStatus('error');
          break;
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      addLog('Connection error. Make sure the backend is running.', 'error');
      setQrStatus('error');
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      addLog('WebSocket disconnected', 'error');
      setQrStatus('disconnected');
    };
    
    setWs(ws);

    return () => {
    console.log('🧹 Cleaning up WebSocket connection');
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close();
    }
  };
}, []);
  const handleExcelCellChange = (row, col, value) => {
    setExcelCells(prev => ({
      ...prev,
      [`${row}-${col}`]: value
    }));
  };

  const handleExcelKeyDown = (e, row, col) => {
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

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setActiveTab(null);
    }
  };

  const renderDockContent = () => {
    return (
      <div className="space-y-6">
        {groupedNavigation.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-3">
            <div className="flex items-center gap-3 text-green-400">
              <group.icon className="w-5 h-5" />
              <h3 className="text-lg font-semibold">{group.title}</h3>
            </div>
            <div className="space-y-2 ml-8">
              {group.children.map((item, itemIndex) => (
                <div key={itemIndex} className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">{item.title}</h4>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                    </div>
                    {'category' in item && item.category && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    )}
                  </div>
                  {item.content && item.content.type === "text" && (
                    <div className="mt-3 text-gray-200 text-sm whitespace-pre-line">
                      {item.content.data}
                    </div>
                  )}
                  {item.content && item.content.type === "qr_scanner" && (
                    <div className="mt-3 text-center">
                      <div className="bg-white p-4 rounded-lg inline-block">
                        {qrCode ? (
                          qrCode.startsWith('data:image/') ? (
                            <img
                              src={qrCode}
                              alt="WhatsApp QR Code"
                              className="w-32 h-32"
                            />
                          ) : (
                            <div className="w-32 h-32 bg-gray-100 flex items-center justify-center text-xs font-mono p-2 overflow-hidden">
                              <div className="break-all text-center">
                                {qrCode.length > 200 ? `${qrCode.substring(0, 200)}...` : qrCode}
                              </div>
                            </div>
                          )
                        ) : (
                          <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-gray-600 text-xs">
                            {qrStatus === 'error' ? 'Error loading QR' : 'Loading QR...'}
                          </div>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mt-2">
                        {qrStatus === 'connected' ? 'WhatsApp Connected!' :
                         qrStatus === 'connecting' ? 'Connecting...' :
                         qrStatus === 'error' ? 'Connection Error' :
                         'Scan this QR code with WhatsApp on your phone'}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100" onClick={handleOutsideClick}>
      <ExpandableDock
        headerContent={
          <div className="flex items-center gap-3 text-black dark:text-white w-full">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">WhatsApp Connect</span>
            <div className="ml-auto flex items-center gap-2">
              {qrStatus === 'connected' && (
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to logout?')) {
                      if (ws && ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({ type: 'logout' }));
                      }
                      setQrStatus('disconnected');
                      setQrCode(null);
                    }
                  }}
                  className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                >
                  🚪 Logout
                </button>
              )}
              <div className="text-xs bg-white/20 dark:bg-black/20 text-black dark:text-white px-2 py-1 rounded">
                Help Center
              </div>
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
                <div className="w-52 h-52 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200 overflow-hidden">
                  {qrCode ? (
                    qrCode.startsWith('data:image/') ? (
                      <img
                        src={qrCode}
                        alt="WhatsApp QR Code"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-xs text-center p-1 break-all font-mono bg-white">
                        {qrCode.length > 100 ? `${qrCode.substring(0, 100)}...` : qrCode}
                      </div>
                    )
                  ) : (
                    <span className="text-sm text-gray-400 font-mono">
                      {qrStatus === 'error' ? 'ERROR' : 'LOADING'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {qrStatus === 'connected' ? 'Connected!' :
                   qrStatus === 'connecting' ? 'Connecting...' :
                   qrStatus === 'error' ? 'Connection Error' :
                   'Point your phone camera here'}
                </p>
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
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-sm mb-3 text-gray-800 dark:text-gray-200">Activity Log</h4>
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 max-h-48 overflow-y-auto font-mono text-xs">
                {activityLogs.map((log, index) => (
                  <div key={index} className="py-1 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <span className="text-gray-500 dark:text-gray-400 mr-2">{log.time}</span>
                    <span className={
                      log.type === 'success' ? 'text-green-600 dark:text-green-400' :
                      log.type === 'error' ? 'text-red-600 dark:text-red-400' :
                      'text-blue-600 dark:text-blue-400'
                    }>
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ExpandableDock>

      <div className="bg-white">
        <div className="bg-green-700 text-white px-4 py-2 font-semibold text-sm flex items-center justify-between">
          <span>Imported Contacts Spreadsheet</span>
          <div className="flex items-center gap-2">
            <span className="text-xs">Tab to move • Enter for next row</span>
            <Button variant="outline" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
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
              {Array.from({ length: 100 }, (_, row) => (
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

      <div className="bg-gradient-to-r from-orange-100 to-green-100">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Contact Management</h1>
          <p className="text-gray-600 mb-6">
            Your imported contacts are now in the Excel-like spreadsheet above. You can edit, add, or modify any contact information directly in the cells.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <Carousel className="w-full max-w-xs">
                <CarouselContent>
                  <CarouselItem>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <div className="text-center">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Spreadsheet Features</h2>
                            <ul className="space-y-2 text-sm text-gray-600">
                              <li className="text-left">• 100 rows × 26 columns (A-Z)</li>
                              <li className="text-left">• Fully editable cells</li>
                              <li className="text-left">• Keyboard navigation support</li>
                              <li className="text-left">• Excel-like visual design</li>
                              <li className="text-left">• Sticky headers for easy reference</li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-md space-y-8">
                <div>
                  <h1 className="text-xl font-bold">WA Bulk Messenger</h1>
                  <p className="text-sm text-muted-foreground mb-4">
                    A powerful WhatsApp bulk messaging platform for efficient communication campaigns.
                  </p>
                  <SeparatorPro variant="default" className="my-4" />
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <span
                      className="hover:underline cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab(activeTab === "create" ? null : "create");
                      }}
                    >
                      Create Message Template
                    </span>
                    <SeparatorPro variant="default" orientation="vertical" className="h-4" />
                    <span
                      className="hover:underline cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab(activeTab === "preview" ? null : "preview");
                      }}
                    >
                      Preview Message Template
                    </span>
                    <SeparatorPro variant="default" orientation="vertical" className="h-4" />
                    <span
                      className="hover:underline cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab(activeTab === "select" ? null : "select");
                      }}
                    >
                      Select Contacts
                    </span>
                  </div>
                </div>

                {activeTab && (
                  <div className="mt-8 animate-in slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
                    {activeTab === "create" && (
                      <Tabs defaultValue="template">
                        <TabsList>
                          <TabsTrigger value="template">Template</TabsTrigger>
                          <TabsTrigger value="columns">Columns</TabsTrigger>
                        </TabsList>

                        <TabsContent value="template">
                          <Card>
                            <CardHeader>
                              <CardTitle>Message Template</CardTitle>
                              <CardDescription>
                                Create a personalized message template for your WhatsApp campaign.
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                              <div className="grid gap-3">
                                <Label htmlFor="template-content">Template Content</Label>
                                <Textarea
                                  id="template-content"
                                  value={messageTemplate}
                                  onChange={(e) => setMessageTemplate(e.target.value)}
                                  placeholder="Enter your message template. Use {{name}}, {{phone}}, {{title}} for personalization..."
                                  rows={4}
                                />
                                <p className="text-xs text-gray-500">
                                  Available variables: {availableColumns.map(col => `{{${col.header.toLowerCase()}}}`).join(', ')}
                                </p>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button>Save Template</Button>
                            </CardFooter>
                          </Card>
                        </TabsContent>

                        <TabsContent value="columns">
                          <Card>
                            <CardHeader>
                              <CardTitle>Column Mapping</CardTitle>
                              <CardDescription>
                                Map your spreadsheet columns to template variables.
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                              <div className="grid gap-3">
                                <Label htmlFor="name-column">Name Column</Label>
                                <select 
                                  value={selectedNameColumn}
                                  onChange={(e) => setSelectedNameColumn(Number(e.target.value))}
                                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <option value="">Select column...</option>
                                  {availableColumns.map(col => (
                                    <option key={col.index} value={col.index}>
                                      {col.label} - {col.header}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="grid gap-3">
                                <Label htmlFor="phone-column">Phone Column</Label>
                                <select 
                                  value={selectedPhoneColumn}
                                  onChange={(e) => setSelectedPhoneColumn(Number(e.target.value))}
                                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <option value="">Select column...</option>
                                  {availableColumns.map(col => (
                                    <option key={col.index} value={col.index}>
                                      {col.label} - {col.header}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button>Update Mapping</Button>
                            </CardFooter>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    )}

                    {activeTab === "preview" && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Message Preview</CardTitle>
                          <CardDescription>
                            See how your message will appear to recipients.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                            <div className="text-sm text-gray-600 mb-2">
                              <strong>Sample Message:</strong>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                              {extractedContacts.length > 0 ? (
                                parseTemplate(messageTemplate, extractedContacts[0])
                              ) : (
                                <span className="text-gray-500">No contacts to preview. Add data to the spreadsheet.</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                              Preview shows data from the first contact row
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button>Send Test Message</Button>
                        </CardFooter>
                      </Card>
                    )}

                    {activeTab === "select" && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Contact Selection</CardTitle>
                          <CardDescription>
                            Choose which contacts to include in your messaging campaign.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                          <div className="grid gap-3">
                            <Label htmlFor="contact-range">Select Contact Range</Label>
                            <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                              <option>Select option...</option>
                              <option>All Contacts ({extractedContacts.length})</option>
                              <option>Valid Phone Numbers ({extractedContacts.length})</option>
                            </select>
                          </div>
                          <div className="text-sm text-gray-600">
                            {extractedContacts.length} contacts imported • Ready for WhatsApp bulk messaging
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button>Confirm Selection</Button>
                        </CardFooter>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {extractedContacts.length} contacts imported • Ready for WhatsApp bulk messaging
            </div>
            <Button 
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSendCampaign}
              disabled={qrStatus !== 'connected' || extractedContacts.length === 0}
            >
              {qrStatus !== 'connected' ? '⚠️ WhatsApp Not Connected' : 
               extractedContacts.length === 0 ? '⚠️ No Contacts' : 
               '📤 Send Campaign Message'}
            </Button>
          </div>
        </div>
      </div>

      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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

            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#templates" className="text-slate-300 hover:text-white transition-colors">Templates</a></li>
                <li><a href="#tools" className="text-slate-300 hover:text-white transition-colors">Tools</a></li>
              </ul>
            </div>

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
                      </div>
                    </PopoverContent>
                  </Popover>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 WA 2 Bulk Messenger. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}