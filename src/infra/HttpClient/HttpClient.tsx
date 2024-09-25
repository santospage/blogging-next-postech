/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestInit } from 'node-fetch';

export async function HttpClient(
  fetchUrl: string,
  fetchOptions: RequestInit | any,
) {
  const options: RequestInit | any = {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : undefined,
  };

  try {
    const response = await fetch(fetchUrl, options);
    const responseBody = await response.json();

    return {
      status: response.status,
      ok: response.ok,
      statusText: response.statusText,
      body: responseBody,
    };
  } catch (error) {
    return {
      status: 500,
      ok: false,
      statusText: 'Network error',
      body: null,
    };
  }
}
