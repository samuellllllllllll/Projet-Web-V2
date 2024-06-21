import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../authContext.jsx';
import '../styles/login_signin.css';
import logo from '../assets/logo.png';
import axios from 'axios';

const roleMapping = {
  1: 'consumer',
  2: 'restaurant',
  3: 'livreur'
};

const reverseRoleMapping = {
  1: 'consumer',
  2: 'restaurant',
  3: 'livreur'
};
const LoginSignIn = () => {
  const [signInClicked, setSignInClicked] = useState(false);
  const [messageSignIn, setMessageSignIn] = useState('');
  const [messageLogin, setMessageLogin] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSignIn = () => {
    setSignInClicked(true);
  };

  const handleLogIn = () => {
    setSignInClicked(false);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    try {
      const success = await login(data.email, data.password);
      const role = localStorage.getItem('role');
      if (success) {
        if (role == 1) {
          navigate('/consommateur');
        } else if (role == 3) {
          navigate('/livreur');
        } else if (role == 2) {
          navigate('/restaurant');
        } else {
          setMessageLogin('Identifiant ou mot de passe incorrect.');
        }
      } else {
        setMessageLogin('Identifiant ou mot de passe incorrect.');
      }
    } catch (error) {
      setMessageLogin('Identifiant ou mot de passe incorrect.');
    }
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    if (data.password !== data['password-confirm']) {
      setMessageSignIn('Les mots de passe ne correspondent pas.');
      return;
    }

    if (!data.email.includes('@')) {
      setMessageSignIn('Email invalide.');
      return;
    }

    if (data.password.length < 8) {
      setMessageSignIn('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    const numericRole = roleMapping[data.choice];

    // Create user
    try {
      await axios.post('http://localhost:4547/users', {
        email: data.email,
        password: data.password,
        role: numericRole,
        is_deleted: false
      });
      setMessageSignIn('Compte créé avec succès. Vous pouvez maintenant vous connecter.');
      form.reset();
    } catch (error) {
      setMessageSignIn('Erreur lors de la création du compte.');
    }

    setTimeout(() => {
      setMessageSignIn('');
    }, 3000);
  };

  return signInClicked ? (
    <div className="home">
      <div className="logo">
        <img src={logo} alt="logo CESI'Eats" />
      </div>
      <div className="div-back-arrow">
        <div className="back-arrow" onClick={handleLogIn}>
          <i className="uil uil-arrow-left" id="arrow"></i>
          <p className="back-arrow-text">Retour</p>
        </div>
      </div>
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
          <div className="message-box">{messageSignIn}</div>
          <button type="submit" id="sign_up">Créer mon compte</button>
        </form>
      </div>
    </div>
  ) : (
    <div className="home">
      <div className="logo">
        <img src={logo} alt="logo CESI'Eats" />
      </div>
      <div className="intro-text">
        <p>Connectez-vous pour accéder à votre compte</p>
      </div>
      <div className="log-in-card">
        <form onSubmit={handleSubmitLogin}>
          <div className="label-div">
            <label htmlFor="email">Identifiant</label>
          </div>
          <input type="text" name="email" placeholder="Entrez votre identifiant" required />
          <div className="label-div">
            <label htmlFor="password">Mot de passe</label>
          </div>
          <input type="password" name="password" placeholder="Entrez votre mot de passe" required />
          <div className="message-box">{messageLogin}</div>
          <button type="submit" id="log_in">S'identifier</button>
        </form>
      </div>
      <div className="separator"></div>
      <div>
        <button id="sign_up" onClick={handleSignIn}>Créer mon compte</button>
      </div>
    </div>
  );
};

export default LoginSignIn;