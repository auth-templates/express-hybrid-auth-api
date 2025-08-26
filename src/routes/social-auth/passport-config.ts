import passport from 'passport';

export function configurePassport() {
	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((obj, done) => done(null, obj));
}
