import Home from './components/home/home.js';
import UserPage from './components/userpage/userpage.js'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App h-screen w-screen" style={{ backgroundImage: "url('https://wallpaperaccess.com/full/1087589.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/user/:username" element={<UserPage />}/>
      </Routes>
    </div>
  );
}

export default App;

