import { aiService } from '@/services/OpenAI/OpenAIService';
import { HttpClient } from '@/infra/HttpClient/HttpClient';
import { tokenService } from '@/services/Auth/TokenService';

// Mocking dependencies
jest.mock('@/infra/HttpClient/HttpClient');
jest.mock('@/services/Auth/TokenService');

describe('aiService', () => {
  const mockToken = 'mockToken';
  const mockResponse = { ok: true, body: { message: 'Generated content' } };

  beforeEach(() => {
    // Mock the token service to return a mock token
    (tokenService.get as jest.Mock).mockReturnValue(mockToken);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create content with AI successfully', async () => {
    // Mock the HttpClient to resolve with a mock response
    (HttpClient as jest.Mock).mockResolvedValue(mockResponse);

    const result = await aiService.createAI('Test Topic', 'Test Field');

    expect(result).toBe('Generated content');
    expect(HttpClient).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/aigenerate`,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: `Bearer ${mockToken}`,
        }),
        body: expect.objectContaining({
          topic: 'Test Topic',
          field: 'Test Field',
        }),
      }),
    );
  });

  it('should throw error when failing to create content with AI', async () => {
    // Mock the HttpClient to simulate a failed response
    (HttpClient as jest.Mock).mockResolvedValue({
      ok: false,
      statusText: 'Error',
    });

    await expect(
      aiService.createAI('Test Topic', 'Test Field'),
    ).rejects.toThrow('Failed to create content with AI: Error');
  });

  it('should throw error when catching exception during call', async () => {
    // Mock the HttpClient to throw an error
    (HttpClient as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(
      aiService.createAI('Test Topic', 'Test Field'),
    ).rejects.toThrow('Failed to create content with AI: Network error');
  });
});
