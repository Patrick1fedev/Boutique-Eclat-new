import { createContext, useContext } from "react";
import product1 from '../assets/Images/df4629d5a458e3c6c456a49cb707f671.jpg';
import product2 from '../assets/Images/IMG_0237.jpg';
import product3 from '../assets/Images/IMG_0251.jpg';
import product4 from '../assets/Images/IMG_0443.jpg';
import product5 from '../assets/Images/IMG_0415.jpg';
import product6 from '../assets/Images/IMG_0445.jpg';
import product7 from '../assets/Images/IMG_0447.jpg';
import product8 from '../assets/Images/IMG_0241.jpg';
import product9 from '../assets/Images/IMG_0446.jpg';
import product10 from '../assets/Images/IMG_0244.jpg';
import product11 from '../assets/Images/IMG_0442.jpg';
import product12 from '../assets/Images/IMG_0237.jpg';

type ProductProviderProps = {
    children: React.ReactNode;
}
interface ProductList {
    id: number;
    src: string;
    description: string;
    price: number;
    for: string;
}
interface ProductsContextType {
    sampleProducts: ProductList[];
    getRandomProducts: (sampleProducts: ProductList[], ammount?: number) => ProductList[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({children}: ProductProviderProps) {

    const sampleProducts: ProductList[] = [
        { id: 1, src: product1, description: "Producto 1", price: 53.45, for:'woman'},
        { id: 2, src: product2, description: "Producto 2", price: 82.77, for:'man'},
        { id: 3, src: product3, description: "Producto 3", price: 79.39, for:'man'},
        { id: 4, src: product4, description: "Producto 4", price: 45.49, for:'accesories'},
        { id: 5, src: product5, description: "Producto 5", price: 65.79, for:'man'},
        { id: 6, src: product6, description: "Producto 6", price: 88.98, for:'woman'},
        { id: 7, src: product7, description: "Producto 7", price: 55.49, for:'man'},
        { id: 8, src: product8, description: "Producto 8", price: 88.40, for:'man'},
        { id: 9, src: product9, description: "Producto 9", price: 67.99, for:'woman'},
        { id: 10, src: product10, description: "Producto 10", price: 39.59, for:'man'},
        { id: 11, src: product11, description: "Producto 11", price: 49.95, for:'accesories'},
        { id: 12, src: product12, description: "Producto 12", price: 49.99, for:'man'},
    ];

    const getRandomProducts = (sampleProducts: ProductList[], ammount = sampleProducts.length) => {
        const shuffled = [...sampleProducts].sort(()=> .5 - Math.random());
        return shuffled.slice(0, ammount);
    };
    
    return(
        <ProductsContext.Provider value={{sampleProducts, getRandomProducts}}>
            {children}
        </ProductsContext.Provider>
    )

}

export const useProducts=(): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};