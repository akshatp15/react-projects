import { useAuth } from "../context/AuthContext"
import Authentication from "./Authentication"
import Modal from "./Modal"
import { useState } from "react"
export default function Layout(props){
  const { children } = props
  const [showModal, setShowModal] = useState(false)
  const {globalUser, logout} = useAuth()
  const header = (
    <header>
      <div>
        <h1 className="text-gradient">CAFFEINE</h1>
        <p>For Coffee Insatiates</p>
      </div>
      {globalUser ? (<button onClick={logout}>
        <p>Log out</p>
      </button>) : (<button onClick={(()=> setShowModal(true))}>
        <p>Sign up for free</p>
        <i className="fa-solid fa-mug-hot"></i>
      </button>)}
    </header>
  )
  const footer = (
    <footer>
       <p><span className="text-gradient">Caffiend</span> was made by Akshat <br />Using the <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a> design library.<br />Check out the project on <a target="_black" href="https://www.github.com/jamezmca/reactjs-full-course">GitHub</a>!</p>
    </footer>
  )
  function handleCloseModal(){
    setShowModal(false)
  }
  return (
    <>
      {showModal && (<Modal handleCloseModal={handleCloseModal}>
        <Authentication handleCloseModal={handleCloseModal} />
      </Modal>)}
      {header}
      <main>
        {children}
      </main>
      {footer}
    </>
  )
}