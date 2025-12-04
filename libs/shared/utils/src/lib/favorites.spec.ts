import { describe, it, expect } from 'vitest';
import { addFavorite, removeFavorite, getFavorites } from './favorites';

beforeEach(() => {
  const allFavorites = getFavorites();
  allFavorites.forEach((url) => removeFavorite(url));
});

describe('Favorites Module', () => {
  it('should add a favorite URL', () => {
    addFavorite('https://example.com');
    const favorites = getFavorites();
    expect(favorites).toContain('https://example.com');
  });

  it('should not add duplicate URLs', () => {
    addFavorite('https://example.com');
    addFavorite('https://example.com');
    const favorites = getFavorites();
    expect(favorites).toEqual(['https://example.com']);
  });

  it('should remove a favorite URL', () => {
    addFavorite('https://example.com');
    removeFavorite('https://example.com');
    const favorites = getFavorites();
    expect(favorites).not.toContain('https://example.com');
  });

  it('should handle removing a non-existent URL gracefully', () => {
    addFavorite('https://example.com');
    removeFavorite('https://nonexistent.com');
    const favorites = getFavorites();
    expect(favorites).toEqual(['https://example.com']);
  });

  it('should return an empty array when no favorites are added', () => {
    const favorites = getFavorites();
    expect(favorites).toEqual([]);
  });
});
