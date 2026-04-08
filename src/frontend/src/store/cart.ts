import { create } from "zustand";
import type { TrackMetadataPublic } from "../types";

interface CartItem {
  track: TrackMetadataPublic;
}

interface CartStore {
  items: CartItem[];
  addItem: (track: TrackMetadataPublic) => boolean; // returns true if added, false if duplicate
  removeItem: (trackId: bigint) => void;
  clearCart: () => void;
  isInCart: (trackId: bigint) => boolean;
}

export const useCartStore = create<CartStore>()((set, get) => ({
  items: [],
  addItem: (track) => {
    const already = get().items.some((item) => item.track.id === track.id);
    if (already) return false;
    set((state) => ({ items: [...state.items, { track }] }));
    return true;
  },
  removeItem: (trackId) => {
    set((state) => ({
      items: state.items.filter((item) => item.track.id !== trackId),
    }));
  },
  clearCart: () => set({ items: [] }),
  isInCart: (trackId) => get().items.some((item) => item.track.id === trackId),
}));
