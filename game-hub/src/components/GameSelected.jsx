export default function GameSelected(props) {
  const { selectedGame, cart, setSelectedGame, setCart } = props

  const handleAddToCart = () => {
    const updatedCart = [...cart, selectedGame]
    setCart(updatedCart)
  }

  return (
    <div className="game-selected-container">
      <div className="game-selected-img">
        <div className="game-selected-name">
          <p>{selectedGame.name}</p>
        </div>
        <img src={selectedGame.image} className="game-img" alt={selectedGame.name} />
      </div>
      <div className="game-selected-details">
        <p>Price: ${selectedGame.price}</p>
        <p>Console: {selectedGame.console}</p>
        <p>Developer: {selectedGame.developer}</p>
        <p>Genre: {selectedGame.genre}</p>
        <p>Release Year: {selectedGame.year}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button><br />
        <p>Want to continue shopping for more games?</p>
        <button className="return-to-games-button" onClick={() => setSelectedGame(null)}>
          Return to games
        </button>
      </div>
    </div>
  )
}
