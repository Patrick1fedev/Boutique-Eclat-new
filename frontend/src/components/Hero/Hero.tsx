import '../../styles/hero.css';
import { useNavigate } from 'react-router-dom';

type HeroProps = {
  heroBgImage: string;
}

function Hero({heroBgImage}: HeroProps) {
  const HeroStyles = {
    backgroundImage: `linear-gradient(90deg, #00000000 30%, white 45%),url(${heroBgImage})`,
  }
  const navigate = useNavigate();

  const heroClick = () => {
    navigate('/store');
  }
  
  return (
    <section id='hero' style={HeroStyles}>
      <div id="hero-text">
        <h1>Moda etica para un futuro verde</h1>
        <p>coleccion otoño 2025- 30% OFF en la primera compra</p>
        <button id="cta" onClick={heroClick}>Descubrelo ya!</button>
      </div>
    </section>
  );
}

export default Hero