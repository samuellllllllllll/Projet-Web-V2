import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../authContext.jsx';
import '../styles/login_signin.css';
import logo from '../assets/logo.png';

const LoginSignIn = () => {
  // State
  const [signInClicked, setSignInClicked] = useState(false);
  const [messageSignIn, setMessageSignIn] = useState('');
  const [messageLogin, setMessageLogin] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Handlers
  const handleSignIn = () => {
    setSignInClicked(true);
  };

  const handleLogIn = () => {
    setSignInClicked(false);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    // Get form data
    const form = e.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    // Log the form data to check if it's correct
    console.log('Form Data:', data);

    try {
      await login(data.username, data.password, data.role);

      // Simulated account types for navigation purposes
      if (data.username === "consommateur@consommateur.fr") {
        navigate('/consommateur');
      } else if (data.username === "livreur@livreur.fr") {
        navigate('/livreur');
      } else if (data.username === "restaurant@restaurant.fr") {
        navigate('/restaurant');
      } else {
        setMessageLogin('Identifiant ou mot de passe incorrect.');
      }
    } catch (error) {
      setMessageLogin('Identifiant ou mot de passe incorrect.');
    }
  };

  const handleSubmitSignIn = (e) => {
    e.preventDefault();

    // Get form data
    const form = e.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    // Check if passwords match
    if (data.password !== data['password-confirm']) {
      setMessageSignIn('Les mots de passe ne correspondent pas.');
      return;
    }

    // Check if email is valid
    if (!data.email.includes('@')) {
      setMessageSignIn('Email invalide.');
      return;
    }

    // Check if password is strong enough
    if (data.password.length < 8) {
      setMessageSignIn('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    // Simulated account creation
    setMessageSignIn('Compte créé avec succès. Vous pouvez maintenant vous connecter.');
    form.reset();
  };

  return signInClicked ? (
    <div className="home">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="logo CESI'Eats" />
      </div>

      {/* Back arrow */}
      <div className="div-back-arrow">
        <div className="back-arrow" onClick={handleLogIn}>
          <i className="uil uil-arrow-left" id="arrow"></i>
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
            <label htmlFor="password-confirm">Confirmer mot de passe</label>
          </div>
          <input type="password" name="password-confirm" placeholder="Confirmez votre mot de passe" required />

          {/* Message box */}
          <div className="message-box">{messageSignIn}</div>

          <button type="submit" id="sign_up">Créer mon compte</button>
        </form>
      </div>
    </div>
  ) : (
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
            <label htmlFor="username">Identifiant</label>
          </div>
          <input type="text" name="username" placeholder="Entrez votre identifiant" required />
          <div className="label-div">
            <label htmlFor="password">Mot de passe</label>
          </div>
          <input type="password" name="password" placeholder="Entrez votre mot de passe" required />

          <div className="label-div">
            <label htmlFor="role">Rôle</label>
          </div>
          <input type="text" name="role" placeholder="Entrez votre rôle" required />

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
  );
};

export default LoginSignIn;
