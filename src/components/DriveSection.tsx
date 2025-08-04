"use client";

import { useState, useMemo } from "react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArtifactRenderer } from "@/components/artifacts/ArtifactRenderer";
import { DriveArtifactCard } from "@/components/DriveArtifactCard";
import { ArtifactViewer } from "@/components/artifacts/ArtifactViewer";
import { UniverViewer } from "@/components/artifacts/UniverViewer";
import {
  Share,
  Home,
  ChevronRight,
  ChevronLeft,
  Filter,
  List,
  Grid3X3,
  Search,
  Folder,
  FileText,
  Upload,
  MoreHorizontal,
  Download,
  ExternalLink
} from "lucide-react";

interface DriveSectionProps {
  panelWidth?: number;
}

const DriveSection = ({ panelWidth = 50 }: DriveSectionProps) => {
  const { state } = useApp();
  const [currentView, setCurrentView] = useState("creations"); // "creations" or "projects"
  const [selectedArtifact, setSelectedArtifact] = useState<{
    id: string;
    name: string;
    type: "spreadsheet" | "document" | "presentation" | "code" | "image" | "data";
    createdAt: string;
    size?: string;
    data?: any;
  } | null>(null);
  const [showFullscreenViewer, setShowFullscreenViewer] = useState(false);

  // Generate a stable container ID for each selected artifact
  const inlineViewerId = useMemo(() => {
    if (!selectedArtifact) return `inline-viewer-default`;
    return `inline-viewer-${selectedArtifact.id}`;
  }, [selectedArtifact?.id]);

  const handleArtifactClick = (artifact: {
    id: string;
    name: string;
    type: "spreadsheet" | "document" | "presentation" | "code" | "image" | "data";
    createdAt: string;
    size?: string;
    data?: any;
  }) => {
    setSelectedArtifact(artifact);
    setCurrentView("artifact-viewer");
  };

  const handleBackToCreations = () => {
    setSelectedArtifact(null);
    setCurrentView("creations");
  };

  const handleFullscreenView = () => {
    setShowFullscreenViewer(true);
  };

  // Determine if the selected artifact is compatible with Univer
  const isUniverCompatible = selectedArtifact &&
    ["spreadsheet", "document", "presentation"].includes(selectedArtifact.type);

  // Determine view type based on panel width
  const isCompactView = panelWidth < 25; // Switch to compact view when less than 25%
  const isNarrowView = panelWidth < 35;  // Simplified view when less than 35%

  const getArtifactIcon = (artifact: { type: string }) => {
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

    const color = iconColors[artifact.type as keyof typeof iconColors] || iconColors.spreadsheet;
    const bgColor = bgColors[artifact.type as keyof typeof bgColors] || bgColors.spreadsheet;

    return (
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded" style={{ backgroundColor: bgColor }}>
        <svg className="h-4 w-4" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="3" fill={color}></circle>
        </svg>
      </div>
    );
  };

  return (
    <div className="bg-white relative h-full w-full overflow-hidden shadow-[-0.5px_0_0_0_rgba(0,0,0,0.1)]">
      <div className="absolute inset-0 z-20" style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out', visibility: 'hidden', pointerEvents: 'none' }}></div>
      <div className="relative h-full w-full overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-[0px] block">
        {/* Top Header */}
        <div className="hidden w-full md:block">
          <div className="flex h-14 items-center gap-2.5 px-4">
            <div className="flex items-center gap-0.5 font-medium">
              <div className="text-sm">Context Drive</div>
            </div>
            <div className="flex-auto"></div>
            <div className="flex h-10 items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 !text-secondary hover:!text-primary relative rounded-[10px] bg-transparent hover:bg-transparent">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
                  <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
                </svg>
                <span className="bg-destructive absolute -top-1 -right-1 flex h-4 items-center justify-center rounded-full text-xs text-white w-4">1</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Header Spacer */}
        <div className="block h-18 shrink-0 md:hidden"></div>

        {/* Breadcrumbs */}
        <div className="mt-2 px-4">
          <div className="flex items-center gap-1">
            <span className="font-book text-secondary text-base">{state.taskTitle || "New Project"}</span>
            <ChevronRight className="text-secondary h-3.5 w-3.5" strokeWidth="2.25" />
            {currentView === "artifact-viewer" && selectedArtifact ? (
              <>
                <button onClick={handleBackToCreations} className="font-book text-base text-secondary hover:text-[#007ca7]">
                  Creations
                </button>
                <ChevronRight className="text-secondary h-3.5 w-3.5" strokeWidth="2.25" />
                <span className="font-book text-base text-[#007ca7]">{selectedArtifact.name}</span>
              </>
            ) : (
              <span className="font-book text-base text-[#007ca7]">Creations</span>
            )}
          </div>
        </div>

        {/* Artifacts Display - Responsive based on width */}
        {currentView === "artifact-viewer" && selectedArtifact ? (
          // Inline Artifact Viewer within Drive Panel
          <div className="flex flex-col h-full">
            {/* Artifact Viewer Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" onClick={handleBackToCreations} className="h-8 w-8 p-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="bg-green-600 rounded-sm" />
                  ))}
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-900 truncate">{selectedArtifact.name}</h2>
                  <p className="text-xs text-gray-500">{selectedArtifact.createdAt}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </Button>

                <Button variant="ghost" size="sm" onClick={handleFullscreenView} className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </Button>

                <Button size="sm" className="h-8 px-3 bg-green-600 hover:bg-green-700 text-white text-xs">
                  Export
                </Button>
              </div>
            </div>

            {/* Artifact Content - Now using Univer for compatible artifacts */}
            <div className="flex-1 bg-gray-50" style={{ minHeight: '500px' }}>
              {isUniverCompatible ? (
                <div className="w-full h-full bg-white rounded-lg border border-gray-200 m-4" style={{ minHeight: '450px' }}>
                  <UniverViewer
                    artifactType={selectedArtifact.type as "spreadsheet" | "document" | "presentation"}
                    containerId={inlineViewerId}
                    data={selectedArtifact.data}
                  />
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 grid grid-cols-2 gap-1">
                        {[1,2,3,4].map((i) => (
                          <div key={i} className="bg-green-600 rounded-sm" />
                        ))}
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {selectedArtifact.type === "spreadsheet" ? "Excel Spreadsheet" :
                      selectedArtifact.type === "document" ? "Document" :
                      selectedArtifact.type === "presentation" ? "Presentation" : "File"} Viewer
                    </h3>
                    <p className="text-gray-500 mb-4 max-w-sm">
                      {selectedArtifact.type === "spreadsheet"
                        ? "Excel viewer will be integrated here using Univer"
                        : "Content viewer will be implemented based on file type"
                      }
                    </p>
                    <div className="text-sm text-gray-400">
                      File: {selectedArtifact.name}<br/>
                      {selectedArtifact.size && `Size: ${selectedArtifact.size}`}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : isCompactView ? (
          // Compact grid view for narrow panels (1-2 columns)
          <div className="p-4 pt-3">
            {state.currentPhase === "completed" && state.artifacts.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {state.artifacts.slice(0, 4).map((artifact) => (
                  <DriveArtifactCard
                    key={artifact.id}
                    id={artifact.id}
                    name={artifact.name}
                    type={artifact.type}
                    createdAt={artifact.createdAt}
                    panelWidth={panelWidth}
                    onClick={() => handleArtifactClick(artifact)}
                  />
                ))}
                {state.artifacts.length > 4 && (
                  <div className="text-xs text-gray-500 text-center pt-2">
                    +{state.artifacts.length - 4} more
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500">No creations yet</p>
              </div>
            )}
          </div>
        ) : (
          // Regular grid view for wider panels - Dynamic columns based on panel width
          <div id="artifacts-grid" className={`relative grid gap-3 p-4 pt-3 ${
            panelWidth < 35 ? 'grid-cols-2' :
            panelWidth < 50 ? 'grid-cols-3' :
            panelWidth < 70 ? 'grid-cols-4' :
            'grid-cols-5'
          }`}>
            {state.currentPhase === "completed" && state.artifacts.length > 0 ? (
              // Show generated artifacts with new card design
              state.artifacts.map((artifact) => (
                <DriveArtifactCard
                  key={artifact.id}
                  id={artifact.id}
                  name={artifact.name}
                  type={artifact.type}
                  createdAt={artifact.createdAt}
                  panelWidth={panelWidth}
                  onClick={() => handleArtifactClick(artifact)}
                />
              ))
            ) : (
              // Show empty state
              <div className="col-span-full">
                <div className="flex h-60 flex-col items-center justify-center gap-3 pb-5 text-center xl:h-60">
                  <svg width="54" height="50" viewBox="0 0 54 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g mask="url(#mask0_3801_11556)">
                      <path d="M36.3877 39.3475L42.0562 41.0212C42.3393 41.1048 42.6051 41.0786 42.8534 40.9425C43.1018 40.8065 43.268 40.596 43.3521 40.3112C43.4357 40.0281 43.41 39.7625 43.2751 39.5145C43.1401 39.2664 42.9311 39.1006 42.648 39.017L36.9737 37.3416C36.6906 37.258 36.4251 37.2837 36.1771 37.4186C35.929 37.5537 35.7631 37.7628 35.6795 38.0459C35.596 38.329 35.6219 38.5957 35.7574 38.8459C35.8929 39.0962 36.103 39.2634 36.3877 39.3475Z" fill="#666666"></path>
                    </g>
                    <g mask="url(#mask1_3801_11556)">
                      <path d="M7.96471 46.1342C7.34043 46.2164 6.77949 46.0666 6.2819 45.6848C5.7843 45.3029 5.49441 44.7999 5.41222 44.1756L3.60359 30.4377C3.5214 29.8134 3.67121 29.2524 4.05303 28.7549C4.43485 28.2573 4.9379 27.9674 5.56218 27.8852L19.3001 26.0765C19.9244 25.9944 20.4853 26.1442 20.9829 26.526C21.4805 26.9078 21.7704 27.4109 21.8526 28.0351L23.6613 41.7731C23.7434 42.3974 23.5936 42.9583 23.2118 43.4559C22.83 43.9535 22.3269 44.2434 21.7027 44.3256L7.96471 46.1342Z" fill="#666666"></path>
                    </g>
                    <g mask="url(#mask2_3801_11556)">
                      <path d="M15.5582 18.784L16.4041 4.95337C16.4423 4.32887 16.6973 3.80789 17.1692 3.39042C17.641 2.97294 18.1892 2.78331 18.8137 2.8215L32.6444 3.66742C33.2689 3.70562 33.7899 3.96065 34.2073 4.43251C34.6248 4.90438 34.8144 5.45256 34.7763 6.07706L33.9303 19.9077C33.8921 20.5322 33.6371 21.0532 33.1652 21.4707C32.6934 21.8881 32.1452 22.0778 31.5207 22.0396L17.69 21.1937C17.0655 21.1555 16.5446 20.9004 16.1271 20.4286C15.7096 19.9567 15.52 19.4085 15.5582 18.784Z" fill="#666666"></path>
                    </g>
                  </svg>
                  <div className="flex max-w-48 flex-col items-center gap-3">
                    <h3 className="text-secondary text-sm font-medium">Creations you make will show up here</h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Separator */}
        <div className="mt-2 w-full px-4">
          <div className="bg-gray-200 h-px w-full rounded-full"></div>
        </div>

        {/* Projects Navigation */}
        <div className="mt-3">
          <ProjectsView onArtifactClick={handleArtifactClick} />
        </div>
      </div>

      {/* Fullscreen Artifact Viewer */}
      {showFullscreenViewer && selectedArtifact && (
        <ArtifactViewer
          artifact={selectedArtifact}
          onClose={() => {
            setShowFullscreenViewer(false);
          }}
        />
      )}
    </div>
  );
};

const ProjectsView = ({ onArtifactClick }: {
  onArtifactClick: (artifact: {
    id: string;
    name: string;
    type: "spreadsheet" | "document" | "presentation" | "code" | "image" | "data";
    createdAt: string;
    size?: string;
  }) => void
}) => {
  const { state } = useApp();

  const getArtifactIcon = (artifact: { type: "spreadsheet" | "document" | "presentation" | "code" | "image" | "data"; name: string }) => {
    const iconColors: Record<string, string> = {
      spreadsheet: "#008F6B",
      document: "#2563EB",
      presentation: "#D97706",
      code: "#F7DF1E",
      image: "#EC4899",
      data: "#16A34A"
    };

    const bgColors: Record<string, string> = {
      spreadsheet: "rgb(229, 242, 239)",
      document: "rgb(219, 234, 254)",
      presentation: "rgb(254, 243, 199)",
      code: "rgb(254, 249, 195)",
      image: "rgb(252, 231, 243)",
      data: "rgb(220, 252, 231)"
    };

    const color = iconColors[artifact.type] || iconColors.spreadsheet;
    const bgColor = bgColors[artifact.type] || bgColors.spreadsheet;

    const getIconPath = () => {
      switch (artifact.type) {
        case "document":
          return "M8.5 17.2L6.8 11h1.4l1.1 4.7L10.5 11h1l1.2 4.7L13.8 11h1.4l-1.7 6.2h-1.2l-1.2-4.5-1.2 4.5H8.5z";
        case "presentation":
          return "M8.5 11h3c1.1 0 2 .9 2 2s-.9 2-2 2h-3v2h-1V11h1zm3 3c.6 0 1-.4 1-1s-.4-1-1-1h-3v2h3z";
        case "code":
          return "M10 11h1v4c0 1.1-.9 2-2 2s-2-.9-2-2h1c0 .6.4 1 1 1s1-.4 1-1v-4zm3 0h3v1h-2v1h2v1h-2v1h2v1h-3v-5z";
        case "image":
          return "M12 9l3 6H9l3-6z";
        case "data":
          return "M8 10h8v1H8v-1zm1 2h6v1H9v-1zm1 2h4v1h-4v-1zm-1 2h6v1H9v-1z";
        default: // spreadsheet
          return "M7.3335 2H11.2258C11.5773 1.99999 11.8805 1.99998 12.1302 2.02038C12.3938 2.04191 12.6559 2.08946 12.9082 2.21799C13.2845 2.40973 13.5904 2.7157 13.7822 3.09202C13.9107 3.34427 13.9582 3.60642 13.9798 3.86999C14.0002 4.11969 14.0002 4.42287 14.0002 4.77429V6H7.3335V2Z M6 2H4.77431C4.42289 1.99999 4.11969 1.99998 3.86999 2.02038C3.60642 2.04191 3.34427 2.08946 3.09202 2.21799C2.7157 2.40973 2.40973 2.7157 2.21799 3.09202C2.08946 3.34427 2.04191 3.60642 2.02038 3.86999C1.99998 4.11969 1.99999 4.42285 2 4.77425V6H6V2Z M2 7.33301V11.2253C1.99999 11.5768 1.99998 11.88 2.02038 12.1297C2.04191 12.3933 2.08946 12.6554 2.21799 12.9077C2.40973 13.284 2.7157 13.5899 3.09202 13.7817C3.34427 13.9102 3.60642 13.9577 3.86999 13.9793C4.11969 13.9997 4.42287 13.9997 4.77429 13.9997H6V7.33301H2Z M7.3335 13.9997H11.2259C11.5773 13.9997 11.8805 13.9997 12.1302 13.9793C12.3938 13.9577 12.6559 13.9102 12.9082 13.7817C13.2845 13.5899 13.5904 13.284 13.7822 12.9077C13.9107 12.6554 13.9582 12.3933 13.9798 12.1297C14.0002 11.88 14.0002 11.5768 14.0002 11.2254V7.33301H7.3335V13.9997Z";
      }
    };

    return (
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded" style={{ backgroundColor: bgColor }}>
        <svg className="h-4 w-4" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={getIconPath()} fill={color} fillOpacity="1"></path>
        </svg>
      </div>
    );
  };

  const getArtifactTypeLabel = (artifact: { type: string }) => {
    switch (artifact.type) {
      case "document": return "Document";
      case "presentation": return "Presentation";
      case "code": return "Code";
      case "image": return "Image";
      case "data": return "Data";
      default: return "Creation";
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative box-border flex h-full flex-col gap-2 px-4 pt-1 pb-2">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-shrink-0 items-center gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex w-full items-center justify-between">
              <div className="mr-2 flex items-center gap-1">
                <Button variant="ghost" size="sm" className="text-secondary cursor-pointer hover:text-[#007ca7] disabled:pointer-events-none disabled:opacity-40 h-4 w-4 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="scrollbar-none @container flex-1 overflow-x-scroll">
                <div className="flex h-full min-h-[28px] w-full items-center gap-1 px-0.5">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="font-book text-base whitespace-nowrap transition-all duration-150 cursor-pointer text-secondary hover:text-[#007ca7] hover:underline p-0 h-auto">
                      Home
                    </Button>
                    <ChevronRight className="text-secondary h-3.5 w-3.5" strokeWidth="2.25" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="font-book text-base whitespace-nowrap transition-all duration-150 cursor-pointer text-secondary hover:text-[#007ca7] hover:underline p-0 h-auto">
                      Projects
                    </Button>
                    <ChevronRight className="text-secondary h-3.5 w-3.5" strokeWidth="2.25" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="font-book text-base whitespace-nowrap transition-all duration-150 cursor-pointer text-[#007ca7] p-0 h-auto">
                      {state.taskTitle || "New Project"}
                    </Button>
                    <div className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ml-2 rounded-sm border-none bg-gray-100/50 px-1.5 py-0 text-xs font-normal text-[#007ca7] hover:bg-gray-100/70"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* File Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-tertiary hover:text-primary focus-visible:bg-surface-container-opacity flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors" title="Upload files">
              <Upload className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-tertiary hover:text-secondary" title="Sort">
              <Filter className="h-4 w-4" />
            </Button>
            <div className="bg-surface-container-low flex items-center gap-1 rounded-lg p-1">
              <Button variant="ghost" size="sm" className="flex cursor-pointer items-center justify-center rounded-md px-3 py-1.5 transition-all duration-200 bg-surface-container-high text-primary shadow-sm">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="flex cursor-pointer items-center justify-center rounded-md px-3 py-1.5 transition-all duration-200 text-tertiary hover:text-secondary hover:bg-surface-container-high/50">
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* File List Header */}
        <div className="border-surface-container-low grid h-[32px] w-full flex-shrink-0 grid-cols-[2fr_1fr_1fr_1fr_1fr_40px] items-center gap-3 border-b pr-1.5 text-ellipsis bg-[var(--surface-container-low)]">
          <div className="flex items-center pl-1">
            <span className="text-tertiary text-sm font-medium">Name</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-tertiary text-sm font-medium">Type</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-tertiary text-sm font-medium">Created</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-tertiary text-sm font-medium">Modified</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-tertiary text-sm font-medium">Owner</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-tertiary text-sm font-medium">Actions</span>
          </div>
        </div>

        {/* File List Content */}
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-auto">
            {state.currentPhase === "initial" ? (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-8 p-8">
                <svg width="200" height="200" viewBox="0 0 200 200" className="block h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48">
                  <path d="M50 60h100v80H50V60zm10 10v60h80V70H60z" fill="#E5E7EB"/>
                  <path d="M70 85h60v5H70v-5zm0 15h60v5H70v-5zm0 15h40v5H70v-5z" fill="#9CA3AF"/>
                </svg>
                <div className="text-center">
                  <h3 className="text-secondary mb-1 text-sm font-medium">This folder is empty</h3>
                  <p className="text-tertiary text-xs">Upload files or create new content to get started</p>
                </div>
              </div>
            ) : state.currentPhase === "completed" && state.artifacts.length > 0 ? (
              <div className="flex flex-col items-center py-1">
                {state.artifacts.map((artifact) => (
                  <div
                    key={artifact.id}
                    className="group hover:bg-surface-container-low-opacity mb-2 grid h-[46px] w-full cursor-pointer grid-cols-[2fr_1fr_1fr_1fr_1fr_40px] items-center gap-3 rounded-lg bg-transparent pr-1.5 text-ellipsis select-none"
                    onClick={() => onArtifactClick(artifact)}
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="flex-shrink-0">
                        {getArtifactIcon(artifact)}
                      </div>
                      <span className="text-semi-primary truncate overflow-hidden text-sm font-medium whitespace-nowrap">{artifact.name}</span>
                    </div>
                    <div className="flex items-center justify-center text-ellipsis">
                      <div className="text-tertiary text-sm">{getArtifactTypeLabel(artifact)}</div>
                    </div>
                    <div className="flex items-center justify-center text-ellipsis">
                      <div className="text-tertiary text-sm">{artifact.createdAt}</div>
                    </div>
                    <div className="flex items-center justify-center text-ellipsis">
                      <div className="text-tertiary text-sm">{artifact.createdAt}</div>
                    </div>
                    <div className="flex items-center justify-center text-ellipsis">
                      <span className="relative flex size-8 shrink-0 overflow-hidden rounded-full h-5 w-5">
                        <span className="flex size-full items-center justify-center rounded-full text-xs">E</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div>
                        <button className="hover:bg-surface-container-low rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100" type="button">
                          <MoreHorizontal className="text-tertiary h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1 p-2">
                <div className="text-secondary text-sm p-4 text-center">
                  Project files and agent outputs will appear here
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriveSection;
