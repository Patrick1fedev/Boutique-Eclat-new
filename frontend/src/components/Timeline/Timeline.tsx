import '../../styles/Timeline.css'
import leaf from '../../assets/icons/natural_resources_sustainability_ecology_growth_icon_189064.png';
import sissors from '../../assets/icons/barberscissors_peluquer_4118.png';
import cycle from '../../assets/icons/cycle_38373.png';
import truck from '../../assets/icons/truck_fast_outline_icon_139003.png';
import recycle from '../../assets/icons/recyclingarrow_reciclaje_3989.png';

const Timeline = () => {
    const timesteps = [
        { image: leaf, alt: 'natural', name: 'Materiales responsables', description: 'Algodon organico certificado, tintes naturales libres de quimicos y tejidos reciclados', },
        { image: sissors, alt: 'sissors', name: 'produccion local', description: 'Trabajamos con talleres en Barcelona que garantizan salarios justos y condiciones laborales dignas', },
        { image: cycle, alt: 'round-arrows', name: 'diseño circular', description: 'prendas atemporales y reparables, pensadas para durar un año, no temporadas', },
        { image: truck, alt: 'truck', name: 'envios eco-friendly', description: 'packaging 100% biodegrabable y compensacion de huella de carbono en cada envío', },
        { image: recycle, alt: 'recicletriangle', name:'segunda vida', description: 'Pograma de reciclaje: devuelve tus prendas usadas y recibe descuentos para futuros encargos', },
    ]
    return (
        <section id="storedescription">
            <div className="description">
                <h2><i>Mas que moda un compromiso con el planeta.</i></h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis placeat
                    molestiae dicta voluptas! Ex sapiente minima quisquam architecto, velit
                    magni, nam dicta aperiam eaque dolores cupiditate animi.
                </p>
            </div>
            <div className="timeline">{
                timesteps.map((timestep, i) => {
                    return (
                        <div className="timestep" key={i}>
                            <img src={timestep.image} alt={timestep.alt} className="ticon" />
                            <div className="steptext">
                                <h3 className="ttitle">{timestep.name}</h3>
                                <p className="ttext">{timestep.description}</p>
                            </div>
                        </div>
                    )
                })
            }</div>
        </section>
    )
}

export default Timeline