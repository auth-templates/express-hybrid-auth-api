import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import GlobalConfig from '../config';
import { AccountsRepository } from '../repositories/accounts';

passport.use('github', new GitHubStrategy({
  clientID: GlobalConfig.GITHUB_CLIENT_ID,
  clientSecret: GlobalConfig.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/callback',
  scope: ['user:email']
},
async (accessToken, refreshToken, profile, done) => {
  const id = profile.id;
  const provider = 'github';
  const email = profile.emails?.[0]?.value || `${profile.username}@github.com`; // fallback
  const avatar_url = profile.photos?.[0]?.value;
  const firstName = profile.displayName || profile.username;
  const lastName = ''; // GitHub does not provide separate first/last names

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
  } catch (err) {
    done(err, null);
  }
}));
