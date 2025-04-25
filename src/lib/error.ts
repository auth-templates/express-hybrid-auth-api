export class AppError extends Error {
    translationKey: string;
    params?: Record<string, unknown>;
    statusCode: number;
  
    constructor(translationKey: string, params = {}, statusCode = 400) {
      super(translationKey);
      this.translationKey = translationKey;
      this.params = params;
      this.statusCode = statusCode;
    }
  }
  