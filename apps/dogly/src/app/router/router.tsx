import { createBrowserRouter } from 'react-router-dom';
import { dogsBreeds } from '../consts';
import { BreedList, BreedView, FavoritesView } from '@vite/ui';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <BreedList breedList={dogsBreeds} type="dog" />,
  },
  {
    path: '/breed/:breed',
    element: <BreedView type={'dog'} />,
  },

  {
    path: '/favorites',
    element: <FavoritesView />,
  },
]);
