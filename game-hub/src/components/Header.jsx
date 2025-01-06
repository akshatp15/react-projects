export default function Header (props){
  const {cart, setSearch, setShowCart} = props
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
  return (
    <header className='header'> 
      <button className='logo-button' onClick={()=>{window.location.reload()}}>GameHub</button>
      <input className='search-bar' placeholder="Enter game/console" onChange={handleSearchChange}></input>
      <button className="cart-button" onClick={()=>{setShowCart(true)}}>Cart ({cart.length})</button>
    </header>
  )
}