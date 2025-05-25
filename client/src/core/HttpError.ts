interface ApiError {
  message: string;
  code?: string;
}

export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly data: ApiError,
    message?: string
  ) {
    super(message || data.message || `HTTP Error ${status}`);
    this.name = 'HttpError';
  }
}