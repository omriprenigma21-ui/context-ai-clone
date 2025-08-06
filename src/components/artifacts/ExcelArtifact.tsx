"use client";

import { Card } from "@/components/ui/card";

interface ExcelArtifactProps {
  artifact: {
    id: string;
    name: string;
    type: string;
    createdAt: string;
    size?: string;
    data?: unknown; // For storing the actual spreadsheet data
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

export const ExcelArtifact = ({ artifact, size = "large", onClick }: ExcelArtifactProps) => {
  // Sample financial data for preview - in a real app, this would come from the artifact's data
  const financialData = {
    totalRevenue: "$4,937,200.33",
    avgTransaction: "$16,187.54",
    dataSources: "Salesforce + QuickBooks"
  };

  return (
    <Card
      className={`${
        size === "small" ? "p-3" : "p-4"
      } border border-gray-200 cursor-pointer hover:shadow-md transition-shadow`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        {/* Excel Icon */}
        <div className={`${
          size === "small" ? "w-8 h-8" : "w-10 h-10"
        } bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0`}>
          <svg
            className={`${size === "small" ? "w-5 h-5" : "w-6 h-6"}`}
            width="24"
            height="24"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.3335 2H11.2258C11.5773 1.99999 11.8805 1.99998 12.1302 2.02038C12.3938 2.04191 12.6559 2.08946 12.9082 2.21799C13.2845 2.40973 13.5904 2.7157 13.7822 3.09202C13.9107 3.34427 13.9582 3.60642 13.9798 3.86999C14.0002 4.11969 14.0002 4.42287 14.0002 4.77429V6H7.3335V2Z" fill="#008F6B" fillOpacity="1"></path>
            <path d="M6 2H4.77431C4.42289 1.99999 4.11969 1.99998 3.86999 2.02038C3.60642 2.04191 3.34427 2.08946 3.09202 2.21799C2.7157 2.40973 2.40973 2.7157 2.21799 3.09202C2.08946 3.34427 2.04191 3.60642 2.02038 3.86999C1.99998 4.11969 1.99999 4.42285 2 4.77425V6H6V2Z" fill="#008F6B" fillOpacity="1"></path>
            <path d="M2 7.33301V11.2253C1.99999 11.5768 1.99998 11.88 2.02038 12.1297C2.04191 12.3933 2.08946 12.6554 2.21799 12.9077C2.40973 13.284 2.7157 13.5899 3.09202 13.7817C3.34427 13.9102 3.60642 13.9577 3.86999 13.9793C4.11969 13.9997 4.42287 13.9997 4.77429 13.9997H6V7.33301H2Z" fill="#008F6B" fillOpacity="1"></path>
            <path d="M7.3335 13.9997H11.2259C11.5773 13.9997 11.8805 13.9997 12.1302 13.9793C12.3938 13.9577 12.6559 13.9102 12.9082 13.7817C13.2845 13.5899 13.5904 13.284 13.7822 12.9077C13.9107 12.6554 13.9582 12.3933 13.9798 12.1297C14.0002 11.88 14.0002 11.5768 14.0002 11.2254V7.33301H7.3335V13.9997Z" fill="#008F6B" fillOpacity="1"></path>
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
            <span>Spreadsheet</span>
            <span>•</span>
            <span>{artifact.createdAt}</span>
          </div>

          {size === "large" && (
            <div className="mt-2">
              <div className="text-xs text-gray-600">
                Dynamic financial performance spreadsheet with revenue data integration
              </div>

              {/* Preview of spreadsheet data */}
              <div className="mt-2 border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-gray-50 px-2 py-1 border-b border-gray-200">
                  <div className="text-xs font-medium text-gray-700">Financial Performance Executive Summary</div>
                </div>
                <div className="p-2 bg-white">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Total Revenue:</span>
                      <span className="font-medium text-gray-900">{financialData.totalRevenue}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Avg Transaction:</span>
                      <span className="font-medium text-gray-900">{financialData.avgTransaction}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Data Sources:</span>
                      <span className="font-medium text-gray-900">{financialData.dataSources}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
