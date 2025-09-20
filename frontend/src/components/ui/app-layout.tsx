"use client";

import React from "react";
import { SidebarNavigation, TopNavigation, BreadcrumbNavigation } from "@/components/ui/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
  showSidebar?: boolean;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  title,
  subtitle,
  breadcrumbs,
  actions,
  showSidebar = true,
  className,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      {showSidebar && <SidebarNavigation />}
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        {(title || subtitle || actions || breadcrumbs) && (
          <div className="bg-white border-b border-gray-200">
            <div className="px-6 py-4">
              {breadcrumbs && (
                <div className="mb-3">
                  <BreadcrumbNavigation items={breadcrumbs} />
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  {title && (
                    <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                  )}
                  {subtitle && (
                    <p className="text-gray-600 mt-1">{subtitle}</p>
                  )}
                </div>
                {actions && (
                  <div className="flex items-center space-x-3">
                    {actions}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Page Content */}
        <main className={`flex-1 ${className}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: boolean;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  breadcrumbs,
  actions,
  maxWidth = "full",
  padding = true,
  className,
}) => {
  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    "2xl": "max-w-7xl",
    full: "max-w-full",
  }[maxWidth];

  return (
    <AppLayout
      title={title}
      subtitle={subtitle}
      breadcrumbs={breadcrumbs}
      actions={actions}
      className={className}
    >
      <div className={`${maxWidthClass} mx-auto ${padding ? "p-6" : ""} w-full`}>
        {children}
      </div>
    </AppLayout>
  );
};