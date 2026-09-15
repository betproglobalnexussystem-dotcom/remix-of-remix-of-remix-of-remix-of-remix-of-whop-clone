export type Kind = "films" | "courses" | "webinar" | "podcast" | "videos" | "articles";

export type Film = {
	slug: string;
	title: string;
	duration?: string;
	land?: string;
	excerpt: string;
	image: string;
	poster?: string;
};

export type EventItem = {
	slug: string;
	title: string;
	badge: string;
	date: string;
	excerpt: string;
	image: string;
	upcoming?: boolean;
	kind?: Kind;
};

export type Course = {
	slug: string;
	title: string;
	badge: string;
	date?: string;
	excerpt: string;
	image: string;
};

export type Podcast = {
	slug: string;
	title: string;
	category: string;
	hosts: string;
	excerpt: string;
	image: string;
};

export type Article = {
	slug: string;
	title: string;
	category: string;
	author: string;
	excerpt: string;
	image: string;
	kind: "articles" | "podcast" | "videos";
	tag?: string;
};

export const HERO_SLIDES = [
	{
		title: "LIBERATION PSYCHOLOGY",
		href: "/event/liberation-psychology-roots-memory-practice",
		desktop:
			"https://scienceandnonduality.com/wp-content/uploads/2026/07/Liberation-Psycology-01-carousel-1730x960-notext-2.jpg",
		mobile:
			"https://scienceandnonduality.com/wp-content/uploads/2026/07/Liberation-Psycology-12-MobileWeb-480x960-2.jpg",
	},
	{
		title: "FLOWERS OF THE EARTH",
		href: "/event/flowers-of-the-earth",
		desktop:
			"https://scienceandnonduality.com/wp-content/uploads/2026/08/FOTE_Carousel-1730x960-desktop.jpg",
		mobile:
			"https://scienceandnonduality.com/wp-content/uploads/2026/08/FOTE_Mobile-web-480x824-1.jpg",
	},
	{
		title: "ROOTED ACTION",
		href: "/event/rooted-action-earth-spirit-and-collective-empowerment",
		desktop:
			"https://scienceandnonduality.com/wp-content/uploads/2026/08/RootedAction-01-carousel-1730x960-notext.jpg",
		mobile:
			"https://scienceandnonduality.com/wp-content/uploads/2026/08/RootedAction-12-mobileweb-480x960-1.jpg",
	},
	{
		title: "THE GREAT AI UNRAVELING SERIES",
		href: "/event/the-great-ai-unraveling-series-5",
		desktop:
			"https://scienceandnonduality.com/wp-content/uploads/2026/09/01-carousel-1730x960-notext.jpg",
		mobile:
			"https://scienceandnonduality.com/wp-content/uploads/2026/09/12-MobileWeb-480x960-1.jpg",
	},
	{
		title: "THE ETERNAL SONG",
		href: "/films/the-eternal-song",
		desktop:
			"https://scienceandnonduality.com/wp-content/uploads/2025/11/01-carousel_MegaBanner-1730x960-ok2.jpg",
		mobile:
			"https://scienceandnonduality.com/wp-content/uploads/2025/09/13-8talks-Mobile_480x824-3.jpg",
	},
	{
		title: "WHERE OLIVE TREES WEEP",
		href: "/films/where-olive-trees-weep",
		desktop:
			"https://scienceandnonduality.com/wp-content/uploads/2025/12/WOTW-Carousel-Mega-Banner-1730x960-withlaurels.jpg",
		mobile:
			"https://scienceandnonduality.com/wp-content/uploads/2025/12/WOTW_520x900_12152025.jpg",
	},
];

