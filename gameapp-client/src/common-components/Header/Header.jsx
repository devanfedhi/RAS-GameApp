import React, { useRef, useState } from 'react'
import { useTheme } from '../../common/ThemeContext';

import styles from './HeaderStyles.module.css';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function Header() {
    const location = useLocation();
    const menuRef = useRef();
    
    const {theme, _} = useTheme();

  return (
    <section id="header" className={styles.container}>
        <div className={styles.title}><HashLink className={styles.anchor} to="/" >Otterhello</HashLink></div>
        <ul ref={menuRef} className={styles.nav}>
            <div className={styles.navItems}>
                <li className={styles.item}><HashLink className={styles.anchor} to="/chatapp" >Chat</HashLink></li>
                <li className={styles.item}><HashLink className={styles.anchor} to="/checkers" >Checkers</HashLink></li>
            </div>
        </ul>
    </section>
  )
}

export default Header