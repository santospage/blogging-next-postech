import { categoryService } from '@/services/Categories/CategoryService';
import { HttpClient } from '@/infra/HttpClient/HttpClient';
import { tokenService } from '@/services/Auth/TokenService';

jest.mock('@/infra/HttpClient/HttpClient');
jest.mock('@/services/Auth/TokenService');

describe('categoryService', () => {
  const mockCategory = { _id: '1', name: 'Test Category' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCategories', () => {
    it('should return categories successfully', async () => {
      (HttpClient as jest.Mock).mockResolvedValue({
        ok: true,
        body: [mockCategory],
      });

      const result = await categoryService.getCategories();

      expect(HttpClient).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`,
        {
          method: 'GET',
          headers: {},
        },
      );
      expect(result).toEqual([mockCategory]);
    });

    it('should throw an error if the response is not ok', async () => {
      (HttpClient as jest.Mock).mockResolvedValue({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(categoryService.getCategories()).rejects.toThrow(
        'Failed to get categories: Not Found',
      );
    });
  });

  describe('getCategoryById', () => {
    it('should return category by id successfully', async () => {
      (tokenService.get as jest.Mock).mockReturnValue('validToken');
      (HttpClient as jest.Mock).mockResolvedValue({
        ok: true,
        body: mockCategory,
      });

      const result = await categoryService.getCategoryById('1');

      expect(HttpClient).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/1`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer validToken',
            'Content-Type': 'application/json',
          },
        },
      );
      expect(result).toEqual(mockCategory);
    });

    it('should throw an error if the response is not ok', async () => {
      (tokenService.get as jest.Mock).mockReturnValue('validToken');
      (HttpClient as jest.Mock).mockResolvedValue({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(categoryService.getCategoryById('1')).rejects.toThrow(
        'Failed to get categories: Not Found',
      );
    });
  });

  describe('getCategoriesManagerial', () => {
    it('should return managerial categories successfully', async () => {
      (tokenService.get as jest.Mock).mockReturnValue('validToken');
      (HttpClient as jest.Mock).mockResolvedValue({
        ok: true,
        body: [mockCategory],
      });

      const result = await categoryService.getCategoriesManagerial();

      expect(HttpClient).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/managerial`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer validToken',
            'Content-Type': 'application/json',
          },
        },
      );
      expect(result).toEqual([mockCategory]);
    });

    it('should throw an error if the response is not ok', async () => {
      (tokenService.get as jest.Mock).mockReturnValue('validToken');
      (HttpClient as jest.Mock).mockResolvedValue({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(categoryService.getCategoriesManagerial()).rejects.toThrow(
        'Failed to get managerial categories: Not Found',
      );
    });
  });

  describe('createCategory', () => {
    it('should create category successfully', async () => {
      (tokenService.get as jest.Mock).mockReturnValue('validToken');
      (HttpClient as jest.Mock).mockResolvedValue({
        ok: true,
        body: mockCategory,
      });

      const result = await categoryService.createCategory(mockCategory);

      expect(HttpClient).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer validToken',
            'Content-Type': 'application/json',
          },
          body: { name: 'Test Category' },
        },
      );
      expect(result).toEqual(mockCategory);
    });

    it('should throw an error if the response is not ok', async () => {
      (tokenService.get as jest.Mock).mockReturnValue('validToken');
      (HttpClient as jest.Mock).mockResolvedValue({
        ok: false,
        statusText: 'Bad Request',
      });

      await expect(
        categoryService.createCategory(mockCategory),
      ).rejects.toThrow('Failed to create category: Bad Request');
    });
  });

  describe('updateCategory', () => {
    it('should update category successfully', async () => {
      (tokenService.get as jest.Mock).mockReturnValue('validToken');
      (HttpClient as jest.Mock).mockResolvedValue({
        ok: true,
        body: mockCategory,
      });

      const result = await categoryService.updateCategory(mockCategory);

      expect(HttpClient).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/1`,
        {
          method: 'PUT',
          headers: {
            Authorization: 'Bearer validToken',
            'Content-Type': 'application/json',
          },
          body: { name: 'Test Category' },
        },
      );
      expect(result).toEqual(mockCategory);
    });

    it('should throw an error if the response is not ok', async () => {
      (tokenService.get as jest.Mock).mockReturnValue('validToken');
      (HttpClient as jest.Mock).mockResolvedValue({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(
        categoryService.updateCategory(mockCategory),
      ).rejects.toThrow('Failed to update category: Not Found');
    });
  });

  describe('deleteCategory', () => {
    it('should delete category successfully', async () => {
      (tokenService.get as jest.Mock).mockReturnValue('validToken');
      (HttpClient as jest.Mock).mockResolvedValue({
        ok: true,
        body: {},
      });

      const result = await categoryService.deleteCategory('1');

      expect(HttpClient).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/1`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer validToken',
            'Content-Type': 'application/json',
          },
        },
      );
      expect(result).toEqual({});
    });

    it('should throw an error if the response is not ok', async () => {
      (tokenService.get as jest.Mock).mockReturnValue('validToken');
      (HttpClient as jest.Mock).mockResolvedValue({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(categoryService.deleteCategory('1')).rejects.toThrow(
        'Failed to delete category: Not Found',
      );
    });
  });
});
