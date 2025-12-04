import { describe, test, vi, beforeEach, afterEach, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import { BreedView } from './BreedView';
import { getBreedsPhotos } from '@vite/api';
import { breedCache } from '@vite/cache';
import { addFavorite } from '@vite/utils';

vi.mock('@vite/api', () => ({
  getBreedsPhotos: vi.fn(),
}));

vi.mock('@vite/utils', () => ({
  addFavorite: vi.fn(),
  removeFavorite: vi.fn(),
}));

describe('BreedView Component', () => {
  const mockImages = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
  const breed = 'labrador';
  const type = 'dog';

  beforeEach(() => {
    breedCache[breed] = { images: [], votes: { '': 0 } };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders breed title and back link', async () => {
    vi.mocked(getBreedsPhotos).mockResolvedValue(mockImages);

    render(
      <MemoryRouter initialEntries={[`/${breed}`]}>
        <Routes>
          <Route path="/:breed" element={<BreedView type={type} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Labrador Photos/i)).toBeInTheDocument();
      expect(screen.getByText(/Back to Breed List/i)).toBeInTheDocument();
    });
  });

  test('loads images and displays them', async () => {
    vi.mocked(getBreedsPhotos).mockResolvedValue(mockImages);

    render(
      <MemoryRouter initialEntries={[`/${breed}`]}>
        <Routes>
          <Route path="/:breed" element={<BreedView type={type} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      mockImages.forEach((url) => {
        expect(screen.getByTestId(`image-${url}`)).toBeInTheDocument();
      });
    });
  });

  test('handles voting and updates the UI', async () => {
    breedCache[breed] = {
      images: mockImages,
      votes: { 'image1.jpg': 0, 'image2.jpg': 0 },
    };

    render(
      <MemoryRouter initialEntries={[`/${breed}`]}>
        <Routes>
          <Route path="/:breed" element={<BreedView type={type} />} />
        </Routes>
      </MemoryRouter>
    );

    const voteButton = screen.getAllByRole('button')[0];
    const voteCount = screen.getByTestId('voteCounter-image1.jpg');

    fireEvent.click(voteButton);

    await waitFor(() => {
      expect(voteCount).toHaveTextContent('1');
      expect(addFavorite).toHaveBeenCalledWith('image1.jpg');
    });
  });

  test('uses cached data when available', async () => {
    breedCache[breed] = {
      images: mockImages,
      votes: { [mockImages[0]]: 1, [mockImages[1]]: 2, [mockImages[2]]: 0 },
    };

    render(
      <MemoryRouter initialEntries={[`/${breed}`]}>
        <Routes>
          <Route path="/:breed" element={<BreedView type={type} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Labrador Photos/i)).toBeInTheDocument();
      mockImages.forEach((url) => {
        expect(screen.getByTestId(`image-${url}`)).toBeInTheDocument();
      });
    });

    expect(getBreedsPhotos).not.toHaveBeenCalled();
  });
});
