"use client";

import { Card } from "@/components/ui/card";

interface DataArtifactProps {
  artifact: {
    id: string;
    name: string;
    type: string;
    createdAt: string;
    size?: string;
    metadata?: {
      pages?: number;
      wordCount?: number;
      slideCount?: number;
      lines?: number;
      dimensions?: string;
      records?: number;
    };
  };
  size?: "small" | "large";
  onClick?: () => void;
}

export const DataArtifact = ({ artifact, size = "large", onClick }: DataArtifactProps) => {
  return (
    <Card
      className={`${
        size === "small" ? "p-3" : "p-4"
      } border border-gray-200 cursor-pointer hover:shadow-md transition-shadow`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        {/* Data Icon */}
        <div className={`${
          size === "small" ? "w-8 h-8" : "w-10 h-10"
        } bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0`}>
          <svg className={`${size === "small" ? "w-5 h-5" : "w-6 h-6"}`} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.81655 0H14.3998L21.5998 7.2V20.8755C21.5998 22.6027 20.1051 24 18.264 24H5.74197C3.89446 24 2.39978 22.6027 2.39978 20.8755V3.1244C2.39975 1.39727 3.96901 0 5.81655 0Z" fill="#16A34A" transform="scale(0.67)"></path>
            <rect x="5" y="6" width="6" height="4" stroke="white" strokeWidth="0.5" fill="none"></rect>
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`${
            size === "small" ? "text-sm" : "text-base"
          } font-medium text-gray-900 mb-1 truncate`}>
            {artifact.name}
          </h3>

          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span>Data</span>
            <span>•</span>
            <span>{artifact.createdAt}</span>
            {artifact.metadata?.records && (
              <>
                <span>•</span>
                <span>{artifact.metadata.records} records</span>
              </>
            )}
          </div>

          {size === "large" && (
            <div className="mt-2 text-xs text-gray-600">
              CSV data export with financial records
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
