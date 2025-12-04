import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import classes from './BreedView.module.scss';
import { addFavorite, removeFavorite } from '@vite/utils';
import { getBreedsPhotos } from '@vite/api';
import { breedCache } from '@vite/cache';
import { ImageCard } from '../../components';

interface BreedViewProps {
  type: string;
}

export const BreedView: React.FC<BreedViewProps> = ({ type }) => {
  const { breed } = useParams<{ breed: string }>();
  const [images, setImages] = useState<string[]>([]);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [isVoteCooldown, setIsVoteCooldown] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      if (breed) {
        if (breedCache[breed]?.images.length > 0) {
          setImages(breedCache[breed].images);
          setVotes(breedCache[breed].votes);
        } else {
          const fetchedImages = await getBreedsPhotos(type, breed, 5);

          const initialVotes = fetchedImages.reduce(
            (acc: Record<string, number>, url: string) => {
              acc[url] = 0;
              return acc;
            },
            {}
          );
          setImages(fetchedImages);
          setVotes(initialVotes);

          breedCache[breed] = {
            images: fetchedImages,
            votes: initialVotes,
          };
        }
      }
    };
    loadImages();
  }, [breed, type]);

  const handleVote = (url: string, increment: number) => {
    if (breed && !isVoteCooldown) {
      const updatedVotes = { ...votes, [url]: votes[url] + increment };
      setVotes(updatedVotes);

      breedCache[breed] = {
        ...breedCache[breed],
        votes: updatedVotes,
      };

      if (updatedVotes[url] > 0) {
        addFavorite(url);
      } else {
        removeFavorite(url);
      }

      setIsVoteCooldown(true);
      setTimeout(() => {
        setIsVoteCooldown(false);
      }, 5000);
    }
  };

  if (breed) {
    return (
      <div className={classes.wrapper}>
        <h2>{breed.charAt(0).toUpperCase() + breed.slice(1)} Photos</h2>
        <Link to="/">Back to Breed List</Link>
        <div className={classes.list}>
          {images.map((url) => (
            <ImageCard
              key={url}
              url={url}
              votes={votes[url]}
              onVote={handleVote}
              disabledButton={isVoteCooldown}
            />
          ))}
        </div>
      </div>
    );
  }
};
