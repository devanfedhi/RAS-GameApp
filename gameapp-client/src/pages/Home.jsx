
// import './App.css'
import { HashLink } from 'react-router-hash-link';
import { useTheme } from '../common/ThemeContext';


function Home() {
  const {theme, toggleTheme} = useTheme();
  return (
    <>
      <h1>Home</h1>

      <button onClick={toggleTheme}>dark/light mode</button>

      <ul>
        <li><HashLink to="/chatapp" >Chat App</HashLink></li>
        <li><HashLink to="/checkers" >Checkers</HashLink></li>
      </ul>
    </>
  )
}

export default Home
