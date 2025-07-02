import React from "react";

export const Layout = ({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="shrink-0 bg-white z-50">{header}</header>
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-xl h-full flex flex-col space-y-4 p-4">
          {children}
        </div>
      </main>
    </div>
  );
};
