import { HttpClient } from '@/infra/httpclient/HttpClient';

export const classroomService = {
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

  async getClassesById(id: string) {
    const response = await HttpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes/${id}`,
      {
        method: 'GET',
        headers: {},
      },
    );

    return response;
  },
};
