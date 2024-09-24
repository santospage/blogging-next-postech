export type CategoryModel = {
  _id: string;
  name: string;
};

export type CategoriesModel = {
  categories: CategoryModel[];
};

export type CategoryPropsModel = {
  cat: {
    _id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
  };
};
