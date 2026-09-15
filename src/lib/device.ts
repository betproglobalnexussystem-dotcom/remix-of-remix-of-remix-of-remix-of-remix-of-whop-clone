// Device identity: every browser/device gets a stable id, an auto-generated
// email address and an access token. This acts as the visitor's silent login
// so subscriptions are remembered without asking anyone to type an email.

export type DeviceIdentity = {
	deviceId: string;
	email: string;
	token: string;
	createdAt: number;
	label: string;
};

const DEVICE_KEY = "mageye.device";
const EMAIL_DOMAIN = "devices.mageye.stream";

function randomId(size = 16) {
	const bytes = new Uint8Array(size);
	if (typeof crypto !== "undefined" && crypto.getRandomValues) {
		crypto.getRandomValues(bytes);
	} else {
		for (let i = 0; i < size; i += 1) bytes[i] = Math.floor(Math.random() * 256);
	}
	return Array.from(bytes)
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}

function deviceLabel() {
	if (typeof navigator === "undefined") return "Unknown device";
	const ua = navigator.userAgent || "";
	const os = /Android/i.test(ua)
		? "Android"
		: /iPhone|iPad|iPod/i.test(ua)
			? "iOS"
			: /Mac OS X/i.test(ua)
				? "macOS"
				: /Windows/i.test(ua)
					? "Windows"
					: /Linux/i.test(ua)
						? "Linux"
						: "Web";
	const browser = /Edg\//.test(ua)
		? "Edge"
		: /Chrome\//.test(ua)
			? "Chrome"
			: /Safari\//.test(ua)
				? "Safari"
				: /Firefox\//.test(ua)
					? "Firefox"
					: "Browser";
	return `${os} · ${browser}`;
}

/** Reads the stored identity, creating and persisting one on first visit. */
export function getDeviceIdentity(): DeviceIdentity | null {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(DEVICE_KEY);
		if (raw) {
			const parsed = JSON.parse(raw) as Partial<DeviceIdentity>;
			if (parsed?.deviceId && parsed.email && parsed.token) {
				return {
					deviceId: parsed.deviceId,
					email: parsed.email,
					token: parsed.token,
					createdAt: parsed.createdAt ?? Date.now(),
					label: parsed.label ?? deviceLabel(),
				};
			}
		}
	} catch {
		/* fall through and mint a new identity */
	}

	const deviceId = randomId(10);
	const identity: DeviceIdentity = {
		deviceId,
		email: `device-${deviceId}@${EMAIL_DOMAIN}`,
		token: randomId(24),
		createdAt: Date.now(),
		label: deviceLabel(),
	};
	try {
		window.localStorage.setItem(DEVICE_KEY, JSON.stringify(identity));
	} catch {
		/* private mode — identity stays in memory for this session */
	}
	return identity;
}

/** Convenience: the auto-generated email used to identify this device. */
export function deviceEmail(): string | undefined {
	return getDeviceIdentity()?.email;
}
