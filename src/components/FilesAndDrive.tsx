"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  ChevronDown,
  Filter,
  Grid3x3,
  List,
  Home,
  FolderIcon,
  FileText,
  Upload,
  CheckSquare,
  MoreHorizontal,
  ExternalLink
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const FilesAndDrive = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data for Recent Creations
  const recentCreations = [
    {
      id: "1",
      name: "Dynamic Financial Perf...",
      type: "spreadsheet",
      createdAt: "2d ago",
      preview: "/placeholder-spreadsheet.png"
    }
  ];

  // Sample data for file table
  const files = [
    {
      id: "1",
      name: "Projects",
      type: "Folder",
      created: "2d ago",
      modified: "2d ago",
      owner: "E",
      icon: <FolderIcon className="w-4 h-4 text-blue-500" />
    }
  ];

  // Popular integrations data
  const popularIntegrations = [
    { name: "Google Suite", icon: "🔵", connected: false },
    { name: "Slack", icon: "💬", connected: false },
    { name: "Notion", icon: "📝", connected: false },
    { name: "Outlook", icon: "📧", connected: false },
    { name: "Linear", icon: "🟣", connected: false }
  ];

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-gray-200 bg-white px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-gray-900">Context Drive</h1>
              <p className="text-sm text-gray-600 mt-1">
                Your central workspace for files, artifacts, and project resources across all your Context projects.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search Context Drive"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-12 w-64"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-300 rounded">
                    ⌘K
                  </kbd>
                </div>
              </div>

              {/* New Button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                    <List className="w-4 h-4 mr-2" />
                    New
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <CheckSquare className="w-4 h-4 mr-2" />
                    New Task
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FolderIcon className="w-4 h-4 mr-2" />
                    New Folder
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Integrations Button */}
              <Button variant="outline" className="text-gray-700">
                <div className="w-4 h-4 mr-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
                Integrations
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Recent Creations Section */}
            <div className="flex-shrink-0 px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Creations</h2>
              <div className="flex space-x-4">
                {recentCreations.map((item) => (
                  <Card key={item.id} className="w-48 p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg mb-3 flex items-center justify-center">
                      <div className="w-12 h-12 bg-blue-200 rounded flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-medium text-sm text-gray-900 truncate">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.createdAt}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* File Browser */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Breadcrumb and Controls */}
              <div className="flex-shrink-0 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      <Home className="w-4 h-4" />
                    </Button>
                    <span className="text-gray-400">/</span>
                    <span className="text-blue-600 font-medium">Home</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Filter className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <List className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Grid3x3 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* File Table */}
              <div className="flex-1 overflow-auto">
                <div className="px-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 text-sm font-medium text-gray-500">Name</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-500">Type</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-500">Created</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-500">Modified</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-500">Owner</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((file) => (
                        <tr key={file.id} className="border-b border-gray-50 hover:bg-gray-25">
                          <td className="py-3">
                            <div className="flex items-center space-x-3">
                              {file.icon}
                              <span className="text-sm font-medium text-gray-900">{file.name}</span>
                            </div>
                          </td>
                          <td className="py-3 text-sm text-gray-600">{file.type}</td>
                          <td className="py-3 text-sm text-gray-600">{file.created}</td>
                          <td className="py-3 text-sm text-gray-600">{file.modified}</td>
                          <td className="py-3 text-sm text-gray-600">{file.owner}</td>
                          <td className="py-3">
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Integrations */}
          <div className="w-80 border-l border-gray-200 bg-gray-50 flex flex-col">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Integrations</h3>
              <p className="text-sm text-gray-600 mb-6">
                Connect your favorite apps and let Context work seamlessly across your digital workspace.
              </p>

              <div className="space-y-3">
                {popularIntegrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm">{integration.icon}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{integration.name}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-800 font-medium mb-1">See 46 more</div>
                <div className="text-xs text-blue-600">0 connected</div>
              </div>
            </div>

            {/* Templates Section */}
            <div className="mt-auto p-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">Templates</span>
                  <span className="text-xs text-gray-500">0/1</span>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Create
                </Button>
              </div>
              <p className="text-xs text-gray-600">
                Reusable templates for documents, presentations, and spreadsheets
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FilesAndDrive;
