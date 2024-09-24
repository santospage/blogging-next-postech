import { classroomService } from '@/services/Classes/ClassRoomService';
import { HttpClient } from '@/infra/HttpClient/HttpClient';
import { tokenService } from '@/services/Auth/TokenService';
import { ClassRoomModel } from '@/models/Classes/Classes';

jest.mock('@/infra/HttpClient/HttpClient');
jest.mock('@/services/Auth/TokenService');

describe('classroomService', () => {
  describe('getClasses', () => {
    it('should return classes when response is ok', async () => {
      const mockClasses = [
        { _id: '1', title: 'Class 1' },
        { _id: '2', title: 'Class 2' },
      ];
      (HttpClient as jest.Mock).mockResolvedValueOnce({
        ok: true,
        body: mockClasses,
      });

      const classes = await classroomService.getClasses();

      expect(HttpClient).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes`,
        {
          method: 'GET',
          headers: {},
        },
      );
      expect(classes).toEqual(mockClasses);
    });

    it('should throw an error when response is not ok', async () => {
      (HttpClient as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(classroomService.getClasses()).rejects.toThrow(
        'Failed to get classes: Not Found',
      );
    });
  });

  describe('getClassesManagerial', () => {
    it('should return managerial classes when response is ok', async () => {
      const token = 'mock-token';
      const mockClasses = [{ _id: '1', title: 'Managerial Class 1' }];
      (tokenService.get as jest.Mock).mockReturnValue(token);
      (HttpClient as jest.Mock).mockResolvedValueOnce({
        ok: true,
        body: mockClasses,
      });

      const classes = await classroomService.getClassesManagerial();

      expect(HttpClient).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes/managerial`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      expect(classes).toEqual(mockClasses);
    });

    it('should throw an error when response is not ok', async () => {
      const token = 'mock-token';
      (tokenService.get as jest.Mock).mockReturnValue(token);
      (HttpClient as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Forbidden',
      });

      await expect(classroomService.getClassesManagerial()).rejects.toThrow(
        'Failed to get classes: Forbidden',
      );
    });
  });

  describe('createClass', () => {
    it('should throw an error when response is not ok', async () => {
      const token = 'mock-token';
      const mockClass: ClassRoomModel = {
        _id: '1',
        title: 'New Class',
        detail: 'Class details',
        resume: 'Class resume',
        image: 'class-image.png',
        category: { name: 'Math' },
        user: { user: 'mock-user' },
      };
      (tokenService.get as jest.Mock).mockReturnValue(token);
      (HttpClient as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Bad Request',
      });

      await expect(
        classroomService.createClassRoom(mockClass, mockClass.category.name),
      ).rejects.toThrow('Failed to create classroom: Bad Request');
    });
  });

  describe('updateClass', () => {
    it('should throw an error when response is not ok', async () => {
      const token = 'mock-token';
      const mockClass: ClassRoomModel = {
        _id: '1',
        title: 'Updated Class',
        detail: 'Updated details',
        resume: 'Updated resume',
        image: 'updated-class-image.png',
        category: { name: 'Science' },
        user: { user: 'mock-user' },
      };
      (tokenService.get as jest.Mock).mockReturnValue(token);
      (HttpClient as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(
        classroomService.updateClassRoom(mockClass, mockClass.category.name),
      ).rejects.toThrow('Failed to update classroom: Not Found');
    });
  });

  describe('deleteClass', () => {
    it('should delete a class when response is ok', async () => {
      const token = 'mock-token';
      const classId = '1';
      (tokenService.get as jest.Mock).mockReturnValue(token);
      (HttpClient as jest.Mock).mockResolvedValueOnce({
        ok: true,
        body: {},
      });

      await classroomService.deleteClassRoom(classId);

      expect(HttpClient).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes/${classId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
    });

    it('should throw an error when response is not ok', async () => {
      const token = 'mock-token';
      const classId = '1';
      (tokenService.get as jest.Mock).mockReturnValue(token);
      (HttpClient as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Server Error',
      });

      await expect(classroomService.deleteClassRoom(classId)).rejects.toThrow(
        'Failed to delete classroom: Server Error',
      );
    });
  });
});
