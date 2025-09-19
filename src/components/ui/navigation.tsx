"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  MessageSquare,
  BarChart3,
  FileText,
  Settings,
  Building2,
  Users,
  HelpCircle,
  Brain,
} from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  description?: string;
  badge?: string;
  isNew?: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    href: "/",
    description: "Dashboard and overview",
  },
  {
    id: "chat",
    label: "AI Chat",
    icon: MessageSquare,
    href: "/chat",
    description: "Interactive AI assistant",
    badge: "AI",
  },
  {
    id: "research",
    label: "Research",
    icon: BarChart3,
    href: "/research",
    description: "Market analysis workspace",
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText,
    href: "/reports",
    description: "Generated reports & insights",
  },
  {
    id: "intelligence",
    label: "Intelligence",
    icon: Brain,
    href: "/intelligence",
    description: "Business intelligence hub",
    isNew: true,
  },
  {
    id: "locations",
    label: "Locations",
    icon: Building2,
    href: "/locations",
    description: "Location analysis tools",
  },
  {
    id: "customers",
    label: "Customers",
    icon: Users,
    href: "/customers",
    description: "Customer analytics",
  },
];

const bottomNavigationItems: NavigationItem[] = [
  {
    id: "help",
    label: "Help",
    icon: HelpCircle,
    href: "/help",
    description: "Documentation & support",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/settings",
    description: "App preferences",
  },
];

interface SidebarNavigationProps {
  className?: string;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className={`w-64 bg-white border-r border-gray-200 h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src="https://www.gstatic.com/monospace/250314/icon-192.png"
            alt="BiteBase"
            className="w-8 h-8"
          />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">BiteBase</h1>
            <p className="text-xs text-gray-600">Intelligence Platform</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
          const isItemActive = isActive(item.href);
          return (
            <Button
              key={item.id}
              variant={isItemActive ? "default" : "ghost"}
              className={`w-full justify-start h-auto p-3 text-left ${
                isItemActive
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleNavigation(item.href)}
            >
              <item.icon className={`w-5 h-5 mr-3 ${isItemActive ? "text-white" : "text-gray-500"}`} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.label}</span>
                  <div className="flex items-center space-x-1">
                    {item.isNew && (
                      <Badge className="text-xs bg-green-100 text-green-800 border-green-200">
                        New
                      </Badge>
                    )}
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          isItemActive 
                            ? "bg-white/20 text-white border-white/30" 
                            : "bg-orange-100 text-orange-800 border-orange-200"
                        }`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </div>
                {item.description && (
                  <p className={`text-xs mt-1 ${isItemActive ? "text-white/80" : "text-gray-500"}`}>
                    {item.description}
                  </p>
                )}
              </div>
            </Button>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200 space-y-1">
        {bottomNavigationItems.map((item) => {
          const isItemActive = isActive(item.href);
          return (
            <Button
              key={item.id}
              variant="ghost"
              className="w-full justify-start h-auto p-3 text-left text-gray-700 hover:bg-gray-100"
              onClick={() => handleNavigation(item.href)}
            >
              <item.icon className="w-5 h-5 mr-3 text-gray-500" />
              <div>
                <span className="font-medium">{item.label}</span>
                {item.description && (
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                )}
              </div>
            </Button>
          );
        })}
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
            <span className="text-xs font-medium text-white">K</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Khiw</p>
            <p className="text-xs text-gray-500">Restaurant Owner</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TopNavigationProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ 
  title, 
  subtitle, 
  actions, 
  className 
}) => {
  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="px-6 py-4">
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
  );
};

interface BreadcrumbNavigationProps {
  items: { label: string; href?: string }[];
  className?: string;
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ 
  items, 
  className 
}) => {
  const router = useRouter();

  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
            {item.href ? (
              <Button
                variant="link"
                className="p-0 h-auto text-orange-600 hover:text-orange-700"
                onClick={() => router.push(item.href!)}
              >
                {item.label}
              </Button>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};