export const FILMS: Film[] = [
	{
		slug: "the-wisdom-of-trauma",
		title: "The Wisdom of Trauma",
		duration: "1h 27m",
		excerpt:
			"The interconnected epidemics of anxiety, chronic illness and substance abuse are, according to Dr Gabor Maté, normal. But not in the way you might think. Can our deepest pain be a doorway to healing?",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/04/Untitled-13-600x338.png",
		poster:
			"https://scienceandnonduality.com/wp-content/uploads/2025/06/13-Ad-10-Film-gathering-1080x1920-WTF-2-e1749738451903-300x480.jpg",
	},
	{
		slug: "where-olive-trees-weep",
		title: "Where Olive Trees Weep",
		duration: "104 min",
		excerpt:
			"Offering a searing window into the struggles and resilience of the Palestinian people under Israeli occupation.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/04/Untitled-12-600x338.png",
	},
	{
		slug: "the-eternal-song",
		title: "The Eternal Song",
		duration: "87 min",
		excerpt:
			"A cinematic journey through timeless lands and their Indigenous cultures.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/04/Untitled-7-600x338.png",
		poster:
			"https://scienceandnonduality.com/wp-content/uploads/2025/10/Mauri_1080x1693_150dpi_Layered-Laurels-300x480.jpg",
	},
	{
		slug: "flowers-of-the-earth",
		title: "Flowers of the Earth",
		duration: "67 min",
		excerpt:
			"The film listens to the elders who remember the forest before the farmers came, before the native were clearcut and the living land was carved into square plots of a single endless crop. It walks with the healers, whose prayer is constant as breath, and with the young women leading the Retomada, the return to ancestral land.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2025/12/Untitled-April-01-2026-at-16.59.03-600x338.png",
		poster:
			"https://scienceandnonduality.com/wp-content/uploads/2026/08/FlowersOfTheEarth_2700x4000-scaled-1-300x480.jpg",
	},
	{
		slug: "sila",
		title: "Sila",
		duration: "60 min",
		land: "Kalaallit Nunaat (Greenland)",
		excerpt:
			"This tender, nonlinear documentary follows Inuit women moving through three hundred years of Danish colonialism, including a medical program that inserted contraceptive devices into girls as young as thirteen without their consent. Their bodies became a site of colonial administration. Sila holds grief and remembering in the same breath, a remembering that travels through the long line of mothers, all the way back to the first conscious human being.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2025/01/Sila-Poster-600x338.png",
		poster:
			"https://scienceandnonduality.com/wp-content/uploads/2026/07/sila-film-poster-with-laurels-300x480.jpg",
	},
	{
		slug: "little-singer",
		title: "Little Singer",
		duration: "81 min",
		excerpt:
			"Amidst the wide horizons of Diné land, the legacy of historical trauma echoes through generations. At the center, a medicine man and a small school, where grief and resilience meet in song, teaching, and k’é (kinship). Little Singer is rooted in the land; carrying the vision and medicine of k’é for those yet to come.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2025/01/Untitled-600x338.png",
		poster:
			"https://scienceandnonduality.com/wp-content/uploads/2026/05/LittleSinger_27x40_20260206-laurels-1-300x480.png",
	},
	{
		slug: "kato-dreams-of-dark-earth",
		title: "Katô: Dreams of Dark Earth",
		duration: "78 min",
		excerpt:
			"A cinematic portal into ancestral wisdom, calling us to remember, grieve, heal, and act.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/03/Kato_27x40_wBleed_RGB_Flat-Background_20251112_with-laurels-300x480.jpg",
		poster:
			"https://scienceandnonduality.com/wp-content/uploads/2026/03/Kato_27x40_wBleed_RGB_Flat-Background_20251112_with-laurels-300x480.jpg",
	},
	{
		slug: "in-the-circle-of-life",
		title: "In the Circle of Life",
		duration: "72 min",
		excerpt:
			"Part of The Eternal Song series honoring Indigenous resilience and sacred wisdom held for humanity and Earth.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/01/TES_InTheCirlceOfLife_Vertical_with-laurels-scaled-1-300x480.jpg",
		poster:
			"https://scienceandnonduality.com/wp-content/uploads/2026/01/TES_InTheCirlceOfLife_Vertical_with-laurels-scaled-1-300x480.jpg",
	},
	{
		slug: "if-an-owl-calls-your-name",
		title: "If an Owl Calls Your Name",
		duration: "70 min",
		excerpt:
			"Each film opens a portal into the ancestral wisdom of these cultures, calling us to remember, grieve, heal, and act.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2025/12/IfAnOwlCallsYourName_4K_RGB_Layered_Laurels_20251120-VERTICAL-1-scaled-1-300x480.jpg",
		poster:
			"https://scienceandnonduality.com/wp-content/uploads/2025/12/IfAnOwlCallsYourName_4K_RGB_Layered_Laurels_20251120-VERTICAL-1-scaled-1-300x480.jpg",
	},
	{
		slug: "mauri",
		title: "Mauri",
		duration: "75 min",
		excerpt:
			"Our vision for The Eternal Song documentary series is to honor Indigenous resilience, illuminate sacred wisdom held for humanity and Earth, and invite healing across communities facing trauma and colonial erasure.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2025/10/Mauri_1080x1693_150dpi_Layered-Laurels-300x480.jpg",
		poster:
			"https://scienceandnonduality.com/wp-content/uploads/2025/10/Mauri_1080x1693_150dpi_Layered-Laurels-300x480.jpg",
	},
];

