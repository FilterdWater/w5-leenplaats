export interface Category {
  id: number;
  name: string;
}

export function categoryToJSON(category: Category) {
  return {
    id: category.id,
    name: category.name,
  };
}
