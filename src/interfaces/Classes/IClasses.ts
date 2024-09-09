export interface IClasses {
  _id: string;
  category: {
    name: string;
  };
}

export interface IClassRoom {
  classroom: {
    _id: string;
    title: string;
    detail: string;
    resume: string;
    image: string;
  };
}