export const EVENTS: EventItem[] = [
	{
		slug: "liberation-psychology-roots-memory-practice",
		title: "LIBERATION PSYCHOLOGY: Roots, Memory, & Practice",
		badge: "LIVE ON-DEMAND",
		date: "September 9, 2026 – May 20, 2027",
		excerpt:
			"LIBERATION PSYCHOLOGY: Roots, Memory, & Practice with Dr. Pumla Gobodo-Madikizela, Dr. Jennifer Mullan, Dr. Samah Jabr, Dr. Eduardo Duran, Linda Thai, Dr. Daniel Foor, Dr. Bayo Akomolafe, Alnoor Ladha & Dr. Lynn Murphy",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/06/Liberation-Psycology-03-Thumb-460x270-1-1.jpg",
		upcoming: true,
		kind: "courses",
	},
	{
		slug: "flowers-of-the-earth",
		title: "Flowers of the Earth Film Premiere",
		badge: "COMMUNITY GATHERING",
		date: "September 22, 2026",
		excerpt: "Live Online Event around SAND’s new film, ‘Flowers of the Earth’",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/08/FOTE_Thumbnail-460x270-1.jpg",
		upcoming: true,
		kind: "films",
	},
	{
		slug: "the-great-ai-unraveling-series-5",
		title: "The Great AI Unraveling Series New",
		badge: "COMMUNITY GATHERING LIVE",
		date: "September 26, 2026 • 9:00 – 10:30am PST",
		excerpt:
			"What If Humans and AI Shared the Same Hallucination? with Bayo Akomolafe and Vanessa Andreotti, facillitated by Alnoor Ladha",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/08/03-Thumb-460x270-1.jpg",
		upcoming: true,
	},
	{
		slug: "rooted-action-earth-spirit-and-collective-empowerment",
		title: "Rooted Action: Earth, Spirit, and Collective Empowerment",
		badge: "COMMUNITY GATHERING",
		date: "September 13, 2026 • 12:00 – 1:30pm PDT",
		excerpt:
			"Earth, Spirit, and Collective Empowerment with Starhawk, facilitated by Rae Abileah",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/08/RootedAction-03-thumb-460x270-1.jpg",
	},
	{
		slug: "the-unbroken-thread-pir-zia-inayat-khan-on-the-secret-history-of-the-world",
		title:
			"The Unbroken Thread: Pir Zia Inayat Khan on the Secret History of the World",
		badge: "COMMUNITY GATHERING",
		date: "Recorded August 14, 2026",
		excerpt:
			"The Unbroken Thread: Pir Zia Inayat Khan on the Secret History of the World",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/07/The-Hidden-Thread-03-Thumb-460x270-1.jpg",
	},
	{
		slug: "the-great-ai-unraveling-series-4",
		title: "The Great AI Unraveling Series",
		badge: "COMMUNITY GATHERING",
		date: "Recorded August 6, 2026",
		excerpt:
			"What AI Reveals: Colonial Logic, Memory and the Future of Liberated Knowledge with Christian “ZacaTechO” Ortiz and Thema Monroe-White",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/07/ZACA-03_thumb_460x270.jpg",
	},
	{
		slug: "sacred-return-healing-the-impacts-of-sexual-trauma",
		title: "Sacred Return: Healing the Impacts of Sexual Trauma",
		badge: "LIVE",
		date: "Recorded August 1 & 2, 2026",
		excerpt: "A Two-Day Online Wānanga with Atarangi Muru of Māori Healers",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/06/Atarangi-Muru-Sacred-Return-Healing-03-thumb-460x270-1.jpg",
	},
	{
		slug: "the-great-ai-unraveling-series-3",
		title: "The Great AI Unraveling Series",
		badge: "COMMUNITY GATHERING",
		date: "Recorded July 10, 2026",
		excerpt:
			"The Superfluity of AI: Honoring our Nature and Remaining Humble with Dr. Lyla June Johnston, Ashley Nicole Leitka, and Kathy Wan Povi Sanchez",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/06/The-Great-AI-Unraveling-03-thumb-460x270-1.jpg",
	},
	{
		slug: "what-occupation-does-to-the-soul-global-reverberations-of-palestinian-historical-trauma",
		title:
			"What Occupation Does to the Soul: Global Reverberations of Palestinian Historical Trauma",
		badge: "COMMUNITY GATHERING",
		date: "Recorded June 26, 2026",
		excerpt:
			"Global Reverberations of Palestinian Historical Trauma with Dr. Samah Jabr, Dr. Gabor Maté, Dr. Jennifer Mullan, facilitated by Dr. Jess Ghannam",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/05/03-thumb-460x270-2.jpg",
	},
	{
		slug: "tending-the-whole-moving-personal-healing-into-collective-liberation",
		title:
			"Tending the Whole: Moving Personal Healing into Collective Liberation",
		badge: "COMMUNITY GATHERING",
		date: "Recorded June 4, 2026",
		excerpt:
			"Moving Personal Healing into Collective Liberation with Nkem Ndefo, Staci K. Haines, and Kai Cheng Thom, facilitated by Rae Abileah",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/05/04-kajabi-1280x720-1-497x297.png",
	},
	{
		slug: "the-great-ai-unraveling-series-2",
		title: "The Great AI Unraveling Series",
		badge: "COMMUNITY GATHERING",
		date: "Recorded May 9, 2026",
		excerpt:
			"Reclaiming the Conversation and the Commons with Tiokasin Ghosthorse and Pooja Prema",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/03/03-thumb-460x270-2-1.jpg",
	},
	{
		slug: "voices-of-the-land-resistance-and-solidarity",
		title: "Voices of the Land",
		badge: "COMMUNITY GATHERING",
		date: "Recorded April 30, 2026",
		excerpt:
			"Resistance and Solidarity for Lebanon with Hussein Al-Dimassi and Farah Abi Morshed, facilitated by Ashira Darwish",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/04/03-thumb-460x270-2.jpg",
	},
	{
		slug: "what-empire-cannot-erase",
		title: "What Empire Cannot Erase",
		badge: "COMMUNITY GATHERING",
		date: "Recorded April 19, 2026",
		excerpt:
			"Persian Poetry and Civilization with Prof. Fatemeh Keshavarz-Karamustafa and Omid Safi, facilitated by Mays Imad",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/03/03-Thumb-460x270-2.jpg",
	},
	{
		slug: "the-great-ai-unraveling-series",
		title: "The Great AI Unraveling Series",
		badge: "COMMUNITY GATHERING",
		date: "Recorded April 10, 2026",
		excerpt:
			"AI risks, societal impacts, and “apocaloptimism” with Tristan Harris",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/03/03-thumb-460x270-v2.jpg",
	},
	{
		slug: "sacred-remembering-in-times-of-war",
		title: "Sacred Remembering in Times of War",
		badge: "COMMUNITY GATHERING",
		date: "Recorded March 29, 2026",
		excerpt: "with Dr. Jaiya John (Mshkiki Odeh Inini, Medicine Heart Man)",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/03/01-carousel-1730x960-1-497x297.jpg",
	},
	{
		slug: "the-architecture-of-silence-in-spiritual-culture",
		title: "The Architecture of Silence in Spiritual Culture",
		badge: "COMMUNITY GATHERING",
		date: "Recorded March 23, 2026",
		excerpt:
			"Reckoning with Epstein, Deepak, and Systems of Denial with Matthew Remski, Bayo Akomolafe, Pat McCabe, Tara Brach, and V, facilitated by Dr. Gabor Maté",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/03/04-kajabi-1280x720-1-497x297.jpg",
	},
	{
		slug: "block-by-block-heart-by-heart",
		title: "Block by Block, Heart by Heart",
		badge: "COMMUNITY GATHERING",
		date: "Recorded February 26, 2026",
		excerpt:
			"Sacred Care Amid Uncertainty with Dr. Lyla June, Kaira Jewel Lingo and Rabbi Jessica Rosenberg, facilitated by Rae Abileah",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/02/03.thumb-460x270-1.jpg",
	},
	{
		slug: "nature-of-mind-and-mind-of-nature",
		title: "Nature of Mind and Mind of Nature",
		badge: "COMMUNITY GATHERING",
		date: "February 22, 2026",
		excerpt:
			"This gathering centers a live reading with Mend-Ooyo, followed by conversation and audience Q&A.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/01/04-kajabi-1280x720-1-497x297.jpg",
	},
	{
		slug: "if-i-must-die",
		title: "“If I Must Die”",
		badge: "COMMUNITY GATHERING",
		date: "Recorded on February 10, 2026",
		excerpt:
			"How the Story of Liberating Palestine Continues Through Us: A Conversation on Healing, Justice and the Soul of Liberation with Samah Jabr, facilitated by Mays Imad",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/01/03-thumb-460x270-1.jpg",
	},
	{
		slug: "consciousness-relational-languages-and-intelligence-listening",
		title: "Consciousness: Relational Languages and Intelligence Listening",
		badge: "COMMUNITY GATHERING",
		date: "Recorded January 10, 2026",
		excerpt: "Relational Languages and Intelligence Listening with Tiokasin Ghosthorse",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2025/12/04-Kajabi-1280x720-2-497x297.jpg",
	},
	{
		slug: "dispatches-through-the-rubble",
		title: "Dispatches Through the Rubble",
		badge: "COMMUNITY GATHERING",
		date: "Recorded December 28, 2025",
		excerpt: "with Haidar Eid and Ashira Darwish",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2025/12/03-Thumb_460x270-3.jpg",
	},
	{
		slug: "indigenous-ways-of-knowing-in-mental-health-wellness-and-healing",
		title:
			"Indigenous Ways of Knowing in Mental Health, Wellness, and Healing",
		badge: "COMMUNITY GATHERING",
		date: "Recorded December 14, 2025",
		excerpt: "with Leroy Little Bear",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2025/11/03-thumb-460x270-1.jpg",
	},
	{
		slug: "soul-work-for-times-of-uncertainty",
		title: "Soul Work for Times of Uncertainty",
		badge: "COMMUNITY GATHERING",
		date: "Recorded December 8, 2025",
		excerpt: "with Francis Weller",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2025/11/03-Soul-Work-for-Times-of-Uncertainty-Thum-460x270-1.jpg",
	},
	{
		slug: "therapy-is-not-neutral-a-decolonial-invitation-to-remember-relearn-and-resist",
		title:
			"Therapy Is Not Neutral: A Decolonial Invitation to Remember, Relearn, and Resist",
		badge: "COMMUNITY GATHERING",
		date: "Recorded November 22, 2025",
		excerpt:
			"A Decolonial Invitation to Remember, Relearn, and Resist with Jennifer Mullan hosted by Iya Affo",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2025/11/03_Thumb-460x270-1.jpg",
	},
];

