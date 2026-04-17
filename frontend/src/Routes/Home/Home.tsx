import '../../styles/Home.css'
import Hero from '../../components/Hero/Hero.tsx';
import Products from '../../components/Products/Products.tsx';
import Bannner from '../../components/Banner/Bannner.tsx';
import Timeline from '../../components/Timeline/Timeline.tsx';
import Badge from '../../components/Badge/Badge.tsx';
import Comments from '../../components/Comments/Comments.tsx';
import lady from '../../assets/Images/3a4e50b9f875e515ebcc0e728372753a.jpg';
import boutiqueMinimal from '../../assets/icons/boutique-minimal.png';
import { useProducts } from '../../Context/ProductsContext.tsx';

const Home = () => {
  const {products, getRandomProducts} = useProducts();
  const ratedProducts = getRandomProducts(products);

  return (
    <div className='main'>
      <Hero heroBgImage={lady} />
      <Products productList={ratedProducts} title='¿Que ofrecemos?' className={'carousel-container'}/>
      <Bannner bannerImage={boutiqueMinimal} />
      <Timeline />
      <Badge />
      <Comments />
      <hr />
    </div>
  )
}

export default Home