import React, { useState, useEffect } from 'react'
import PlanetDataService from '../services/PlanetService'
import { Link } from 'react-router-dom'
import IPlanetData from '../types/Planet'
import InfiniteScroll from 'react-infinite-scroller'

const PlanetsList = () => {
  const [currentPlanet, setCurrentPlanet] = useState<IPlanetData | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(-1)

  const [planets, setPlanets] = useState<IPlanetData[]>([])
  const [page, setPage] = useState(1)
  const [hasMoreItems, setHasMoreItems] = useState(true)

  useEffect(() => {
    retrievePlanets(page)
  }, [])

  const retrievePlanets = (page: number) => {
    setTimeout(() => {
      PlanetDataService.getAll(page)
        .then((response: any) => {
          const newPage = page + 1
          const newList = response.data.results
          setPlanets(newList)
          setPage(newPage)
          console.log(response.status)
          if (response.status === 404) {
            setHasMoreItems(false)
          } else {
            setHasMoreItems(true)
          }
        })
        .catch((err) => {
          setHasMoreItems(false)
          console.log(err)
        })
    }, 1500)
  }

  const setActivePlanet = (planet: IPlanetData, index: number) => {
    setCurrentPlanet(planet)
    setCurrentIndex(index)
  }

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Planets List</h4>

        <ul className="list-group mb-2">
        <InfiniteScroll
          threshold={0}
          pageStart={0}
          loadMore={retrievePlanets}
          hasMore={hasMoreItems}
          loader={<div className="text-center">loading data ...</div>}>

          {planets &&
            planets.map((planet, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActivePlanet(planet, index)}
                key={index}
              >
                {planet.name}
              </li>
            ))}
        </InfiniteScroll>
        {hasMoreItems ? '' : <div className="text-center">no data anymore ...</div> }
        </ul>

      </div>
      <div className="col-md-6">
        {(currentPlanet != null)
          ? (
          <div>
            <h4>Planet</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{' '}
              {currentPlanet.name}
            </div>
            <div>
              <label>
                <strong>Rotation Period:</strong>
              </label>{' '}
              {currentPlanet.rotation_period}
            </div>
            <div>
              <label>
                <strong>Orbital Period:</strong>
              </label>{' '}
              {currentPlanet.orbital_period}
            </div>
            <div>
              <label>
                <strong>Diameter:</strong>
              </label>{' '}
              {currentPlanet.diameter}
            </div>
            <div>
              <label>
                <strong>Climate:</strong>
              </label>{' '}
              {currentPlanet.climate}
            </div>
            <div>
              <label>
                <strong>Gravity:</strong>
              </label>{' '}
              {currentPlanet.gravity}
            </div>
            <div>
              <label>
                <strong>Terrain:</strong>
              </label>{' '}
              {currentPlanet.terrain}
            </div>
            <div>
              <label>
                <strong>Surface Water:</strong>
              </label>{' '}
              {currentPlanet.surface_water}
            </div>
            <div>
              <label>
                <strong>Population:</strong>
              </label>{' '}
              {currentPlanet.population}
            </div>

            <Link
              to={'/planets/' + currentPlanet.name}
              className="badge badge-warning"
            >
              Detail
            </Link>
          </div>
            )
          : (
          <div>
            <br />
          </div>
            )}
      </div>
    </div>
  )
}

export default PlanetsList
