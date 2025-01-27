import { HttpClient } from '@/infra/HttpClient/HttpClient';
import { tokenService } from '@/services/Auth/TokenService';

export const aiService = {
  async createAI(topic: string, field: string) {
    try {
      const token = tokenService.get();
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/aigenerate`;
      const response = await HttpClient(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: {
          topic,
          field,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create content with AI: ${response.statusText}`,
        );
      }

      return response.body.message;
    } catch (error) {
      throw new Error(
        `Failed to create content with AI: ${(error as Error).message}`,
      );
    }
  },
};
