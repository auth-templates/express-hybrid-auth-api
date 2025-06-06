import { Request, Response } from 'express';
import { csrf } from '../csrf';

describe('csrf middleware', () => {
  const mockRequest = (method: string, origin?: string): Request =>
    ({
      method,
      headers: origin ? { Origin: origin } : {},
    } as unknown as Request);

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call next() for GET requests regardless of Origin', () => {
    const req = mockRequest('GET');
    const res = mockResponse();

    csrf(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should call next() for non-GET requests with valid origin', () => {
    const req = mockRequest('POST', 'http://localhost:3000');
    const res = mockResponse();

    csrf(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should return 403 for non-GET requests with no origin', () => {
    const req = mockRequest('POST');
    const res = mockResponse();

    csrf(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 for non-GET requests with invalid origin', () => {
    const req = mockRequest('POST', 'https://malicious.com');
    const res = mockResponse();

    csrf(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});
