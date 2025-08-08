"use client";

import { useState, useRef, useCallback } from "react";
import { useApp } from "@/contexts/AppContext";
import Sidebar from "@/components/Sidebar";
import DriveSection from "@/components/DriveSection";
import ChatSection from "@/components/ChatSection";
import InitialView from "@/components/InitialView";

export default function Home() {
  const { state } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [drivePanelWidth, setDrivePanelWidth] = useState(50); // 50% default - equal panels
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      let newWidth = (mouseX / containerRect.width) * 100;

      // Allow full range dragging but with smart snapping zones
      if (newWidth < 12) {
        newWidth = 0; // Snap to full left (hide drive panel)
      } else if (newWidth > 88) {
        newWidth = 100; // Snap to full right (hide chat panel)
      } else {
        // Allow the full range but prefer the 15-85 range for normal use
        newWidth = Math.max(0, Math.min(100, newWidth));

        // Snap to reasonable bounds if close
        if (newWidth > 0 && newWidth < 15) {
          newWidth = 15;
        } else if (newWidth > 85 && newWidth < 100) {
          newWidth = 85;
        }
      }

      setDrivePanelWidth(newWidth);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  const chatPanelWidth = 100 - drivePanelWidth;
  const isChatExpanded = chatPanelWidth > 60;

  if (state.currentPhase === "initial") {
    return <InitialView />;
  }

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onCollapseChange={setSidebarCollapsed}
      />

      {/* Main Content Area */}
      <main className="relative flex w-full flex-1 flex-col h-full">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden h-full">
          <div
            ref={containerRef}
            className="relative flex min-w-0 flex-1 overflow-hidden h-full"
            data-chat-container="true"
          >
            {/* Drive Section */}
            <div
              className="bg-white min-w-0 shrink-0 grow-0 overflow-hidden"
              style={{
                width: `${drivePanelWidth}%`,
                display: drivePanelWidth === 0 ? 'none' : 'block',
                marginRight: drivePanelWidth === 100 ? '60px' : '0px' // Space for handle when chat is hidden
              }}
            >
              <DriveSection panelWidth={drivePanelWidth} />
            </div>

            {/* Resizable Handle */}
            <div
              className={`group absolute top-0 z-50 flex h-full items-center justify-center select-none cursor-ew-resize ${
                drivePanelWidth === 0 || drivePanelWidth === 100 ? 'bg-gray-50/80' : ''
              }`}
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize panels"
              style={{
                left: drivePanelWidth === 0
                  ? '0px' // Full margin area when drive is hidden
                  : drivePanelWidth === 100
                  ? 'calc(100% - 60px)' // Full margin area when chat is hidden
                  : `calc(${drivePanelWidth}% - 6px)`,
                width: drivePanelWidth === 0 || drivePanelWidth === 100 ? '60px' : '12px',
                zIndex: 60
              }}
              onMouseDown={handleMouseDown}
            >
              <div className={`handle-bar group/bar absolute top-0 h-full w-2 ${
                drivePanelWidth === 0 || drivePanelWidth === 100 ? 'left-1/2 -translate-x-1/2' : 'left-0'
              }`}>
                <div className="bg-surface-container-high h-full w-full transition-transform duration-100 group-hover/bar:scale-x-100 group-hover/bar:delay-100 scale-x-0"></div>
              </div>
              <div className={`absolute top-1/2 z-30 flex -translate-y-[50%] items-center justify-center transition-transform duration-200 ${
                drivePanelWidth === 0 || drivePanelWidth === 100 ? 'translate-x-0' : 'translate-x-3'
              }`}>
                <div className="z-30 flex h-15 w-full flex-col items-center justify-center">
                  <button
                    aria-label="resize panels"
                    role="button"
                    className={`group flex h-full w-full flex-col items-center justify-center p-2.5 ${
                      drivePanelWidth === 0 || drivePanelWidth === 100 ? 'cursor-pointer' : 'cursor-grab'
                    }`}
                    type="button"
                    tabIndex={0}
                    onClick={(e) => {
                      // Reset panels when at extremes
                      if (drivePanelWidth === 0) {
                        e.preventDefault();
                        e.stopPropagation();
                        setDrivePanelWidth(50); // Show equal panels
                      } else if (drivePanelWidth === 100) {
                        e.preventDefault();
                        e.stopPropagation();
                        setDrivePanelWidth(50); // Show equal panels
                      }
                    }}
                  >
                    <div
                      className="bg-surface-container-high relative w-[6px] rounded-t"
                      style={{
                        height: '28px',
                        background: 'var(--surface-container-high)',
                        transform: drivePanelWidth === 0
                          ? 'translateY(1.5px) rotate(-13deg)' // Point RIGHT when drive is hidden
                          : drivePanelWidth === 100
                          ? 'translateY(1.5px) rotate(13deg)' // Point LEFT when chat is hidden
                          : 'translateY(1px)',
                        transformOrigin: '50% 0% 0px'
                      }}
                    ></div>
                    <div
                      className="bg-surface-container-high relative w-[6px] rounded-b"
                      style={{
                        height: '28px',
                        background: 'var(--surface-container-high)',
                        transform: drivePanelWidth === 0
                          ? 'translateY(-1.5px) rotate(13deg)' // Point RIGHT when drive is hidden
                          : drivePanelWidth === 100
                          ? 'translateY(-1.5px) rotate(-13deg)' // Point LEFT when chat is hidden
                          : 'translateY(-1px)',
                        transformOrigin: '50% 100% 0px'
                      }}
                    ></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div
              className="flex min-w-0 flex-1 flex-col overflow-hidden"
              style={{
                width: `${chatPanelWidth}%`,
                display: chatPanelWidth === 0 ? 'none' : 'flex',
                marginLeft: drivePanelWidth === 0 ? '60px' : '0px', // Space for handle when drive is hidden
                marginRight: drivePanelWidth === 0 ? '120px' : '0px', // Add right margin when drive is fully collapsed
                paddingLeft: drivePanelWidth === 0 ? '80px' : '0px', // Additional left padding for better centering
                paddingRight: drivePanelWidth === 0 ? '80px' : '0px' // Additional right padding for better centering
              }}
            >
              <ChatSection
                isExpanded={isChatExpanded}
                sidebarCollapsed={sidebarCollapsed}
                panelWidth={chatPanelWidth}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
