'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

const isInvalidText = (text: string) => {
  return !text || text.trim() === '';
};

export const shareMeals = async (_prevState: unknown, formData: FormData) => {
  'use server';

  const meal = {
    title: formData.get('title') as string,
    slug: '',
    image: formData.get('image') as File,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    creator: formData.get('name') as string,
    creator_email: formData.get('email') as string,
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid input',
    };
  }

  await saveMeal(meal);
  revalidatePath('/meals');
  redirect('/meals');
};
