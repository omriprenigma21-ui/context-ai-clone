"use client";

import { Card } from "@/components/ui/card";

interface PresentationArtifactProps {
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

export const PresentationArtifact = ({ artifact, size = "large", onClick }: PresentationArtifactProps) => {
  return (
    <Card
      className={`${
        size === "small" ? "p-3" : "p-4"
      } border border-gray-200 cursor-pointer hover:shadow-md transition-shadow`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        {/* Presentation Icon */}
        <div className={`${
          size === "small" ? "w-8 h-8" : "w-10 h-10"
        } bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0`}>
          <svg className={`${size === "small" ? "w-5 h-5" : "w-6 h-6"}`} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.81655 0H14.3998L21.5998 7.2V20.8755C21.5998 22.6027 20.1051 24 18.264 24H5.74197C3.89446 24 2.39978 22.6027 2.39978 20.8755V3.1244C2.39975 1.39727 3.96901 0 5.81655 0Z" fill="#D97706" transform="scale(0.67)"></path>
            <text x="7" y="11" fill="white" fontSize="3" fontFamily="sans-serif">P</text>
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
            <span>Presentation</span>
            <span>•</span>
            <span>{artifact.createdAt}</span>
            {artifact.metadata?.slideCount && (
              <>
                <span>•</span>
                <span>{artifact.metadata.slideCount} slides</span>
              </>
            )}
          </div>

          {size === "large" && (
            <div className="mt-2 text-xs text-gray-600">
              Financial performance presentation with charts and insights
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
