import { useEffect, useState } from 'react';

import classes from './FavoritesView.module.scss';
import { Link } from 'react-router-dom';

import { getFavorites } from '@vite/utils';

import { Image } from '../../components/Image';

export const FavoritesView: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <div className={classes.wrapper}>
      <h2>Favorites</h2>
      <Link to="/">Back to Breed List</Link>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className={classes.favorites}>
          {favorites.map((url) => (
            <div key={url} className={classes.element}>
              <Image src={url} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
