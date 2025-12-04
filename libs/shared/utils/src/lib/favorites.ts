const favorites: Set<string> = new Set();

export const addFavorite = (url: string): void => {
	favorites.add(url);
};

export const removeFavorite = (url: string): void => {
	favorites.delete(url);
};

export const getFavorites = (): string[] => {
	return Array.from(favorites);
};
