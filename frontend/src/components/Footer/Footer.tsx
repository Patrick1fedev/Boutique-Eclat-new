import { useState } from 'react'
import '../../styles/Layout.css'
import instagram from '../../assets/icons/3721672-instagram_108066.png';
import whatsapp from '../../assets/icons/whatsapp-logo_icon-icons.com_57054.png';
import facebook from '../../assets/icons/facebook_logo_icon_147291.png';
import pinterest from '../../assets/icons/social_Pinterest_8.png';
import email from '../../assets/icons/4213413-email-envelope-gmail-google-latter-mail-message_115415.png';
import telephone from '../../assets/icons/phone-volume_icon-icons.com_56474.png';
import boutiqueEclat from '../../assets/icons/boutique-big.png'


const NewsLetter = () => {

    const [NlUsername, setNlUsername] = useState("");
    const [NlEmail, setNlEmail] = useState("");
    const confirmation = () => { 
        alert("gracias por registrarse " + NlUsername + "! le mantendremos informado sobre novedades, ofertas especiales, y tips de moda."); 
    }

    return (
        <div id="newsletter">
            <h2>NEWSLETTER</h2>
            <p>Te ivitamos a registrarte al boletin informativo para estar al tanto de nuestras novedades!</p>
            <form action="" id="newsform" onSubmit={confirmation}>
                <input type="text" id='NLusername' value={NlUsername} onChange={(e) => setNlUsername(e.target.value)} name='NLusername' placeholder='Nombre:' required />
                <input type="email" id='NLemail' value={NlEmail} onChange={(e) => setNlEmail(e.target.value)} name='NLemail' placeholder='Email:' required />
                <button type='submit'>Enviar</button>
            </form>
            <small>¡Respetamos tu privacidad!</small>
        </div>
    )
}


const Footer = () => {

    const socialWebs = [
        { link: "#", image: instagram, alt: "instagram", name: "Instagram" },
        { link: "#", image: facebook, alt: "facebook", name: "Facebook" },
        { link: "#", image: whatsapp, alt: "whatsapp", name: "WhatsApp" },
        { link: "#", image: pinterest, alt: "pinterest", name: "Pinterest" }
    ];

    return (
        <footer>
            <section id="footer">
                <div className="beslogan">
                    <img src={boutiqueEclat} alt='boutique eclat logo'/>
                    <small>Moda con proposito</small>
                </div>
                <div className="social">
                    <b>conecta con nosotros</b>
                    <div className="socialicons">{
                        socialWebs.map((web, i) => {
                            return (
                                <a key={i} href={web.link} target='_blank'><img src={web.image} alt={web.alt} /><small>{web.name}</small></a>
                            )
                        })
                    }</div>
                </div>
                <NewsLetter />
                <div className="contact">
                    <b>contacto rapido:</b>
                    <div className="directcntc">
                        <div className="email">
                            <img src={email} alt="" />
                            <i>boutiqueclat@gmail.com</i>
                        </div>
                        <div className="tel">
                            <img src={telephone} alt="" />
                            <b>+34123456</b>
                        </div>
                    </div>
                </div>
            </section>
            <section id="copyright">
                <div className="copy">
                    <small>&copy 2025 Boutique eclat.<br />
                        Todos los derechos reservados</small>
                </div>
                <div className="links">
                    <a href="">politica de privacidad</a>
                    <a href="">terminos y condiciones</a>
                </div>
            </section>
        </footer>
    )
}

export default Footer