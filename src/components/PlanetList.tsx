import React, { useState, useEffect } from 'react'
import PlanetDataService from '../services/PlanetService'
import { Link } from 'react-router-dom'
import IPlanetData from '../types/Planet'

const PlanetsList = () => {
  const [planets, setPlanets] = useState<IPlanetData[]>([])
  const [currentPlanet, setCurrentPlanet] = useState<IPlanetData | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(-1)

  useEffect(() => {
    retrievePlanets()
  }, [])

  const retrievePlanets = () => {
    PlanetDataService.getAll()
      .then((response: any) => {
        setPlanets(response.data.results)
      })
      .catch((e: Error) => {
        console.log()
      })
  }

  const setActivePlanet = (planet: IPlanetData, index: number) => {
    setCurrentPlanet(planet)
    setCurrentIndex(index)
  }

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Planets List</h4>

        <ul className="list-group">
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
