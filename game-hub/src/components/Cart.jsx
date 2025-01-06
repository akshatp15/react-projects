import { useEffect } from 'react'

export default function Cart(props) {
  const { setShowCart, cart, setCart } = props
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'))
    if (storedCart) {
      setCart(storedCart)
    }
  }, [setCart])
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  let total = 0

  const handleDeleteGame = (gameIndex) => {
    const updatedCart = cart.filter((_, index) => index !== gameIndex)
    setCart(updatedCart)
  }

  const handleAddGame = (game) => {
    setCart([...cart, game])
  }

  const renderCart = cart.map((game, gameIndex) => {
    total += game.price
    return (
      <div className="cart-game-div" key={gameIndex}>
        <div className="cart-game-details">
          <p className="cart-game-name">{game.name}</p>
          <button className="cart-delete" onClick={() => handleDeleteGame(gameIndex)}>-</button>
          <button className="cart-add" onClick={() => handleAddGame(game)} >+</button>
          <p className="cart-game-price">Price: ${game.price.toFixed(2)}</p>
        </div>
        <div className="cart-game-img-box">
          <img className="cart-game-img" src={game.image} alt={game.name}></img>
        </div>
      </div>
    )
  })

  return (
    <>
      <div className="cart-box">
        <div className="customer-info-form">
          <h3>Please Enter Your Information</h3>
          <p>Name:</p>
          <input />
          <p>Address:</p>
          <input />
          <p>City:</p>
          <input />
          <p>Province:</p>
          <input />
          <p>Phone:</p>
          <input />
          <p>Card Number:</p>
          <input />
          <p>CVV:</p>
          <input />
        </div>
        {cart.length > 0 ? (
          <>
          <div className="cart-order-details">
            <h3>Cart</h3>
            {renderCart}
          </div>
          <div className='order-summary'>
            <h3>Order Summary</h3>
            <div className="total-price">
                <p>Price of Games: ${total.toFixed(2)}</p>
                <p>Tax(5%): ${(total * 0.05).toFixed(2)}</p>
                <p>Total: ${(total * 1.05).toFixed(2)}</p>
              </div>
              <button className="place-order-button" onClick={() => {
                alert("Order Placed! Thanks for shopping with GameHub")
                setCart([])
                setShowCart(false)
              }}>
                Place Order
              </button>
              <p>Not sure yet? No problem press the button below return to all the games</p>
              <button className="return-button" onClick={() => setShowCart(false)}>Return to games</button>
          </div>
          </>
        ) : (
          <h2 className="empty-cart">Please add some items to cart to place an order</h2>
        )}
      </div>
    </>
  )
}
