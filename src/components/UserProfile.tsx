"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
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

interface UserProfileProps {
  className?: string;
}

export const UserProfile = ({ className = "" }: UserProfileProps) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showModal &&
        modalRef.current &&
        profileRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showModal]);

  const handleProfileClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={`relative ${className}`}>
      {/* User Profile Section */}
      <div
        ref={profileRef}
        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
        onClick={handleProfileClick}
        tabIndex={0}
        role="button"
        aria-label="Open user profile"
      >
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">EK</span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">Elena Kalimera</p>
          <p className="text-xs text-gray-500">Pro Plan</p>
        </div>
      </div>

      {/* User Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[99999] pointer-events-none">
          <div
            ref={modalRef}
            className="absolute bottom-16 left-4 w-[320px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden pointer-events-auto"
            style={{ zIndex: 99999 }}
          >
            {/* User Info Section */}
            <div className="bg-gray-100 p-4 flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-md flex items-center justify-center text-gray-700 font-medium">
                EK
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium text-gray-900 truncate">
                  Elena Kalimera
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  elena.kalimera@gmail.com
                </p>
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
                <button
                  className={`w-7 h-7 rounded flex items-center justify-center transition-colors ${
                    theme === 'system' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => {
                    console.log("System theme selected!");
                    setTheme('system');
                  }}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  className={`w-7 h-7 rounded flex items-center justify-center transition-colors ${
                    theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => {
                    console.log("Light theme selected!");
                    setTheme('light');
                  }}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  className={`w-7 h-7 rounded flex items-center justify-center transition-colors ${
                    theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => {
                    console.log("Dark theme selected!");
                    setTheme('dark');
                  }}
                >
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
      )}
    </div>
  );
};