export const COURSES: Course[] = [
	{
		slug: "liberation-psychology-roots-memory-practice",
		title: "LIBERATION PSYCHOLOGY: Roots, Memory, & Practice",
		badge: "LIVE ON-DEMAND",
		date: "September 9, 2026 – May 20, 2027",
		excerpt:
			"LIBERATION PSYCHOLOGY: Roots, Memory, & Practice with Dr. Pumla Gobodo-Madikizela, Dr. Jennifer Mullan, Dr. Samah Jabr, Dr. Eduardo Duran, Linda Thai, Dr. Daniel Foor, Dr. Bayo Akomolafe, Alnoor Ladha & Dr. Lynn Murphy",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/06/Liberation-Psycology-03-Thumb-460x270-1-1.jpg",
	},
	{
		slug: "rumi-and-the-fire-of-radical-love-a-path-through-global-rupture",
		title: "Rumi & The Fire of Radical Love: A Path Through Global Rupture",
		badge: "ON-DEMAND",
		excerpt: "A Path Through Global Rupture with Omid Safi",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/07/Rumi-The-Fire-of-Radical-Love-03-thumb-460x270-1.jpg",
	},
	{
		slug: "decolonial-mental-health-practice-part-2",
		title: "Decolonial Mental Health Practice",
		badge: "ON-DEMAND",
		excerpt: "Clinical & Ethical Insights from Palestine, Part 2 with Dr. Samah Jabr",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/05/03-thumb-460x270-1.jpg",
	},
	{
		slug: "decolonial-mental-health-practice",
		title: "Decolonial Mental Health Practice",
		badge: "ON-DEMAND",
		excerpt: "Clinical and Ethical Insights from Palestine with Dr. Samah Jabr",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/02/03-thumb-460x270-1.jpg",
	},
	{
		slug: "the-eternal-song-full-collectio",
		title: "The Eternal Song: Full Collection",
		badge: "ON-DEMAND",
		excerpt:
			"Access to The Eternal Song film, 60+ speaker talks & ceremonies, 12 feature-length films on indigenous communities, monthly community gatherings & more.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2025/05/04-TES_ALLspeakers-1280x720-ok-497x297.jpg",
	},
	{
		slug: "where-olive-trees-weep-conversations-on-palestine",
		title: "Where Olive Trees Weep: Conversations on Palestine",
		badge: "ON-DEMAND",
		excerpt: "Conversations and Extended Interviews on Palestine",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2024/06/WOTW_all_speakers_Kajabi_size-1280x720-1-497x297.jpg",
	},
	{
		slug: "pathways-to-wholeness-course",
		title: "Pathways to Wholeness",
		badge: "ON-DEMAND",
		excerpt: "An eight-part course with Gabor Maté and Betsy Polatin",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2024/01/03-New-Site-Thumb-460x270-2.jpg",
	},
	{
		slug: "reclaiming-authenticity",
		title: "Reclaiming Authenticity",
		badge: "ON-DEMAND",
		excerpt: "A nine-part Q&A series with Dr. Gabor Maté",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/10/08-Reclaiming-thumb-500x280-1-497x280.jpg",
	},
	{
		slug: "the-wisdom-of-trauma-all-access-pass",
		title: "The Wisdom of Trauma",
		badge: "ON-DEMAND",
		excerpt:
			"“Talks on Trauma” series, plus Gabor’s course, the full film and many other resources.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/10/5_AllAccessPass_Kajabi-497x297.png",
	},
	{
		slug: "in-the-mirror",
		title: "In the Mirror",
		badge: "ON-DEMAND",
		excerpt: "A three-part course with Chris Fields & special guest Eric Dietrich",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2024/01/03-New-Site-Thumb-460x270-3.jpg",
	},
	{
		slug: "ancestral-healing-and-cultural-transformation",
		title: "Ancestral Healing & Cultural Transformation",
		badge: "ON-DEMAND",
		excerpt: "A four-part course with Daniel Foor",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/11/ancestral-healing-thumb4.png",
	},
	{
		slug: "radical-authenticity-in-relationships",
		title: "Radical Authenticity in Relationships",
		badge: "ON-DEMAND",
		excerpt: "A three-part course with Gail Brenner",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/10/1696613452-9573d835d54095588e1191faed176bb3-497x280.jpg",
	},
	{
		slug: "the-intelligence-of-the-interstitial",
		title: "The Intelligence of the Interstitial",
		badge: "ON-DEMAND",
		excerpt: "A course with Sophie Strand",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/09/intelligence-of-interstitial-thumb-new.jpg",
	},
	{
		slug: "hospicing-modernity",
		title: "Hospicing Modernity",
		badge: "ON-DEMAND",
		excerpt:
			"A four-part course with Vanessa Machado de Oliveira Andreotti and Giovanna de Oliveira Andreotti",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/08/11-NewWebsiteThumb-500x300-nodate-497x297.jpg",
	},
	{
		slug: "introduction-to-maori-self-healing",
		title: "Introduction to Maori Self-Healing",
		badge: "ON-DEMAND",
		excerpt: "A two-part course with Atarangi Murupaenga",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/10/11-WebsiteThumb-Maori-500x300-nodate-497x297.jpg",
	},
	{
		slug: "natures-blueprint",
		title: "Nature’s Blueprint",
		badge: "ON-DEMAND",
		excerpt: "A four-part course with Miriam Dror",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/10/natures-blueprint-thumb-497x297.jpg",
	},
	{
		slug: "enjoying-meditation-with-peter-russell",
		title: "Enjoying Meditation",
		badge: "ON-DEMAND",
		excerpt: "A four-part course with Peter Russell",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/03/11-Michael-500x300-1-497x297.jpg",
	},
	{
		slug: "the-body-is-a-doorway",
		title: "The Body Is a Doorway",
		badge: "ON-DEMAND",
		excerpt: "A four-part course with Sophie Strand",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/02/11-Michael-500x300-1-497x297.jpg",
	},
	{
		slug: "deepening-our-collective-resilience",
		title: "Deepening Our Collective Resilience",
		badge: "ON-DEMAND",
		excerpt: "A three-part course with Iya Affo",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2021/11/11-Michael-500x300-1-497x297.jpg",
	},
	{
		slug: "the-wandering-winding-way-of-the-wound",
		title: "The Wandering, Winding Way of the Wound",
		badge: "ON-DEMAND",
		excerpt:
			"A four-part course with Bayo Akomolafe, Sophie Strand, Tyson Yunkaporta, and Vanessa Andreotti",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2022/10/02-WanderingWayofWound-thumb-500x300-nodate-497x297.jpg",
	},
	{
		slug: "breath-movement-practices-for-your-mind-body-self",
		title: "Breath & Movement Practices for your Mind-Body-Self",
		badge: "ON-DEMAND",
		excerpt: "A two-part course with Betsy Polatin",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2022/10/11-Michael-500x300-1-497x297.jpg",
	},
	{
		slug: "deep-trauma-healing-finding-ease-and-well-being-in-daily-life",
		title: "Deep Trauma Healing",
		badge: "ON-DEMAND",
		excerpt: "A five-part course with Gail Brenner",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2022/02/08-thumb-500x280-nodate-497x297.jpg",
	},
	{
		slug: "the-art-of-letting-go-with-peter-russell",
		title: "The Art of Letting Go",
		badge: "ON-DEMAND",
		excerpt: "A four-part course with Peter Russell",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2021/08/11-thumb-500x300-nodate-497x297.jpg",
	},
	{
		slug: "sacred-wounds-trauma-healing-on-the-spiritual-path",
		title: "Sacred Wounds",
		badge: "ON-DEMAND",
		excerpt: "A three-part course with Peter Levine, Efu Nyaki, and Joshua Sylvae",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2021/05/sacred-wounds-thumb.png",
	},
	{
		slug: "dwelling-in-the-heart",
		title: "Dwelling in the Heart",
		badge: "ON-DEMAND",
		excerpt: "A three-part course with Shakti Caterina Maggi",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2021/02/02-thumb-500x300-nodate-497x297.jpg",
	},
	{
		slug: "the-breath-of-the-ancestors-harvesting-ancestral-wisdom-transmuting-intergenerational-traumas",
		title: "The Breath of the Ancestors",
		badge: "ON-DEMAND",
		excerpt:
			"A three-part course with Resmaa Menakem, Tirzah Firestone & Anita Sanchez",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2022/10/breath-of-the-ancestors-e1696598962588-497x297.jpg",
	},
	{
		slug: "restoring-resilience-healthy-sexuality",
		title: "Restoring Resilience & Healthy Sexuality",
		badge: "ON-DEMAND",
		excerpt: "A two-part course with Ariel Giarretto",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2020/07/02-500x300-thumb-nodate-497x297.jpg",
	},
	{
		slug: "conscious-dreaming-in-times-of-uncertainty",
		title: "Conscious Dreaming",
		badge: "ON-DEMAND",
		excerpt: "A four-part course with Dr. Fariba Bogzaran",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2020/08/02-thumb-500x300-Fariba-Conscious-Dreaming-in-Times-of-Uncertainty-nodate-497x297.jpg",
	},
	{
		slug: "trauma-and-the-unbound-body",
		title: "Trauma and the Unbound Body",
		badge: "ON-DEMAND",
		excerpt: "A three-part course with Judith Blackstone",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2019/06/trauma-and-the-unbound-body-small-600x338.jpg",
	},
	{
		slug: "effortless-meditation",
		title: "Effortless Meditation",
		badge: "ON-DEMAND",
		excerpt: "A four-part course with Peter Russell",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2020/01/02-Kajabi-1280x720-nodate-497x297.jpg",
	},
];

