import React, {  useState } from 'react'
import styles from '../styles/Header.module.css'
import logo from '../assets/LOGO.png'
import Modal from './Modal'
import { useHeaderContext } from '../contexts/headerContexts'
import {  useNavigate } from 'react-router-dom'

const Header = () => {
  const [open, setOpen] = useState(false)
  const [login, setLogin] = useState('')
  const { isUser} = useHeaderContext()
  const navigate = useNavigate()


  const openModal = () => {
    setOpen(last => last = !last)
    setLogin('login')
  }
  const addBlog = () => {
    navigate('/addBlog')
  }
  const onLogoClick = () => {
		navigate("/");
	};
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderContent}>
        <div className={styles.logo}>
          <img src={logo} alt="here was logo" onClick={onLogoClick} />
        </div>
        {!isUser ? <div className={styles.login} onClick={openModal}>
            შესვლა
        </div>: <div className={styles.addVlog} onClick={addBlog}>
            დაამატე ბლოგი
        </div>}
      </div>
        {open ? <Modal value={login} setOpen={setOpen} /> : " "}
    </div>
  )
}

export default Header