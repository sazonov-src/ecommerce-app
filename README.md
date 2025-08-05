# E-commerce App

![Demo](public/Create%20T3%20App.gif)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![AWS Amplify](https://img.shields.io/badge/AWS%20Amplify-ff9900?style=for-the-badge&logo=aws&logoColor=white)](https://aws.amazon.com/amplify/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38b2ac?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-4a5568?style=for-the-badge&logoColor=white)](https://github.com/pmndrs/zustand)

Modern e-commerce application with real-time cart, authentication, and admin panel.

## Features

- 🛒 **Shopping cart** with persistent state
- 🔐 **User authentication** via AWS Amplify
- 📱 **Responsive design** for all devices
- 🍽️ **Menu management** with categories
- 📊 **Order tracking** with status updates
- 👨‍💼 **Admin panel** for content management

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