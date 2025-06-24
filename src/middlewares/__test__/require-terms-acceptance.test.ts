
import { Request, Response } from 'express';
import { requireTermsAcceptance } from '../require-terms-acceptance';

describe('requireTermsAcceptance middleware', () => {
  let request: Partial<Request>;
  let response: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    request = {
      path: '',
      session: {},
      t: jest.fn().mockReturnValue('You must accept the terms of service.')
    } as any;

    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    next = jest.fn();
  });

    it('should allow /auth/accept-terms route without checking termsAccepted', () => {
        (request as unknown as { path: string }).path = '/auth/accept-terms';   
        requireTermsAcceptance(request as Request, response as Response, next);

        expect(next).toHaveBeenCalled();
    });

    it('should reject request if termsAccepted is not true', () => {
        (request as unknown as { path: string }).path = '/protected';

        requireTermsAcceptance(request as Request, response as Response, next);

        expect(response.status).toHaveBeenCalledWith(403);
        expect(response.json).toHaveBeenCalledWith({ message: 'You must accept the terms of service.' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should allow request if termsAccepted is true', () => {
        (request as unknown as { path: string }).path = '/protected';
        (request as unknown as { session: {termsAccepted: boolean }}).session = { termsAccepted: true };

        requireTermsAcceptance(request as Request, response as Response, next);

        expect(next).toHaveBeenCalled();
        expect(response.status).not.toHaveBeenCalled();
        expect(response.json).not.toHaveBeenCalled();
    });
});
