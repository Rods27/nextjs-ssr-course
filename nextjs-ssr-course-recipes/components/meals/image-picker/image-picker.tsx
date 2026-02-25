'use client';
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name }: { label: string; name: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pickedImage, setPickedImage] = useState<string>('');

  const handlePickImage = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage ? (
            <p>No image picked yet</p>
          ) : (
            <Image src={pickedImage} alt="The image selected by the user" fill />
          )}
        </div>
        <input
          className={classes.input}
          ref={inputRef}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          required
        />
        <button className={classes.button} type="button" onClick={handlePickImage}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
