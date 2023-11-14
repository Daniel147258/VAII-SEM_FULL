import React from 'react';
import './LoginLook.css';
import logo from '../../Subory/images/logo.jpg';

const LoginLook = () => {
  return (

    <div className="bg-dark text-white" style={{ minHeight: '100vh', display: 'flex'}}>
      <div className="container" style={{ marginTop: '50px'}}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="text-center mb-4">
              <img src={logo} alt="logo" id="logo" width="72" height="72" />
              <h1 className="h3 mb-3 font-weight-normal">Prihlásenie</h1>
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="inputEmail">Emailová adresa</label>
                <input
                  type="email"
                  id="inputEmail"
                  className="form-control"
                  placeholder="Emailová adresa"
                  required
                  autoFocus
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
                />
              </div>
              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Prihlásiť sa
              </button>
            </form>
            <div className="text-lg-end mt-3">
              <a href="">Ešte nie ste registrovaný?</a>
            </div>
            <div className="text-lg-end mt-3">
              <a href="#">Zabudli ste heslo?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLook;