"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UniverViewer } from "./UniverViewer";
import {
  ChevronLeft,
  Share,
  Expand,
  History,
  MoreHorizontal,
  ChevronDown,
  Download,
  ExternalLink
} from "lucide-react";

interface InlineArtifactViewerProps {
  artifact: {
    id: string;
    name: string;
    type: "spreadsheet" | "document" | "presentation" | "code" | "image" | "data";
    createdAt: string;
    size?: string;
    data?: unknown;
  };
  onBack: () => void;
  onFullscreen: () => void;
}

export const InlineArtifactViewer = ({ artifact, onBack, onFullscreen }: InlineArtifactViewerProps) => {
  const [viewerId] = useState(`inline-viewer-${artifact.id}`);
  const [currentTab, setCurrentTab] = useState("View");

  // Determine viewer type
  const isUniverCompatible = ["spreadsheet", "document", "presentation"].includes(artifact.type);

  const getArtifactIcon = () => {
    const iconColors = {
      spreadsheet: "#008F6B",
      document: "#2563EB",
      presentation: "#D97706",
      code: "#F7DF1E",
      image: "#EC4899",
      data: "#16A34A"
    };

    const bgColors = {
      spreadsheet: "rgb(229, 242, 239)",
      document: "rgb(219, 234, 254)",
      presentation: "rgb(254, 243, 199)",
      code: "rgb(254, 249, 195)",
      image: "rgb(252, 231, 243)",
      data: "rgb(220, 252, 231)"
    };

    const color = iconColors[artifact.type] || iconColors.spreadsheet;
    const bgColor = bgColors[artifact.type] || bgColors.spreadsheet;

    return (
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded" style={{ backgroundColor: bgColor }}>
        <svg className="h-4 w-4" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="3" fill={color}></circle>
        </svg>
      </div>
    );
  };

  const renderViewer = () => {
    if (isUniverCompatible) {
      return (
        <UniverViewer
          artifactType={artifact.type as "spreadsheet" | "document" | "presentation"}
          containerId={viewerId}
          data={artifact.data}
        />
      );
    }

    // Other artifact type viewers
    switch (artifact.type) {
      case "code":
        return <CodeViewer artifact={artifact} />;
      case "image":
        return <ImageViewer artifact={artifact} />;
      case "data":
        return <DataViewer artifact={artifact} />;
      default:
        return <GenericViewer artifact={artifact} />;
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-white">
      {/* Header Section */}
      <div className="flex-shrink-0 border-b border-gray-200">
        {/* Breadcrumb Navigation */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-gray-500">Context Drive</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-500">Creations</span>
              <span className="text-gray-300">/</span>
              <span className="text-blue-600 font-medium">{artifact.name}</span>
            </div>
          </div>
        </div>

        {/* Artifact Info & Actions */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getArtifactIcon()}
            <div>
              <h1 className="text-base font-medium text-gray-900">{artifact.name}</h1>
              <p className="text-xs text-gray-500">
                {artifact.type.charAt(0).toUpperCase() + artifact.type.slice(1)} • {artifact.createdAt}
                {artifact.size && ` • ${artifact.size}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900">
              <Share className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900">
              <History className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900">
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onFullscreen}
              className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900"
            >
              <Expand className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 py-2 border-t border-gray-100">
          <div className="flex space-x-6">
            {["View", "Edit", "Share"].map((tab) => (
              <button
                key={tab}
                onClick={() => setCurrentTab(tab)}
                className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
                  currentTab === tab
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden bg-gray-50">
        {renderViewer()}
      </div>
    </div>
  );
};

// Viewer Components for different artifact types
const CodeViewer = ({ artifact }: { artifact: { name: string; type: string } }) => (
  <div className="h-full flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-lg flex items-center justify-center">
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Code Viewer</h3>
      <p className="text-gray-500 mb-4">Advanced code editor and syntax highlighting</p>
      <div className="bg-gray-800 text-green-400 p-4 rounded-lg text-left font-mono text-sm max-w-md mx-auto">
        <div>{`// Sample code preview`}</div>
        <div>function main() &#123;</div>
        <div>&nbsp;&nbsp;return "Hello World";</div>
        <div>&#125;</div>
      </div>
    </div>
  </div>
);

const ImageViewer = ({ artifact }: { artifact: { name: string; type: string } }) => (
  <div className="h-full flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-lg flex items-center justify-center">
        <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Image Viewer</h3>
      <p className="text-gray-500 mb-4">High-resolution image display with zoom and pan</p>
      <div className="w-64 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mx-auto flex items-center justify-center">
        <span className="text-gray-600">Image Preview Area</span>
      </div>
    </div>
  </div>
);

const DataViewer = ({ artifact }: { artifact: { name: string; type: string } }) => (
  <div className="h-full flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Data Visualization</h3>
      <p className="text-gray-500 mb-4">Interactive charts and data analysis tools</p>
      <div className="max-w-md mx-auto">
        <div className="bg-white border rounded-lg p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Revenue</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div className="w-24 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-sm font-medium">$4.9M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Growth</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div className="w-20 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm font-medium">+18%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Customers</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div className="w-16 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <span className="text-sm font-medium">16</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const GenericViewer = ({ artifact }: { artifact: { name: string; type: string; size?: string } }) => (
  <div className="h-full flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">File Viewer</h3>
      <p className="text-gray-500 mb-4">Generic file viewer for various formats</p>
      <div className="text-sm text-gray-400">
        File: {artifact.name}<br/>
        Type: {artifact.type}<br/>
        {artifact.size && `Size: ${artifact.size}`}
      </div>
    </div>
  </div>
);
