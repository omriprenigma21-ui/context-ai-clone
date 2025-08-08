"use client";

import { useState, useRef, useEffect } from "react";
import {
  CreditCard,
  HelpCircle,
  Settings,
  LogOut,
  Monitor,
  Sun,
  Moon,
  Plus
} from "lucide-react";

interface UserProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UserProfileModal = ({ open, onOpenChange }: UserProfileModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Debug output
  useEffect(() => {
    console.log("UserProfileModal component - open state:", open);
  }, [open]);

  // Handle modal appearance animation
  useEffect(() => {
    if (open) {
      console.log("Modal opening");
      setIsAnimating(true);
      setIsVisible(true);
    } else if (isVisible) {
      console.log("Modal closing");
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 200); // Match this with the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [open, isVisible]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        console.log("Click outside modal detected");
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onOpenChange]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        console.log("Escape key pressed");
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onOpenChange]);

  // Don't render anything if not visible and not animating
  if (!isVisible && !isAnimating && !open) {
    console.log("Modal not rendering - not visible");
    return null;
  }

  console.log("Rendering modal, open:", open, "isVisible:", isVisible, "isAnimating:", isAnimating);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        ref={modalRef}
        style={{
          transition: "opacity 0.2s ease, transform 0.2s ease",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(10px)",
          zIndex: 9999
        }}
        className="absolute bottom-16 left-4 w-[320px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden pointer-events-auto"
      >
        {/* Debug indicator */}
        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 z-50">
          Modal Open: {open ? "Yes" : "No"}
        </div>

        {/* User Info Section */}
        <div className="bg-gray-100 p-4 flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-md flex items-center justify-center text-gray-700 font-medium">
            EK
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium text-gray-900 truncate">Elena Kalimera</h3>
            <p className="text-sm text-gray-500 truncate">elena.kalimera@gmail.com</p>
          </div>
        </div>

        {/* Plan Info */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <div>
            <h4 className="text-base font-medium text-gray-900">Pro Plan</h4>
            <p className="text-sm text-gray-500">Pro tier</p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center">
            <Plus className="w-4 h-4 mr-1" />
            Upgrade
          </button>
        </div>

        {/* Credits */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-700">Credits</span>
          </div>
          <span className="text-sm font-medium text-gray-900">105</span>
        </div>

        {/* Theme */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-700">Theme</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="w-7 h-7 rounded flex items-center justify-center bg-gray-200 text-gray-700">
              <Monitor className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 rounded flex items-center justify-center text-gray-700">
              <Sun className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 rounded flex items-center justify-center text-gray-700">
              <Moon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Help */}
        <div className="px-4 py-3 flex items-center gap-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
          <HelpCircle className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-700">Help</span>
        </div>

        {/* Settings */}
        <div className="px-4 py-3 flex items-center gap-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
          <Settings className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-700">Settings</span>
        </div>

        {/* Log Out */}
        <div className="px-4 py-3 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
          <LogOut className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-700">Log Out</span>
        </div>
      </div>
    </div>
  );
};
