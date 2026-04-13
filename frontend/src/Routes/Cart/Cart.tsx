import '../../styles/Products.css';
import { useCart } from '../../Context/CartContext.tsx';
import { useUser } from '../../Context/UserContext.tsx';
import CartItem from '../../components/CartItem/CartItem.tsx'; 

type Item = {
  id: number;
  src: string;
  description: string;
  price: number;
  for: string;
  quantity?: number;
}

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useUser();

  return (
    <div className='cart'>
      <h2>Tu carrito ({user.userName})</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <><div className='grid-container'>
          {cart.items.map((item: Item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
          </div>
          <p>Total: ${cart.total.toFixed(2)}</p>
          <button onClick={()=>{alert('Compra realizada con exito, gracias por su compra!'); clearCart()}} disabled={cart.length === 0} id='buy'>Comprar</button>
          <button onClick={clearCart} id='clearCart'>Vaciar carrito</button></>
        
      )}
    </div>
  );
};

export default Cart;