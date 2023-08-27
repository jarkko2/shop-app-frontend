import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/x-www-form-urlencoded',
    // Other headers you want to include
  };
  
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const [email, setEmail] = useState('')

    useEffect(() => {
        // Call the onlineCheck function when the component is rendered
        onlineCheck();
      }, []); // Empty dependency array ensures it runs only once
    

    const onlineCheck = async (e) => {
        try {
            const response = await axios.post('http://localhost:5001/api/users/onlinecheck', qs.stringify({
            }),{
                headers: headers,
                withCredentials: true
            });
            console.log(response)
            setEmail(response.data.user.username)
            // Handle successful login (redirect or show a message)
          } catch (error) {
            console.error('Login failed:', error.response);
          }
    }

    const handleLogin = async (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
  
      try {
        const response = await axios.post('http://localhost:5001/api/users/login/password', qs.stringify({
          username,
          password,
        }),{
            headers: headers,
            withCredentials: true
        });
        console.log(response)
        window.location.reload(true)
        // Handle successful login (redirect or show a message)
      } catch (error) {
        console.error('Login failed:', error.response);
      }
    };

    const handleLogout = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const response = await axios.post('http://localhost:5001/api/users/logout', qs.stringify({
                // your data
              }), {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                withCredentials: true,
              });
          console.log(response)
          window.location.reload(true)
          // Handle successful logout (redirect or show a message)
        } catch (error) {
          console.error('Logout failed:', error.response);
        }
      };

    if (email){
        return (
            <div>
              <p>{email}</p>
              <form onSubmit={handleLogout}>
                <div>
                  <button type="submit">Logout</button>
                </div>
              </form>
            </div>
          );
    }else{
        return (
            <div>
              <h1>Login</h1>
              <form onSubmit={handleLogin}>
                <div>
                  <label>Username:</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <button type="submit">Login</button>
                </div>
              </form>
            </div>
          );
    }

    return (
      <div>
        <h1>Login</h1>
        <p>{email}</p>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
        <form onSubmit={handleLogout}>
          <div>
            <button type="submit">Logout</button>
          </div>
        </form>
      </div>
    );
  }
  
  export default Login;
  