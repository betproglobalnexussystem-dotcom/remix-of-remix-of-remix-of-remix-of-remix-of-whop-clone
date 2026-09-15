// Live content store backed by Firestore (single document: site/content).
// Every public page and the admin dashboard read from here, so edits made in
// the dashboard appear on the real site for every visitor.

import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
	COURSES,
	EVENTS,
	FILMS,
	HERO_SLIDES,
	PODCASTS,
	type Course,
	type EventItem,
	type Film,
	type Podcast,
} from "../data/catalog";
import { BOARD, TEAM } from "../data/pages";
import { getDb } from "./firebase";

export type HeroSlide = {
	id: string;
	title: string;
	href: string;
	desktop: string;
	mobile: string;
};

export type Person = { id: string; name: string; role: string; bio: string };

export type PageCopy = { id: string; title: string; body: string };

export type PlanSetting = {
	id: "ug" | "intl";
	label: string;
	currency: string;
	amount: number;
	priceLabel: string;
	period: string;
	/** Whop plan id used when the visitor checks out on this plan. */
	whopPlanId?: string;
};

export type PaymentSetting = {
	id: string;
	name: string;
	blurb: string;
	enabled: boolean;
};

export type Message = {
	id: string;
	kind: "contact" | "partner";
	name: string;
	email: string;
	subject: string;
	body: string;
	createdAt: number;
	read: boolean;
};

export type WalletTx = {
	id: string;
	kind: "payment" | "withdrawal";
	provider: string;
	phone: string;
	amount: number;
	currency: string;
	status: "pending" | "completed" | "failed";
	note: string;
	createdAt: number;
};

export type Wallet = {
	balance: number;
	currency: string;
	transactions: WalletTx[];
};

export type Director = {
	name: string;
	role: string;
	bio: string;
	image: string;
};

export type Content = {
	heroSlides: HeroSlide[];
	films: Film[];
	events: EventItem[];
	courses: Course[];
	podcasts: Podcast[];
	director: Director;
	directorFilmSlugs: string[];
	exploreSlugs: string[];
	librarySlugs: string[];
	team: Person[];
	board: Person[];
	pages: PageCopy[];
	plans: PlanSetting[];
	payments: PaymentSetting[];
	messages: Message[];
	accessCode: string;
};

function slugId(value: string) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

/** Mock gate only — the access code is editable from the dashboard. */
export const ADMIN_PASSCODE = "mageye-admin";

export function seedContent(): Content {
	return {
		heroSlides: HERO_SLIDES.map((slide) => ({
			id: slugId(slide.title),
			title: slide.title,
			href: slide.href,
			desktop: slide.desktop,
			mobile: slide.mobile,
		})),
		films: FILMS.map((film) => ({ ...film })),
		events: EVENTS.map((item) => ({ ...item })),
		courses: COURSES.map((item) => ({ ...item })),
		podcasts: PODCASTS.map((item) => ({ ...item })),
		director: {
			name: "Hassan Mageye",
			role: "Writer · Director · Producer",
			bio: "Hassan Mageye is a Ugandan-American writer, director and producer whose filmmaking career spans more than a decade. He studied Mass Communication at Makerere University and moved from an early interest in journalism toward filmmaking. His work has focused on African stories, cultural identity, social themes and character-driven drama. Hassan Mageye currently resides in California.",
			image: "/hassan-mageye.png",
		},
		directorFilmSlugs: FILMS.slice(0, 7).map((film) => film.slug),
		exploreSlugs: FILMS.filter((film) => film.upcoming).map((film) => film.slug),
		librarySlugs: FILMS.slice(0, 3).map((film) => film.slug),
		team: TEAM.map((person) => ({ id: slugId(person.name), ...person })),
		board: BOARD.map((person) => ({ id: slugId(person.name), ...person })),
		pages: [
			{ id: "team", title: "Team", body: "" },
			{ id: "board", title: "Board", body: "" },
		],
		plans: [
			{
				id: "ug",
				label: "Uganda",
				currency: "UGX",
				amount: 5000,
				priceLabel: "UGX 5,000",
				period: "per month",
				whopPlanId: "",
			},
			{
				id: "intl",
				label: "International",
				currency: "USD",
				amount: 5.99,
				priceLabel: "USD 5.99",
				period: "per month",
				whopPlanId: "",
			},
		],
		payments: [
			{
				id: "mobile-money",
				name: "Mobile Money",
				blurb: "MTN MoMo and Airtel Money — pay in Uganda Shillings.",
				enabled: true,
			},
			{
				id: "paypal",
				name: "PayPal",
				blurb: "Pay with PayPal balance or any card.",
				enabled: true,
			},
			{
				id: "whop",
				name: "Whop",
				blurb: "Membership checkout through Whop.",
				enabled: true,
			},
		],
		messages: [],
		accessCode: ADMIN_PASSCODE,
	};
}

