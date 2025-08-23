import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticate } from '../authenticate.js';
import GlobalConfig from '../../config.js';
import { AppStatusCode } from '@/@types/status-code.js';

vi.mock('jsonwebtoken');

describe('authenticate middleware', () => {
  const mockRequest = (session = {}, cookies = {}, originalUrl = '/') =>
    ({
      session,
      cookies,
      originalUrl
    } as unknown as Request);

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res as Response;
  };

  const next: NextFunction = vi.fn();

  const validSession = { user: { id: 1 } };
  const validToken = 'valid.token.here';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call next() when session and valid token are present', () => {
    vi.mocked(jwt.verify).mockReturnValue({} as any);

    const req = mockRequest(validSession, { access_token: validToken });
    const res = mockResponse();

    authenticate(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(validToken, GlobalConfig.ACCESS_TOKEN_SECRET);
    expect(next).toHaveBeenCalled();
  });

  it('should call next() without verifying token for /auth/refresh route', () => {
    const req = mockRequest(validSession, {}, '/auth/refresh')
    const res = mockResponse();

    authenticate(req, res, next);

    expect(jwt.verify).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
});

  it('should return 401 if session is missing', () => {
    const req = mockRequest(undefined, { access_token: validToken });
    const res = mockResponse();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ messages:[{text:'Session invalid or expired', severity: "error"}], code: AppStatusCode.SESSION_INVALID_OR_EXPIRED});
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if access token is missing', () => {
    const req = mockRequest(validSession, {});
    const res = mockResponse();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ messages: [{text: 'Access token missing', severity: "error"}], code: AppStatusCode.ACCESS_TOKEN_MISSING});
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is expired', () => {
    vi.mocked(jwt.verify).mockImplementation(() => {
      throw new jwt.TokenExpiredError('jwt expired', new Date());
    });

    const req = mockRequest(validSession, { access_token: validToken });
    const res = mockResponse();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ messages: [{text: 'Access token expired', severity: "error"}], code: AppStatusCode.ACCESS_TOKEN_EXPIRED});
  });

  it('should return 403 if token is invalid', () => {
    vi.mocked(jwt.verify).mockImplementation(() => {
      throw new jwt.JsonWebTokenError('jwt malformed');
    });

    const req = mockRequest(validSession, { access_token: validToken });
    const res = mockResponse();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ messages: [{text: 'Invalid access token', severity: "error"}], code: AppStatusCode.ACCESS_TOKEN_INVALID});
  });

  it('should return 500 for unexpected errors', () => {
    vi.mocked(jwt.verify).mockImplementation(() => {
      throw new Error('Unexpected failure');
    });

    const req = mockRequest(validSession, { access_token: validToken });
    const res = mockResponse();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ messages: [{text:'Internal server error', severity: "error"}], code: AppStatusCode.INTERNAL_SERVER_ERROR});
  });
});
