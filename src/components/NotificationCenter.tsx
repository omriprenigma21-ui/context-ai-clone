"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bell,
  Download,
  List,
  Trash2,
  Check
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  type: "success" | "info" | "warning" | "error";
}

interface NotificationCenterProps {
  className?: string;
}

export const NotificationCenter = ({ className = "" }: NotificationCenterProps) => {
  const [showPanel, setShowPanel] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Project",
      description: "Task completed",
      timestamp: "Aug 3, 05:55 PM",
      isRead: false,
      type: "success"
    },
    {
      id: "2",
      title: "New Project",
      description: "I need details about your Salesforce and QuickBooks setup to pull the right revenue data",
      timestamp: "Aug 3, 05:47 PM",
      isRead: false,
      type: "success"
    }
  ]);

  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showPanel &&
        panelRef.current &&
        buttonRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowPanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPanel]);

  // Close panel on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowPanel(false);
      }
    };

    if (showPanel) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showPanel]);

  const handleNotificationClick = () => {
    setShowPanel(!showPanel);
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className={`relative ${className}`}>
      {/* Notification Bell Button */}
      <button
        ref={buttonRef}
        onClick={handleNotificationClick}
        className="relative h-8 w-8 p-0 text-gray-600 hover:text-gray-900 flex items-center justify-center"
        aria-label="Open notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel - Positioned relative to button */}
      {showPanel && (
        <div className="absolute top-full right-0 mt-2 z-[99999]">
          <div
            ref={panelRef}
            className="w-[400px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            style={{ zIndex: 99999 }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-base font-medium text-gray-900">Notifications</h3>
              <div className="flex items-center gap-2">
                <button
                  className="p-1 text-gray-500 hover:text-gray-700 rounded"
                  aria-label="Export notifications"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  className="p-1 text-gray-500 hover:text-gray-700 rounded"
                  aria-label="Notification settings"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Time Section Header */}
            <div className="px-4 py-2 bg-gray-50">
              <h4 className="text-sm font-medium text-gray-500">This week</h4>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                        !notification.isRead ? 'bg-blue-50/30' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Status Icon */}
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            {notification.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notification.timestamp}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="p-1 text-gray-400 hover:text-red-500 rounded"
                            aria-label="Delete notification"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {notifications.length > 0 && unreadCount > 0 && (
              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
