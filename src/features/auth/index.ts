// Context and hooks
export { AuthProvider, useAuth, AuthStep } from "./context/AuthContext";

// UI Components
export { AuthForm } from "./components/AuthForm";
export { ProtectedRoute } from "./components/ProtectedRoute";
export { AccessDenied } from "./components/AccessDenied";

// Types
export type { AuthUser, AuthContextType } from "./types";
