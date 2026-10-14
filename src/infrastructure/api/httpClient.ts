import { type AxiosInstance, type AxiosRequestConfig, create } from 'axios';

import { env } from '@core/config/env';

class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = create({
      baseURL: env.API_URL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.instance.interceptors.request.use((config) => {
      // TODO: در مرحله Auth توکن اضافه می‌شه
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        // اینجا می‌تونی log کنی یا خطا رو نرمال‌سازی کنی
        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.instance.get<T>(url, config);
    return data;
  }

  async post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.instance.post<T>(url, body, config);
    return data;
  }

  async patch<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.instance.patch<T>(url, body, config);
    return data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.instance.delete<T>(url, config);
    return data;
  }
}

export const http = new HttpClient();
