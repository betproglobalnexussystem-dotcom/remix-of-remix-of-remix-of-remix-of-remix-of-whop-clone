import { create } from "zustand";

export type CartLine = {
	planId: string;
	title: string;
	priceCents: number;
	quantity: number;
	image?: string;
};

type CartState = {
	lines: CartLine[];
	addLine: (line: CartLine) => void;
	removeLine: (planId: string) => void;
	setQuantity: (planId: string, quantity: number) => void;
	clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
	lines: [],
	addLine: (line) =>
		set((state) => {
			const existing = state.lines.find(
				(entry) => entry.planId === line.planId,
			);
			if (existing) {
				return {
					lines: state.lines.map((entry) =>
						entry.planId === line.planId
							? { ...entry, quantity: entry.quantity + line.quantity }
							: entry,
					),
				};
			}
			return { lines: [...state.lines, line] };
		}),
	removeLine: (planId) =>
		set((state) => ({
			lines: state.lines.filter((entry) => entry.planId !== planId),
		})),
	// A quantity of zero — or a cleared input — takes the line out, which is how
	// a number field is expected to behave next to a Remove button.
	setQuantity: (planId, quantity) =>
		set((state) => ({
			lines: state.lines
				.map((entry) =>
					entry.planId === planId
						? { ...entry, quantity: Number.isFinite(quantity) ? quantity : 0 }
						: entry,
				)
				.filter((entry) => entry.quantity > 0),
		})),
	clear: () => set({ lines: [] }),
}));
