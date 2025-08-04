import { AppStatusCode } from "@/@types/status-code.js";
import { requireTermsAcceptance } from "../require-terms-acceptance.js";

describe('requireTermsAcceptance middleware', () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    next = jest.fn();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  test('calls next if session.termsAccepted is falsy', () => {
    req = {
      session: { termsAccepted: false },
      path: '/dashboard',
      t: jest.fn().mockImplementation((key) => key),
    };

    requireTermsAcceptance(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test('allows /auth/accept-terms route even if termsAccepted is true', () => {
    req = {
      session: { termsAccepted: true },
      path: '/auth/accept-terms',
      t: jest.fn().mockImplementation((key) => key),
    };

    requireTermsAcceptance(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test('blocks access with 403 if termsAccepted is true and path is not /auth/accept-terms', () => {
    req = {
      session: { termsAccepted: true },
      path: '/dashboard',
      t: jest.fn().mockImplementation((key) => `Translated: ${key}`),
    };

    requireTermsAcceptance(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ messages: [{text:'Translated: validation.accept_terms', severity: "error"}], code: AppStatusCode.TERMS_ACCEPTANCE_REQUIRED});
    expect(next).not.toHaveBeenCalled();
  });

  test('handles missing session gracefully and calls next', () => {
    req = {
      path: '/dashboard',
      t: jest.fn().mockImplementation((key) => key),
    };

    requireTermsAcceptance(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
