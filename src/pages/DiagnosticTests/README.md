# Diagnostic Tests Page

This page provides a comprehensive interface for users to view and book diagnostic tests and health packages at Holy Heart Hospital.

## Features

### Individual Tests
- Display test image, name, description, price, and completion time
- Category-based filtering
- Search functionality
- Book Now button with pre-filled appointment form

### Full Body Checkup Packages
- Specialized section for health packages
- Package details including number of tests and savings
- Popular package highlighting
- Comprehensive health assessments

### Filter & Search
- Search by test name or description
- Filter by category (blood tests, imaging, cardiology, etc.)
- Price range filtering
- Completion time filtering
- Active filters display

### Design Features
- Modern, clean, and mobile-responsive design
- Grid-based layout
- Hover effects and smooth animations
- Card-based UI with shadow effects
- Gradient backgrounds and modern styling

## Components

- `DiagnosticTests/index.jsx` - Main page component
- `TestCard.jsx` - Individual test display card
- `PackageCard.jsx` - Health package display card
- `FilterAndSearch.jsx` - Search and filter functionality
- `testData.js` - Mock data for tests and packages

## Routing

The page is accessible at `/diagnostic-tests` and is linked in the main navigation.

## Data Integration

Currently uses mock data. To integrate with backend API:

1. Replace mock data imports with API calls
2. Update the `useEffect` hooks to fetch data from API
3. Modify the `handleBookNow` function to integrate with your appointment booking system

## Styling

Uses Tailwind CSS with custom CSS enhancements for:
- Line clamping for text overflow
- Smooth animations and transitions
- Custom hover effects
- Responsive design
