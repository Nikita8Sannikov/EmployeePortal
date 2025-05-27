import { HttpError } from './HttpError';
import CatchErrors from './CatchErrors';

export class ApiClient {
  constructor(
    private readonly baseUrl: string,
    private readonly catchErrors: CatchErrors
  ) { }

  async request(endpoint: string, options: RequestInit): Promise<Response> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = await response.text();
        }
        throw new HttpError(response.status, errorData, response.statusText);
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        await this.catchErrors.catchError(error);
      } else {
        await this.catchErrors.catchError(new Error('Unknown error occurred'));
      }
      throw error;
    }
  }

  async get(endpoint: string) {
    const response = await this.request(endpoint, { method: 'GET' });
    return response.json();
  }

  async post(endpoint: string, body: any) {
    const response = await this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
    return response.json();
  }

  async patch(endpoint: string, body: any) {
    const response = await this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body)
    });
    return response.json();
  }
}