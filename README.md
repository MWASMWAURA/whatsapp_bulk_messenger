# WA 2 Bulk Messenger

A comprehensive WhatsApp bulk messaging platform with advanced data management and cleaning capabilities. Built with Next.js, TypeScript, and modern UI components.

## 🚀 Features

### 📊 Data Management
- **CSV/Excel Import**: Upload and parse CSV and Excel files with automatic data validation
- **Real-time Data Cleaning**: Remove duplicates, empty rows, and format data instantly
- **Interactive Spreadsheet**: Excel-like interface with editable cells and columns
- **Column Management**: Rename, delete, and reorganize columns with ease
- **Row Operations**: Select and delete multiple rows efficiently

### 🎨 Modern UI/UX
- **WhatsApp-inspired Design**: Green gradient theme matching WhatsApp's aesthetic
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Animated Components**: Smooth transitions and interactive elements
- **Glass Morphism**: Modern glass-like UI elements with backdrop blur
- **Dark/Light Mode**: Automatic theme detection and switching

### 🔧 Data Transformation Tools
- **Text Case Conversion**: Convert text to uppercase or lowercase
- **Whitespace Management**: Trim whitespace from all cells
- **Duplicate Removal**: Automatically identify and remove duplicate entries
- **Export Functionality**: Export cleaned data as CSV or Excel files
- **Phone Number Formatting**: Specialized formatting for Kenyan phone numbers

### 📱 Interactive Components
- **3D Profile Card**: Interactive founder profile with drag-to-reveal animation
- **Animated Testimonials**: Customer testimonials with smooth transitions
- **Feature Cards**: Hover-animated feature showcase
- **Navigation Flow**: Multi-level navigation with smooth animations
- **Toast Notifications**: Real-time feedback for all operations

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Custom component library with Radix UI primitives
- **Animations**: Framer Motion for smooth transitions
- **Data Processing**: PapaParse for CSV, XLSX for Excel files
- **Icons**: Lucide React icons
- **Fonts**: Geist Sans and Geist Mono

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/wa-2-bulk-messenger.git
   cd wa-2-bulk-messenger
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Usage

### Getting Started
1. **Upload Data**: Click the folder icon to upload CSV or Excel files
2. **View Data**: Data automatically loads into the interactive spreadsheet
3. **Clean Data**: Use the toolbar buttons to clean and transform your data
4. **Edit Cells**: Click any cell to edit its content
5. **Manage Columns**: Double-click column headers to rename, use checkboxes to select for deletion
6. **Export Results**: Export your cleaned data as CSV or Excel files

### Data Cleaning Features
- **Remove Duplicates**: Eliminates duplicate rows
- **Remove Empty Rows**: Filters out rows with no data
- **Trim Whitespace**: Removes leading/trailing spaces
- **Case Conversion**: Convert text to upper or lowercase
- **Column Operations**: Rename or delete selected columns
- **Row Operations**: Select and delete multiple rows

## 📁 Project Structure

```
whatsapp-cleaner/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Main application page
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── table.tsx        # Advanced data table component
│   │   ├── folder.tsx       # Interactive folder upload component
│   │   ├── profilecard.tsx  # 3D animated profile card
│   │   ├── toast.tsx        # Toast notification system
│   │   └── ...
│   ├── excel-spreadsheet.tsx # Excel-like spreadsheet interface
│   └── file-upload.tsx      # File upload logic
├── lib/
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
└── README.md               # This file
```

## 🎯 Key Components

### ExcelSpreadsheet Component
- Full-featured spreadsheet interface
- Cell editing with keyboard navigation
- Column and row selection
- Data transformation tools
- Export functionality

### DataTable Component
- Advanced table with sorting and filtering
- Pagination and search
- Row and column selection
- Customizable columns
- Responsive design

### ProfileCard Component
- Interactive 3D card with drag-to-reveal
- Spotlight effects and animations
- Social media integration
- Skills showcase

## 🔒 Security & Privacy

- **Data Privacy**: All data processing happens client-side
- **No Data Storage**: Files are not uploaded to servers
- **GDPR Compliant**: Respects user data privacy
- **Secure Processing**: Local file processing only

## 📈 Performance

- **Optimized Builds**: Next.js production builds
- **Lazy Loading**: Components load on demand
- **Efficient Rendering**: React optimization techniques
- **Fast Data Processing**: Client-side data manipulation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**James Muriuki**
- **Email**: jamesmwauramwas@gmail.com
- **GitHub**: [@MWASMWAURA](https://github.com/MWASMWAURA)
- **LinkedIn**: [James Muriuki](https://linkedin.com/in/james-muriuki)

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for hosting and deployment
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Radix UI** for accessible component primitives

---

**WA 2 Bulk Messenger** - Transform your contact lists into powerful WhatsApp campaigns! 🚀📱