type NewItemPageProps = {
  params: {
    newItem: string;
  };
};

export default function NewItemPage({ params }: NewItemPageProps) {
  const { newItem } = params;

  return (
    <div>
      <h1>{newItem}</h1>
    </div>
  );
}
