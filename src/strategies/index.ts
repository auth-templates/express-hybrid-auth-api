import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import GlobalConfig from '../config';
import passport from 'passport';
import { googleVerifyCallback } from './callbacks';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { githubVerifyCallback } from './callbacks';

passport.use('google', new GoogleStrategy(
    {
        clientID: GlobalConfig.GOOGLE_CLIENT_ID,
        clientSecret: GlobalConfig.GOOGLE_CLIENT_SECRET,
        callbackURL: GlobalConfig.GOOGLE_CALLBACK_URL
    },
    googleVerifyCallback
));

passport.use('github', new GitHubStrategy(
    {
        clientID: GlobalConfig.GITHUB_CLIENT_ID,
        clientSecret: GlobalConfig.GITHUB_CLIENT_SECRET,
        callbackURL: GlobalConfig.GITHUB_CALLBACK_URL,
        scope: ['user:email']
    }, 
    githubVerifyCallback
));

export default passport;


