import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

const Meal = async ({ params }: { params: Promise<{ meal: string }> }) => {
  const { meal } = await params;
  const mealData = await getMeal(meal);

  if (!mealData) {
    notFound();
  }

  mealData.instructions = mealData.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={mealData.image} alt={mealData.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{mealData.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${mealData.creator_email}`}>{mealData.creator}</a>
          </p>
          <p className={classes.summary}>{mealData.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: mealData.instructions,
          }}
        />
      </main>
    </>
  );
};

export default Meal;
