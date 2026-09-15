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

const MISSION_BODY = [
	"At MAGEYE, we explore who we are beyond ultimate truths, binary thinking, and individual awakening while acknowledging humanity as a mere part of the intricate web of life.",
	"## Land Acknowledgement",
	"We acknowledge that our headquarters are on Coastal Miwok and Southern Pomo Land in Sebastopol, CA, and we thank the past, current, and future Indigenous stewards of this territory.",
	"## Perspective",
	"In our view, the disconnect from Earth-based, indigenous wisdom began in the very early days of humankind, when male-dominated religions replaced fertility goddess worship as the prevalent cultural vehicle and started pitting humanity against its natural environment. Separation was born: me vs you, us vs them, human vs nature.",
	"Much later, with the Scientific Revolution, the liberation of science from religion resulted in tremendous technological advances, but it also led to the fragmentation of knowledge, and to a science no longer engaged with the big questions of what it means to be human, to be conscious, and interconnected.",
	"We also recognize that at the heart of the climate, political, and socioeconomic crises we face today lie the story of separation and the deep intergenerational trauma we carry.",
	"## Purpose",
	"At MAGEYE we envision a humanity firmly rooted in the truth of our interconnectedness. We see Earth as a living being and we hold life, in all its shapes and forms, as intelligent, sacred and complete.",
	"We promote a spirituality honoring both the absolute/transcendent and the relative/immanent aspects of consciousness—ultimately one and the same. In these times of crisis, we need to be initiated into radical compassion, care and love for all life.",
].join("\n\n");

const NONDUALITY_BODY = [
	"Nonduality has as many facets as there are human endeavors. Mystics describe the nondual experience in many ways, as loving, expansive, blissful and unitive, lacking any sense of separation. More than just a feeling, the experience conveys deep and liberating insights into the truth of life and death, self and world.",
	"Philosophers speak of reality as unencumbered by the dualistic oppositions we so often get lost in. Scientists, after centuries of analytic reductionism, are converging with the nondual view, seeing the whole as more than the sum of its parts.",
	"World religions teach nonduality in their esoteric branches, including Jewish Kabbalah, Islamic Sufism, Christian Mysticism, Hindu Advaita-Vedanta, Kashmir Shaivism, Buddhist Shentong, Madhyamaka or Zen, and Taoism. Many indigenous and shamanistic teachings are also nondual in essence.",
	"The arts celebrate and cultivate the experience of nonduality. We hold the space for these conversations across science, spirituality, and culture.",
].join("\n\n");

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
			{ id: "mission", title: "Mission", body: MISSION_BODY },
			{ id: "nonduality", title: "Nonduality", body: NONDUALITY_BODY },
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
	return () => listeners.delete(listener);
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
/** Mock gate only — replace with Firebase Auth later. */
export const ADMIN_PASSCODE = "mageye-admin";

export function isAdminSignedIn() {
	if (typeof window === "undefined") return false;
	return window.localStorage.getItem(ADMIN_KEY) === "1";
}

export function signInAdmin(passcode: string) {
	if (passcode !== ADMIN_PASSCODE) return false;
	window.localStorage.setItem(ADMIN_KEY, "1");
	return true;
}

export function signOutAdmin() {
	if (typeof window !== "undefined") window.localStorage.removeItem(ADMIN_KEY);
}
