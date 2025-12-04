import { describe, it, expect, vi } from 'vitest';
import { getBreedsPhotos } from './getBreedsPhotos';

describe('getBreedsPhotos', () => {
  it('should fetch and return the correct number of photos', async () => {
    const mockType = 'dog';
    const mockBreed = 'retriever';
    const mockPhotoAmount = 3;
    const mockResponse = {
      message: [
        'https://example.com/photo1.jpg',
        'https://example.com/photo2.jpg',
        'https://example.com/photo3.jpg',
      ],
    };

    const mockFetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    });
    global.fetch = mockFetch;

    const photos = await getBreedsPhotos(mockType, mockBreed, mockPhotoAmount);

    expect(mockFetch).toHaveBeenCalledWith(
      `https://${mockType}.ceo/api/breed/${mockBreed}/images/random/${mockPhotoAmount}`
    );
    expect(photos).toEqual(mockResponse.message);
  });

  it('should handle fetch errors gracefully', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Fetch error'));
    global.fetch = mockFetch;

    const mockType = 'dog';
    const mockBreed = 'retriever';
    const mockPhotoAmount = 3;

    await expect(
      getBreedsPhotos(mockType, mockBreed, mockPhotoAmount)
    ).rejects.toThrow('Fetch error');
  });
});
