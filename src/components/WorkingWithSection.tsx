"use client";

interface WorkingWithSectionProps {
  artifacts: Array<{
    id: string;
    name: string;
    type: "spreadsheet" | "document" | "presentation" | "code" | "image" | "data";
    cellReference?: string;
    metadata?: {
      pages?: number;
      wordCount?: number;
      slideCount?: number;
      lines?: number;
      dimensions?: string;
      records?: number;
    };
  }>;
}

export const WorkingWithSection = ({ artifacts }: WorkingWithSectionProps) => {
  if (!artifacts || artifacts.length === 0) return null;

  const getArtifactIcon = (type: string) => {
    switch (type) {
      case "document":
        return (
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.81655 0H14.3998L21.5998 7.2V20.8755C21.5998 22.6027 20.1051 24 18.264 24H5.74197C3.89446 24 2.39978 22.6027 2.39978 20.8755V3.1244C2.39975 1.39727 3.96901 0 5.81655 0Z" fill="#2563EB" transform="scale(0.67)"></path>
            <text x="7" y="11" fill="white" fontSize="3" fontFamily="sans-serif">W</text>
          </svg>
        );
      case "presentation":
        return (
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.81655 0H14.3998L21.5998 7.2V20.8755C21.5998 22.6027 20.1051 24 18.264 24H5.74197C3.89446 24 2.39978 22.6027 2.39978 20.8755V3.1244C2.39975 1.39727 3.96901 0 5.81655 0Z" fill="#D97706" transform="scale(0.67)"></path>
            <text x="7" y="11" fill="white" fontSize="3" fontFamily="sans-serif">P</text>
          </svg>
        );
      case "code":
        return (
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.81655 0H14.3998L21.5998 7.2V20.8755C21.5998 22.6027 20.1051 24 18.264 24H5.74197C3.89446 24 2.39978 22.6027 2.39978 20.8755V3.1244C2.39975 1.39727 3.96901 0 5.81655 0Z" fill="#F7DF1E" transform="scale(0.67)"></path>
            <text x="6.5" y="11" fill="#323330" fontSize="3" fontFamily="monospace">JS</text>
          </svg>
        );
      case "image":
        return (
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.81655 0H14.3998L21.5998 7.2V20.8755C21.5998 22.6027 20.1051 24 18.264 24H5.74197C3.89446 24 2.39978 22.6027 2.39978 20.8755V3.1244C2.39975 1.39727 3.96901 0 5.81655 0Z" fill="#EC4899" transform="scale(0.67)"></path>
            <circle cx="8" cy="8" r="2" fill="white"></circle>
          </svg>
        );
      case "data":
        return (
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.81655 0H14.3998L21.5998 7.2V20.8755C21.5998 22.6027 20.1051 24 18.264 24H5.74197C3.89446 24 2.39978 22.6027 2.39978 20.8755V3.1244C2.39975 1.39727 3.96901 0 5.81655 0Z" fill="#16A34A" transform="scale(0.67)"></path>
            <rect x="5" y="6" width="6" height="4" stroke="white" strokeWidth="0.5" fill="none"></rect>
          </svg>
        );
      default: // spreadsheet
        return (
          <svg className="h-4 w-4" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.3335 2H11.2258C11.5773 1.99999 11.8805 1.99998 12.1302 2.02038C12.3938 2.04191 12.6559 2.08946 12.9082 2.21799C13.2845 2.40973 13.5904 2.7157 13.7822 3.09202C13.9107 3.34427 13.9582 3.60642 13.9798 3.86999C14.0002 4.11969 14.0002 4.42287 14.0002 4.77429V6H7.3335V2Z" fill="#008F6B" fillOpacity="1"></path>
            <path d="M6 2H4.77431C4.42289 1.99999 4.11969 1.99998 3.86999 2.02038C3.60642 2.04191 3.34427 2.08946 3.09202 2.21799C2.7157 2.40973 2.40973 2.7157 2.21799 3.09202C2.08946 3.34427 2.04191 3.60642 2.02038 3.86999C1.99998 4.11969 1.99999 4.42285 2 4.77425V6H6V2Z" fill="#008F6B" fillOpacity="1"></path>
            <path d="M2 7.33301V11.2253C1.99999 11.5768 1.99998 11.88 2.02038 12.1297C2.04191 12.3933 2.08946 12.6554 2.21799 12.9077C2.40973 13.284 2.7157 13.5899 3.09202 13.7817C3.34427 13.9102 3.60642 13.9577 3.86999 13.9793C4.11969 13.9997 4.42287 13.9997 4.77429 13.9997H6V7.33301H2Z" fill="#008F6B" fillOpacity="1"></path>
            <path d="M7.3335 13.9997H11.2259C11.5773 13.9997 11.8805 13.9997 12.1302 13.9793C12.3938 13.9577 12.6559 13.9102 12.9082 13.7817C13.2845 13.5899 13.5904 13.284 13.7822 12.9077C13.9107 12.6554 13.9582 12.3933 13.9798 12.1297C14.0002 11.88 14.0002 11.5768 14.0002 11.2254V7.33301H7.3335V13.9997Z" fill="#008F6B" fillOpacity="1"></path>
          </svg>
        );
    }
  };

  const getArtifactReference = (artifact: {
    type: string;
    cellReference?: string;
    metadata?: {
      pages?: number;
      slideCount?: number;
      lines?: number;
      dimensions?: string;
      records?: number;
    };
  }) => {
    switch (artifact.type) {
      case "spreadsheet": return artifact.cellReference || "A1";
      case "document": return `Page ${artifact.metadata?.pages || 1}`;
      case "presentation": return `Slide ${artifact.metadata?.slideCount || 1}`;
      case "code": return `Line ${artifact.metadata?.lines || 1}`;
      case "image": return artifact.metadata?.dimensions || "HD";
      case "data": return `${artifact.metadata?.records || 1000} rows`;
      default: return "File";
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-medium text-gray-600">Working with:</span>
        {artifacts.slice(0, 3).map((artifact, index) => (
          <div key={artifact.id} className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-2 rounded-xl border border-green-200">
            {getArtifactIcon(artifact.type)}
            <span className="text-sm font-medium">{getArtifactReference(artifact)}</span>
            <button className="ml-1 p-1 hover:bg-green-200 rounded-full transition-colors">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
