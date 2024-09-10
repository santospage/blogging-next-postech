export interface ICategory {
  _id: string;
  name: string;
}

interface ICategories {
  categories: ICategory[];
}

export interface ICategoryProps {
  cat: {
    _id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
  };
}
