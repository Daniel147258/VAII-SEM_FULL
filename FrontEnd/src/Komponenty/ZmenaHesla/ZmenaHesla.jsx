import React, { useState } from 'react';
import { useUser } from '../../Kontext/User';
import { Navigate } from 'react-router';

const ZmenaHesla = () => {
  const { loggedInUser, loginUser } = useUser();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  if(!loggedInUser){
    return <Navigate to='/'/>
  }

  const handleSubmit = async (e) =>{
        e.preventDefault();
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Zmena hesla</h2>
              {loggedInUser !== null ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="oldPassword" className="form-label">
                      Staré heslo
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="oldPassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                      Nové heslo
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Potvrdenie hesla
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <button type="submit" className="btn btn-primary">
                    Zmeniť heslo
                  </button>
                </form>
              ) : (
                <p>Prihláste sa, aby ste mohli meniť heslo.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZmenaHesla;