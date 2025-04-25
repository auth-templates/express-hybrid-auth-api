import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import * as middleware from 'i18next-http-middleware';
import path from 'path';
import { dirname } from 'dirname-filename-esm';

const __dirname = dirname(import.meta);

i18next.use(Backend).use(middleware.LanguageDetector).init({
    fallbackLng: 'en',
    preload: ['en', 'ro'],
    backend: {
        loadPath: path.join(__dirname, '../locales/{{lng}}/translation.json'),
    },
    detection: {
        order: ['querystring', 'header'],
        lookupQuerystring: 'lng'
    }
});

export default middleware.handle(i18next);
