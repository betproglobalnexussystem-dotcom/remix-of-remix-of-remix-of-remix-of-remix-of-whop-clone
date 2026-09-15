import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
	type Content,
	getAdminPasscode,
	isAdminSignedIn,
	newId,
	readContent,
	resetContent,
	setAdminPasscode,
	signInAdmin,
	signOutAdmin,
	subscribeContent,
	updateContent,
} from "../lib/admin-store";

export const Route = createFileRoute("/admin")({
	component: AdminPage,
	head: () => ({
		meta: [
			{ title: "Admin Dashboard - MAGEYE" },
			{ name: "robots", content: "noindex, nofollow" },
			{
				name: "description",
				content:
					"MAGEYE admin dashboard for managing films, hero slides, events, courses, podcasts, pages, subscriptions and messages.",
			},
		],
	}),
});

type FieldType = "text" | "textarea" | "image" | "checkbox" | "number";
type Field = { key: string; label: string; type?: FieldType };

type Row = Record<string, unknown>;

const SECTIONS = [
	{ id: "overview", label: "Overview" },
	{ id: "hero", label: "Hero Slides" },
	{ id: "films", label: "Films" },
	{ id: "explore", label: "Explore Rail" },
	{ id: "director", label: "Director Profile" },
	{ id: "events", label: "Events" },
	{ id: "courses", label: "Courses" },
	{ id: "podcasts", label: "Podcasts" },
	{ id: "library", label: "My Library" },
	{ id: "people", label: "Team & Board" },
	{ id: "pages", label: "Pages" },
	{ id: "subscription", label: "Subscription" },
	{ id: "wallet", label: "Wallet" },
	{ id: "messages", label: "Messages" },
	{ id: "access", label: "Access Code" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

/** Which public page the live preview shows for each dashboard section. */
const PREVIEW_PATH: Record<SectionId, string> = {
	overview: "/",
	hero: "/",
	films: "/films",
	explore: "/",
	director: "/",
	events: "/events",
	courses: "/courses",
	podcasts: "/podcast",
	library: "/library",
	people: "/team",
	pages: "/team",
	subscription: "/subscribe",
	wallet: "/subscribe",
	messages: "/contact",
	access: "/admin",
};

/** Live site preview beside the editor; reloads shortly after each save. */
function LivePreview({ path, stamp }: { path: string; stamp: number }) {
	const [reloadKey, setReloadKey] = useState(0);
	useEffect(() => {
		const timer = window.setTimeout(() => setReloadKey((n) => n + 1), 500);
		return () => window.clearTimeout(timer);
	}, [stamp, path]);
	return (
		<aside className="admin-preview">
			<div className="admin-preview__bar">
				<span>Live preview · {path}</span>
				<button type="button" onClick={() => setReloadKey((n) => n + 1)}>
					Refresh
				</button>
			</div>
			<iframe
				key={`${path}-${reloadKey}`}
				className="admin-preview__frame"
				title="Live site preview"
				src={path}
			/>
		</aside>
	);
}

function AccessCode() {
	const [current, setCurrent] = useState("");
	const [next, setNext] = useState("");
	const [confirm, setConfirm] = useState("");
	const [note, setNote] = useState("");
	const [bad, setBad] = useState(false);

	return (
		<div className="admin-panel">
			<h2 className="serif">Access code</h2>
			<p className="admin-hint">
				The code used to open this dashboard. It is saved in this browser for
				now and replaced by real sign in when Firebase is connected.
			</p>
			<form
				className="admin-form"
				onSubmit={(event) => {
					event.preventDefault();
					if (current.trim() !== getAdminPasscode()) {
						setBad(true);
						setNote("Current code is wrong.");
						return;
					}
					if (next.trim().length < 4) {
						setBad(true);
						setNote("New code needs at least 4 characters.");
						return;
					}
					if (next !== confirm) {
						setBad(true);
						setNote("New codes do not match.");
						return;
					}
					setAdminPasscode(next);
					setBad(false);
					setNote("Access code updated.");
					setCurrent("");
					setNext("");
					setConfirm("");
				}}
			>
				<label className="admin-field">
					Current code
					<input
						type="password"
						value={current}
						onChange={(event) => setCurrent(event.target.value)}
					/>
				</label>
				<label className="admin-field">
					New code
					<input
						type="password"
						value={next}
						onChange={(event) => setNext(event.target.value)}
					/>
				</label>
				<label className="admin-field">
					Confirm new code
					<input
						type="password"
						value={confirm}
						onChange={(event) => setConfirm(event.target.value)}
					/>
				</label>
				<div className="admin-field admin-field--wide">
					{note ? (
						<p className={bad ? "admin-error" : "admin-saved"}>{note}</p>
					) : null}
					<button className="btn-gold" type="submit">
						Save access code
					</button>
				</div>
			</form>
		</div>
	);
}

function AdminPage() {
	const [signedIn, setSignedIn] = useState(false);
	const [ready, setReady] = useState(false);
	const [passcode, setPasscode] = useState("");
	const [error, setError] = useState("");
	const [section, setSection] = useState<SectionId>("overview");
	const [content, setContent] = useState<Content>(() => readContent());
	const [previewStamp, setPreviewStamp] = useState(0);

	useEffect(() => {
		setSignedIn(isAdminSignedIn());
		setContent(readContent());
		setReady(true);
		return subscribeContent((next) => {
			setContent(next);
			setPreviewStamp((n) => n + 1);
		});
	}, []);

	if (!ready) return <main className="admin-shell" />;

	if (!signedIn) {
		return (
			<main className="admin-login">
				<form
					className="admin-card"
					onSubmit={(event) => {
						event.preventDefault();
						if (signInAdmin(passcode.trim())) {
							setSignedIn(true);
							setError("");
						} else {
							setError("Wrong passcode.");
						}
					}}
				>
					<h1 className="serif">Admin sign in</h1>
					<p className="admin-hint">
						Enter your access code. You can change it inside the dashboard under
						Access Code.
					</p>
					<label>
						Passcode
						<input
							type="password"
							value={passcode}
							onChange={(event) => setPasscode(event.target.value)}
						/>
					</label>
					{error ? <p className="admin-error">{error}</p> : null}
					<button className="btn-gold" type="submit">
						Sign in
					</button>
				</form>
			</main>
		);
	}

	const unread = content.messages.filter((message) => !message.read).length;

	return (
		<main className="admin-shell">
			<aside className="admin-nav">
				<div className="admin-brand">MAGEYE Admin</div>
				{SECTIONS.map((item) => (
					<button
						key={item.id}
						type="button"
						className={item.id === section ? "is-on" : ""}
						onClick={() => setSection(item.id)}
					>
						{item.label}
						{item.id === "messages" && unread ? (
							<span className="admin-pill">{unread}</span>
						) : null}
					</button>
				))}
				<button
					type="button"
					className="admin-nav__quiet"
					onClick={() => {
						if (window.confirm("Reset all admin content back to defaults?"))
							resetContent();
					}}
				>
					Reset to defaults
				</button>
				<button
					type="button"
					className="admin-nav__quiet"
					onClick={() => {
						signOutAdmin();
						setSignedIn(false);
					}}
				>
					Sign out
				</button>
			</aside>

			<section className="admin-main">
				<div className="admin-edit">
				{section === "overview" ? <Overview content={content} /> : null}

				{section === "hero" ? (
					<Collection
						title="Hero Slides"
						blurb="Slides shown in the home page carousel."
						rows={content.heroSlides as unknown as Row[]}
						fields={[
							{ key: "title", label: "Title" },
							{ key: "href", label: "Link" },
							{ key: "desktop", label: "Desktop image", type: "image" },
							{ key: "mobile", label: "Mobile image", type: "image" },
						]}
						blank={() => ({
							id: newId("slide"),
							title: "New slide",
							href: "/films",
							desktop: "",
							mobile: "",
						})}
						save={(rows) =>
							updateContent((current) => ({
								...current,
								heroSlides: rows as never,
							}))
						}
					/>
				) : null}

				{section === "films" ? (
					<Collection
						title="Films"
						blurb="Everything in the film catalog. Mark a film upcoming to show a Coming Soon badge."
						rows={content.films as unknown as Row[]}
						fields={[
							{ key: "title", label: "Title" },
							{ key: "slug", label: "Slug" },
							{ key: "duration", label: "Duration" },
							{ key: "land", label: "Land / location" },
							{ key: "excerpt", label: "Description", type: "textarea" },
							{ key: "image", label: "Landscape image", type: "image" },
							{ key: "poster", label: "Portrait poster", type: "image" },
							{ key: "upcoming", label: "Upcoming", type: "checkbox" },
						]}
						idKey="slug"
						blank={() => ({
							slug: newId("film"),
							title: "New film",
							excerpt: "",
							image: "",
							poster: "",
							upcoming: true,
						})}
						save={(rows) =>
							updateContent((current) => ({ ...current, films: rows as never }))
						}
					/>
				) : null}

				{section === "explore" ? (
					<Picker
						title="Explore Premiere and Upcoming Films"
						blurb="Choose which films appear in the home page Explore rail."
						options={content.films.map((film) => ({
							value: film.slug,
							label: film.title,
						}))}
						selected={content.exploreSlugs}
						save={(slugs) =>
							updateContent((current) => ({ ...current, exploreSlugs: slugs }))
						}
					/>
				) : null}

				{section === "director" ? (
					<>
						<Single
							title="Director Profile"
							blurb="Shown in the Meet the creator section."
							row={content.director as unknown as Row}
							fields={[
								{ key: "name", label: "Name" },
								{ key: "role", label: "Role" },
								{ key: "bio", label: "Biography", type: "textarea" },
								{ key: "image", label: "Portrait", type: "image" },
							]}
							save={(row) =>
								updateContent((current) => ({
									...current,
									director: row as never,
								}))
							}
						/>
						<Picker
							title="Films beside the profile"
							blurb="Pick the posters shown in the rail next to the profile."
							options={content.films.map((film) => ({
								value: film.slug,
								label: film.title,
							}))}
							selected={content.directorFilmSlugs}
							save={(slugs) =>
								updateContent((current) => ({
									...current,
									directorFilmSlugs: slugs,
								}))
							}
						/>
					</>
				) : null}

				{section === "events" ? (
					<Collection
						title="Events"
						blurb="Gatherings and webinars."
						rows={content.events as unknown as Row[]}
						idKey="slug"
						fields={[
							{ key: "title", label: "Title" },
							{ key: "slug", label: "Slug" },
							{ key: "badge", label: "Badge" },
							{ key: "date", label: "Date" },
							{ key: "excerpt", label: "Description", type: "textarea" },
							{ key: "image", label: "Image", type: "image" },
							{ key: "upcoming", label: "Upcoming", type: "checkbox" },
						]}
						blank={() => ({
							slug: newId("event"),
							title: "New event",
							badge: "EVENT",
							date: "",
							excerpt: "",
							image: "",
							upcoming: true,
						})}
						save={(rows) =>
							updateContent((current) => ({ ...current, events: rows as never }))
						}
					/>
				) : null}

				{section === "courses" ? (
					<Collection
						title="Courses"
						blurb="Self-paced and live programs."
						rows={content.courses as unknown as Row[]}
						idKey="slug"
						fields={[
							{ key: "title", label: "Title" },
							{ key: "slug", label: "Slug" },
							{ key: "badge", label: "Badge" },
							{ key: "date", label: "Date" },
							{ key: "excerpt", label: "Description", type: "textarea" },
							{ key: "image", label: "Image", type: "image" },
						]}
						blank={() => ({
							slug: newId("course"),
							title: "New course",
							badge: "COURSE",
							excerpt: "",
							image: "",
						})}
						save={(rows) =>
							updateContent((current) => ({
								...current,
								courses: rows as never,
							}))
						}
					/>
				) : null}

				{section === "podcasts" ? (
					<Collection
						title="Podcasts"
						blurb="Episodes listed on the podcast page."
						rows={content.podcasts as unknown as Row[]}
						idKey="slug"
						fields={[
							{ key: "title", label: "Title" },
							{ key: "slug", label: "Slug" },
							{ key: "category", label: "Category" },
							{ key: "hosts", label: "Hosts" },
							{ key: "excerpt", label: "Description", type: "textarea" },
							{ key: "image", label: "Cover", type: "image" },
						]}
						blank={() => ({
							slug: newId("episode"),
							title: "New episode",
							category: "PODCAST",
							hosts: "",
							excerpt: "",
							image: "",
						})}
						save={(rows) =>
							updateContent((current) => ({
								...current,
								podcasts: rows as never,
							}))
						}
					/>
				) : null}

				{section === "library" ? (
					<Picker
						title="My Library"
						blurb="Films featured on the member library page."
						options={content.films.map((film) => ({
							value: film.slug,
							label: film.title,
						}))}
						selected={content.librarySlugs}
						save={(slugs) =>
							updateContent((current) => ({ ...current, librarySlugs: slugs }))
						}
					/>
				) : null}

				{section === "people" ? (
					<>
						<Collection
							title="Team"
							blurb="People on the Team page."
							rows={content.team as unknown as Row[]}
							fields={[
								{ key: "name", label: "Name" },
								{ key: "role", label: "Role" },
								{ key: "bio", label: "Bio", type: "textarea" },
							]}
							blank={() => ({
								id: newId("person"),
								name: "New member",
								role: "",
								bio: "",
							})}
							save={(rows) =>
								updateContent((current) => ({ ...current, team: rows as never }))
							}
						/>
						<Collection
							title="Board"
							blurb="People on the Board page."
							rows={content.board as unknown as Row[]}
							fields={[
								{ key: "name", label: "Name" },
								{ key: "role", label: "Role" },
								{ key: "bio", label: "Bio", type: "textarea" },
							]}
							blank={() => ({
								id: newId("person"),
								name: "New member",
								role: "",
								bio: "",
							})}
							save={(rows) =>
								updateContent((current) => ({
									...current,
									board: rows as never,
								}))
							}
						/>
					</>
				) : null}

				{section === "pages" ? (
					<Collection
						title="Pages"
						blurb="Page copy. Start a line with ## to make it a heading."
						rows={content.pages as unknown as Row[]}
						fields={[
							{ key: "id", label: "Page" },
							{ key: "title", label: "Heading" },
							{ key: "body", label: "Body", type: "textarea" },
						]}
						blank={() => ({ id: newId("page"), title: "New page", body: "" })}
						save={(rows) =>
							updateContent((current) => ({ ...current, pages: rows as never }))
						}
					/>
				) : null}

				{section === "subscription" ? (
					<>
						<Collection
							title="Subscription prices"
							blurb="Uganda pricing is used when the visitor's IP is Ugandan; international pricing otherwise."
							rows={content.plans as unknown as Row[]}
							fields={[
								{ key: "label", label: "Region label" },
								{ key: "currency", label: "Currency" },
								{ key: "amount", label: "Amount", type: "number" },
								{ key: "priceLabel", label: "Displayed price" },
								{ key: "period", label: "Period" },
								{ key: "whopPlanId", label: "Whop plan ID" },
							]}
							blank={() => ({
								id: newId("plan"),
								label: "New plan",
								currency: "USD",
								amount: 0,
								priceLabel: "",
								period: "per month",
							})}
							save={(rows) =>
								updateContent((current) => ({ ...current, plans: rows as never }))
							}
						/>
						<Collection
							title="Payment methods"
							blurb="Turn methods on or off. Live processing starts once your payment APIs are added."
							rows={content.payments as unknown as Row[]}
							fields={[
								{ key: "name", label: "Name" },
								{ key: "blurb", label: "Description", type: "textarea" },
								{ key: "enabled", label: "Enabled", type: "checkbox" },
							]}
							blank={() => ({
								id: newId("pay"),
								name: "New method",
								blurb: "",
								enabled: false,
							})}
							save={(rows) =>
								updateContent((current) => ({
									...current,
									payments: rows as never,
								}))
							}
						/>
					</>
				) : null}

				{section === "wallet" ? <WalletPanel content={content} /> : null}

				{section === "messages" ? <Messages content={content} /> : null}

				{section === "access" ? <AccessCode /> : null}
				</div>

				{section === "access" ? null : (
					<LivePreview
						path={PREVIEW_PATH[section]}
						stamp={previewStamp}
					/>
				)}
			</section>
		</main>
	);
}

function WalletPanel({ content }: { content: Content }) {
	const wallet = content.wallet ?? { balance: 0, currency: "UGX", transactions: [] };
	const [amount, setAmount] = useState("");
	const [phone, setPhone] = useState("");

	const paidIn = wallet.transactions
		.filter((tx) => tx.kind === "payment" && tx.status === "completed")
		.reduce((sum, tx) => sum + tx.amount, 0);
	const paidOut = wallet.transactions
		.filter((tx) => tx.kind === "withdrawal" && tx.status !== "failed")
		.reduce((sum, tx) => sum + tx.amount, 0);

	function withdraw() {
		const value = Number(amount);
		if (!value || value <= 0 || !phone.trim()) return;
		updateContent((current) => {
			const base = current.wallet ?? {
				balance: 0,
				currency: "UGX",
				transactions: [],
			};
			return {
				...current,
				wallet: {
					...base,
					balance: base.balance - value,
					transactions: [
						{
							id: newId("wtx"),
							kind: "withdrawal" as const,
							provider: "Mobile Money",
							phone: phone.trim(),
							amount: value,
							currency: base.currency,
							status: "pending" as const,
							note: "Withdrawal requested from dashboard",
							createdAt: Date.now(),
						},
						...base.transactions,
					],
				},
			};
		});
		setAmount("");
		setPhone("");
	}

	return (
		<div className="admin-panel">
			<h1 className="serif">Wallet</h1>
			<p className="admin-hint">
				Mobile Money balance, withdrawals and every transaction. Payments land
				here once your Mobile Money provider is connected.
			</p>

			<div className="admin-cards">
				<div className="admin-stat">
					<span>Available balance</span>
					<strong>
						{wallet.currency} {wallet.balance.toLocaleString()}
					</strong>
				</div>
				<div className="admin-stat">
					<span>Total received</span>
					<strong>
						{wallet.currency} {paidIn.toLocaleString()}
					</strong>
				</div>
				<div className="admin-stat">
					<span>Total withdrawn</span>
					<strong>
						{wallet.currency} {paidOut.toLocaleString()}
					</strong>
				</div>
			</div>

			<div className="admin-row">
				<label>
					Withdraw amount ({wallet.currency})
					<input
						type="number"
						value={amount}
						onChange={(event) => setAmount(event.target.value)}
						placeholder="50000"
					/>
				</label>
				<label>
					Mobile Money number
					<input
						type="tel"
						value={phone}
						onChange={(event) => setPhone(event.target.value)}
						placeholder="07XX XXX XXX"
					/>
				</label>
				<button type="button" className="btn-gold" onClick={withdraw}>
					Request withdrawal
				</button>
			</div>

			<h2 className="serif">Transactions</h2>
			{wallet.transactions.length === 0 ? (
				<p className="admin-hint">No transactions yet.</p>
			) : (
				<div className="admin-list">
					{wallet.transactions.map((tx) => (
						<article key={tx.id} className="admin-item">
							<strong>
								{tx.kind === "payment" ? "+" : "-"} {tx.currency}{" "}
								{tx.amount.toLocaleString()}
							</strong>
							<p>
								{tx.provider} · {tx.phone || "—"} · {tx.status}
							</p>
							<p className="admin-hint">
								{new Date(tx.createdAt).toLocaleString()} — {tx.note}
							</p>
						</article>
					))}
				</div>
			)}
		</div>
	);
}

function Overview({ content }: { content: Content }) {
	const stats = [
		["Hero slides", content.heroSlides.length],
		["Films", content.films.length],
		["Upcoming films", content.films.filter((f) => f.upcoming).length],
		["Events", content.events.length],
		["Courses", content.courses.length],
		["Podcasts", content.podcasts.length],
		["Messages", content.messages.length],
		["Unread messages", content.messages.filter((m) => !m.read).length],
	] as const;
	return (
		<div className="admin-panel">
			<h1 className="serif">Dashboard</h1>
			<p className="admin-hint">
				Content is stored in this browser for now, so changes are instant and
				safe to test. Wire Firebase later and only the read/write helpers change.
			</p>
			<div className="admin-stats">
				{stats.map(([label, value]) => (
					<div key={label} className="admin-stat">
						<strong>{value}</strong>
						<span>{label}</span>
					</div>
				))}
			</div>
		</div>
	);
}

function FieldInput({
	field,
	value,
	onChange,
}: {
	field: Field;
	value: unknown;
	onChange: (next: unknown) => void;
}) {
	if (field.type === "textarea")
		return (
			<label className="admin-field admin-field--wide">
				{field.label}
				<textarea
					rows={5}
					value={String(value ?? "")}
					onChange={(event) => onChange(event.target.value)}
				/>
			</label>
		);
	if (field.type === "checkbox")
		return (
			<label className="admin-field admin-field--check">
				<input
					type="checkbox"
					checked={Boolean(value)}
					onChange={(event) => onChange(event.target.checked)}
				/>
				{field.label}
			</label>
		);
	if (field.type === "number")
		return (
			<label className="admin-field">
				{field.label}
				<input
					type="number"
					step="0.01"
					value={Number(value ?? 0)}
					onChange={(event) => onChange(Number(event.target.value))}
				/>
			</label>
		);
	if (field.type === "image")
		return (
			<label className="admin-field admin-field--wide">
				{field.label}
				{value ? (
					<img className="admin-thumb" src={String(value)} alt="" />
				) : null}
				<input
					type="text"
					placeholder="https://... image link"
					value={String(value ?? "")}
					onChange={(event) => onChange(event.target.value)}
				/>
				<small className="admin-hint">
					Paste a public image or video link (https://…).
				</small>
			</label>
		);
	return (
		<label className="admin-field">
			{field.label}
			<input
				type="text"
				value={String(value ?? "")}
				onChange={(event) => onChange(event.target.value)}
			/>
		</label>
	);
}

function Collection({
	title,
	blurb,
	rows,
	fields,
	blank,
	save,
	idKey = "id",
}: {
	title: string;
	blurb: string;
	rows: Row[];
	fields: Field[];
	blank: () => Row;
	save: (rows: Row[]) => void;
	idKey?: string;
}) {
	const [draft, setDraft] = useState<Row[]>(rows);
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		setDraft(rows);
	}, [rows]);

	const commit = (next: Row[]) => {
		setDraft(next);
		save(next);
		setSaved(true);
		window.setTimeout(() => setSaved(false), 1500);
	};

	return (
		<div className="admin-panel">
			<div className="admin-panel__head">
				<div>
					<h2 className="serif">{title}</h2>
					<p className="admin-hint">{blurb}</p>
				</div>
				<div className="admin-actions">
					{saved ? <span className="admin-saved">Saved</span> : null}
					<button
						type="button"
						className="btn-gold"
						onClick={() => {
							const next = [...draft, blank()];
							commit(next);
							setOpenIndex(next.length - 1);
						}}
					>
						Add new
					</button>
				</div>
			</div>

			<ul className="admin-list">
				{draft.map((row, index) => {
					const open = openIndex === index;
					return (
						<li key={String(row[idKey] ?? index)} className="admin-row">
							<div className="admin-row__head">
								<button
									type="button"
									className="admin-row__title"
									onClick={() => setOpenIndex(open ? null : index)}
								>
									{String(row["title"] ?? row["name"] ?? row["label"] ?? row[idKey])}
								</button>
								<div className="admin-row__tools">
									<button
										type="button"
										onClick={() => {
											if (index === 0) return;
											const next = [...draft];
											const moved = next.splice(index, 1)[0]!;
											next.splice(index - 1, 0, moved);
											commit(next);
										}}
										aria-label="Move up"
									>
										↑
									</button>
									<button
										type="button"
										onClick={() => {
											if (index === draft.length - 1) return;
											const next = [...draft];
											const moved = next.splice(index, 1)[0]!;
											next.splice(index + 1, 0, moved);
											commit(next);
										}}
										aria-label="Move down"
									>
										↓
									</button>
									<button
										type="button"
										onClick={() => setOpenIndex(open ? null : index)}
									>
										{open ? "Close" : "Edit"}
									</button>
									<button
										type="button"
										className="admin-danger"
										onClick={() => {
											if (!window.confirm("Delete this item?")) return;
											commit(draft.filter((_, i) => i !== index));
											setOpenIndex(null);
										}}
									>
										Delete
									</button>
								</div>
							</div>
							{open ? (
								<div className="admin-form">
									{fields.map((field) => (
										<FieldInput
											key={field.key}
											field={field}
											value={row[field.key]}
											onChange={(next) => {
												const rowsNext = [...draft];
												rowsNext[index] = { ...row, [field.key]: next };
												commit(rowsNext);
											}}
										/>
									))}
								</div>
							) : null}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

function Single({
	title,
	blurb,
	row,
	fields,
	save,
}: {
	title: string;
	blurb: string;
	row: Row;
	fields: Field[];
	save: (row: Row) => void;
}) {
	return (
		<div className="admin-panel">
			<h2 className="serif">{title}</h2>
			<p className="admin-hint">{blurb}</p>
			<div className="admin-form">
				{fields.map((field) => (
					<FieldInput
						key={field.key}
						field={field}
						value={row[field.key]}
						onChange={(next) => save({ ...row, [field.key]: next })}
					/>
				))}
			</div>
		</div>
	);
}

function Picker({
	title,
	blurb,
	options,
	selected,
	save,
}: {
	title: string;
	blurb: string;
	options: { value: string; label: string }[];
	selected: string[];
	save: (values: string[]) => void;
}) {
	return (
		<div className="admin-panel">
			<h2 className="serif">{title}</h2>
			<p className="admin-hint">{blurb}</p>
			<div className="admin-picker">
				{options.map((option) => {
					const on = selected.includes(option.value);
					return (
						<label key={option.value} className="admin-field--check">
							<input
								type="checkbox"
								checked={on}
								onChange={() =>
									save(
										on
											? selected.filter((value) => value !== option.value)
											: [...selected, option.value],
									)
								}
							/>
							{option.label}
						</label>
					);
				})}
			</div>
		</div>
	);
}

function Messages({ content }: { content: Content }) {
	return (
		<div className="admin-panel">
			<h2 className="serif">Messages</h2>
			<p className="admin-hint">
				Everything sent from the Contact and Partners forms.
			</p>
			{content.messages.length === 0 ? (
				<p>No messages yet.</p>
			) : (
				<ul className="admin-list">
					{content.messages.map((message) => (
						<li
							key={message.id}
							className={message.read ? "admin-row" : "admin-row is-unread"}
						>
							<div className="admin-row__head">
								<div>
									<strong>{message.subject || "(no subject)"}</strong>
									<div className="admin-hint">
										{message.kind === "partner" ? "Partners" : "Contact"} ·{" "}
										{message.name} · {message.email} ·{" "}
										{new Date(message.createdAt).toLocaleString()}
									</div>
								</div>
								<div className="admin-row__tools">
									<button
										type="button"
										onClick={() =>
											updateContent((current) => ({
												...current,
												messages: current.messages.map((item) =>
													item.id === message.id
														? { ...item, read: !item.read }
														: item,
												),
											}))
										}
									>
										{message.read ? "Mark unread" : "Mark read"}
									</button>
									<button
										type="button"
										className="admin-danger"
										onClick={() =>
											updateContent((current) => ({
												...current,
												messages: current.messages.filter(
													(item) => item.id !== message.id,
												),
											}))
										}
									>
										Delete
									</button>
								</div>
							</div>
							<p className="admin-message">{message.body}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
