import { AppError } from '../error';

describe('AppError', () => {
  it('should create an instance with the provided translationKey, params, and statusCode', () => {
    const translationKey = 'errors.some_error';
    const params = { field: 'email' };
    const statusCode = 422;

    const error = new AppError(translationKey, params, statusCode);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);
    expect(error.translationKey).toBe(translationKey);
    expect(error.params).toEqual(params);
    expect(error.statusCode).toBe(statusCode);
    expect(error.message).toBe(translationKey); // message comes from Error super constructor
  });

  it('should default params to empty object and statusCode to 400 if not provided', () => {
    const translationKey = 'errors.default_error';

    const error = new AppError(translationKey);

    expect(error.translationKey).toBe(translationKey);
    expect(error.params).toEqual({});
    expect(error.statusCode).toBe(400);
  });
});
