import Home from './components/home/home.js';
import UserPage from './components/userpage/userrouter.js'
import { Routes, Route } from 'react-router-dom'
import Logo from './imageComponent.js'

function App() {
  return (
    <div className="App min-h-screen min-w-screen pb-20" style={{ backgroundImage: "url('https://wallpaperaccess.com/full/1087589.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <Logo />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/user/:username/*" element={<UserPage />}/>
      </Routes>
    </div>
  );
}

export default App;

