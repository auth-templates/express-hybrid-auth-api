import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticate } from '../authenticate';
import GlobalConfig from '../../config';

jest.mock('jsonwebtoken');

describe('authenticate middleware', () => {
  const mockRequest = (session = {}, cookies = {}) =>
    ({
      session,
      cookies,
    } as unknown as Request);

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  const next: NextFunction = jest.fn();

  const validSession = { user: { id: 1 } };
  const validToken = 'valid.token.here';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call next() when session and valid token are present', () => {
    (jwt.verify as jest.Mock).mockReturnValue({});

    const req = mockRequest(validSession, { accessToken: validToken });
    const res = mockResponse();

    authenticate(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(validToken, GlobalConfig.ACCESS_TOKEN_SECRET);
    expect(next).toHaveBeenCalled();
  });

  it('should return 401 if session is missing', () => {
    const req = mockRequest(undefined, { accessToken: validToken });
    const res = mockResponse();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Session invalid or expired' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if access token is missing', () => {
    const req = mockRequest(validSession, {});
    const res = mockResponse();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Access token missing' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is expired', () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new jwt.TokenExpiredError('jwt expired', new Date());
    });

    const req = mockRequest(validSession, { accessToken: validToken });
    const res = mockResponse();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Access token expired' });
  });

  it('should return 403 if token is invalid', () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new jwt.JsonWebTokenError('jwt malformed');
    });

    const req = mockRequest(validSession, { accessToken: validToken });
    const res = mockResponse();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid access token' });
  });

  it('should return 500 for unexpected errors', () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Unexpected failure');
    });

    const req = mockRequest(validSession, { accessToken: validToken });
    const res = mockResponse();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});
