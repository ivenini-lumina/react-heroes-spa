import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'

import { useForm } from '../../hooks/useForm'
import { HeroCard } from '../components/'
import { getHeroByName } from '../helpers/getHeroByName'


export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse( location.search );
  const heroes = getHeroByName(q);

  const showSearchHero  = q.length === 0;
  const showSearchError = q.length > 0 && heroes.length === 0; 
  
  const onFormSubmit = (event) => {
    event.preventDefault();
    navigate(`?q=${searchText}`);   
  }

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  return (
    <>
        <h1>SearchPage</h1>
        <hr />

        <div className="row">
          <div className="col-5">
            <h4>Searching</h4>
            <hr />
            <form onSubmit={ onFormSubmit } aria-label="form" >
              <input
                type="text"
                placeholder="Search a hero"
                className="form-control"
                name="searchText"
                autoComplete="off"
                value={ searchText }
                onChange={ onInputChange }
              />
              <button
                className="btn btn-outline-primary mt-1">
                Search
              </button>
            </form>
          </div>
          <div className="col-7">
            <h4>Results</h4>
            <hr />

            <div 
              className="alert alert-primary animate__animated animate__fadeIn"
              style = {{ display : showSearchHero ? '' : 'none' }}
            >
              Search a hero
            </div>

            <div 
              className="alert alert-danger animate__animated animate__fadeIn"
              style = {{ display : showSearchError ? '' : 'none' }}
              aria-label='no-hero-div'
              >
              No hero with <b> {q} </b>
            </div>

            {
              heroes.map( hero =>                   
                  <HeroCard {...hero} key={hero.id} />                  
              )
            }
          </div>        
        </div>
    </>
  )
}
