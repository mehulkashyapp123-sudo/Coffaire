import { useEffect, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'coffaire-loyalty-stamps';
const LAST_ADD_KEY = 'coffaire-loyalty-last-add';
export const LOYALTY_MAX_STAMPS = 9;

type LoyaltyState = { stamps: number; ready: boolean };

/**
 * The digital Daily Dose card: a small stamp counter kept in the browser,
 * shared by every component that uses `useLoyalty` (the loyalty section and
 * the checkout success page). Same hydration-safe pattern as the cart: the
 * server render and the first client render see an empty, not-yet-hydrated
 * card, and the stored value is read only in an effect afterwards.
 */
let state: LoyaltyState = { stamps: 0, ready: false };
const SERVER_STATE: LoyaltyState = { stamps: 0, ready: false };
let snapshot: LoyaltyState = state;
const listeners = new Set<() => void>();

const emit = () => {
	listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
};

const getSnapshot = () => snapshot;
const getServerSnapshot = () => SERVER_STATE;

const persist = () => {
	try {
		window.localStorage.setItem(STORAGE_KEY, String(state.stamps));
	} catch {
		// Storage can be unavailable (private mode); the card still works in memory.
	}
};

const update = (next: Partial<LoyaltyState>) => {
	state = { ...state, ...next };
	snapshot = state;
	if (state.ready) {
		persist();
	}
	emit();
};

const hydrate = () => {
	if (state.ready) {
		return;
	}
	let stamps = 0;
	try {
		stamps = Math.min(Number(window.localStorage.getItem(STORAGE_KEY) ?? 0) || 0, LOYALTY_MAX_STAMPS);
	} catch {
		// Ignore unreadable storage.
	}
	update({ stamps, ready: true });
};

/**
 * Adds one stamp. A completed card (9 stamps) starts a fresh one on the next
 * order. A short sessionStorage guard absorbs double-fires from React's dev
 * StrictMode and immediate page reloads of the success page.
 */
const addStamp = () => {
	try {
		const last = Number(window.sessionStorage.getItem(LAST_ADD_KEY) ?? 0);
		if (Date.now() - last < 15_000) {
			return;
		}
		window.sessionStorage.setItem(LAST_ADD_KEY, String(Date.now()));
	} catch {
		// Ignore unavailable storage; still add the stamp.
	}
	update({ stamps: (state.stamps + 1) % (LOYALTY_MAX_STAMPS + 1) });
};

export function useLoyalty() {
	const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	useEffect(() => {
		hydrate();
	}, []);

	return {
		stamps: current.stamps,
		isLoading: !current.ready,
		addStamp,
		maxStamps: LOYALTY_MAX_STAMPS,
	};
}
