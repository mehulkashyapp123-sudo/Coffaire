import { useEffect, useSyncExternalStore } from 'react';
import type { CurrencyInfo } from '@/api/ecommerce-api';

const CART_KEY = 'e-commerce-cart';

export type CartLine = {
	productId: string;
	variantId: string;
	title: string;
	priceInCents: number;
	currencyInfo: CurrencyInfo | null;
	image: string | null;
	quantity: number;
	manageInventory: boolean;
};

export type CartLineInput = Omit<CartLine, 'quantity'> & { quantity?: number };

type CartState = { lines: CartLine[]; ready: boolean };

/**
 * The cart is browser state, shared by every component that uses `useCart`
 * (header badge, order cards, cart page). A module-level store keeps them in
 * sync, while `useSyncExternalStore` keeps the server render and the first
 * client render identical: both see an empty, not-yet-hydrated cart, and the
 * stored cart is read only in an effect afterwards.
 */
let state: CartState = { lines: [], ready: false };
const SERVER_STATE: CartState = { lines: [], ready: false };
let snapshot: CartState = state;
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
		window.localStorage.setItem(CART_KEY, JSON.stringify(state.lines));
	} catch {
		// Storage can be unavailable (private mode); the cart still works in memory.
	}
};

const update = (next: Partial<CartState>) => {
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
	try {
		const stored = window.localStorage.getItem(CART_KEY);
		update({ lines: stored ? (JSON.parse(stored) as CartLine[]) : [], ready: true });
	} catch {
		update({ lines: [], ready: true });
	}
};

const addLine = (line: CartLineInput) => {
	const quantity = line.quantity ?? 1;
	const existing = state.lines.find((l) => l.variantId === line.variantId);

	if (existing) {
		update({
			lines: state.lines.map((l) =>
				l.variantId === line.variantId ? { ...l, quantity: l.quantity + quantity } : l,
			),
		});
		return;
	}

	update({ lines: [...state.lines, { ...line, quantity }] });
};

const setQuantity = (variantId: string, quantity: number) => {
	if (quantity <= 0) {
		update({ lines: state.lines.filter((l) => l.variantId !== variantId) });
		return;
	}
	update({
		lines: state.lines.map((l) => (l.variantId === variantId ? { ...l, quantity } : l)),
	});
};

const removeLine = (variantId: string) => {
	update({ lines: state.lines.filter((l) => l.variantId !== variantId) });
};

const clear = () => {
	update({ lines: [] });
};

export function useCart() {
	const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	useEffect(() => {
		hydrate();
	}, []);

	const totalInCents = current.lines.reduce((sum, line) => sum + line.priceInCents * line.quantity, 0);
	const count = current.lines.reduce((sum, line) => sum + line.quantity, 0);

	return {
		lines: current.lines,
		isLoading: !current.ready,
		addLine,
		setQuantity,
		removeLine,
		clear,
		totalInCents,
		count,
	};
}
