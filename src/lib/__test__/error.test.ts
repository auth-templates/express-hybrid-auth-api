import { AppStatusCode } from '@/@types/status-code.js';
import { AppError } from '../error.js';

describe('AppError', () => {
  it('should create an instance with the provided translationKey, params, and statusCode', () => {
    const translationKey = 'errors.some_error';
    const params = { field: 'email' };
    const statusCode = 422;
    const code = AppStatusCode.INTERNAL_SERVER_ERROR;

    const error = new AppError(translationKey, params, code,statusCode);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);
    expect(error.translationKey).toBe(translationKey);
    expect(error.params).toEqual(params);
    expect(error.httpStatusCode).toBe(statusCode);
    expect(error.code).toBe(AppStatusCode.INTERNAL_SERVER_ERROR)
    expect(error.message).toBe(translationKey); // message comes from Error super constructor
  });

  it('should statusCode to 400 if not provided', () => {
    const translationKey = 'errors.default_error';

    const error = new AppError(translationKey, {}, AppStatusCode.INTERNAL_SERVER_ERROR);

    expect(error.translationKey).toBe(translationKey);
    expect(error.params).toEqual({});
    expect(error.httpStatusCode).toBe(400);
    expect(error.code).toBe(AppStatusCode.INTERNAL_SERVER_ERROR);
  });
});
