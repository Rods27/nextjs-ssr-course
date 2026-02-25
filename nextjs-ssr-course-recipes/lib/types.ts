export interface Meal {
  id: number;
  slug: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

export interface FormMeal {
  slug: string;
  title: string;
  image: File;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}