const COLLECTION = "site";
const DOC_ID = "content";
const listeners = new Set<(content: Content) => void>();
let cache: Content | null = null;
let started = false;

function clean<T>(value: T): T {
	return JSON.parse(JSON.stringify(value)) as T;
}

function merge(raw: Partial<Content> | undefined): Content {
	return { ...seedContent(), ...(raw ?? {}) };
}

/** Starts the realtime Firestore listener once, seeding the doc if empty. */
function start() {
	if (started || typeof window === "undefined") return;
	started = true;
	const db = getDb();
	if (!db) return;
	const ref = doc(db, COLLECTION, DOC_ID);
	onSnapshot(
		ref,
		(snap) => {
			if (!snap.exists()) {
				const seed = seedContent();
				cache = seed;
				void setDoc(ref, clean(seed));
				for (const listener of listeners) listener(seed);
				return;
			}
			cache = merge(snap.data() as Partial<Content>);
			for (const listener of listeners) listener(cache);
		},
		() => {
			/* offline / rules issue — keep whatever we have */
		},
	);
}

export function readContent(): Content {
	if (typeof window === "undefined") return seedContent();
	start();
	if (!cache) cache = seedContent();
	return cache;
}

export function writeContent(next: Content) {
	cache = next;
	for (const listener of listeners) listener(next);
	const db = getDb();
	if (db) void setDoc(doc(db, COLLECTION, DOC_ID), clean(next));
}

export function updateContent(patch: (current: Content) => Content) {
	writeContent(patch(readContent()));
}

export function resetContent() {
	writeContent(seedContent());
}

export function subscribeContent(listener: (content: Content) => void) {
	start();
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

/** SSR-safe hook: renders the seed first, then live Firestore content. */
export function useContent(): Content {
	const [content, setContent] = useState<Content>(() => seedContent());
	useEffect(() => {
		setContent(readContent());
		return subscribeContent(setContent);
	}, []);
	return content;
}

export function newId(prefix = "item") {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

export function addMessage(message: Omit<Message, "id" | "createdAt" | "read">) {
	updateContent((current) => ({
		...current,
		messages: [
			{ ...message, id: newId("msg"), createdAt: Date.now(), read: false },
			...current.messages,
		],
	}));
}

const ADMIN_KEY = "mageye.admin.session";

/** Current access code (stored in Firestore, editable from the dashboard). */
export function getAdminPasscode() {
	return readContent().accessCode || ADMIN_PASSCODE;
}

export function setAdminPasscode(next: string) {
	const value = next.trim();
	if (value.length < 4) return false;
	updateContent((current) => ({ ...current, accessCode: value }));
	return true;
}

export function isAdminSignedIn() {
	if (typeof window === "undefined") return false;
	return window.localStorage.getItem(ADMIN_KEY) === "1";
}

export function signInAdmin(passcode: string) {
	if (passcode !== getAdminPasscode()) return false;
	window.localStorage.setItem(ADMIN_KEY, "1");
	return true;
}

export function signOutAdmin() {
	if (typeof window !== "undefined") window.localStorage.removeItem(ADMIN_KEY);
}
