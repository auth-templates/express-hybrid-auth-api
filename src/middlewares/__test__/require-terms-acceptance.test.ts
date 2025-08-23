import { AppStatusCode } from "@/@types/status-code.js";
import { requireTermsAcceptance } from "../require-terms-acceptance.js";
import { Mock } from 'vitest';

describe('requireTermsAcceptance middleware', () => {
  let req: any;
  let res: any;
  let next: Mock;

  beforeEach(() => {
    next = vi.fn();
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
  });

  test('calls next if session.termsAccepted is falsy', () => {
    req = {
      session: { termsAccepted: false },
      path: '/dashboard',
      t: vi.fn().mockImplementation((key) => key),
    };

    requireTermsAcceptance(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test('allows /auth/accept-terms route even if termsAccepted is true', () => {
    req = {
      session: { termsAccepted: true },
      path: '/auth/accept-terms',
      t: vi.fn().mockImplementation((key) => key),
    };

    requireTermsAcceptance(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test('blocks access with 403 if termsAccepted is true and path is not /auth/accept-terms', () => {
    req = {
      session: { termsAccepted: true },
      path: '/dashboard',
      t: vi.fn().mockImplementation((key) => `Translated: ${key}`),
    };

    requireTermsAcceptance(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ messages: [{text:'Translated: validation.accept_terms', severity: "error"}], code: AppStatusCode.TERMS_ACCEPTANCE_REQUIRED});
    expect(next).not.toHaveBeenCalled();
  });

  test('handles missing session gracefully and calls next', () => {
    req = {
      path: '/dashboard',
      t: vi.fn().mockImplementation((key) => key),
    };

    requireTermsAcceptance(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
