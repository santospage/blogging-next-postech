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
    return responseBody;
  } catch (error) {
    console.error('Error fetching:', error);
    return [];
  }
}
