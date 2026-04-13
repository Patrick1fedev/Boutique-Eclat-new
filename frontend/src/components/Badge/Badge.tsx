import '../../styles/Badge.css'
import nature from '../../assets/icons/tea_leaf_leafs_nature_eco_icon_148968.png';
import factory from '../../assets/icons/factory_icon_144346.png';
import shield from '../../assets/icons/shield_check_outline_icon_139207.png';
import box from '../../assets/icons/package_122391.png';
import recyclingTriangle from '../../assets/icons/recyclingarrow_reciclaje_3989.png';

const Badge = () => {
    const badges = [
        { src: nature, alt: 'ecofriendly', description: 'Certificado Eco-Friendly', },
        { src: factory, alt: 'local prod', description: 'Producción Local', },
        { src: shield, alt: 'security', description: 'Pago 100% Seguro', },
        { src: box, alt: 'green delivery', description: 'Envios Eco-Conscientes', },
        { src: recyclingTriangle, alt: 'easy paybacks', description: 'Devoluciones Fáciles', },
    ]
    return (
        <section id="sells">
            <div className="sells">{
                badges.map((badge, i) => {
                    return (
                        <span key={i}>
                            <span className="img">
                                <img src={badge.src} alt={badge.alt} />
                            </span>
                            <p>{badge.description}</p>
                        </span>
                    )
                })
            }</div>
        </section>
    )
}

export default Badge