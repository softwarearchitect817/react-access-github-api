import githubimage from './github.png'
import './App.css';
import { useState } from 'react';

function App() {

  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://api.github.com/users/${search}`)
    .then(response => response.json())
    .then(userResponse => setUserData(userResponse));
  }

  const handleChange = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  }

  return (
    <div className="container text-center">
      <h1 className="py-5">Github Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={search}
              onChange={handleChange}
              required
            />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-success">
                Search
              </button>
            </span>
          </div>
        </div>
      </form>
      <div className="py-5">
          <div>
            
            {!userData && (
              <img
                src={githubimage}
                className="responsive rounded-circle"
                alt=""
                height="200px"
              />
            )}

            {userData && (
              <>
                <img
                  src={userData.avatar_url}
                  className="responsive rounded-circle"
                  alt=""
                  height="200px"
                />
                <h1 className="pt-5">
                  <a href={userData.html_url} className="text-decoration-none" target="_new">
                    {userData.name}
                  </a>
                </h1>
                <h3>{userData.location}</h3>
                <p>
                  <a href={userData.blog} className="text-decoration-none" target="_new">
                  {userData.blog}
                  </a>
                </p>
              </>
            )}

          </div>
      </div>
    </div>
  );
}

export default App;
