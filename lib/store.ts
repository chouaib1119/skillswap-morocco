import { create } from "zustand";
import { Notification } from "@/types";
import { MOCK_NOTIFICATIONS } from "./mockData";

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  markRead: (id: string) => void;
  addNotification: (notif: Notification) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: MOCK_NOTIFICATIONS,
  unreadCount: MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length,
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),
  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: state.notifications.filter((n) => !n.isRead && n._id !== id).length,
    })),
  addNotification: (notif) =>
    set((state) => ({
      notifications: [notif, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
}));

interface UIStore {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
