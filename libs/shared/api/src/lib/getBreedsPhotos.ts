export const getBreedsPhotos = async (
  type: string,
  breed: string,
  photoAmout: number
): Promise<string[]> => {
  const response = await fetch(
    `https://${type}.ceo/api/breed/${breed}/images/random/${photoAmout}`
  );
  const data = await response.json();
  return data.message;
};
