import { HttpClient } from '@/infra/httpclient/HttpClient';

export const classesService = {
  async getClasses() {
    const response = await HttpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes`,
      {
        method: 'GET',
        headers: {},
      },
    );

    return response;
  },
};
