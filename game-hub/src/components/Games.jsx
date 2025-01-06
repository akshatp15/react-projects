import { useState } from 'react'
import { games, genres, consoles, developers } from '../utils/index.js'
import GameSelected from './GameSelected.jsx'

export default function Games(props) {
  const [selectedGame, setSelectedGame] = useState(null)
  const { cart, setCart, search } = props
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedDevelopers, setSelectedDevelopers] = useState([])
  const [selectedConsoles, setSelectedConsoles] = useState([])
  const handleFilterChange = (category, value) => {
    let newSelection
    if (category === 'genre') {
      newSelection = selectedGenres.includes(value)
        ? selectedGenres.filter((item) => item !== value)
        : [...selectedGenres, value]
      setSelectedGenres(newSelection)
    } else if (category === 'developer') {
      newSelection = selectedDevelopers.includes(value)
        ? selectedDevelopers.filter((item) => item !== value)
        : [...selectedDevelopers, value]
      setSelectedDevelopers(newSelection)
    } else if (category === 'console') {
      newSelection = selectedConsoles.includes(value)
        ? selectedConsoles.filter((item) => item !== value)
        : [...selectedConsoles, value]
      setSelectedConsoles(newSelection)
    }
  }
  const matchesGenre = (game, selectedGenres) => {
    if (selectedGenres.length === 0) return true
    return selectedGenres.some((genre) => game.genre.toLowerCase().includes(genre.toLowerCase()))
  }
  const matchesDeveloper = (game, selectedDevelopers) => {
    if (selectedDevelopers.length === 0) return true
    return selectedDevelopers.some((developer) =>
      game.developer.toLowerCase().includes(developer.toLowerCase())
    )
  }
  const matchesConsole = (game, selectedConsoles) => {
    if (selectedConsoles.length === 0) return true // No console filter, return all
    return selectedConsoles.some((console) => game.console.toLowerCase() === console.toLowerCase())
  }
  const filteredGames = games.filter((game) => {
    const lowerSearch = search ? search.toLowerCase() : ''
    const matchesSearch = !search || game.name.toLowerCase().includes(lowerSearch) || game.console.toLowerCase().includes(lowerSearch)
    return (
      matchesSearch && matchesGenre(game, selectedGenres) && matchesDeveloper(game, selectedDevelopers) &&
      matchesConsole(game, selectedConsoles)
    )
  })
  return (
    <>
      {selectedGame === null ? (
        <div className='main-page'>
          <div className='filter-side-bar'>
            <h2>Filters</h2>
            <h3 className='filter-headers'>Genre</h3>
            {genres.map((genre) => {
              return (
                <div key={genre}>
                  <input
                    type='checkbox'
                    id={genre}
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleFilterChange('genre', genre)}
                  />
                  <label>{genre}</label>
                </div>
              )
            })}
            <h3 className='filter-headers'>Developer/Maker</h3>
            {developers.map((developer) => {
              return (
                <div key={developer}>
                  <input
                    type='checkbox'
                    id={developer}
                    checked={selectedDevelopers.includes(developer)}
                    onChange={() => handleFilterChange('developer', developer)}
                  />
                  <label>{developer}</label>
                </div>
              )
            })}
            <h3 className='filter-headers'>Console</h3>
            {consoles.map((console) => {
              return (
                <div key={console}>
                  <input
                    type='checkbox'
                    id={console}
                    checked={selectedConsoles.includes(console)}
                    onChange={() => handleFilterChange('console', console)}
                  />
                  <label>{console}</label>
                </div>
              )
            })}
          </div>
          <div className='game-grid'>
            {filteredGames.length > 0 ? (filteredGames.map((game, gameIndex) => {
              return (
                <button
                  className='game-button'
                  key={gameIndex}
                  onClick={() => {
                    setSelectedGame(game)
                  }}
                >
                  <div className='game-name'>
                    <p>{game.name}</p>
                    <p>${game.price.toFixed(2)}</p>
                  </div>
                  <div className='game-img-box'>
                    <img className='game-img' src={game.image} alt={game.name} />
                  </div>
                </button>
              )
            })) :<p className="empty-grid">Sorry no games found</p>}
          </div>
        </div>
      ) : (
        <GameSelected
          selectedGame={selectedGame}
          cart={cart}
          setSelectedGame={setSelectedGame}
          setCart={setCart}
        />
      )}
    </>
  )
}
