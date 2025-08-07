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
  const { theme, actualTheme, setTheme } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Debug theme state
  useEffect(() => {
    console.log("👤 UserProfile - Current theme state:", { theme, actualTheme });
  }, [theme, actualTheme]);

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

  // Super simple, guaranteed to work theme handlers
  const handleSystemTheme = () => {
    console.log("🖥️ SYSTEM THEME CLICKED!");
    alert("System theme clicked!"); // Immediate visual feedback
    setTheme("system");
  };

  const handleLightTheme = () => {
    console.log("☀️ LIGHT THEME CLICKED!");
    alert("Light theme clicked!"); // Immediate visual feedback
    setTheme("light");
  };

  const handleDarkTheme = () => {
    console.log("🌙 DARK THEME CLICKED!");
    alert("Dark theme clicked!"); // Immediate visual feedback
    setTheme("dark");
  };

  return (
    <div className={`relative ${className}`}>
      {/* User Profile Section */}
      <div
        ref={profileRef}
        className="flex items-center space-x-3 cursor-pointer hover:bg-theme-navigation p-2 rounded-md transition-colors"
        onClick={handleProfileClick}
        tabIndex={0}
        role="button"
        aria-label="Open user profile"
      >
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">EK</span>
        </div>
        <div>
          <p className="text-sm font-medium text-theme-sidebar">Elena Kalimera</p>
          <p className="text-xs text-theme-muted">Free plan</p>
        </div>
      </div>

      {/* User Profile Modal */}
      {showModal && (
        <div
          className="fixed inset-0"
          style={{
            zIndex: 99999,
            pointerEvents: 'none'
          }}
        >
          <div
            ref={modalRef}
            className="absolute bottom-16 left-4 w-[320px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            style={{
              zIndex: 100000,
              pointerEvents: 'auto',
              position: 'absolute'
            }}
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
                <h4 className="text-base font-medium text-gray-900">Free plan</h4>
                <p className="text-sm text-gray-500">Free tier</p>
              </div>
              <button
                onClick={() => alert("Upgrade clicked!")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center transition-colors"
              >
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

            {/* SUPER SIMPLE THEME SECTION */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-700">Theme</span>
                </div>
                <div className="text-xs text-gray-500">Current: {theme}</div>
              </div>

              {/* SUPER SIMPLE BUTTONS - No fancy CSS */}
              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleSystemTheme}
                  style={{
                    width: '60px',
                    height: '40px',
                    border: '2px solid #ccc',
                    borderRadius: '6px',
                    backgroundColor: theme === 'system' ? '#3b82f6' : '#f3f4f6',
                    color: theme === 'system' ? 'white' : '#374151',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Monitor size={16} />
                </button>

                <button
                  onClick={handleLightTheme}
                  style={{
                    width: '60px',
                    height: '40px',
                    border: '2px solid #ccc',
                    borderRadius: '6px',
                    backgroundColor: theme === 'light' ? '#3b82f6' : '#f3f4f6',
                    color: theme === 'light' ? 'white' : '#374151',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Sun size={16} />
                </button>

                <button
                  onClick={handleDarkTheme}
                  style={{
                    width: '60px',
                    height: '40px',
                    border: '2px solid #ccc',
                    borderRadius: '6px',
                    backgroundColor: theme === 'dark' ? '#3b82f6' : '#f3f4f6',
                    color: theme === 'dark' ? 'white' : '#374151',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Moon size={16} />
                </button>
              </div>
            </div>

            {/* Test Buttons */}
            <div className="p-4 border-b border-gray-200">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    console.log("🧪 Test 1 clicked!");
                    alert("Test 1 works!");
                  }}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  🧪 Test Button 1
                </button>

                <button
                  onClick={() => {
                    console.log("🧪 Test 2 clicked!");
                    alert("Test 2 works!");
                  }}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  🧪 Test Button 2
                </button>
              </div>
            </div>

            {/* Help */}
            <div
              className="px-4 py-3 flex items-center gap-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 transition-colors"
              onClick={() => alert("Help clicked!")}
            >
              <HelpCircle className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-700">Help</span>
            </div>

            {/* Settings */}
            <div
              className="px-4 py-3 flex items-center gap-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 transition-colors"
              onClick={() => alert("Settings clicked!")}
            >
              <Settings className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-700">Settings</span>
            </div>

            {/* Log Out */}
            <div
              className="px-4 py-3 flex items-center gap-2 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => alert("Log out clicked!")}
            >
              <LogOut className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-700">Log Out</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
