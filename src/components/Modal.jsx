import React, { useState } from 'react'
import styles from '../styles/Modal.module.css'
import x from '../assets/X.png'
import info_circle from '../assets/info-circle.png'
import { login, } from '../api/serverApi';
import greenCheckbox from '../assets/tick-circle.png'
import { useHeaderContext } from '../contexts/headerContexts';
import { useNavigate } from 'react-router-dom';
const Modal = ({ value, setOpen }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [logedIn, setLogedIn] = useState(null);
  const {setUser} = useHeaderContext()

  const navigate = useNavigate()
  const closeModal = () => {
    if(value === 'addBlog'){
      navigate('/')
    }
    setOpen((last) => !last);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const onLogin = async(e) => {
    e.preventDefault();

      if(email === ''){
        setError('შეავსეთ ველი')
        return
      }
      if (!email.endsWith('@redberry.ge')) {
        setError('მეილი უნდა მთავრდებოდეს @redberry.ge–ით');
        return
      }
      try {
        const data = await login(email);
        setUser(true);
        setLogedIn(data+ 'true')      
      } catch (error) {
        setError('ელ–ფოსტა არ მოიძებნა');
      }
      
    
    
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };
  
  return (
    <div className={styles.modalBackground} onClick={closeModal}>
      <div className={styles.modalContent} onClick={stopPropagation}>
        <img src={x} alt="x" className={styles.x} onClick={closeModal} />
        {value === 'login' && !logedIn ? (
          <div className={styles.login}>
            <h1>შესვლა</h1>
            <p>ელ–ფოსტა</p>
            <form onSubmit={onLogin}>
              <input
                type="email"
                placeholder="Example@redberry.ge"
                value={email}
                onChange={handleChange}
                style={{ border: error ? '1px solid red' : '2px solid #5D37F3'}}
              />
              {error && <div className={styles.info}> <img src={info_circle} alt="!"  /><p className={styles.error}> {error}</p></div> }
              <button type="submit" >შესვლა</button>
            </form>
          </div> 
        ) : (
          ''
        )}
        {logedIn ? 
        <div className={styles.logedIn}>
          <div className={styles.greenCheck}>
            <img src={greenCheckbox} alt="green check mark" />
          </div>
          <p>წარმატებული ავტორიზაცია</p>
          <button onClick={closeModal}>კარგი</button>
        </div> : ''}
        {
          value === 'addBlog' ? <div className={styles.logedIn}>
          <img src={greenCheckbox} alt="green check mark" />
          <p>ჩანაწი წარმატებით დაემატა</p>
          <button onClick={closeModal}>მთავარ გვერდზე დაბრუნება</button>
        </div> : ''
        }
      </div>
    </div>
  );
};

export default Modal;