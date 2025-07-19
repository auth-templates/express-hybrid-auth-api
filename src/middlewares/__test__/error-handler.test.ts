import { AppStatusCode } from '@/@types/status-code';
import { errorHandler } from '../error-handler';
import type { Request, Response, NextFunction } from 'express';

describe('errorHandler middleware', () => {
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });

        res = {
        status: statusMock,
        };
    });

    test('should respond with 403 and specific message for EBADCSRFTOKEN error', () => {
        const err = { code: 'EBADCSRFTOKEN' } as any;

        errorHandler(err, {} as Request, res as Response, {} as NextFunction);

        expect(statusMock).toHaveBeenCalledWith(403);
        expect(jsonMock).toHaveBeenCalledWith({ messages:[{ text: 'Invalid CSRF token', severity: "error"}], code: AppStatusCode.CSRF_TOKEN_INVALID});
    });

    test('should respond with error status and message if provided', () => {
        const err = { status: 400, message: 'Bad Request' } as any;

        errorHandler(err, {} as Request, res as Response, {} as NextFunction);

        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith({ messages: [{ text:'Bad Request', severity: "error"}]});
    });

    test('should respond with 500 and default message if no status/message', () => {
        const err = {} as any;
        const req = { t: jest.fn().mockReturnValue('Internal Server Error') } as any;

        errorHandler(err, req as Request, res as Response, {} as NextFunction);

        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({
            messages: [{ text: 'Internal Server Error', severity: 'error' }],
        });
    });
});
