
// import './App.css'
import { HashLink } from 'react-router-hash-link';
import { useTheme } from '../../../../common/ThemeContext';
import styles from './HomeStyles.module.css';


function Home() {
  const {theme, toggleTheme} = useTheme();
  return (
    <section className={styles.container}>
      <h1>Home</h1>

      <>blank for now</>
      {/* <button onClick={toggleTheme}>dark/light mode</button> */}
    </section>
  )
}

export default Home
