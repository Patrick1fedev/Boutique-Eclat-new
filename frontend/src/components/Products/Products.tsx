import '../../styles/Products.css'
import { useUser } from '../../Context/UserContext.tsx';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../Context/ProductsContext.tsx';

type Product = {
    id: number;
    src: string;
    description: string;
    price: number;
    for: string;
}

type ProductsProps = {
    productList?: Product[];
    category?: string;
    title: string;
    className?: string;
}

const Products = ({productList, category, title, className}: ProductsProps) => {
    const {user} = useUser();
    const navigate = useNavigate();

    const {sampleProducts} = useProducts();
    const productsToUse = productList ?? sampleProducts;

    const filtredProducts = category ? productsToUse.filter((p) => p.for === category) : productsToUse;

  return (
    <section id="gridproducts">
        <h2 id="gridtitle"><i>{title}</i></h2>
        <div className={className}>{
            filtredProducts.map((product) =>{
                return (
                    <div className="product-card" key={product.id} >
                    <img src={product.src} alt={product.description} />
                    <h3>{product.description}</h3>
                        <p>${product.price}</p>
                        <button id="seemore" onClick={()=> navigate(`/product/${product.id}`)} disabled={!user}>
                            <b>{user ? 'ver mas' : 'inicia sesion para comprar'}</b>
                        </button>
                    </div>
                )
            })
            }</div>
    </section>
  )
}

export default Products