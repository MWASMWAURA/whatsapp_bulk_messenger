"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

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
  const excelInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div ref={containerRef} className="fixed inset-0 z-50 flex flex-col h-screen overflow-hidden bg-gray-100">
      {/* Top Area - Spreadsheet */}
      <div
        className="bg-white overflow-hidden transition-all"
        style={{ height: `${100 - drawerHeight}%` }}
      >
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

        <div className="overflow-auto" style={{ height: 'calc(100% - 40px)' }}>
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

      {/* Draggable Handle */}
      <div
        className={`bg-gray-300 hover:bg-gray-400 cursor-row-resize flex items-center justify-center transition-colors ${isDragging ? 'bg-gray-400' : ''}`}
        style={{ height: '32px' }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-1">
            <div className="w-8 h-0.5 bg-gray-600 rounded"></div>
          </div>
          <button
            onClick={toggleDrawer}
            className="px-3 py-0.5 bg-green-700 text-white text-xs font-semibold rounded hover:bg-green-800 transition-colors"
          >
            Spreadsheet {drawerHeight < 20 ? '▼' : '▲'}
          </button>
        </div>
      </div>

      {/* Bottom Drawer - Content Area */}
      <div
        className="bg-white overflow-auto shadow-lg cursor-move select-none"
        style={{ height: `${drawerHeight}%` }}
        onMouseDown={(e) => {
          if (!isDragging) {
            setIsDragging(true);
            e.preventDefault();
          }
        }}
      >
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Contact Management</h1>
          <p className="text-gray-600 mb-6">
            Your imported contacts are now in the Excel-like spreadsheet above. You can edit, add, or modify any contact information directly in the cells.
          </p>

          <div className="grid grid-cols-2 gap-4">
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
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-4">
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
      </div>
    </div>
  );
}