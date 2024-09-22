export type ClassesModel = {
  _id: string;
  resume: string;
  category: {
    name: string;
  };
};

export type ClassesProps = {
  classes: ClassesModel[];
  searchTerm: string;
};

export type ClassRoomModel = {
  _id: string;
  title: string;
  detail: string;
  resume: string;
  image?: string;
  updatedAt?: string;
  category: {
    name: string;
  };
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