export const PODCASTS: Podcast[] = [
	{
		slug: "ai-colonial-logic",
		title: "AI & Colonial Logic",
		category: "SOCIETY",
		hosts: "Christian “ZacaTechO” Ortiz, Thema Monroe-White",
		excerpt:
			"Part Four of SAND’s The Great AI Unraveling Series exploring decolonization of AI.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/09/ai-series-orange-300x300.png",
	},
	{
		slug: "the-flow-of-coherence",
		title: "The Flow of Coherence",
		category: "SCIENCE",
		hosts: "Dr. Cynthia Li",
		excerpt:
			"Trained as an internist, Cynthia developed an autoimmune condition and then chronic fatigue and dysautonomia, illnesses largely dismissed at the time as being in her head.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/09/we_truly_connected1_c0d6330cd2-300x300.jpg",
	},
	{
		slug: "the-dance-of-exile-settlement",
		title: "The Dance of Exile & Settlement",
		category: "SOCIETY",
		hosts: "Bayo Akomolafe",
		excerpt:
			"A long form interview with Bayo from the archives of The Eternal Song film.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/08/1b87b3ba-f60a-4cb6-b039-2c3c6f4255e7-300x300.png",
	},
	{
		slug: "the-unbroken-thread",
		title: "The Unbroken Thread",
		category: "SPIRITUAL TRADITIONS",
		hosts: "Pir Zia Inayat Khan",
		excerpt:
			"The Secret History of the World through drawing on sacred stories from Persia, India, Egypt and beyond.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/08/unbroken-thread-cover-art-300x300.webp",
	},
	{
		slug: "arborescence",
		title: "Arborescence",
		category: "LIVING UNIVERSE",
		hosts: "Robert Moor",
		excerpt:
			"A wide ranging discussion in our essential tree-like essence with the author of ‘In Trees’",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/08/Arborescence-300x300.jpg",
	},
	{
		slug: "superfluity-of-ai",
		title: "Superfluity of AI",
		category: "SOCIETY",
		hosts: "Lyla June, Ashley Nicole Leitka, Kathy Wan Povi Sanchez",
		excerpt:
			"Third in the “AI” Series. Throughout time, humanity has experimented with playing God, and each time we have been humbled by forces larger than ourselves.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/08/ai-series-green-300x300.png",
	},
	{
		slug: "healing-the-soul-wound",
		title: "Healing the Soul Wound",
		category: "SOCIETY",
		hosts: "Eduardo Duran",
		excerpt:
			"A discussion from the “Little Singer” premiere exploring the origins of the term historical trauma",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/07/sos172-cover-300x300.webp",
	},
	{
		slug: "grow-become-love-alone",
		title: "Grow, Become, Love, Alone",
		category: "SOCIETY",
		hosts: "Dr. Nicole Wordlaw",
		excerpt: "A conversation on vulnerability, trauma and awakening.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/07/johannes-plenio-qkfxBc2NQ18-unsplash-300x300.jpg",
	},
	{
		slug: "what-occupation-does-to-the-soul",
		title: "What Occupation Does to the Soul",
		category: "SACRED ACTION",
		hosts: "Dr. Samah Jabr, Dr. Gabor Maté, Dr. Jennifer Mullan, Dr. Jess Ghannam",
		excerpt:
			"Global reverberations of Palestinian historical trauma, recorded as a community gathering.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/05/03-thumb-460x270-2.jpg",
	},
	{
		slug: "animism-activism-ancestry",
		title: "Animism, Activism & Ancestry",
		category: "SACRED ACTION",
		hosts: "Daniel Foor",
		excerpt: "A conversation on ancestral healing and cultural transformation.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/11/ancestral-healing-thumb4.png",
	},
	{
		slug: "reigniting-indigenous-science",
		title: "Reigniting Indigenous Science",
		category: "SCIENCE",
		hosts: "Dr. Maceo Carrillo Martinet",
		excerpt: "Indigenous science as a living practice of relationship with land.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/08/article-1687176955-d4b1d63114115a3a3c15d2406e145185-CROP-3000x1000-1-497x297.jpg",
	},
];

