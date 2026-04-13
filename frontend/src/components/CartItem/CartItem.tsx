import { useState } from 'react';

type Item = {
  id: number;
  description: string;
  src: string;
  for: string;
  price: number;
  quantity?: number;
};

type CartItemProps = {
  item: Item;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
};

const CartItem = ({ item, updateQuantity, removeFromCart }: CartItemProps) => {
  const [inputValue, setInputValue] = useState((item.quantity || 1).toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === '' || !isNaN(Number(value))) {
      setInputValue(value);
      updateQuantity(item.id, value === '' ? 1 : Number(value));
    }
  };

  const handleBlur = () => {
    const numericValue = Number(inputValue);
    if (isNaN(numericValue) || numericValue < 1) {
      setInputValue('1');
      updateQuantity(item.id, 1);
    }
  };

  return (
    <div className='cart-item'>
      <img src={item.src} alt="" />
      <span>{item.description} x {item.quantity || 1}</span>
      <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
      <label>Cantidad:<input
        type="number"
        id='inputValue'
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        pattern="[0-9]"
        min='1'
      /></label>
      <button className='removecarrito' onClick={() => removeFromCart(item.id)}>Quitar del carrito</button>
    </div>
  );
};

export default CartItem;