import { useParams } from 'react-router-dom';
import { useCart } from '../../Context/CartContext.tsx';
import { useProducts } from '../../Context/ProductsContext.tsx';
import '../../styles/Products.css';
import'../../styles/ProductInfo.css'
import { useFavorites } from '../../Context/FavsContext.tsx';

const DeepViewProduct = () => {
    const { id } = useParams();
    const { sampleProducts } = useProducts();
    const { addToCart } = useCart();
    const {toggleFavorite, isFavorite} = useFavorites();
    const currentProduct = sampleProducts.find(p => p.id.toString() === id);

    if (!currentProduct) return <p>Producto no encontrado</p>;

    return (
        <section id='product-info'>
            <div className='product-info'>
                <h2>{currentProduct.description}</h2>
                <img src={currentProduct.src} alt={currentProduct.description} />
                <p>Precio: ${currentProduct.price}</p>
                <hr />
                <p className='prod-info'>Info: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore magni odit maiores unde beatae. Dolore, enim libero quia corporis eos hic, molestias, dolor ad voluptatibus totam corrupti esse praesentium illum modi? Doloribus.</p>
                <div className="btns"><button id='addcarrito' onClick={() => addToCart(currentProduct)}> añadir al carrito</button>
                <button onClick={() => toggleFavorite(currentProduct)} id='toggle-favs'>{isFavorite(currentProduct.id) ? <><span className='favstar gold'></span>eliminar de favoritos</> : <><span className='favstar'></span>Añadir a favoritos</>}</button></div>
            </div>
        </section>
    );
};

export default DeepViewProduct