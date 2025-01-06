import { useState } from "react"
import { useAuth } from "../context/AuthContext"
export default function Authentication (props){
  const {handleCloseModal} = props
  const [isRegistration, setIsRegistration] = useState(false)
  const [email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const [isAuthenticating, setisAuthenticating] = useState(false)
  const [error, setError] = useState(null)
  const {signup, login} = useAuth()
  async function handleAuthenticate(){
    if(!email || !email.includes('@') ||!password || password.length < 6 || isAuthenticating) {
      return
    }
    try {
      setisAuthenticating(true)
      setError(null)
      if(isRegistration) {
        await signup(email, password)
      }  
      else {
        await login(email, password)
        }
      handleCloseModal()
    }
    catch(err){
      console.log(err.message)
      setError(err.message)
    }
    finally {
      setisAuthenticating(false)
    }
  }
  return (
    <>
      <h2 className="sign-up-text">{isRegistration ? 'Sign Up' :'Login'}</h2>
      <p>{isRegistration ? 'Create an account':'Sign in to your account'}</p>
      {error && (
        <p> Error: {error}</p>
      )}
      <input value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email"></input>
      <input value={password} onChange={(e) => {setPassword(e.target.value)}}placeholder="*******" type="password"></input>
      <button onClick={handleAuthenticate}><p>{isAuthenticating ? 'Authenticating...':'Sumbit'}</p></button>
      <br></br>
      <div className="register-content">
        <p>{isRegistration ? 'Already have an account?':'Don\'t have an account'}</p>
        <button onClick={() => {setIsRegistration(true)}}><p>{isRegistration ? 'Sign In' :'Sign Up'}</p></button>
      </div>
    </>
  )
}