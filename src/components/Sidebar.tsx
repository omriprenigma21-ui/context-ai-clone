"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  FolderOpen,
  CheckSquare,
  Puzzle,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  FileText
} from "lucide-react";

interface SidebarProps {
  isCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed = false, onCollapseChange }: SidebarProps) => {
  const toggleCollapsed = () => {
    const newState = !isCollapsed;
    onCollapseChange?.(newState);
  };

  const navigationItems = [
    { icon: Plus, label: "New Task", color: "text-blue-500" },
    { icon: FolderOpen, label: "Files & Drive" },
    { icon: CheckSquare, label: "Tasks", badge: "Beta" },
    { icon: Puzzle, label: "Integrations" },
  ];

  const recentProjects = [
    { name: "Tesla Stock Dashboard", icon: BarChart3, time: "Updated today" },
    { name: "AI Healthcare Compliance", icon: FileText, time: "Updated today" },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 h-full`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-purple-600 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <span className="font-medium text-gray-900">Personal</span>
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapsed}
          className="h-6 w-6 p-0"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <div className="px-2 space-y-1">
        {navigationItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`w-full justify-start h-10 px-3 ${
              isCollapsed ? "px-2" : ""
            } ${index === 0 ? "text-blue-500" : "text-gray-700"}`}
          >
            <item.icon className={`w-4 h-4 ${isCollapsed ? "" : "mr-3"}`} />
            {!isCollapsed && (
              <>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Button>
        ))}
      </div>

      {!isCollapsed && (
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto">
            {/* Today Section */}
            <div className="px-4 mt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Today</h3>
              <div className="space-y-2">
                {recentProjects.map((project, index) => (
                  <Card key={index} className="p-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <project.icon className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {project.name}
                        </p>
                        <p className="text-xs text-gray-500">{project.time}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Last 7 days Section */}
            <div className="px-4 mt-6 pb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Last 7 days</h3>
              <Card className="p-3 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-start space-x-3">
                  <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      AI Healthcare Compliance
                    </p>
                    <p className="text-xs text-gray-500">Updated today</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Bottom Section - Fixed at bottom */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <Button variant="ghost" className="w-full justify-start text-blue-500">
              <Plus className="w-4 h-4 mr-3" />
              Upgrade Your Plan
            </Button>

            <div className="mt-4 flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">F</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Fouad Omri</p>
                <p className="text-xs text-gray-500">Free plan</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
