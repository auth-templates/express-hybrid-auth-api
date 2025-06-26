import { Request, Response } from 'express';
import { NextFunction } from "express";
import jwt from 'jsonwebtoken';
import GlobalConfig from '../config';

export function authenticate(request: Request, response: Response, next: NextFunction): void {
  try {
    if ( !request.session || !request.session.user?.id ) {
      response.status(401).json({ error: 'Session invalid or expired' });
      return
    }

    const token = request.cookies?.accessToken;
    if (!token) {
      response.status(401).json({ error: 'Access token missing' });
      return
    }

    jwt.verify(token, GlobalConfig.ACCESS_TOKEN_SECRET);

    next();
  } catch (err) {
    // console.error('Authentication error:', err);

    // Token expired or invalid
    if (err instanceof jwt.TokenExpiredError) {
      response.status(401).json({ error: 'Access token expired' });
      return
    }

    if (err instanceof jwt.JsonWebTokenError) {
      response.status(403).json({ error: 'Invalid access token' });
      return
    }

    response.status(500).json({ error: 'Internal server error' });
  }
}