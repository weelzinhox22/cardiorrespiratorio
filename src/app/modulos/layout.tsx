import React from "react";

export default function ModulosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  );
} 