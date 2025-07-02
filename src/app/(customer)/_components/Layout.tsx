import React from "react";

export const Layout = ({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen flex-col">
      <header className="z-50 shrink-0 bg-white">{header}</header>
      <main className="flex-1 overflow-y-auto">
        <div className="container flex h-full max-w-xl flex-col space-y-4 p-4">
          {children}
        </div>
      </main>
    </div>
  );
};
