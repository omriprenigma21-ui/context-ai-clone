"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserProfile } from "@/components/UserProfile";
import {
  Plus,
  FolderOpen,
  CheckSquare,
  Puzzle,
  ChevronLeft,
  ChevronDown,
  BarChart3,
  FileText
} from "lucide-react";

interface SidebarProps {
  isCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed = false, onCollapseChange }: SidebarProps) => {
  return (
    <div className={`${isCollapsed ? "w-16" : "w-64"} bg-theme-sidebar border-r border-theme-sidebar transition-all duration-300 h-full flex flex-col`}>
      {/* Header - Fixed at top */}
      <div className="p-4 flex items-center justify-between flex-shrink-0">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-purple-600 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <span className="font-medium text-theme-sidebar">Personal</span>
            <ChevronDown className="w-4 h-4 text-theme-muted" />
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCollapseChange?.(!isCollapsed)}
          className="h-6 w-6 p-0 text-theme-muted hover:text-theme-sidebar hover:bg-theme-navigation"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* Navigation Items - Fixed at top */}
      {!isCollapsed && (
        <div className="px-2 space-y-1 flex-shrink-0">
          <Button variant="ghost" className="w-full justify-start h-10 text-theme-navigation-active hover:bg-theme-navigation">
            <Plus className="w-4 h-4 mr-3" />
            New Task
          </Button>
          <Button variant="ghost" className="w-full justify-start h-10 text-theme-navigation hover:bg-theme-navigation hover:text-theme-sidebar">
            <FolderOpen className="w-4 h-4 mr-3" />
            Files & Drive
          </Button>
          <Button variant="ghost" className="w-full justify-start h-10 text-theme-navigation hover:bg-theme-navigation hover:text-theme-sidebar">
            <CheckSquare className="w-4 h-4 mr-3" />
            Tasks
            <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
              Beta
            </span>
          </Button>
          <Button variant="ghost" className="w-full justify-start h-10 text-theme-navigation hover:bg-theme-navigation hover:text-theme-sidebar">
            <Puzzle className="w-4 h-4 mr-3" />
            Integrations
          </Button>
          <Button variant="ghost" className="w-full justify-start h-10 text-theme-navigation hover:bg-theme-navigation hover:text-theme-sidebar">
            <BarChart3 className="w-4 h-4 mr-3" />
            Analytics
          </Button>
        </div>
      )}

      {/* Scrollable Content Area - Takes up remaining space between nav and bottom */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto min-h-0 px-4 mt-6">
          {/* Today Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-theme-muted mb-3">Today</h3>
            <div className="space-y-2">
              <Card className="p-3 hover:bg-theme-card cursor-pointer bg-theme-card border-theme-sidebar">
                <div className="flex items-start space-x-3">
                  <FileText className="w-4 h-4 text-theme-muted mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-theme-sidebar truncate">
                      Financial Analysis Report
                    </p>
                    <p className="text-xs text-theme-muted">Updated 10 minutes ago</p>
                  </div>
                </div>
              </Card>
              <Card className="p-3 hover:bg-theme-card cursor-pointer bg-theme-card border-theme-sidebar">
                <div className="flex items-start space-x-3">
                  <FileText className="w-4 h-4 text-theme-muted mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-theme-sidebar truncate">
                      Product Roadmap Q3
                    </p>
                    <p className="text-xs text-theme-muted">Updated 2 hours ago</p>
                  </div>
                </div>
              </Card>
              <Card className="p-3 hover:bg-theme-card cursor-pointer bg-theme-card border-theme-sidebar">
                <div className="flex items-start space-x-3">
                  <FileText className="w-4 h-4 text-theme-muted mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-theme-sidebar truncate">
                      Marketing Campaign Strategy
                    </p>
                    <p className="text-xs text-theme-muted">Updated 5 hours ago</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Last 7 days Section */}
          <div className="pb-4">
            <h3 className="text-sm font-medium text-theme-muted mb-3">Last 7 days</h3>
            <Card className="p-3 hover:bg-theme-card cursor-pointer bg-theme-card border-theme-sidebar">
              <div className="flex items-start space-x-3">
                <FileText className="w-4 h-4 text-theme-muted mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-theme-sidebar truncate">
                    AI Healthcare Compliance
                  </p>
                  <p className="text-xs text-theme-muted">Updated today</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Bottom Section - Fixed at bottom */}
      {!isCollapsed && (
        <div className="flex-shrink-0 p-4 border-t border-theme-sidebar">
          <Button variant="ghost" className="w-full justify-start text-theme-navigation-active mb-4 hover:bg-theme-navigation">
            <Plus className="w-4 h-4 mr-3" />
            Upgrade Your Plan
          </Button>

          <UserProfile />
        </div>
      )}

      {/* Collapsed state */}
      {isCollapsed && (
        <div className="flex flex-col items-center py-4 space-y-4 flex-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-theme-navigation-active hover:bg-theme-navigation">
            <Plus className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-theme-muted hover:bg-theme-navigation hover:text-theme-sidebar">
            <FolderOpen className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-theme-muted hover:bg-theme-navigation hover:text-theme-sidebar">
            <CheckSquare className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-theme-muted hover:bg-theme-navigation hover:text-theme-sidebar">
            <Puzzle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-theme-muted hover:bg-theme-navigation hover:text-theme-sidebar">
            <BarChart3 className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
