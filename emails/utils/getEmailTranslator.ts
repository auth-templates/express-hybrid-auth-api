import i18next, { TFunction } from 'i18next';
import enTranslation from '../../src/locales/en/translation.json' with { type: 'json' };
import roTranslation from '../../src/locales/ro/translation.json' with { type: 'json' };

const instances: Record<string, TFunction> = {};

export function getEmailTranslator(lang: string = 'en'): TFunction {
	if (instances[lang]) return instances[lang];

	const resources = {
		en: {
			emails: enTranslation,
		},
		ro: {
			emails: roTranslation,
		},
		// Add more locales here
	};

	const instance = i18next.createInstance();
	instance.init({
		lng: lang,
		fallbackLng: 'en',
		defaultNS: 'emails',
		resources,
		interpolation: { escapeValue: false },
		initImmediate: false, // <- makes it synchronous
	});

	const t = instance.t.bind(instance);
	instances[lang] = t;
	return t;
}
