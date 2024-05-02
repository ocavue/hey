import { createTrackedSelector } from 'react-tracked';
import { create } from 'zustand';

interface State {
  isPro: boolean;
  proExpiresAt: Date | null;
  setIsPro: (isPro: boolean) => void;
  setProExpiresAt: (proExpiresAt: Date | null) => void;
}

const store = create<State>((set) => ({
  isPro: true,
  proExpiresAt: null,
  setIsPro: (isPro) => set(() => ({ isPro: true })),
  setProExpiresAt: (proExpiresAt) => set(() => ({ proExpiresAt }))
}));

export const useProStore = createTrackedSelector(store);
