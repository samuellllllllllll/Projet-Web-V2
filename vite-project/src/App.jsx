import { useState } from 'react'
import './css/App.css'
import logo from './img/logo.png'

function App() {

  return (
  <>
    {/* Logo */}
    <div className="logo">
      <img src={logo} alt="logo CESI'Eats" />
    </div>

    {/* Login in form */}
    <div>
      <form>
        <div className="label-div">
          <label htmlFor="login">Identifiant</label>
        </div>
        <input type="email" name="email" placeholder="Entrez votre identifiant" required />
        <div className="label-div">
          <label htmlFor="password">Mot de passe</label>
        </div>
        <input type="password" name="password" placeholder="Entrez votre mot de passe" required />
        <button type="submit" id="log_in">S'identifier</button>
      </form>
    </div>

    {/* Separator */}
    <div className="separator"></div>

    {/* Sign in button */}
    <div>
      <button id="sign_in">Créer un compte</button>
    </div>
  </>
  )
}

export default App
