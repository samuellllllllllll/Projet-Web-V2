import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/login_signin.css'
import logo from '../assets/logo.png'

const login = () => {

  // State
  const [signeInClicked, setSignInClicked] = useState(false)
  const [messageSignIn, setMessageSignIn] = useState('')
  const [messageLogin, setMessageLogin] = useState('')
  const navigate = useNavigate();

  // Simulated 3 accounts
  const accounts = [
    { email: "consommateur@consommateur.fr", password: "123456789", type: "consumer" },
    { email: "livreur@livreur.fr", password: "123456789", type: "deliveryman" },
    { email: "restaurant@restaurant.fr", password: "123456789", type: "restaurant" }
  ]

  // Handlers
  const handleSignIn = () => {
    setSignInClicked(true)
  }

  const handleLogIn = () => {
    setSignInClicked(false)
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault()

    // Get form data
    const form = e.target
    const formData = new FormData(form)
    const data = {}
    formData.forEach((value, key) => data[key] = value)

    // Send data to server
    /////////// TO DO ///////////

    // Check if account exists
    const account = accounts.find(account => account.email === data.email && account.password === data.password)
    if (!account) {
      setMessageLogin('Identifiant ou mot de passe incorrect.')
      return
    }

    // Reset form
    form.reset()

    // Redirect to account page
    switch (account.type) {
      case 'consumer':
        navigate('/consommateur');
        break
      case 'restaurant':
        navigate('/restaurant');
        break
      case 'deliveryman':
        navigate('/livreur');
        break
    }
  }

  const handleSubmitSignIn = (e) => {
    e.preventDefault()

    // Get form data
    const form = e.target
    const formData = new FormData(form)
    const data = {}
    formData.forEach((value, key) => data[key] = value)

    // Check if passwords match
    if (data.password !== data['password-confirm']) {
      setMessageSignIn('Les mots de passe ne correspondent pas.')
      return
    }

    // Check if email is valid
    if (!data.email.includes('@')) {
      setMessageSignIn('Email invalide.')
      return
    }

    // Check if password is strong enough
    if (data.password.length < 8) {
      setMessageSignIn('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }

    // Send data to server
    /////////// TO DO ///////////

    // Reset form 
    form.reset()

    // Validation message
    setMessageSignIn('Compte créé avec succès. Vous pouvez maintenant vous connecter.')
  }

  // FRONT
  if (signeInClicked) {
    return (
      <div className="home">
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="logo CESI'Eats" />
        </div>

        {/* Back arrow */}
        <div className="div-back-arrow">
          <div className="back-arrow" onClick={handleLogIn}>
            <i class="uil uil-arrow-left" id="arrow"></i>
            <p className="back-arrow-text">Retour</p>
          </div>
        </div>

        {/* Sign in form */}
        <div className="sign-in-card">
          <p className="sign-in-title">Entrez vos informations pour créer votre compte</p>
          <form onSubmit={handleSubmitSignIn}>
            <div className="div-choice">
              <label className="choice" htmlFor="consumer">
                <div className="choice-text">Je suis consommateur</div>
                <input type="radio" name="choice" value="consumer" id="consumer" required />
              </label>
              <label className="choice" htmlFor="restaurant">
                <div className="choice-text">Je suis restaurateur</div>
                <input type="radio" name="choice" value="restaurant" id="restaurant" required />
              </label>
              <label className="choice" htmlFor="deliveryman">
                <div className="choice-text">Je suis livreur</div>
                <input type="radio" name="choice" value="deliveryman" id="deliveryman" required />
              </label>
            </div>
            <div className="label-div">
              <label htmlFor="email">Email</label>
            </div>
            <input type="email" name="email" placeholder="Entrez votre email" required />
            <div className="label-div">
              <label htmlFor="password">Mot de passe</label>
            </div>
            <input type="password" name="password" placeholder="Entrez votre mot de passe" required />
            <div className="label-div">
              <label htmlFor="password">Confirmer mot de passe</label>
            </div>
            <input type="password" name="password-confirm" placeholder="Confirmez votre mot de passe" required />

            {/* Message box */}
            <div className="message-box">{messageSignIn}</div>

            <button type="submit" id="sign_up">Créer mon compte</button>
          </form>
        </div>
      </div>
    )
  }

  else {
    return (
      <div className="home">
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="logo CESI'Eats" />
        </div>

        {/* Introduction text */}
        <div className="intro-text">
          <p>Connectez-vous pour accéder à votre compte</p>
        </div>

        {/* Log in card */}
        <div className="log-in-card">
          <form onSubmit={handleSubmitLogin}>
            <div className="label-div">
              <label htmlFor="login">Identifiant</label>
            </div>
            <input type="email" name="email" placeholder="Entrez votre identifiant" required />
            <div className="label-div">
              <label htmlFor="password">Mot de passe</label>
            </div>
            <input type="password" name="password" placeholder="Entrez votre mot de passe" required />

            {/* Message box */}
            <div className="message-box">{messageLogin}</div>

            <button type="submit" id="log_in">S'identifier</button>
          </form>
        </div>

        {/* Separator */}
        <div className="separator"></div>

        {/* Sign up button */}
        <div>
          <button id="sign_up" onClick={handleSignIn}>Créer mon compte</button>
        </div>
      </div>
    )
  }
}

export default login;