export const ARTICLES: Article[] = [
	{
		slug: "our-world-is-rooted-in-collective-intimacy",
		title: "Our World is Rooted in Collective Intimacy",
		category: "LOVE & RELATIONSHIPS",
		author: "Thomas Hübl",
		excerpt:
			"Individual healing is an integral part of collective healing – in witnessing one another, we grow together",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/08/article-1689340382-fbe9f79f61b9adabb048193ce4a8bbda-CROP-3000x1000-1-497x297.jpg",
		kind: "articles",
	},
	{
		slug: "changing-the-world-changing-ourselves",
		title: "Changing the World, Changing Ourselves",
		category: "SOCIETY",
		author: "Bayo Akomolafe",
		excerpt:
			"Postactivism is a turn of grace, a falling off the highway, a disruption of the pheromone trail",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/08/article-1687176955-d4b1d63114115a3a3c15d2406e145185-CROP-3000x1000-1-497x297.jpg",
		kind: "articles",
		tag: "society",
	},
	{
		slug: "from-lines-to-circles",
		title: "From Lines to Circles",
		category: "ARTS",
		author: "Donya Abu Sitta",
		excerpt: "A poem.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/02/09-stories-1080x1920-1-e1771458803348-300x480.jpg",
		kind: "articles",
	},
	{
		slug: "three-methods-for-working-with-chaos",
		title: "Three Methods for Working with Chaos",
		category: "SPIRITUAL TRADITIONS",
		author: "Pema Chödrön",
		excerpt: "Practices for staying present when the world unravels.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/08/article-1689340382-fbe9f79f61b9adabb048193ce4a8bbda-CROP-3000x1000-1-497x297.jpg",
		kind: "articles",
		tag: "zen",
	},
	{
		slug: "on-palestinian-trauma-resilience",
		title: "On Palestinian Trauma & Resilience",
		category: "SOCIETY",
		author: "Lamia Moghnieh",
		excerpt: "Historical trauma, resilience, and the work of remaining human.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/04/Untitled-12-600x338.png",
		kind: "articles",
		tag: "trauma",
	},
	{
		slug: "seeking-buddha-in-gaza",
		title: "Seeking Buddha in Gaza",
		category: "SPIRITUAL TRADITIONS",
		author: "SAND",
		excerpt: "An article from the SAND library.",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/08/article-1689340382-fbe9f79f61b9adabb048193ce4a8bbda-CROP-3000x1000-1-497x297.jpg",
		kind: "articles",
		tag: "zen",
	},
];

