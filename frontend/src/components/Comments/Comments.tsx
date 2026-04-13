import '../../styles/Comments.css'

const Comments = () => {

    const coments = [
        {
            name: "John Doe",
            coment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, dolores, illum?",
            rate: "4.5",
            profile: "#",
            alt: "john-01",
        },
        {
            name: "Mark Anthony",
            coment: "Lorem ipsum dolor sit amet, consectetur.",
            rate: "4.7",
            profile: "#",
            alt: "marco-an"
        },
        {
            name: "Anthony Mark",
            coment: "Lorem ipsum dolor sit amet",
            rate: "4.0",
            profile: "#",
            alt: "antonio-mc"
        },
        {
            name: "Elon Musk",
            coment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem?",
            rate: "3.8",
            profile: "#",
            alt: "Emusk99"
        },
        {
            name: "Old Lesbian",
            coment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, consequatur labore.",
            rate: "4.8",
            profile: "#",
            alt: "marika223"
        },
        {
            name: "Pope Francis",
            coment: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
            rate: "2.3",
            profile: "#",
            alt: "Franc3rd"
        }
    ];

    const renderStars = (rate: string) => {
        const numericRate = parseFloat(rate);
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= Math.floor(numericRate) ? "filled" : "";
            const halfPercent = (numericRate - Math.floor(numericRate)) * 100;
            const isHalf = i === Math.ceil(numericRate) && halfPercent > 0;

            stars.push(
                <span
                    key={i}
                    className={`star ${isFilled}`}
                    style={isHalf ? {
                        backgroundImage: `linear-gradient(to right, gold ${halfPercent}%, #aaa ${halfPercent}%)`
                    } : {}}
                ></span>
            );
        }

        return stars;
    };

    return (
        <section id="comments">
            <div className="comentcontainer">{
                coments.map((coment, i) => {
                    return (
                        <div className="coment" key={i}>
                            <div className="profile">
                                <img src={coment.profile} alt={coment.alt} />
                                <h3>{coment.name}</h3>
                            </div>
                            <div className="comentcontent">{coment.coment}</div>
                            <div className="val">
                                <span className="valnumber">{coment.rate}/5.0</span>
                                <div className="valstar">
                                    {renderStars(coment.rate)}
                                </div>
                            </div>
                        </div>
                    )
                })
            }</div>
            {/*<a href="#"><b>Ver todos los comentarios...</b></a>*/}
        </section>
    )
}

export default Comments