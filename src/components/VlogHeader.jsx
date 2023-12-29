import React from 'react'
import styles from '../styles/Header.module.css'
import logo from '../assets/LOGO.png'
import { useNavigate } from 'react-router-dom'

const VlogHeader = () => {
  const navigate = useNavigate()

  const onLogoClick = () => {
    
		navigate("/");
	};
  return (
    <div className={styles.Header}>
      <div style={{margin: 'auto'}}>
        <div className={styles.logo}>
          <img src={logo} alt="here was logo" onClick={onLogoClick} />
        </div>
      </div>
    </div>
  )
}

export default VlogHeader