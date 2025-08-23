import { AccountsRepository } from '../repositories/accounts.js';
import { Profile as GithubProfile } from 'passport-github2';
import { Profile as GoogleProfile, VerifyCallback } from 'passport-google-oauth20';

type Done = (error: any, user?: any, info?: any) => void;

export async function githubVerifyCallback(
	accessToken: string,
	refreshToken: string,
	profile: GithubProfile,
	done: Done
) {
	const id = profile.id;
	const provider = 'github';
	const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
	const avatar_url = profile.photos?.[0]?.value;
	const firstName = profile.displayName || profile.username;
	const lastName = '';

	try {
		const user = await AccountsRepository.findOrCreate({
			id,
			provider,
			email,
			avatar_url,
			firstName,
			lastName,
		});
		done(null, user);
	} catch (err) {
		done(err, null);
	}
}

export async function googleVerifyCallback(
	accessToken: string,
	refreshToken: string,
	profile: GoogleProfile,
	done: VerifyCallback
) {
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
			lastName,
		});
		done(null, user);
	} catch (error) {
		done(error, null);
	}
}
