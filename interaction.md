# Interaction Design - Gestion Stock & Ventes

## Core Interactions

### 1. Company Registration & Setup
- Multi-step form: Company info → Logo upload → Contact details → Currency selection
- Logo upload with preview and cropping
- Contact information with phone, email, address
- Currency selection (FCFA/USD) with default TVA rate (29.5%)

### 2. Product Management
- Quick product creation form: Code → Name → Category → Purchase price → Selling price
- Category selection with "Other" option for custom categories
- Product list with search, filter by category, and stock level indicators
- Bulk import/export functionality

### 3. Stock Management
- Stock entry form: Select product → Quantity → Purchase price → Supplier info
- Stock exit form: Select product → Quantity → Reason (sale/loss/return)
- Real-time stock level updates with low stock alerts
- Stock movement history with date filters

### 4. Sales & Invoicing
- Quick sale interface: Add products → Calculate totals → Apply TVA → Generate receipt/invoice
- Customer information capture for invoices
- Receipt/invoice generation with company branding
- Payment tracking (paid/pending)

### 5. Dashboard Analytics
- Revenue charts with date range selection
- Stock level visual indicators
- Sales performance metrics
- Top selling products list
- Monthly/weekly/daily view toggles

### 6. PDF Generation
- Invoice PDF with company header, items table, totals, TVA breakdown
- Receipt PDF for quick sales
- Stock reports PDF with current levels and movements
- Sales reports PDF with revenue summaries

## User Flow Examples

### New Company Setup Flow:
1. Landing page → Register company
2. Fill company details → Upload logo → Set preferences
3. Dashboard → Add first products → Set categories
4. Start managing stock → Record first sale

### Daily Operations Flow:
1. Login → Dashboard overview
2. Check stock alerts → Add stock if needed
3. Process sales → Generate receipts
4. Review daily sales → Export reports

### Stock Management Flow:
1. Products page → Select product
2. Add stock entry → Enter quantity and cost
3. View updated stock levels → Check movement history
4. Set low stock alerts if needed

## Mobile Interactions
- Touch-friendly forms with large input fields
- Swipe gestures for navigation between sections
- Pull-to-refresh for data updates
- Quick action buttons for common tasks
- Offline capability with sync when online