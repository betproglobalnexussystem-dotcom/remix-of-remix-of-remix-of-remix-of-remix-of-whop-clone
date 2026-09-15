import { Link } from "@tanstack/react-router";

type ProductCardProps = {
	title: string;
	slug: string;
	image?: string;
	priceLabel?: string;
};

export function ProductCard({
	title,
	slug,
	image,
	priceLabel,
}: ProductCardProps) {
	return (
		<Link
			to="/products/$slug"
			params={{ slug }}
			style={{ textDecoration: "none", color: "inherit", display: "block" }}
		>
			{image ? (
				<img
					src={image}
					alt={title}
					style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }}
				/>
			) : (
				<div
					style={{ width: "100%", aspectRatio: "1", background: "#f2f2f2" }}
				/>
			)}
			<div style={{ padding: "0.75rem 0" }}>
				<div>{title}</div>
				{priceLabel ? <div>{priceLabel}</div> : null}
			</div>
		</Link>
	);
}
