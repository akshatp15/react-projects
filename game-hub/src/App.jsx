import { useState, useEffect } from 'react'
import Header from './components/Header'
import Games from './components/Games'
import Cart from './components/Cart'

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [search, setSearch] = useState("")
  const [showCart, setShowCart] = useState(false)
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart))
    } else {
      localStorage.removeItem('cart')
    }
  }, [cart])

  return (
    <>
      <Header cart={cart} setSearch={setSearch} setShowCart={setShowCart}></Header>
      {showCart ? <Cart setShowCart={setShowCart} cart={cart} setCart={setCart} /> : <Games cart={cart} search={search} setCart={setCart} />}
    </>
  )
}

export default App
