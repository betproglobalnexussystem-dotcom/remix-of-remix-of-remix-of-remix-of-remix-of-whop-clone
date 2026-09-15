import { Link } from "@tanstack/react-router";
import type { CartLine } from "../../lib/cart";
import { useCartStore } from "../../lib/cart";

type CartDrawerProps = {
	open: boolean;
	onClose: () => void;
};

// A checkout session charges exactly one plan, so each cart line checks out on
// its own: the path plan and `quantity` are what is charged, and `items` only
// feeds the order summary. Never send other lines along in `items` — the page
// would show products the session is not charging for.
function CheckoutLink({
	line,
	label,
	onClose,
}: {
	line: CartLine;
	label: string;
	onClose: () => void;
}) {
	return (
		<Link
			to="/checkout/$planId"
			params={{ planId: line.planId }}
			search={{
				quantity: line.quantity,
				items: `${line.planId}:${line.quantity}`,
			}}
			onClick={onClose}
		>
			{label}
		</Link>
	);
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
	const lines = useCartStore((state) => state.lines);
	const setQuantity = useCartStore((state) => state.setQuantity);
	const removeLine = useCartStore((state) => state.removeLine);

	if (!open) return null;

	return (
		<div
			role="dialog"
			style={{
				position: "fixed",
				inset: 0,
				background: "rgba(0,0,0,0.35)",
				display: "flex",
				justifyContent: "flex-end",
				zIndex: 50,
			}}
			onClick={onClose}
		>
			<aside
				style={{
					width: "min(420px, 100%)",
					background: "#fff",
					padding: "1.5rem",
				}}
				onClick={(event) => event.stopPropagation()}
			>
				<h2>Cart</h2>
				{lines.length === 0 ? (
					<p>Your cart is empty.</p>
				) : (
					<ul style={{ listStyle: "none", padding: 0 }}>
						{lines.map((line) => (
							<li key={line.planId} style={{ marginBottom: "1rem" }}>
								<div>{line.title}</div>
								<input
									type="number"
									min={0}
									value={line.quantity}
									onChange={(event) =>
										setQuantity(line.planId, Number(event.target.value))
									}
								/>
								<button type="button" onClick={() => removeLine(line.planId)}>
									Remove
								</button>
								{lines.length > 1 ? (
									<CheckoutLink
										line={line}
										label="Checkout"
										onClose={onClose}
									/>
								) : null}
							</li>
						))}
					</ul>
				)}
				{lines.length === 1 && lines[0] ? (
					<CheckoutLink line={lines[0]} label="Checkout" onClose={onClose} />
				) : null}
			</aside>
		</div>
	);
}
