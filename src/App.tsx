import { useState } from 'react'
import './App.css'

const App = () => {
  const [inputLatitude, setInputLatitude] = useState<string>('');
  const [inputLongitude, setInputLongitude] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("🔥 inputLatitude=", inputLatitude);
    console.log("🔥 inputLongitude=", inputLongitude);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Latitude
        <input
          type="text"
          required
          value={inputLatitude}
          onChange={(e) => setInputLatitude(e.target.value)}
          placeholder="Enter latitude (e.g. 40.7128)"
          autoComplete="off"
        />
      </label>
      <label>
        Longitude
        <input
          type="text"
          required
          value={inputLongitude}
          onChange={(e) => setInputLongitude(e.target.value)}
          placeholder="Enter longitude (e.g. -74.0060)"
          autoComplete="off"
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default App;
