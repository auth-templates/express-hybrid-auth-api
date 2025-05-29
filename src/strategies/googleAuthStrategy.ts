import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import GlobalConfig from '../config';
import { AccountsRepository } from '../repositories/accounts';
import passport from 'passport';

passport.use(new GoogleStrategy(
  {
    clientID: GlobalConfig.GOOGLE_CLIENT_ID,
    clientSecret: GlobalConfig.GOOGLE_CLIENT_SECRET,
    callbackURL: GlobalConfig.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    const { id, provider } = profile;
    const email = profile.emails?.[0]?.value;
    const avatar_url = profile.photos?.[0]?.value;
    const firstName = profile.name?.givenName;
    const lastName = profile.name?.familyName;

    try {
      const user = await AccountsRepository.findOrCreate({
        id,
        provider,
        email,
        avatar_url,
        firstName,
        lastName
      });
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

export default passport;
