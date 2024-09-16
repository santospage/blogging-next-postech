import { HttpClient } from '@/infra/HttpClient/HttpClient';

export const classroomService = {
  async getClasses() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes`;
    const response = await HttpClient(url, {
      method: 'GET',
      headers: {},
    });
    if (!response.ok) {
      throw new Error(`Failed to get classes: ${response.statusText}`);
    }
    return response.body;
  },

  async getClassesById(id: string) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes/${id}`;
    const response = await HttpClient(url, {
      method: 'GET',
      headers: {},
    });
    if (!response.ok) {
      throw new Error(`Failed to get classRoom: ${response.statusText}`);
    }
    return response.body;
  },
};
