# E-commerce App

A modern e-commerce application built with Next.js 15 and AWS Amplify.

## Features

- **Customer-facing**: Browse menu items, add to cart, checkout
- **Admin panel**: Manage menu items, categories, and orders
- **Authentication**: AWS Amplify Auth with user pools
- **Real-time updates**: Shopping cart with persistence
- **Responsive design**: Mobile-friendly interface

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: AWS Amplify with custom data models
- **State Management**: Zustand for cart state
- **UI**: Radix UI components with Tailwind CSS v4
- **Authentication**: AWS Amplify Auth
- **Database**: AWS Amplify DataStore

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm package manager
- AWS account with Amplify configured

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Initialize Amplify Gen 2:
   ```bash
   npm create amplify@latest
   ```
   Or for manual installation:
   ```bash
   npm add --save-dev @aws-amplify/backend@latest @aws-amplify/backend-cli@latest typescript
   ```
4. Start local development:
   ```bash
   npx ampx sandbox
   ```
5. Run the app:
   ```bash
   pnpm dev
   ```

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

## Project Structure

```
src/
├── app/
│   ├── (customer)/          # Customer-facing routes
│   │   ├── @header/         # Parallel header route
│   │   ├── (main)/          # Main customer landing page
│   │   └── (protected)/     # Authenticated customer routes
│   └── (admin)/             # Admin routes
├── features/                 # Feature-based organization
│   ├── Checkout/
│   ├── Orders/
│   └── Auth/
├── components/
│   └── ui/                   # Radix UI components
└── lib/                      # Utility functions
```

## Data Models

- `Category`: Menu item categories (public read, admin CRUD)
- `MenuItem`: Food/drink items with pricing (public read, admin CRUD)
- `Order`: Customer orders with status tracking (owner access)
- `OrderItem`: Individual items within orders (owner access)
- `Checkout`: Checkout session data (owner access)

## Deployment

1. Build the application:
   ```bash
   pnpm build
   ```
2. Deploy to your preferred platform (Vercel, AWS, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License