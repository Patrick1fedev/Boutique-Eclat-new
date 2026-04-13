import React, { useState, useEffect } from 'react';
import '../../styles/Layout.css';
import profile from '../../assets/icons/userLink.png';
import star from '../../assets/icons/star.png';
import carrito from '../../assets/icons/carrito.png';
import boutique from '../../assets/icons/boutique-eclat.png';
import { Link, useNavigate } from 'react-router-dom';

//Logica

const images = [
    {src: boutique, to:'/',},
    {src: profile, to:'/user',},
    {src: star, to:'/favs',},
    {src: carrito, to:'/cart',},
];

//Componentes auxiliares
type HamburguerMenuProps = {
    className: string;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}
type NavBarProps = {
    className: string;
    style: React.CSSProperties;
}


const MainIcon = () => {
    return (
        <div className='mainIcon'>
            <Link to={images[0].to}><img src={images[0].src} alt='boutique eclat'/></Link>
        </div>
    )
}

const HeaderButtons = () => {
    const remagningImages = images.slice(1);
    
    const navigate = useNavigate();
    

    return (
        <div className='headerIcons'>
            {
                remagningImages.map((image, i) => {
                    const imgClick = () =>{
                        navigate(image.to)
                    };
                    return (
                        <button key={i} onClick={imgClick}><img src={image.src} alt='a' /></button>
                    )
                })
            }
        </div>
    )
}

const HamburguerMenu = ({ className, onClick }: HamburguerMenuProps) => {
    return (
        <div id="hamburguerMenu" className={className} onClick={onClick}>
            <span className="menuLine"></span>
            <span className="menuLine"></span>
            <span className="menuLine"></span>
        </div>
    )
}

const NavBar = ({ className, style }: NavBarProps) => {
    const links = [
        { href: '/store', name: "Tienda" },
        { href: "/women", name: "Mujer" },
        { href: "/men", name: "Hombre" },
        { href: "/accessories", name: "Acesorios" },
        { href: '/about', name: "Sobre nosotros" },
    ]
    return (
        <div id='navBar' className={className} style={style}>
            <ul>
                {
                    links.map((link, i) => {
                        return (
                            <li key={i} className='navBar-links'><Link to={link.href}>{link.name}</Link></li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

//Componente principal

const Header = () => {

    const [activeMenu, setActivemenu] = useState(false);

    const toggleMenu = () => {
        setActivemenu(state => !state);
    };

    useEffect(() => {
        document.body.style.overflowY = activeMenu ? 'hidden' : 'scroll';
        return () => {
            document.body.style.overflowY = 'scroll';
        };
    }, [activeMenu]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const hamburguerMenu = document.getElementById("hamburguerMenu");
            const navBar = document.getElementById("navBar");

            if(!hamburguerMenu || !navBar) return;

            if (
                activeMenu &&
                navBar &&
                e.target instanceof Node &&
                !navBar.contains(e.target) &&
                !hamburguerMenu.contains(e.target)
            ) {
                setActivemenu(false)
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [activeMenu]);

    return (
        <header id='header'>
            <MainIcon />
            <HeaderButtons />
            <HamburguerMenu className={activeMenu ? "active" : ""} onClick={e => { e.stopPropagation(); toggleMenu(); }} />
            <div id="overlay" onClick={toggleMenu} style={{ pointerEvents: activeMenu ? "auto" : "none", opacity: activeMenu ? 1 : 0 }}></div>
            <NavBar className={activeMenu ? "active" : ""} style={{ pointerEvents: activeMenu ? "auto" : "none", opacity: activeMenu ? 1 : 0 }} />
        </header>
    )
}
export default Header