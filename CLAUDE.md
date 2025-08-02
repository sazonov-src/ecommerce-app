# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with Turbo mode
- `pnpm build` - Build the application
- `pnpm start` - Start production server
- `pnpm check` - Run both linting and type checking
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm format:check` - Check code formatting with Prettier
- `pnpm format:write` - Format code with Prettier

## Architecture Overview

This is a Next.js 15 e-commerce application using the T3 Stack with AWS Amplify for backend services.

### Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: AWS Amplify with custom data models
- **State Management**: Zustand for cart state
- **UI**: Radix UI components with Tailwind CSS v4
- **Authentication**: AWS Amplify Auth with user pools
- **Database**: AWS Amplify DataStore with custom schema

### Key Data Models
- `Category`: Menu item categories (public read, admin CRUD)
- `MenuItem`: Food/drink items with pricing (public read, admin CRUD)
- `Order`: Customer orders with status tracking (owner access)
- `OrderItem`: Individual items within orders (owner access)
- `Checkout`: Checkout session data (owner access)

### App Structure
- `/src/app/(customer)` - Customer-facing routes with parallel routing
- `/src/app/(customer)/@header` - Parallel header route for cart/checkout/orders
- `/src/app/(customer)/(main)` - Main customer landing page
- `/src/app/(customer)/(protected)` - Authenticated customer routes
- `/src/features` - Feature-based organization (Checkout, Orders, Auth)
- `/src/components/ui` - Radix UI components

### State Management
- Cart state uses Zustand with persistence (`useCartStore`)
- Authentication through AWS Amplify with context provider
- Server-side data fetching with Amplify server context

### Routing Patterns
- Uses Next.js 15 parallel routes for header/cart integration
- Route groups for customer vs admin sections
- Protected routes using Amplify authentication
- Server-side data fetching with caching

### Data Access Patterns
- Server components use `runWithAmplifyServerContext` for data access
- Client components use Amplify React hooks
- Data models defined in `/amplify/data/resource.ts`
- TypeScript types generated from Amplify schema

### Styling
- Tailwind CSS v4 with custom configuration
- Radix UI components for accessibility
- Consistent design tokens and spacing
- Responsive design patterns