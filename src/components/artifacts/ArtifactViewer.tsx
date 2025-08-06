"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UniverViewer } from "./UniverViewer";
import {
  Share,
  Expand,
  History,
  MoreHorizontal,
  ChevronDown,
  Download,
  X
} from "lucide-react";

interface ArtifactViewerProps {
  artifact: {
    id: string;
    name: string;
    type: "spreadsheet" | "document" | "presentation" | "code" | "image" | "data";
    createdAt: string;
    size?: string;
  };
  onClose: () => void;
}

export const ArtifactViewer = ({ artifact, onClose }: ArtifactViewerProps) => {
  const [currentTab, setCurrentTab] = useState("Home");
  const [viewerId] = useState(`artifact-viewer-${artifact.id}`);
  const [viewerReady, setViewerReady] = useState(false);

  // Determine if we can use Univer for this artifact type
  const isUniverCompatible = ["spreadsheet", "document", "presentation"].includes(artifact.type);

  // Handle viewer ready event
  const handleViewerReady = () => {
    setViewerReady(true);
  };

  const getArtifactIcon = () => {
    switch (artifact.type) {
      case "spreadsheet":
        return (
          <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-green-600 rounded-sm" />
            ))}
          </div>
        );
      case "document":
        return (
          <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.81655 0H14.3998L21.5998 7.2V20.8755C21.5998 22.6027 20.1051 24 18.264 24H5.74197C3.89446 24 2.39978 22.6027 2.39978 20.8755V3.1244C2.39975 1.39727 3.96901 0 5.81655 0Z" fill="#2563EB" transform="scale(0.67)"></path>
            <text x="7" y="11" fill="white" fontSize="3" fontFamily="sans-serif">W</text>
          </svg>
        );
      case "presentation":
        return (
          <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.81655 0H14.3998L21.5998 7.2V20.8755C21.5998 22.6027 20.1051 24 18.264 24H5.74197C3.89446 24 2.39978 22.6027 2.39978 20.8755V3.1244C2.39975 1.39727 3.96901 0 5.81655 0Z" fill="#D97706" transform="scale(0.67)"></path>
            <text x="7" y="11" fill="white" fontSize="3" fontFamily="sans-serif">P</text>
          </svg>
        );
      default:
        return (
          <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-gray-600 rounded-sm" />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Top Banner */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        {/* Left Section - Icon and Title */}
        <div className="flex items-center space-x-3 min-w-0">
          {getArtifactIcon()}
          <div className="min-w-0">
            <h1 className="text-sm font-medium text-gray-900 truncate max-w-[300px]">
              {artifact.name}
            </h1>
            <p className="text-xs text-gray-500">{artifact.createdAt}</p>
          </div>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900">
            <Share className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900">
            <Expand className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900">
            <History className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900">
            <MoreHorizontal className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm" className="h-8 px-3 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-200">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 0z"/>
            </svg>
            Template
          </Button>

          <Button size="sm" className="h-8 px-3 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg">
            Export
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>

          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center px-4 py-2 bg-white border-b border-gray-200">
        <div className="flex space-x-6">
          {["File", "Home", "Insert"].map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
                currentTab === tab
                  ? "text-green-600 bg-green-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area - Now using Univer for compatible artifact types */}
      <div className="flex-1 bg-gray-50 overflow-hidden">
        {isUniverCompatible ? (
          <UniverViewer
            artifactType={artifact.type as "spreadsheet" | "document" | "presentation"}
            containerId={viewerId}
            onReady={handleViewerReady}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                {getArtifactIcon()}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {artifact.type === "code" ? "Code Viewer" :
                 artifact.type === "image" ? "Image Viewer" :
                 artifact.type === "data" ? "Data Viewer" : "File Viewer"}
              </h3>
              <p className="text-gray-500 mb-4">
                {artifact.type === "code"
                  ? "Code viewer will be implemented"
                  : artifact.type === "image"
                  ? "Image viewer will be implemented"
                  : artifact.type === "data"
                  ? "Data viewer will be implemented"
                  : "Content viewer will be implemented based on file type"
                }
              </p>
              <div className="text-sm text-gray-400">
                File: {artifact.name}<br/>
                {artifact.size && `Size: ${artifact.size}`}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
