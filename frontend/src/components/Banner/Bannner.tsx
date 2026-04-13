import '../../styles/Banner.css'
import { Link } from 'react-router-dom'

type BannerProps = {
    bannerImage: string
}

const Bannner = ({bannerImage}: BannerProps) => {
    return (
        <section id="banner">
            <Link to="/sign_form" className='banner-content'>
                <img src={bannerImage} alt="boutique-eclat" />
                <h3>
                    <i>Subscribete a nuestra pagina para obtener un 15% OFF en cada
                        producto + Guia de productos sostenibles y tips de moda
                        diarios!</i>
                </h3>
            </Link>
        </section>
    )
}

export default Bannner