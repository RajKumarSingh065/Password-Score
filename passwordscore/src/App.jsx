import React, { useState } from 'react';
import button from './assets/component/Button'
import Button from './assets/component/Button';

const App = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/password-strength', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStrength(data.strength);
        setMessage(data.message);
      })
      .catch((error) => console.error(error));
  };
  

  return (
    <>
      <div className="relative min-h-screen w-full bg-slate-950">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="flex-col items-center justify-center  text-white ">
          <h1 className="text-3xl px-auto font-bold">Password assessment</h1>
          <p>A password assessement tool</p>
        </div>
        <section className="flex items-center justify-center min-h-screen">
          <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg max-w-lg w-full mx-4 flex spaced-evenly items-center">
            <input
              type="password"
              id="password"
              className="rounded-xl max-w-full border border-slate-950 p-2 text-black"
              placeholder="Enter your Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="button" id="button" onClick={handleSubmit} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 " >Submit</button>
            <p className={`text-lg ${strength === 'strong' ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default App;
