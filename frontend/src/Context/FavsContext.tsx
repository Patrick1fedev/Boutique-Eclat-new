import { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext.tsx';



type FavsProviderProps = {
    children: React.ReactNode;
}

interface Product{
  id: number;
  src: string;
  description: string;
  price: number;
  for: string;
}

interface FavoritesContextType{
  favorites: Product[];
  toggleFavorite: (item: Product)=> void;
  isFavorite: (id:number) => boolean
}
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: FavsProviderProps) => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState<Product[]|[]>([]);

  useEffect(() => {
    if (user?.id) {
      const stored = localStorage.getItem(`favorites_${user.id}`);
      setFavorites(stored ? JSON.parse(stored) : []);
    } else {
      setFavorites([]);
    }
  }, [user?.id]); 

  const toggleFavorite = (item: Product) => {
    if (user != null) {
      const exists = favorites.some(fav => fav.id === item.id);
      const updated = exists
      ? favorites.filter(fav => fav.id !== item.id)
      : [...favorites, item];

      setFavorites(updated);
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(updated));
    } else{
      throw new Error("Logueate primero padrino")
    }
  };

  const isFavorite = (id: number) => favorites.some(fav => fav.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context
}
