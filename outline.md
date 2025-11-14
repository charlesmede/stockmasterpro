# Project Outline - Gestion Stock & Ventes Application

## File Structure
```
/mnt/okcomputer/output/
├── index.html              # Landing page with company registration
├── dashboard.html          # Main dashboard with analytics
├── products.html           # Product management interface  
├── stock.html              # Stock management (entries/exits)
├── invoicing.html          # Sales and invoicing system
├── reports.html            # Reports and PDF exports
├── main.js                 # Core JavaScript functionality
├── resources/              # Assets folder
│   ├── logo-placeholder.png
│   ├── hero-bg.jpg
│   └── company-logos/      # Uploaded company logos
├── interaction.md          # Interaction design document
├── design.md              # Design system document
└── outline.md             # This project outline
```

## Page Breakdown

### 1. index.html - Landing & Registration
- **Purpose**: Company registration and application entry point
- **Content**: 
  - Minimal hero section with app branding
  - Multi-step registration form
  - Company logo upload functionality
  - Currency and TVA configuration
- **Key Features**: 
  - Form validation with real-time feedback
  - Logo preview and cropping
  - Progressive form steps with smooth transitions

### 2. dashboard.html - Analytics Hub
- **Purpose**: Central dashboard with business overview
- **Content**:
  - Revenue charts and metrics
  - Stock level indicators
  - Recent sales overview
  - Quick action buttons
- **Key Features**:
  - Interactive ECharts visualizations
  - Real-time data updates
  - Date range selectors
  - Mobile-optimized card layout

### 3. products.html - Product Management
- **Purpose**: Complete product catalog management
- **Content**:
  - Product grid with images and details
  - Add/edit product forms
  - Category management system
  - Search and filter functionality
- **Key Features**:
  - Dynamic category creation
  - Price calculator (purchase vs selling)
  - Bulk operations
  - Product code generation

### 4. stock.html - Stock Operations
- **Purpose**: Stock entries, exits, and inventory management
- **Content**:
  - Stock movement forms
  - Inventory level displays
  - Movement history table
  - Low stock alerts
- **Key Features**:
  - Real-time stock calculations
  - Movement tracking with reasons
  - Supplier information capture
  - Stock valuation reports

### 5. invoicing.html - Sales & Billing
- **Purpose**: Sales processing and document generation
- **Content**:
  - Quick sale interface
  - Customer management
  - Invoice/receipt generation
  - Payment tracking
- **Key Features**:
  - TVA calculation (29.5% default)
  - PDF generation for documents
  - Payment status management
  - Customer database

### 6. reports.html - Analytics & Exports
- **Purpose**: Detailed reporting and data exports
- **Content**:
  - Sales reports with charts
  - Stock reports and analysis
  - Export functionality
  - Custom report builder
- **Key Features**:
  - Multiple export formats (PDF, CSV)
  - Date range filtering
  - Comparative analysis
  - Print-optimized layouts

## Technical Implementation

### Data Storage
- **LocalStorage**: Company info, preferences, user data
- **IndexedDB**: Large datasets (products, sales, stock movements)
- **File API**: Company logo and document storage
- **Session Management**: User authentication state

### Core Libraries Integration
- **Anime.js**: Form animations, transitions, micro-interactions
- **ECharts.js**: All charts and data visualizations
- **Splide.js**: Product carousels, image galleries
- **p5.js**: Background effects, dynamic elements
- **Matter.js**: Physics-based UI animations

### Mobile Optimization
- **Responsive Design**: Mobile-first approach with breakpoints
- **Touch Interactions**: Large buttons, swipe gestures
- **Performance**: Lazy loading, optimized images
- **Offline Support**: Service worker for basic functionality

### PDF Generation
- **jsPDF**: Client-side PDF creation
- **html2canvas**: HTML to image conversion
- **Custom Templates**: Professional invoice/receipt layouts
- **Company Branding**: Logo integration in documents