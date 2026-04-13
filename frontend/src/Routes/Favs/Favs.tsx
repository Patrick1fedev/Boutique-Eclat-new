import { useFavorites } from '../../Context/FavsContext.tsx';
import { useCart } from '../../Context/CartContext.tsx';

type Item = {
  id: number;
  src: string;
  description: string;
  price: number;
  for: string;
}

const Favs = () => {

  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  if (favorites.length === 0) {
    return (
      <div >
        No tienes favoritos guardados.
      </div>
    );
  }

  return (
    <section className='favs'>
      <h2>Tus favoritos:</h2>
      <div className="grid-container">{favorites.map((item: Item) => (
        <div key={item.id} className='fav-card'>
          <h3>{item.description}</h3>
          <img src={item.src} alt="" />
          <p>${item.price}</p>
          <button id='addcarrito' onClick={() => addToCart(item)}> añadir al carrito</button>
          <button onClick={() => toggleFavorite(item)} id='delete-favs'>
            Quitar
          </button>
        </div>
      ))}</div>
    </section>
  )
}

export default Favs