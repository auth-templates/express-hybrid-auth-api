import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import GlobalConfig from '../../config.js';
import { googleVerifyCallback, githubVerifyCallback } from './callbacks.js';

export function registerSocialStrategies(): void {
	if (GlobalConfig.GOOGLE_CLIENT_ID && GlobalConfig.GOOGLE_CLIENT_SECRET) {
		passport.use(
			'google',
			new GoogleStrategy(
				{
					clientID: GlobalConfig.GOOGLE_CLIENT_ID,
					clientSecret: GlobalConfig.GOOGLE_CLIENT_SECRET,
					callbackURL: GlobalConfig.GOOGLE_CALLBACK_URL,
				},
				googleVerifyCallback
			)
		);
	}

	if (GlobalConfig.GITHUB_CLIENT_ID && GlobalConfig.GITHUB_CLIENT_SECRET) {
		passport.use(
			'github',
			new GitHubStrategy(
				{
					clientID: GlobalConfig.GITHUB_CLIENT_ID,
					clientSecret: GlobalConfig.GITHUB_CLIENT_SECRET,
					callbackURL: GlobalConfig.GITHUB_CALLBACK_URL,
					scope: ['user:email'],
				},
				githubVerifyCallback
			)
		);
	}
}
