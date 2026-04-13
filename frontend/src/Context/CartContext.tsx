import { createContext, useContext, useEffect, useState } from 'react'
import { useUser } from './UserContext.tsx';

type CartProviderProps = {
    children: React.ReactNode;
}

type Product= {
  id: number;
  src: string;
  description: string;
  price: number;
  for: string;
} & { quantity: number };

interface Carts<T> {
    [key:string]: T
}

interface CartContextType{
    cart: { items: Product[]; total: number };
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    clearCart: ()=> void;
    updateQuantity:(productId: number, inputValue: string)=> void;
}

const CartContext = createContext<CartContextType|undefined>(undefined);

export function CartProvider({ children }: CartProviderProps) {
    const { user } = useUser();
    const [carts, setCarts] = useState<Carts<Product[]>>({});

    useEffect(() => {
        const stored = localStorage.getItem('userCarts');
        if (stored != null) {
            const savedCarts = JSON.parse(stored) || {};
            setCarts(savedCarts);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('userCarts', JSON.stringify(carts))
    }, [carts]);

    const getCartTotal = (userId: string) => {
        const userCart = carts[userId] || [];
        return userCart.reduce((total: number, item: { price: number; quantity: number }) => total + (item.price * item.quantity), 0);
    };

    const getCurrentCart = () => {
        if (!user || !user.id) {
            return {
                items: [],
                total: 0,
            };
        }
        const items = carts[user.id] || [];
        const total = getCartTotal(user.id);
        return { items, total }
    };

    const addToCart = (product: Product) => {
        if (!user?.id) return;
        setCarts(prev => {
            const userCart = prev[user.id] || [];
            const existingItemIndex = userCart.findIndex((item: Product) => item.id === product.id);
            let updatedCart;

            if (existingItemIndex >= 0) {
                updatedCart = [...userCart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + 1
                };
            } else {
                updatedCart = [...userCart, { ...product, quantity: 1 }];
            }
            return {
                ...prev,
                [user.id]: updatedCart
            }
        });

    };

    const updatingQuantity = (productId: number, inputValue: string) => {
        if (!user?.id) return;
        let newQuantity = Number(inputValue);
        if (isNaN(newQuantity) || inputValue === '') {
            newQuantity = 1;
        }

        const finalQuantity = Math.max(1, newQuantity);

        setCarts(prev => {
            if (!prev[user.id]) {
                return prev
            }
            return (
                {
                    ...prev,
                    [user.id]: prev[user.id].map((item: Product) =>
                        item.id === productId ? { ...item, quantity: finalQuantity } : item
                    )
                }
            );
        });
    }

    const removingFromCart = (productId: number) => {
        if (!user?.id) return;
        setCarts(prev => ({ ...prev, [user.id]: prev[user.id]?.filter((item: Product) => item.id !== productId) }));
    };

    const cleaningCart = () => {
        if (!user?.id) return;
        setCarts(prev => ({ ...prev, [user.id]: [] }));
        console.log('carrito vaciado');
    }

    return (
        <CartContext.Provider value={{ cart: getCurrentCart(), addToCart, removeFromCart: removingFromCart, clearCart: cleaningCart, updateQuantity: updatingQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart():  CartContextType {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context;
}