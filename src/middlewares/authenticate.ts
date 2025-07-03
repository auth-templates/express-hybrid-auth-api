import { Request, Response } from 'express';
import { NextFunction } from "express";
import jwt from 'jsonwebtoken';
import GlobalConfig from '../config';
import { createMessageResponse } from '../lib/response';

export function authenticate(request: Request, response: Response, next: NextFunction): void {
  try {
    if ( !request.session || !request.session.user?.id ) {
        response.status(401).json(createMessageResponse('Session invalid or expired', 'error'));
        return
    }

    if ( request.originalUrl === '/auth/refresh' ) {
        next()
        return
    }

    const token = request.cookies?.access_token;
    if (!token) {
      response.status(401).json(createMessageResponse('Access token missing', 'error'));
      return
    }

    jwt.verify(token, GlobalConfig.ACCESS_TOKEN_SECRET);

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      response.status(401).json(createMessageResponse('Access token expired', 'error'));
      return
    }

    if (err instanceof jwt.JsonWebTokenError) {
      response.status(403).json(createMessageResponse('Invalid access token', 'error'));
      return
    }

    response.status(500).json(createMessageResponse('Internal server error', 'error'));
  }
}