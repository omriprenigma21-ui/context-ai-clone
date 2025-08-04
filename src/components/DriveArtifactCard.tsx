"use client";

interface DriveArtifactCardProps {
  id: string;
  name: string;
  type: "spreadsheet" | "document" | "presentation" | "code" | "image" | "data";
  createdAt: string;
  panelWidth: number;
  onClick?: () => void;
}

export const DriveArtifactCard = ({
  id,
  name,
  type,
  createdAt,
  panelWidth,
  onClick
}: DriveArtifactCardProps) => {

  // Determine if we should show compact view based on panel width
  const isCompact = panelWidth < 35;
  const isVerySmall = panelWidth < 25;

  // Dynamic title truncation based on panel width
  const getTruncatedTitle = () => {
    if (isVerySmall && name.length > 8) {
      return name.substring(0, 8) + "...";
    } else if (isCompact && name.length > 12) {
      return name.substring(0, 12) + "...";
    } else if (name.length > 20) {
      return name.substring(0, 20) + "...";
    }
    return name;
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // This will now be handled by the parent DriveSection
      console.log("Artifact clicked:", id);
    }
  };

  const getTypeIcon = () => {
    const iconSize = isVerySmall ? "w-6 h-6" : isCompact ? "w-8 h-8" : "w-10 h-10";
    const textSize = isVerySmall ? "text-xs" : isCompact ? "text-sm" : "text-base";

    switch (type) {
      case "spreadsheet":
        return (
          <div className={`${iconSize} bg-green-600 rounded-lg flex items-center justify-center text-white font-bold ${textSize}`}>
            XLS
          </div>
        );
      case "document":
        return (
          <div className={`${iconSize} bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold ${textSize}`}>
            DOC
          </div>
        );
      case "presentation":
        return (
          <div className={`${iconSize} bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold ${textSize}`}>
            PPT
          </div>
        );
      case "code":
        return (
          <div className={`${iconSize} bg-yellow-600 rounded-lg flex items-center justify-center text-white font-bold ${textSize}`}>
            JS
          </div>
        );
      case "image":
        return (
          <div className={`${iconSize} bg-pink-600 rounded-lg flex items-center justify-center text-white font-bold ${textSize}`}>
            IMG
          </div>
        );
      case "data":
        return (
          <div className={`${iconSize} bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold ${textSize}`}>
            CSV
          </div>
        );
      default:
        return (
          <div className={`${iconSize} bg-gray-600 rounded-lg flex items-center justify-center text-white font-bold ${textSize}`}>
            FILE
          </div>
        );
    }
  };

  // Dynamic card height based on panel width
  const cardHeight = isVerySmall ? "h-20" : isCompact ? "h-24" : "h-32";
  const iconAreaHeight = isVerySmall ? "h-12" : isCompact ? "h-16" : "h-20";

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-200 ${cardHeight} flex flex-col`}
      onClick={handleClick}
    >
      {/* Grid background area with icon */}
      <div
        className={`${iconAreaHeight} flex-1 flex items-center justify-center relative overflow-hidden rounded-t-lg`}
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '12px 12px',
          backgroundColor: '#f9fafb'
        }}
      >
        {getTypeIcon()}
      </div>

      {/* Title and metadata */}
      <div className="p-2 flex-shrink-0">
        <div className="flex items-center gap-1 mb-1">
          {/* Type indicator icon */}
          <div className={`${isVerySmall ? 'w-3 h-3' : 'w-4 h-4'} grid grid-cols-2 gap-0.5 flex-shrink-0`}>
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-green-600 rounded-sm" />
            ))}
          </div>
          <span className={`font-medium text-gray-900 truncate ${isVerySmall ? 'text-xs' : 'text-sm'}`}>
            {getTruncatedTitle()}
          </span>
        </div>
        <div className={`text-gray-500 ${isVerySmall ? 'text-xs' : 'text-sm'}`}>
          {createdAt}
        </div>
      </div>
    </div>
  );
};
