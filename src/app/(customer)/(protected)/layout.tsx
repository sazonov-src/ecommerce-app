import { ProtectedRoute } from "@/features/auth";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
