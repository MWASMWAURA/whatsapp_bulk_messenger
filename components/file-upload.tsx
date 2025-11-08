"use client";

import { useState } from "react";
import { Folder, FolderContent } from "@/components/ui/folder";
import { DataTable, ColumnDef } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { toast } from "@/components/ui/toast";
import Papa from "papaparse";
import * as XLSX from "xlsx";

interface TableData {
  [key: string]: string | number;
}

interface FileUploadProps {
  onDataImported: (data: TableData[], columns: ColumnDef<TableData>[]) => void;
}

export function FileUpload({ onDataImported }: FileUploadProps) {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [tableColumns, setTableColumns] = useState<ColumnDef<TableData>[]>([]);
  const [isDataUploaded, setIsDataUploaded] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(new Set());
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; columnKey: string } | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');

  const parseFile = async (file: File) => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const data = results.data as TableData[];
          setTableData(data);

          if (data.length > 0) {
            const columns: ColumnDef<TableData>[] = Object.keys(data[0]).map(key => ({
              accessorKey: key,
              header: key,
              cell: ({ getValue }) => getValue(),
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

            const columns: ColumnDef<TableData>[] = headers.map(header => ({
              accessorKey: header,
              header: header,
              cell: ({ getValue }) => getValue(),
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

  const updateCellValue = (rowIndex: number, columnKey: string, value: string) => {
    const newData = [...tableData];
    newData[rowIndex] = { ...newData[rowIndex], [columnKey]: value };
    setTableData(newData);
  };

  const startEditing = (rowIndex: number, columnKey: string) => {
    setEditingCell({ rowIndex, columnKey });
    setEditingValue(String(tableData[rowIndex][columnKey] || ''));
  };

  const saveEditing = () => {
    if (editingCell) {
      updateCellValue(editingCell.rowIndex, editingCell.columnKey, editingValue);
      setEditingCell(null);
      setEditingValue('');
    }
  };

  const cancelEditing = () => {
    setEditingCell(null);
    setEditingValue('');
  };

  const toggleRowSelection = (rowIndex: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(rowIndex)) {
      newSelectedRows.delete(rowIndex);
    } else {
      newSelectedRows.add(rowIndex);
    }
    setSelectedRows(newSelectedRows);
  };

  const toggleColumnSelection = (columnKey: string) => {
    const newSelectedColumns = new Set(selectedColumns);
    if (newSelectedColumns.has(columnKey)) {
      newSelectedColumns.delete(columnKey);
    } else {
      newSelectedColumns.add(columnKey);
    }
    setSelectedColumns(newSelectedColumns);
  };

  const deleteSelectedRows = () => {
    if (selectedRows.size === 0) {
      toast.warning("No rows selected");
      return;
    }
    const newData = tableData.filter((_, index) => !selectedRows.has(index));
    setTableData(newData);
    setSelectedRows(new Set());
    toast.success(`Deleted ${selectedRows.size} selected rows`);
  };

  const deleteSelectedColumns = () => {
    if (selectedColumns.size === 0) {
      toast.warning("No columns selected");
      return;
    }
    const newData = tableData.map(row => {
      const newRow = { ...row };
      selectedColumns.forEach(col => delete newRow[col]);
      return newRow;
    });
    const newColumns = tableColumns.filter(col => !selectedColumns.has((col as any).accessorKey));
    setTableData(newData);
    setTableColumns(newColumns);
    setSelectedColumns(new Set());
    toast.success(`Deleted ${selectedColumns.size} selected columns`);
  };

  const renameColumn = (oldKey: string, newKey: string) => {
    if (!newKey.trim()) {
      toast.error("Column name cannot be empty");
      return;
    }
    if (newKey === oldKey) return;

    const newData = tableData.map(row => {
      const newRow = { ...row };
      newRow[newKey] = newRow[oldKey];
      delete newRow[oldKey];
      return newRow;
    });

    const newColumns = tableColumns.map(col =>
      (col as any).accessorKey === oldKey
        ? { ...col, accessorKey: newKey, header: newKey }
        : col
    );

    setTableData(newData);
    setTableColumns(newColumns);
    toast.success(`Renamed column "${oldKey}" to "${newKey}"`);
  };

  const EditableCell: React.FC<{ value: any; rowIndex: number; columnKey: string }> = ({ value, rowIndex, columnKey }) => {
    const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.columnKey === columnKey;

    if (isEditing) {
      return (
        <input
          type="text"
          value={editingValue}
          onChange={(e) => setEditingValue(e.target.value)}
          onBlur={saveEditing}
          onKeyDown={(e) => {
            if (e.key === 'Enter') saveEditing();
            if (e.key === 'Escape') cancelEditing();
          }}
          className="w-full px-2 py-1 border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          autoFocus
        />
      );
    }

    return (
      <div
        onClick={() => startEditing(rowIndex, columnKey)}
        className="cursor-pointer hover:bg-muted/50 px-2 py-1 rounded min-h-[24px] flex items-center"
      >
        {value || ''}
      </div>
    );
  };

  const EditableHeader: React.FC<{ column: ColumnDef<TableData> }> = ({ column }) => {
    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState(column.header as string);

    const handleRename = () => {
      renameColumn((column as any).accessorKey, newName);
      setIsRenaming(false);
    };

    const handleCancel = () => {
      setNewName(column.header as string);
      setIsRenaming(false);
    };

    if (isRenaming) {
      return (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRename();
            if (e.key === 'Escape') handleCancel();
          }}
          className="w-full px-2 py-1 border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          autoFocus
        />
      );
    }

    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={selectedColumns.has((column as any).accessorKey)}
          onChange={() => toggleColumnSelection((column as any).accessorKey)}
          className="w-4 h-4"
        />
        <span
          onDoubleClick={() => setIsRenaming(true)}
          className="cursor-pointer hover:text-primary"
        >
          {column.header as string}
        </span>
      </div>
    );
  };

  if (!isDataUploaded) {
    return (
      <aside className="w-64">
        <div className="mb-6">
          <Folder size="xxs" onFiles={handleFiles}>
            <FolderContent>
              <div className="text-center">
                <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-xl md:text-2xl relative z-20 font-bold tracking-tight">
                  Contacts
                </h2>
              </div>
            </FolderContent>
          </Folder>
        </div>
      </aside>
    );
  }

  return (
    <div className="fixed inset-0 z-10 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-7xl h-[90vh] bg-card rounded-lg shadow-2xl border overflow-hidden flex">
          {/* Side Panel - Applied Steps */}
          <div className="w-64 border-r bg-muted/10 flex flex-col">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Applied Steps</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Data transformations applied to your dataset
              </p>
            </div>
            <div className="flex-1 p-4 space-y-2 overflow-y-auto">
              <Button
                onClick={removeDuplicates}
                variant="ghost"
                size="sm"
                className="w-full justify-start h-7 text-xs"
              >
                Remove Duplicates
              </Button>
              <Button
                onClick={removeEmptyRows}
                variant="ghost"
                size="sm"
                className="w-full justify-start h-7 text-xs"
              >
                Remove Empty Rows
              </Button>
              <Button
                onClick={trimWhitespace}
                variant="ghost"
                size="sm"
                className="w-full justify-start h-7 text-xs"
              >
                Trim Whitespace
              </Button>
              <Button
                onClick={convertToLowercase}
                variant="ghost"
                size="sm"
                className="w-full justify-start h-7 text-xs"
              >
                Convert to Lowercase
              </Button>
              <Button
                onClick={convertToUppercase}
                variant="ghost"
                size="sm"
                className="w-full justify-start h-7 text-xs"
              >
                Convert to Uppercase
              </Button>
              <Button
                onClick={formatPhoneNumbers}
                variant="ghost"
                size="sm"
                className="w-full justify-start h-7 text-xs"
              >
                Format Phone Numbers
              </Button>

              <Button
                onClick={deleteSelectedRows}
                variant="destructive"
                size="sm"
                disabled={selectedRows.size === 0}
                className="w-full justify-start h-7 text-xs"
              >
                Delete Selected Rows ({selectedRows.size})
              </Button>

              <Button
                onClick={deleteSelectedColumns}
                variant="destructive"
                size="sm"
                disabled={selectedColumns.size === 0}
                className="w-full justify-start h-7 text-xs"
              >
                Delete Selected Columns ({selectedColumns.size})
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start h-7 text-xs"
                  >
                    Export Data
                    <ChevronDown className="ml-auto h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuCheckboxItem
                    onClick={() => exportData('csv')}
                    className="cursor-pointer text-xs"
                  >
                    Export as CSV
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    onClick={() => exportData('xlsx')}
                    className="cursor-pointer text-xs"
                  >
                    Export as Excel
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="p-4 border-t">
              <div className="text-xs text-muted-foreground mb-3">
                Double-click headers to rename columns. Click cells to edit values.
              </div>
              <Button
                onClick={() => {
                  setTableData([]);
                  setTableColumns([]);
                  setIsDataUploaded(false);
                  setSelectedRows(new Set());
                  setSelectedColumns(new Set());
                }}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Close Editor
              </Button>
            </div>
          </div>

          {/* Main Table Area */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Data Editor</h3>
                <p className="text-sm text-muted-foreground">
                  {tableData.length} rows × {tableColumns.length} columns
                </p>
              </div>
              <Button
                onClick={() => onDataImported(tableData, tableColumns)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Import Contacts
              </Button>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <div className="max-w-full">
                <DataTable
                  columns={tableColumns.map(col => ({
                    ...col,
                    header: () => <EditableHeader column={col} />,
                    cell: ({ getValue, row }: any) => {
                      const rowIndex = row.index;
                      const columnKey = (col as any).accessorKey;
                      const value = getValue();
                      return <EditableCell value={value} rowIndex={rowIndex} columnKey={columnKey} />;
                    },
                  }))}
                  data={tableData}
                  searchable={true}
                  pagination={true}
                  pageSize={10}
                  showToolbar={false}
                  tableClassName="min-w-0"
                  cellClassName="max-w-32 truncate"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}