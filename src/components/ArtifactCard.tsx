"use client";

import { useState } from "react";

interface ArtifactCardProps {
  id: string;
  name: string;
  type: "spreadsheet" | "document" | "presentation";
  createdAt: string;
  size?: "small" | "large";
  onClick?: () => void;
}

const ArtifactCard = ({ id, name, type, createdAt, size = "large", onClick }: ArtifactCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    switch (type) {
      case "spreadsheet":
        return (
          <svg className="h-9 w-9" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.81655 0H14.3998L21.5998 7.2V20.8755C21.5998 22.6027 20.1051 24 18.264 24H5.74197C3.89446 24 2.39978 22.6027 2.39978 20.8755V3.1244C2.39975 1.39727 3.96901 0 5.81655 0Z" fill="#008F6B"></path>
            <path d="M14.4148 4.896V0L21.5994 7.2H16.8097C14.6543 7.2 14.315 5.664 14.4148 4.896Z" fill="white" fillOpacity="0.3"></path>
            <path d="M8.06755 17.2074L6.66355 15.285H7.74895L8.61295 16.4676L9.48235 15.285H10.5516L9.14215 17.1912L10.6164 19.2H9.53095L8.59675 17.931L7.66255 19.2H6.59875L8.06755 17.2074ZM11.835 18.3846H13.7142V19.2H10.9116V15.285H11.835V18.3846ZM15.4367 15.96C15.0803 15.96 14.8157 16.095 14.8157 16.338C14.8157 16.5324 14.9993 16.6728 15.2693 16.7322L15.8039 16.8402C16.4357 16.9698 17.2349 17.1642 17.2349 17.985C17.2349 18.8058 16.4087 19.2702 15.5933 19.2702C14.5889 19.2702 13.9301 18.768 13.7897 17.9256H14.7077C14.8103 18.336 15.1343 18.525 15.6149 18.525C15.9281 18.525 16.2845 18.4224 16.2845 18.0984C16.2845 17.8446 15.9821 17.7204 15.5555 17.6286L15.0803 17.5314C14.4431 17.3964 13.8653 17.094 13.8653 16.392C13.8653 15.5928 14.7239 15.2202 15.4907 15.2202C16.2575 15.2202 16.9865 15.555 17.1215 16.419H16.2089C16.1171 16.1274 15.8309 15.96 15.4367 15.96Z" fill="white"></path>
          </svg>
        );
      case "document":
        return (
          <svg className="h-9 w-9" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.81655 0H14.3998L21.5998 7.2V20.8755C21.5998 22.6027 20.1051 24 18.264 24H5.74197C3.89446 24 2.39978 22.6027 2.39978 20.8755V3.1244C2.39975 1.39727 3.96901 0 5.81655 0Z" fill="#007CA6"></path>
            <path d="M14.4148 4.896V0L21.5994 7.2H16.8097C14.6543 7.2 14.315 5.664 14.4148 4.896Z" fill="white" fillOpacity="0.3"></path>
            <path d="M7.34275 15.9656C8.62255 15.9656 9.63235 16.43 9.63235 17.9204C9.63235 19.4162 8.62255 19.8806 7.34275 19.8806H6.05215V15.9656H7.34275ZM7.35895 16.7432H6.97555V19.103H7.35895C8.03935 19.103 8.65495 18.9572 8.65495 17.9204C8.65495 16.889 8.03935 16.7432 7.35895 16.7432ZM12.0004 19.9508C10.7962 19.9508 9.97002 19.1462 9.97002 17.9258C9.97002 16.7054 10.7962 15.9008 12.0004 15.9008C13.1992 15.9008 14.0308 16.7054 14.0308 17.9258C14.0308 19.1462 13.1992 19.9508 12.0004 19.9508ZM12.0004 19.1894C12.5728 19.1894 13.0534 18.7574 13.0534 17.9258C13.0534 17.0942 12.5728 16.6622 12.0004 16.6622C11.428 16.6622 10.9474 17.0942 10.9474 17.9258C10.9474 18.7574 11.428 19.1894 12.0004 19.1894ZM18.1965 18.4226C18.0561 19.3298 17.3217 19.9508 16.3335 19.9508C15.1131 19.9508 14.3733 19.1732 14.3733 17.9204C14.3733 16.6838 15.1401 15.9008 16.3605 15.9008C17.3433 15.9008 18.0345 16.538 18.1695 17.429H17.2623C17.1597 16.8944 16.7655 16.6622 16.3281 16.6622C15.7773 16.6622 15.3507 17.1212 15.3507 17.9204C15.3507 18.7466 15.7773 19.1894 16.3389 19.1894C16.7385 19.1894 17.1813 19.0166 17.2893 18.4226H18.1965Z" fill="white"></path>
          </svg>
        );
      case "presentation":
        return (
          <svg className="h-9 w-9" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.81655 0H14.3998L21.5998 7.2V20.8755C21.5998 22.6027 20.1051 24 18.264 24H5.74197C3.89446 24 2.39978 22.6027 2.39978 20.8755V3.1244C2.39975 1.39727 3.96901 0 5.81655 0Z" fill="#D97706"></path>
            <path d="M14.4148 4.896V0L21.5994 7.2H16.8097C14.6543 7.2 14.315 5.664 14.4148 4.896Z" fill="white" fillOpacity="0.3"></path>
            <path d="M7.5 15.5h9v1H7.5v-1zm0 2h7v1H7.5v-1zm0 2h5v1H7.5v-1z" fill="white"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  const getSmallIcon = () => {
    switch (type) {
      case "spreadsheet":
        return (
          <svg className="h-4 w-4" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.3335 2H11.2258C11.5773 1.99999 11.8805 1.99998 12.1302 2.02038C12.3938 2.04191 12.6559 2.08946 12.9082 2.21799C13.2845 2.40973 13.5904 2.7157 13.7822 3.09202C13.9107 3.34427 13.9582 3.60642 13.9798 3.86999C14.0002 4.11969 14.0002 4.42287 14.0002 4.77429V6H7.3335V2Z" fill="#008F6B" fillOpacity="1"></path>
            <path d="M6 2H4.77431C4.42289 1.99999 4.11969 1.99998 3.86999 2.02038C3.60642 2.04191 3.34427 2.08946 3.09202 2.21799C2.7157 2.40973 2.40973 2.7157 2.21799 3.09202C2.08946 3.34427 2.04191 3.60642 2.02038 3.86999C1.99998 4.11969 1.99999 4.42285 2 4.77425V6H6V2Z" fill="#008F6B" fillOpacity="1"></path>
            <path d="M2 7.33301V11.2253C1.99999 11.5768 1.99998 11.88 2.02038 12.1297C2.04191 12.3933 2.08946 12.6554 2.21799 12.9077C2.40973 13.284 2.7157 13.5899 3.09202 13.7817C3.34427 13.9102 3.60642 13.9577 3.86999 13.9793C4.11969 13.9997 4.42287 13.9997 4.77429 13.9997H6V7.33301H2Z" fill="#008F6B" fillOpacity="1"></path>
            <path d="M7.3335 13.9997H11.2259C11.5773 13.9997 11.8805 13.9997 12.1302 13.9793C12.3938 13.9577 12.6559 13.9102 12.9082 13.7817C13.2845 13.5899 13.5904 13.284 13.7822 12.9077C13.9107 12.6554 13.9582 12.3933 13.9798 12.1297C14.0002 11.88 14.0002 11.5768 14.0002 11.2254V7.33301H7.3335V13.9997Z" fill="#008F6B" fillOpacity="1"></path>
          </svg>
        );
      case "document":
        return (
          <svg className="h-4 w-4" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 3h12v10H2V3zm1 1v8h10V4H3z" fill="#007CA6"></path>
            <path d="M4 6h8v1H4V6zm0 2h6v1H4V8zm0 2h4v1H4v-1z" fill="#007CA6"></path>
          </svg>
        );
      case "presentation":
        return (
          <svg className="h-4 w-4" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 3h12v8H2V3zm1 1v6h10V4H3z" fill="#D97706"></path>
            <path d="M4 6h6v1H4V6zm0 2h4v1H4V8z" fill="#D97706"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "spreadsheet":
        return "rgba(8, 147, 85, 0.24)";
      case "document":
        return "rgba(0, 124, 166, 0.24)";
      case "presentation":
        return "rgba(217, 119, 6, 0.24)";
      default:
        return "rgba(0, 0, 0, 0.1)";
    }
  };

  if (size === "small") {
    return (
      <div
        className="bg-gray-50 flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:bg-gray-100 border border-gray-200"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-gray-900 truncate">{name}</div>
          <div className="text-xs text-gray-500">{type.charAt(0).toUpperCase() + type.slice(1)} · Created</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="window-space-filler relative transition-[z-index] cursor-pointer z-0 duration-300"
      style={{ width: '77px', height: '105px' }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="group flex h-full w-full flex-col transition-opacity hover:opacity-90" style={{ width: '100%', height: '100%', opacity: 1 }}>
        <div className="app-container bg-surface-container relative flex w-full flex-shrink-0 flex-col items-center overflow-hidden shadow-lg" style={{ aspectRatio: '1.77778 / 1', borderRadius: '12px' }}>
          <div style={{ opacity: 1, transition: 'opacity 0.3s ease-in-out 0.1s' }}>
            <div
              className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
              style={{ boxShadow: `${getBackgroundColor()} 0px 0px 36px -8px inset` }}
            >
              {getIcon()}
            </div>
            <img
              alt={`${type} Card Background`}
              className="absolute inset-0 h-full w-full object-cover dark:hidden"
              draggable="false"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTIwIiBmaWxsPSIjZjlmYWZiIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzAwOEY2QiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+"
            />
          </div>
          <div className="flex-auto"></div>
        </div>
        <div className="mt-3 mb-1.5 px-1">
          <h3 className="text-primary flex items-center gap-1.5 text-sm font-medium">
            <span className="flex-shrink-0">
              {getSmallIcon()}
            </span>
            <span className="truncate">{name}</span>
          </h3>
        </div>
        <div className="flex items-center justify-between px-1 pb-2">
          <span className="text-tertiary text-xs">{createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default ArtifactCard;
