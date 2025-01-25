import { HttpClient } from '@/infra/HttpClient/HttpClient';
import { tokenService } from '@/services/Auth/TokenService';

export const aiService = {
  async generateContent(topic: string, field: string) {
    try {
      const token = tokenService.get();
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/openai/generate`;
      const response = await HttpClient(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: { topic, field },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to generate AI content: ${response.statusText}`,
        );
      }

      return response.body;
    } catch (error) {
      throw new Error(
        `Error generating AI content: ${(error as Error).message}`,
      );
    }
  },
};
