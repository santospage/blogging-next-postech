export type ClassesModel = {
  _id: string;
  category: {
    name: string;
  };
};

export type ClassRoomModel = {
  _id: string;
  title: string;
  detail: string;
  resume: string;
  image: string;
  updatedAt: Date;
  user: {
    user: string;
  };
};

export type ClassRoomPropsModel = {
  classroom: {
    _id: string;
    title: string;
    detail: string;
    resume: string;
    image: string;
  };
};
