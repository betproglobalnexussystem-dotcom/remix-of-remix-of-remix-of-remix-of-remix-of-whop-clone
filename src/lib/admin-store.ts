// Mock content store for the admin dashboard.
// Everything lives in the browser (localStorage) so the dashboard is fully
// usable before a real backend is wired. Firebase can replace read/write later.

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
};


function slugId(value: string) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

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
			},
			{
				id: "intl",
				label: "International",
				currency: "USD",
				amount: 5.99,
				priceLabel: "USD 5.99",
				period: "per month",
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
	};
}

const KEY = "mageye.admin.content.v1";
const listeners = new Set<(content: Content) => void>();
let cache: Content | null = null;

export function readContent(): Content {
	if (typeof window === "undefined") return seedContent();
	if (cache) return cache;
	try {
		const raw = window.localStorage.getItem(KEY);
		if (raw) {
			cache = { ...seedContent(), ...(JSON.parse(raw) as Content) };
			return cache;
		}
	} catch {
		/* fall back to seed */
	}
	cache = seedContent();
	return cache;
}

export function writeContent(next: Content) {
	cache = next;
	if (typeof window !== "undefined") {
		try {
			window.localStorage.setItem(KEY, JSON.stringify(next));
		} catch {
			/* storage full — keep the in-memory copy */
		}
	}
	for (const listener of listeners) listener(next);
}

export function updateContent(patch: (current: Content) => Content) {
	writeContent(patch(readContent()));
}

export function resetContent() {
	cache = null;
	if (typeof window !== "undefined") window.localStorage.removeItem(KEY);
	writeContent(seedContent());
}

export function subscribeContent(listener: (content: Content) => void) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

/** SSR-safe hook: renders the seed first, then the saved content after mount. */
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

/** Reads a picked file as a data URL so uploads work without storage. */
export function fileToDataUrl(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});
}

const ADMIN_KEY = "mageye.admin.session";
const PASSCODE_KEY = "mageye.admin.passcode";
/** Mock gate only — replace with Firebase Auth later. */
export const ADMIN_PASSCODE = "mageye-admin";

/** Current access code (admin-editable, stored in this browser). */
export function getAdminPasscode() {
	if (typeof window === "undefined") return ADMIN_PASSCODE;
	return window.localStorage.getItem(PASSCODE_KEY) || ADMIN_PASSCODE;
}

export function setAdminPasscode(next: string) {
	if (typeof window === "undefined") return false;
	const value = next.trim();
	if (value.length < 4) return false;
	window.localStorage.setItem(PASSCODE_KEY, value);
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
