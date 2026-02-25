import fs from 'node:fs';
import type { FormMeal, Meal } from './types';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = new sql('database/meals.db');

export const getMeals = async (): Promise<Meal[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error('Loading meals failed');
  return db.prepare('SELECT * FROM meals').all();
};

export const getMeal = async (slug: string): Promise<Meal> => {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
};

export const saveMeal = async (meal: FormMeal): Promise<void> => {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const imageExtension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${imageExtension}`;
  const writeStream = fs.createWriteStream(`public/images/${fileName}`);

  const bufferedImage = await meal.image.arrayBuffer();

  writeStream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Failed to save image');
    }
  });

  const newMeal = {
    ...meal,
    image: `/images/${fileName}`,
  };

  db.prepare(
    `
    INSERT INTO meals
      (slug, title, image, summary, instructions, creator, creator_email)
    VALUES (
      @slug,
        @title,
        @image,
        @summary,
        @instructions,
        @creator,
        @creator_email
    )
  `
  ).run({
    slug: newMeal.slug,
    title: newMeal.title,
    image: newMeal.image,
    summary: newMeal.summary,
    instructions: newMeal.instructions,
    creator: newMeal.creator,
    creator_email: newMeal.creator_email,
  });
};
