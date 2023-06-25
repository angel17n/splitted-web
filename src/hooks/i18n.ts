import { derived, writable } from 'svelte/store';
import translations from '../translations';
import type es from '../translations/es';

export type Translation = keyof typeof translations;

export type TranslationKey = keyof typeof es;

export const locale = writable<Translation>('en');
export const locales = Object.keys(translations);

function translate(locale: Translation, key: TranslationKey, vars: { [x: string]: any }) {
	// Grab the translation from the translations object.
	let text = translations[locale][key];

	// Replace any passed in variables in the translation string.
	Object.keys(vars).map((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		text = text.replace(regex, vars[k]);
	});

	return text;
}

export const t = derived(
	locale,
	($locale) =>
		(key: TranslationKey, vars = {}) =>
			translate($locale, key, vars)
);
