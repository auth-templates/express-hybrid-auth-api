import { githubVerifyCallback, googleVerifyCallback } from '../callbacks.js';
import { AccountsRepository } from '../../repositories/accounts.js';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Profile as GithubProfile } from 'passport-github2';

vi.mock('../../repositories/accounts.js');

describe('OAuth verify callbacks', () => {
    const mockUser = { id: 123, email: 'test@example.com' };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('githubVerifyCallback', () => {
        const done = vi.fn();

        const baseProfile: GithubProfile = {
            id: 'github-id-1',
            username: 'githubuser',
            displayName: 'GitHub User',
            profileUrl: 'https://github.com/githubuser',
            provider: 'github',
            emails: [{ value: 'user@github.com' }],
            photos: [{ value: 'http://avatar.url/github.png' }]
        };

        it('calls done with user on success', async () => {
            vi.mocked(AccountsRepository.findOrCreate).mockResolvedValue(mockUser as any);

            await githubVerifyCallback('access-token', 'refresh-token', baseProfile, done);

            expect(AccountsRepository.findOrCreate).toHaveBeenCalledWith({
                id: baseProfile.id,
                provider: 'github',
                email: baseProfile.emails[0].value,
                avatar_url: baseProfile.photos[0].value,
                firstName: baseProfile.displayName,
                lastName: '',
            });
            expect(done).toHaveBeenCalledWith(null, mockUser);
        });

        it('uses fallback email if none provided', async () => {
            const profileNoEmail = { ...baseProfile, emails: undefined };

            vi.mocked(AccountsRepository.findOrCreate).mockResolvedValue(mockUser as any);

            await githubVerifyCallback('access-token', 'refresh-token', profileNoEmail, done);

            expect(AccountsRepository.findOrCreate).toHaveBeenCalledWith(
                expect.objectContaining({
                    email: `${profileNoEmail.username}@github.com`,
                }),
            );
            expect(done).toHaveBeenCalledWith(null, mockUser);
        });

        it('calls done with error on failure', async () => {
            const error = new Error('fail');
            vi.mocked(AccountsRepository.findOrCreate).mockRejectedValue(error);

            await githubVerifyCallback('access-token', 'refresh-token', baseProfile, done);

            expect(done).toHaveBeenCalledWith(error, null);
        });
    });

    describe('googleVerifyCallback', () => {
        const done = vi.fn();

        const baseProfile: GoogleProfile = {
            id: 'google-id-123',
            provider: 'google',
            displayName: 'Google User',
            profileUrl: 'https://profiles.google.com/googleuser',
            emails: [{ value: 'user@gmail.com', verified: true }],
            photos: [{ value: 'https://lh3.googleusercontent.com/a-/AOh14Gg' }],
            name: {
                familyName: 'User',
                givenName: 'Google',
            },
            _raw: '{}',
            _json: {} as any,
        };

        it('calls done with user on success', async () => {
            vi.mocked(AccountsRepository.findOrCreate).mockResolvedValue(mockUser as any);

            await googleVerifyCallback('access-token', 'refresh-token', baseProfile, done);

            expect(AccountsRepository.findOrCreate).toHaveBeenCalledWith({
                id: baseProfile.id,
                provider: baseProfile.provider,
                email: baseProfile.emails[0].value,
                avatar_url: baseProfile.photos[0].value,
                firstName: baseProfile.name.givenName,
                lastName: baseProfile.name.familyName,
            });
            expect(done).toHaveBeenCalledWith(null, mockUser);
        });

        it('calls done with error on failure', async () => {
            const error = new Error('fail');
           vi.mocked(AccountsRepository.findOrCreate).mockRejectedValue(error);

            await googleVerifyCallback('access-token', 'refresh-token', baseProfile, done);

            expect(done).toHaveBeenCalledWith(error, null);
        });
    });
});