export const EXPLORE: Article[] = [
	{
		slug: "ai-colonial-logic",
		title: "AI & Colonial Logic",
		category: "SOCIETY",
		author: "Christian “ZacaTechO” Ortiz, Thema Monroe-White",
		excerpt: "Podcast with Christian “ZacaTechO” Ortiz, Thema Monroe-White",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/09/ai-series-orange-497x297.png",
		kind: "podcast",
	},
	{
		slug: "our-world-is-rooted-in-collective-intimacy",
		title: "Our World is Rooted in Collective Intimacy",
		category: "LOVE & RELATIONSHIPS",
		author: "Thomas Hübl",
		excerpt: "Article by Thomas Hübl",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/08/article-1689340382-fbe9f79f61b9adabb048193ce4a8bbda-CROP-3000x1000-1-497x297.jpg",
		kind: "articles",
	},
	{
		slug: "the-flow-of-coherence",
		title: "The Flow of Coherence",
		category: "SCIENCE",
		author: "Dr. Cynthia Li",
		excerpt: "Podcast with Dr. Cynthia Li",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/09/we_truly_connected1_c0d6330cd2-497x297.jpg",
		kind: "podcast",
	},
	{
		slug: "changing-the-world-changing-ourselves",
		title: "Changing the World, Changing Ourselves",
		category: "SOCIETY",
		author: "Bayo Akomolafe",
		excerpt: "Article by Bayo Akomolafe",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2023/08/article-1687176955-d4b1d63114115a3a3c15d2406e145185-CROP-3000x1000-1-497x297.jpg",
		kind: "articles",
	},
	{
		slug: "the-dance-of-exile-settlement",
		title: "The Dance of Exile & Settlement",
		category: "SOCIETY",
		author: "Bayo Akomolafe",
		excerpt: "Podcast with Bayo Akomolafe",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/08/1b87b3ba-f60a-4cb6-b039-2c3c6f4255e7-300x300.png",
		kind: "podcast",
	},
	{
		slug: "the-unbroken-thread",
		title: "The Unbroken Thread",
		category: "SPIRITUAL TRADITIONS",
		author: "Pir Zia Inayat Khan",
		excerpt: "Podcast with Pir Zia Inayat Khan",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/08/unbroken-thread-cover-art-300x300.webp",
		kind: "podcast",
	},
	{
		slug: "arborescence",
		title: "Arborescence",
		category: "LIVING UNIVERSE",
		author: "Robert Moor",
		excerpt: "Podcast with Robert Moor",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/08/Arborescence-300x300.jpg",
		kind: "podcast",
	},
	{
		slug: "from-lines-to-circles",
		title: "From Lines to Circles",
		category: "ARTS",
		author: "Donya Abu Sitta",
		excerpt: "Poem by Donya Abu Sitta",
		image:
			"https://scienceandnonduality.com/wp-content/uploads/2026/02/09-stories-1080x1920-1-e1771458803348-300x480.jpg",
		kind: "articles",
	},
];

export function filmBySlug(slug: string) {
	return FILMS.find((item) => item.slug === slug);
}
export function eventBySlug(slug: string) {
	return (
		EVENTS.find((item) => item.slug === slug) ??
		COURSES.find((item) => item.slug === slug)
	);
}
export function courseBySlug(slug: string) {
	return COURSES.find((item) => item.slug === slug);
}
export function podcastBySlug(slug: string) {
	return PODCASTS.find((item) => item.slug === slug);
}
export function articleBySlug(slug: string) {
	return ARTICLES.find((item) => item.slug === slug);
}
export function exploreHref(item: Article) {
	if (item.kind === "podcast") return `/audio/${item.slug}`;
	if (item.kind === "videos") return `/videos/${item.slug}`;
	return `/article/${item.slug}`;
}
