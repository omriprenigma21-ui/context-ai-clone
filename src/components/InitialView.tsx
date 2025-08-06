"use client";

import { useState, useEffect, useCallback } from "react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { NotificationCenter } from "@/components/NotificationCenter";
import Sidebar from "@/components/Sidebar";
import {
  Plus,
  FolderOpen,
  CheckSquare,
  Puzzle,
  Mic,
  Paperclip,
  Send,
  FileText,
  Clock,
  Search,
  Sparkles,
  Users,
  BarChart3,
  ChevronDown,
  ChevronLeft,
  MessageSquare
} from "lucide-react";

const InitialView = () => {
  const { startTask, completeTask } = useApp();
  const [input, setInput] = useState("create a dynamic financial performance spreadsheet by pulling revenue data from both Salesforce and QuickBooks");
  const [showContextExplorer, setShowContextExplorer] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSubmit = useCallback(() => {
    if (input.trim()) {
      startTask(input);
      // Auto-complete financial spreadsheet task after a short delay for demo
      if (input.toLowerCase().includes('financial') || input.toLowerCase().includes('spreadsheet') ||
          input.toLowerCase().includes('revenue') || input.toLowerCase().includes('salesforce') ||
          input.toLowerCase().includes('quickbooks')) {
        setTimeout(() => {
          completeTask();
        }, 2000);
      }
    }
  }, [input, startTask, completeTask]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Unified Sidebar Component */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onCollapseChange={setSidebarCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-14 border-b border-gray-200 flex items-center justify-end px-6">
          <div className="flex items-center space-x-2">
            <NotificationCenter />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Chart Icon */}
          <div className="mb-12">
            <div className="flex space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-20 bg-gradient-to-t from-blue-200 to-blue-100 rounded-2xl flex items-end justify-center pb-3"
                  style={{ height: `${80 + i * 12}px` }}
                >
                  <div className="w-10 h-1.5 bg-blue-400 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Greeting */}
          <h1 className="text-3xl font-light text-gray-900 mb-16 leading-tight tracking-normal">
            Good evening, Elena
          </h1>

          {/* Input Area */}
          <div className="w-full max-w-4xl relative">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6">

              {/* Input Area */}
              <div className="relative mb-4">
                <div
                  contentEditable="true"
                  className="w-full min-h-[120px] text-base text-gray-900 border-none outline-none resize-none p-0"
                  tabIndex={0}
                  onInput={(e) => setInput(e.currentTarget.textContent || '')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  onFocus={() => setShowContextExplorer(true)}
                  autoFocus
                  suppressContentEditableWarning={true}
                >
                  {input || ''}
                </div>
                {/* Placeholder */}
                {input === '' && (
                  <div className="absolute top-0 left-0 text-base text-gray-400 pointer-events-none">
                    Describe a task or @ for more options
                  </div>
                )}
              </div>

              {/* Bottom toolbar */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="p-2 text-gray-500 hover:text-gray-700">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" className="p-2 text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                      <line x1="8" x2="16" y1="21" y2="21"></line>
                      <line x1="12" x2="12" y1="17" y2="21"></line>
                    </svg>
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="p-2 text-gray-500 hover:text-gray-700">
                    <Mic className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!input.trim()}
                    className="h-9 w-9 bg-gray-900 hover:bg-gray-800 rounded-full border-0 p-0 disabled:opacity-90 text-white flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 rotate-45" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                <Button variant="ghost" className="bg-gray-100 text-gray-700 h-10 px-4 rounded-full flex items-center gap-2 shadow-none hover:bg-gray-200">
                  <div className="flex items-center -space-x-1">
                    <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full border border-gray-200 bg-white p-[1px]">
                      <div className="h-[10px] w-[10px] bg-blue-500 rounded-full" />
                    </div>
                    <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full border border-gray-200 bg-white p-[1px]">
                      <div className="h-[10px] w-[10px] bg-green-500 rounded-full" />
                    </div>
                    <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full border border-gray-200 bg-white p-[1px]">
                      <div className="h-[10px] w-[10px] bg-orange-500 rounded-full" />
                    </div>
                  </div>
                  <span className="text-sm font-medium">Integrations</span>
                </Button>

                <Button variant="ghost" className="bg-gray-100 text-gray-700 h-10 px-4 rounded-full flex items-center gap-2 shadow-none hover:bg-gray-200">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">Templates</span>
                </Button>

                <Button variant="ghost" className="bg-gray-100 text-gray-700 h-10 px-4 rounded-full flex items-center gap-2 shadow-none hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M14 4.1 12 6"></path>
                    <path d="m5.1 8-2.9-.8"></path>
                    <path d="m6 12-1.9 2"></path>
                    <path d="M7.2 2.2 8 5.1"></path>
                    <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a .5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a .5.5 0 0 1-.95.074z"></path>
                  </svg>
                  <span className="text-sm font-medium">Check-in Frequency</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </Button>
              </div>
            </div>

            {/* Bottom disclaimer */}
            <p className="text-xs text-gray-400 text-center mt-4">
              Context can make mistakes. Check important info.
            </p>
          </div>

          {/* Context Explorer */}
          {showContextExplorer && (
            <div className="absolute top-20 right-8 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <Search className="w-4 h-4 mr-2" />
                  Context Explorer
                </h3>
                <div className="text-xs text-gray-500">
                  <span className="mr-4">Esc Close</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-600">Integrations</p>
                    <p className="text-sm text-gray-500">Browse your connected apps</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                    <FolderOpen className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Team files</p>
                    <p className="text-sm text-gray-500">Browse files shared with your team</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Artifacts</p>
                    <p className="text-sm text-gray-500">Browse generated artifacts and documents</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                      <div className="bg-gray-600 rounded-sm"></div>
                      <div className="bg-gray-600 rounded-sm"></div>
                      <div className="bg-gray-600 rounded-sm"></div>
                      <div className="bg-gray-600 rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Templates</p>
                    <p className="text-sm text-gray-500">Browse your saved templates</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
                <span>↑↓ Navigate</span>
                <span>Enter Select</span>
                <span>Esc Close</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InitialView;
