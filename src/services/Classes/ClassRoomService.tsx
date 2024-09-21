import { HttpClient } from '@/infra/HttpClient/HttpClient';
import { ClassRoomModel } from '@/models/Classes/Classes';
import { tokenService } from '@/services/Auth/tokenService';
import { prepareDataForValidation } from 'formik';

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

  async getClassesManagerial() {
    const token = tokenService.get();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes/managerial`;
    const response = await HttpClient(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
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

  async createClassRoom(values: ClassRoomModel) {
    try {
      const token = tokenService.get();
      const classRoomValues = prepareClassRoomData(values);
      const { _id, ...classRoomData } = classRoomValues;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes`;
      const response = await HttpClient(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: classRoomData,
      });

      if (!response.ok) {
        throw new Error(`Failed to create classroom: ${response.statusText}`);
      }

      return response.body;
    } catch (error) {
      throw new Error(
        `Failed to create classroom: ${(error as Error).message}`,
      );
    }
  },

  async updateClassRoom(values: ClassRoomModel) {
    try {
      const token = tokenService.get();
      const classRoomValues = prepareClassRoomData(values);
      const { _id, ...classRoomData } = classRoomValues;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes/${_id}`;
      const response = await HttpClient(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: classRoomData,
      });

      if (!response.ok) {
        throw new Error(`Failed to update classroom: ${response.statusText}`);
      }

      return response.body;
    } catch (error) {
      throw new Error(
        `Failed to update classroom: ${(error as Error).message}`,
      );
    }
  },

  async deleteClassRoom(id: string) {
    try {
      const token = tokenService.get();
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes/${id}`;
      const response = await HttpClient(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete classroom: ${response.statusText}`);
      }

      return response.body;
    } catch (error) {
      throw new Error(
        `Failed to delete classroom: ${(error as Error).message}`,
      );
    }
  },
};

function prepareClassRoomData(values: ClassRoomModel) {
  const { category, user, updatedAt, ...valuesData } = values;
  const categoryId = '66a0669b0dcd7668a1a7aa8f';
  const userId = '669d42f5f10b2dc4de0b74af';

  const classRoomData = {
    ...valuesData,
    category: categoryId,
    user: userId,
    date: new Date(),
  };

  return classRoomData;
}
