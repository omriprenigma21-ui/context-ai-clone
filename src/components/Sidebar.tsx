"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserProfile } from "@/components/UserProfile";
import { IntegrationsModal } from "@/components/IntegrationsModal";
import { useApp } from "@/contexts/AppContext";
import {
  Plus,
  FolderOpen,
  CheckSquare,
  Puzzle,
  ChevronLeft,
  ChevronDown,
  BarChart3,
  FileText,
  Shield
} from "lucide-react";

interface SidebarProps {
  isCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed = false, onCollapseChange }: SidebarProps) => {
  const { state, setCurrentView } = useApp();
  const [showIntegrationsModal, setShowIntegrationsModal] = useState(false);

  const handleNavigationClick = (view: typeof state.currentView) => {
    setCurrentView(view);
  };

  const handleIntegrationsClick = () => {
    setShowIntegrationsModal(true);
  };

  return (
    <>
      <div
        className={`${isCollapsed ? "w-16" : "w-64"} bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 h-full`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between flex-shrink-0">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-600 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">P</span>
              </div>
              <span className="font-medium text-gray-900">Mayo Clinic</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCollapseChange?.(!isCollapsed)}
            className="h-6 w-6 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation Items */}
        {!isCollapsed && (
          <>
            <div className="px-2 space-y-1 flex-shrink-0">
              <Button
                variant="ghost"
                className={`w-full justify-start h-10 ${state.currentView === 'chat' ? 'text-blue-500 bg-blue-50' : 'text-gray-700'}`}
                onClick={() => handleNavigationClick('chat')}
              >
                <Plus className="w-4 h-4 mr-3" />
                New Task
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start h-10 ${state.currentView === 'files-and-drive' ? 'text-blue-500 bg-blue-50' : 'text-gray-700'}`}
                onClick={() => handleNavigationClick('files-and-drive')}
              >
                <FolderOpen className="w-4 h-4 mr-3" />
                Files & Drive
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start h-10 ${state.currentView === 'tasks' ? 'text-blue-500 bg-blue-50' : 'text-gray-700'}`}
                onClick={() => handleNavigationClick('tasks')}
              >
                <CheckSquare className="w-4 h-4 mr-3" />
                Tasks
                <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                  Beta
                </span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start h-10 text-gray-700"
                onClick={handleIntegrationsClick}
              >
                <Puzzle className="w-4 h-4 mr-3" />
                Integrations
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start h-10 ${state.currentView === 'analytics' ? 'text-blue-500 bg-blue-50' : 'text-gray-700'}`}
                onClick={() => handleNavigationClick('analytics')}
              >
                <BarChart3 className="w-4 h-4 mr-3" />
                Analytics
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start h-10 ${state.currentView === 'healthcare-compliance' ? 'text-blue-500 bg-blue-50' : 'text-gray-700'}`}
                onClick={() => handleNavigationClick('healthcare-compliance')}
              >
                <Shield className="w-4 h-4 mr-3" />
                Healthcare Compliance
              </Button>
            </div>

            {/* Scrollable Content Area - No visible scrollbars */}
            <div
              className="flex-1 min-h-0 overflow-y-auto"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {/* Today Section */}
              <div className="px-4 mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Today</h3>
                <div className="space-y-2">
                  <Card className="p-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Financial Analysis Report
                        </p>
                        <p className="text-xs text-gray-500">Updated 10 minutes ago</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Product Roadmap Q3
                        </p>
                        <p className="text-xs text-gray-500">Updated 2 hours ago</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Joint Commission Submission
                        </p>
                        <p className="text-xs text-gray-500">Updated 5 hours ago</p>
                      </div>
                    </div>
                  </Card>
                  <Card
                    className="p-3 hover:bg-gray-50 cursor-pointer border-l-4 border-l-orange-400"
                    onClick={() => handleNavigationClick('healthcare-compliance')}
                  >
                    <div className="flex items-start space-x-3">
                      <Shield className="w-4 h-4 text-orange-600 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Vaccination Alert - Patient #7823
                        </p>
                        <p className="text-xs text-orange-600">Updated 5 minutes ago</p>
                      </div>
                    </div>
                  </Card>
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
                        CMS Report Prep
                      </p>
                      <p className="text-xs text-gray-500">Updated today</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Bottom Section - Fixed at bottom */}
            <div className="mt-auto p-4 flex-shrink-0">
              <Button variant="ghost" className="w-full justify-start text-blue-500 mb-4">
                <Plus className="w-4 h-4 mr-3" />
                Upgrade Your Plan
              </Button>
              <UserProfile />
            </div>
          </>
        )}

        {/* Collapsed state */}
        {isCollapsed && (
          <div className="flex flex-col items-center py-4 space-y-4">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 ${state.currentView === 'chat' ? 'text-blue-500' : 'text-gray-500'}`}
              onClick={() => handleNavigationClick('chat')}
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 ${state.currentView === 'files-and-drive' ? 'text-blue-500' : 'text-gray-500'}`}
              onClick={() => handleNavigationClick('files-and-drive')}
            >
              <FolderOpen className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 ${state.currentView === 'tasks' ? 'text-blue-500' : 'text-gray-500'}`}
              onClick={() => handleNavigationClick('tasks')}
            >
              <CheckSquare className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-500"
              onClick={handleIntegrationsClick}
            >
              <Puzzle className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 ${state.currentView === 'analytics' ? 'text-blue-500' : 'text-gray-500'}`}
              onClick={() => handleNavigationClick('analytics')}
            >
              <BarChart3 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 ${state.currentView === 'healthcare-compliance' ? 'text-blue-500' : 'text-gray-500'}`}
              onClick={() => handleNavigationClick('healthcare-compliance')}
            >
              <Shield className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Integrations Modal */}
      <IntegrationsModal
        isOpen={showIntegrationsModal}
        onClose={() => setShowIntegrationsModal(false)}
      />
    </>
  );
};

export default Sidebar;
