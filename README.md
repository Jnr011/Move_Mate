# MoveMate - Move Made Easy

MoveMate is a modern platform connecting truck drivers with people who need to move items. This repository contains both the marketing website and a demonstration of the user mobile app and admin dashboard interfaces.

## Overview

- **Marketing Website**: Showcases the MoveMate platform features and benefits
- **Mobile App Demo**: Interactive demo of the customer-facing mobile application
- **Admin Dashboard**: Administrative interface for managing the MoveMate platform

## Technology Stack

- React 19
- TypeScript
- Vite
- TailwindCSS
- Framer Motion
- Lucide React Icons
- Expo (for mobile app demo)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
move-mate/
├── app/                          # Expo Router mobile app
│   ├── (tabs)/                   # Tab navigation
│   ├── _layout.tsx              # Root layout
│   ├── +html.tsx                # HTML template
│   ├── +not-found.tsx           # 404 page
│   └── modal.tsx                # Modal component
├── src/                          # Main source code
│   ├── admin/                    # Admin dashboard
│   │   ├── components/           # Admin components
│   │   │   ├── Analytics/        # Analytics components
│   │   │   ├── Customers/        # Customer management
│   │   │   ├── Dashboard/        # Dashboard components
│   │   │   ├── Drivers/          # Driver management
│   │   │   ├── Orders/           # Order management
│   │   │   ├── Reports/          # Reporting tools
│   │   │   ├── Settings/         # Settings management
│   │   │   └── UI/              # Reusable UI components
│   │   ├── context/              # React context providers
│   │   ├── data/                 # Mock data
│   │   ├── hooks/                # Custom hooks
│   │   ├── layouts/              # Layout components
│   │   ├── utils/                # Utility functions
│   │   └── AdminApp.tsx         # Main admin app
│   ├── components/               # Marketing website components
│   │   ├── UI/                  # Reusable UI components
│   │   ├── HeroSection.tsx      # Hero section
│   │   ├── FeaturesSection.tsx  # Features showcase
│   │   ├── HowItWorksSection.tsx # How it works
│   │   ├── AboutSection.tsx     # About section
│   │   ├── DownloadSection.tsx  # App download section
│   │   ├── AppShowcaseSection.tsx # App showcase
│   │   ├── StaggeredFeatures.tsx # Animated features
│   │   ├── AnimatedSection.tsx  # Animated sections
│   │   ├── Footer.tsx           # Footer component
│   │   ├── NavBar.tsx           # Navigation bar
│   │   └── MoveMateApp.tsx      # Mobile app demo
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # App entry point
├── components/                   # Expo components
├── constants/                    # App constants
├── assets/                       # Static assets
│   ├── fonts/                   # Custom fonts
│   └── images/                  # App images
├── public/                       # Public assets
│   └── images/                  # Website images
└── [config files]               # Configuration files
```

## MoveMate Admin App Features

The admin application for MoveMate requires a comprehensive set of features to manage the entire platform efficiently. The following details outline all required features for the MoveMate Admin application:

### ✅ Completed Features

#### 1. Authentication and User Management
- **Secure Login/Logout**: Role-based access control for administrators
- **Admin Profiles**: Manage administrator accounts and access privileges
- **Password Management**: Reset, recovery, and security protocols

#### 2. Dashboard and Analytics
- **Overview Dashboard**: Real-time metrics showing platform performance
- **Key Performance Indicators**:
  - Total orders processed
  - Active deliveries in progress
  - Total revenue
  - Growth trends (+/- percentage changes)
- **Analytics Visualization**: Charts and graphs for business intelligence
- **Reporting Tools**: Generate and export detailed business reports
- **Filter and Search**: Customizable views based on date ranges, regions, etc.

#### 3. Order Management
- **Order Tracking**: Complete history and status of all orders
- **Order Details View**: Comprehensive information on each booking
- **Order Modification**: Edit order details, status, and assignments
- **Pricing Adjustments**: Apply discounts or fees to specific orders
- **Order Communications**: Send notifications regarding order status

#### 4. Driver Management
- **Driver Directory**: Complete database of all platform drivers
- **Performance Metrics**: Rating system and delivery statistics
- **Document Verification**: License, insurance, and vehicle documentation management
- **Suspension/Deactivation**: Tools to manage driver access to the platform

#### 5. Customer Management
- **Customer Directory**: Database of all registered users
- **Customer Support Tools**: History of orders and support interactions
- **Account Management**: Ability to modify account details when necessary
- **Communication Tools**: Send direct messages or announcements to users

#### 6. Settings and Configuration
- **Platform Settings**: Global configuration options
- **Pricing Controls**: Set base rates, surge multipliers, etc.
- **Service Customization**: Add or modify service offerings

#### 7. Notification System
- **Push Notifications**: Send targeted messages to users or drivers
- **Email Templates**: Standard communications for various scenarios
- **Automated Alerts**: System-generated notifications for critical events

### 🔄 In Progress Features

#### 8. Financial Management
- **Revenue Tracking**: Comprehensive view of all financial transactions
- **Payment Processing**: Monitor and manage payment methods and transactions
- **Driver Payouts**: Schedule and track payments to drivers
- **Financial Reporting**: Generate statements and tax reports

#### 9. Route and Territory Management
- **Service Areas**: Define geographical boundaries for service
- **Pricing Zones**: Set and adjust pricing based on locations
- **Popular Routes**: Track and analyze frequently used routes

### 📋 Planned Features

#### 10. Truck and Fleet Management
- **Vehicle Database**: Information on all trucks/vehicles in the network
- **Vehicle Types and Categories**: Manage different vehicle specifications
- **Maintenance Tracking**: Record of vehicle maintenance and availability

#### 11. Security and Compliance
- **Audit Logging**: Track all administrative actions
- **Data Privacy Controls**: Tools for GDPR and other compliance requirements
- **Security Monitoring**: Alert system for suspicious activities

#### 12. Feedback and Quality Control
- **Ratings and Reviews**: Moderation tools for customer feedback
- **Dispute Resolution**: System for managing disagreements between parties
- **Quality Metrics**: Track and improve service quality indicators

## Mobile App Features (Current Implementation)

The current codebase demonstrates the following mobile app features:

- User authentication
- Location-based search for moving services
- Booking functionality for trucks
- Order tracking
- View of recent moves/deliveries
- Nearby drivers discovery
- Popular routes information
- Bottom navigation for essential functions

## Admin Dashboard Components

### Custom Hooks
- `useAuth.ts` - Authentication management
- `useOrders.ts` - Order management with filtering and status updates
- `useDrivers.ts` - Driver management with performance metrics
- `useCustomers.ts` - Customer management with analytics
- `useAnalytics.ts` - Comprehensive analytics and reporting
- `useNotifications.ts` - Notification system management

### Utility Functions
- `constants.ts` - Application constants and configurations
- `helpers.ts` - Formatting, validation, and utility functions

### UI Components
- Reusable components for forms, tables, charts, and notifications
- Responsive design with TailwindCSS
- Modern UI with consistent styling

## Future Development

- Integration with real payment gateways
- Push notification implementation
- Driver mobile application
- Enhanced analytics and reporting
- API development for third-party integrations
- Real-time tracking and communication
- Advanced route optimization
- Machine learning for demand prediction

## License

[License details would go here]

---

## React + TypeScript + Vite Details

This project was bootstrapped with Vite and TypeScript. 

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
