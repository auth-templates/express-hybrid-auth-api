import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import * as middleware from 'i18next-http-middleware';
import path from 'path';
import appRoot from 'app-root-path'

const rootDir = appRoot.path;

const i18nReady = i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'ro'],
    backend: {
      loadPath: path.join(rootDir, 'src/locales/{{lng}}/translation.json'),
    },
    detection: {
      order: ['querystring', 'header'],
      lookupQuerystring: 'lng',
    }
});

const i18nMiddleware = middleware.handle(i18next);

export { i18next, i18nMiddleware, i18nReady };
