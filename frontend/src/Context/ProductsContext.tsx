import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

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
    products: ProductList[];
    getRandomProducts: (products: ProductList[], ammount?: number) => ProductList[];
    isLoading: boolean;
    getProducts: (url: string) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({children}: ProductProviderProps) {


    const [products, setProducts] = useState<ProductList[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = async (url:string) => {
        try {
            setIsLoading(true);
            const response = await axios.get<ProductList[]>(`${url}`);
            setProducts(response.data);
        } catch (error) {
            console.error(error)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(() =>{
        getProducts("http://127.0.0.1:8089/products");
    }, [])


    const getRandomProducts = (products: ProductList[], ammount = products? products.length : 0) => {
        if (products) {
            const shuffled = [...products].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, ammount);
        }
        return [];
        
    }
        
    
    return(
        <ProductsContext.Provider value={{products, getRandomProducts, isLoading, getProducts}}>
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