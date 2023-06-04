import { Link } from "react-router-dom"

const CharactersByHero = ({characters, alter_ego}) => {
    if (alter_ego === characters){
        return (<></>);
    } else {
        return ((<p>{ characters }</p>));
    }
}

export const HeroCard = ({
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
    }) => {

        const heroImageUrl = `/heroes/${id}.jpg`;
  return (
    <div className="col">
        <div className="card">
            <div className="row no-gutters">
                <div className="col-4">
                    <img src={ heroImageUrl } className="card-img animate__animated animate__fadeIn" alt={superhero} />
                </div>
                <div className="col-8">
                    <div className="card-body">
                        <h5 className="card-title">{ superhero }</h5>
                        <p className="card-text">{ alter_ego}</p>
                        {/* {
                            (alter_ego !== characters) && (<p>{ characters }</p>)
                        } */}
                        <CharactersByHero alter_ego={ alter_ego } characters={ characters } />

                        <p className="card-text">
                            <small className="text-muted">{ first_appearance }</small>
                        </p>

                        <Link to={`/hero/${id}`}>
                            Mas...
                        </Link>
                        
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}
