import React, { useState,useEffect } from 'react';
import './LoginLook.css';
import logo from '../../Subory/images/logo.jpg';
import { Link } from 'react-router-dom';
import { useUser } from '../../Kontext/User'
import { useNavigate } from 'react-router-dom';

const LoginLook = () => {
  const { loggedInUser, loginUser, logoutUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
     const response = await fetch('http://localhost:3008/api/prihlasenie',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          heslo: password,
        }),
     });
     const userData = await response.json();
   
      if (userData !== null) {
        loginUser(userData);
        localStorage.setItem('loginUser', JSON.stringify(userData));
        setError(null);
        console.log('Prihlasenie uspesne');
        navigate('/');
      } else {
        setError('Nesprávne prihlasovacie údaje.');
      }

    } catch (error) {
      setError('Chyba pri spracovani');
    }
  };

  useEffect(() => {
    if(loggedInUser){
      navigate('/pouzivatel');
    }
    
  }, [loginUser]); 

  

  return (
    <div>
      {loggedInUser === null ?(
      <div className="bg-dark text-white" style={{ minHeight: '100vh', display: 'flex' }}>
        <div className="container" style={{ marginTop: '50px' }}>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="text-center mb-4">
                <img src={logo} alt="logo" id="logo" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">Prihlásenie</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="inputEmail">Emailová adresa</label>
                  <input
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Emailová adresa"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputPassword">Heslo</label>
                  <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Heslo"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button
                  className="btn btn-lg btn-primary btn-block"
                  type="submit"
                >
                  Prihlásiť sa
                </button>
              
              </form>
              <div className="text-lg-end mt-3">
                <Link to='/registracia'>Ešte nie ste registrovaný?</Link>
              </div>
              <div className="text-lg-end mt-3">
                <a href="#">Zabudli ste heslo?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <div>
          
        </div>
      )}
    </div>
  );
};

export default LoginLook;