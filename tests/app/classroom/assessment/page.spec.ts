import { aiService } from '@/services/OpenAI/OpenAIService';
import { useRouter } from 'next/navigation';

// Mock modules
jest.mock('@/services/OpenAI/OpenAIService', () => ({
  aiService: {
    createAI: jest.fn(),
  },
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));
jest.mock('jspdf', () => {
  return jest.fn().mockImplementation(() => ({
    setFont: jest.fn(),
    setFontSize: jest.fn(),
    text: jest.fn(),
    internal: {
      pageSize: {
        getHeight: jest.fn().mockReturnValue(842),
        getWidth: jest.fn().mockReturnValue(595),
      },
    },
    save: jest.fn(),
    splitTextToSize: jest.fn().mockReturnValue(['text']),
  }));
});

describe('AssessmentPage', () => {
  let mockRouter: jest.Mock;

  beforeEach(() => {
    mockRouter = useRouter as jest.Mock;
    mockRouter.mockReturnValue({
      push: jest.fn(),
    });

    sessionStorage.setItem('classTitle', 'Test Class');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add content with AI and fill in the description', async () => {
    const mockCreateAI = aiService.createAI as jest.Mock;
    mockCreateAI.mockResolvedValue('Generated content');
  });

  // eslint-disable-next-line max-len
  it('should display error when trying to add content with AI if service fails', async () => {
    const mockCreateAI = aiService.createAI as jest.Mock;
    mockCreateAI.mockRejectedValue(new Error('Failed to generate'));
  });

  it('should generate PDF when you click on the generate PDF button', () => {});
});
