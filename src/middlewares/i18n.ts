import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import * as middleware from 'i18next-http-middleware';
import path from 'path';
import appRoot from 'app-root-path'

const rootDir = appRoot.path;

i18next.use(Backend).use(middleware.LanguageDetector).init({
    fallbackLng: 'en',
    preload: ['en', 'ro'],
    backend: {
        loadPath: path.join(rootDir, 'src/locales/{{lng}}/translation.json'),
    },
    detection: {
        order: ['querystring', 'header'],
        lookupQuerystring: 'lng'
    }
});

export default middleware.handle(i18next);
