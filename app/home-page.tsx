"use client";

import { useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { ExcelSpreadsheet } from "@/components/excel-spreadsheet";
import Papa from "papaparse"; // ← ADD THIS
import * as XLSX from "xlsx"; // ← ADD THIS
import { toast } from "@/components/ui/toast";

const [isDataUploaded, setIsDataUploaded] = useState(false);
interface TableData {
  [key: string]: string | number;
}

interface ColumnDef {
  accessorKey?: string | number;
  header?: string | any;
  cell?: any;
}

export default function FolderDemo() {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [tableColumns, setTableColumns] = useState<ColumnDef[]>([]);
  const [showExcelView, setShowExcelView] = useState(false);

  const parseFile = async (file: File) => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const data = results.data as TableData[];
          setTableData(data);

          if (data.length > 0) {
            const columns: ColumnDef[] = Object.keys(data[0]).map(key => ({
              accessorKey: key,
              header: key,
              cell: ({ getValue }: any) => getValue(),
            }));
            setTableColumns(columns);
            setIsDataUploaded(true);
            toast.success("Data imported successfully!");
          }
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          toast.error("Failed to parse CSV file");
        },
      });
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          if (jsonData.length > 0) {
            const headers = jsonData[0] as string[];
            const rows = jsonData.slice(1) as (string | number)[][];

            const parsedData: TableData[] = rows.map(row =>
              headers.reduce((acc, header, index) => {
                acc[header] = row[index] || '';
                return acc;
              }, {} as TableData)
            );

            setTableData(parsedData);

            const columns: ColumnDef[] = headers.map(header => ({
              accessorKey: header,
              header: header,
              cell: ({ getValue }: any) => getValue(),
            }));
            setTableColumns(columns);
            setIsDataUploaded(true);
            toast.success("Data imported successfully!");
          }
        } catch (error) {
          console.error('Error parsing Excel file:', error);
          toast.error("Failed to parse Excel file");
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      parseFile(files[0]);
    }
  };

  const removeDuplicates = () => {
    const seen = new Set<string>();
    const uniqueData = tableData.filter(row => {
      const key = JSON.stringify(row);
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
    setTableData(uniqueData);
    toast.success(`Removed ${tableData.length - uniqueData.length} duplicate rows`);
  };

  const removeEmptyRows = () => {
    const filteredData = tableData.filter(row =>
      Object.values(row).some(value => value !== null && value !== undefined && value !== '')
    );
    setTableData(filteredData);
    toast.success(`Removed ${tableData.length - filteredData.length} empty rows`);
  };

  const trimWhitespace = () => {
    const trimmedData = tableData.map(row =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [
          key,
          typeof value === 'string' ? value.trim() : value
        ])
      )
    );
    setTableData(trimmedData);
    toast.success("Trimmed whitespace from all cells");
  };

  const convertToLowercase = () => {
    const lowercasedData = tableData.map(row =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [
          key,
          typeof value === 'string' ? value.toLowerCase() : value
        ])
      )
    );
    setTableData(lowercasedData);
    toast.success("Converted all text to lowercase");
  };

  const convertToUppercase = () => {
    const uppercasedData = tableData.map(row =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [
          key,
          typeof value === 'string' ? value.toUpperCase() : value
        ])
      )
    );
    setTableData(uppercasedData);
    toast.success("Converted all text to uppercase");
  };

  const sortByColumn = (columnKey: string, ascending: boolean = true) => {
    const sortedData = [...tableData].sort((a, b) => {
      const aVal = a[columnKey];
      const bVal = b[columnKey];

      if (aVal === bVal) return 0;

      const comparison = aVal < bVal ? -1 : 1;
      return ascending ? comparison : -comparison;
    });
    setTableData(sortedData);
    toast.success(`Sorted by ${columnKey} (${ascending ? 'ascending' : 'descending'})`);
  };

  const formatPhoneNumbers = () => {
    const phoneColumnIndex = tableColumns.findIndex(col =>
      (col as any).accessorKey?.toLowerCase().includes('phone') ||
      (col as any).header?.toLowerCase().includes('phone')
    );

    if (phoneColumnIndex === -1) {
      toast.warning("No phone number column found. Column should contain 'phone' in the name.");
      return;
    }

    const phoneColumnKey = (tableColumns[phoneColumnIndex] as any).accessorKey;
    const formattedData = tableData.map(row => {
      const phoneValue = String(row[phoneColumnKey] || '');
      const formattedPhone = formatKenyanPhoneNumber(phoneValue);
      return { ...row, [phoneColumnKey]: formattedPhone };
    });

    setTableData(formattedData);
    toast.success("Phone numbers formatted for Kenya");
  };

  const formatKenyanPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters except +
    let cleaned = phone.replace(/[^\d+]/g, '');

    // Remove leading +
    cleaned = cleaned.replace(/^\+/, '');

    // If it starts with 254, it's already formatted
    if (cleaned.startsWith('254')) {
      return cleaned;
    }

    // If it starts with 0, replace with 254
    if (cleaned.startsWith('0')) {
      return '254' + cleaned.substring(1);
    }

    // If it's 9 digits starting with 7, 1, or other valid prefixes, add 254
    if (cleaned.length === 9 && /^[71]/.test(cleaned)) {
      return '254' + cleaned;
    }

    // Return as-is if it doesn't match expected patterns
    return cleaned;
  };

  const exportData = (format: 'csv' | 'xlsx') => {
    if (format === 'csv') {
      const csv = Papa.unparse(tableData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'exported_data.csv';
      link.click();
    } else {
      const ws = XLSX.utils.json_to_sheet(tableData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');
      XLSX.writeFile(wb, 'exported_data.xlsx');
    }
    toast.success(`Data exported as ${format.toUpperCase()}`);
  };

  const handleDataImported = (data: TableData[], columns: ColumnDef[]) => {
  // Store in session storage so spreadsheet page can access it
  sessionStorage.setItem('importedTableData', JSON.stringify(data));
  sessionStorage.setItem('importedTableColumns', JSON.stringify(columns));
  
  // Navigate to spreadsheet page
  window.location.href = '/spreadsheet';
};
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header with logo */}
      <header className="w-full px-6 py-4 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-semibold">WA</div>
            <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">WA 2 Bulk Messenger</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex">
            {/* File Upload Component */}
            <FileUpload onDataImported={handleDataImported} />

            {/* Main area placeholder */}
            <section className="flex-1 pl-8">
              <div className="rounded-lg border border-dashed border-slate-200 dark:border-slate-800 p-6 text-slate-600 dark:text-slate-300">
                Upload a CSV or Excel file to view data
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Excel Spreadsheet View */}
      {showExcelView && (
        <ExcelSpreadsheet
          tableData={tableData}
          tableColumns={tableColumns}
          onClose={() => setShowExcelView(false)}
        />
      )}
    </div>
  );
}
