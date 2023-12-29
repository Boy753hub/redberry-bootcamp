import React from 'react'
import styles from '../styles/Modal.module.css'
import x from '../assets/X.png'
import greenCheckbox from '../assets/tick-circle.png'
import { useNavigate } from 'react-router-dom'
import { useHeaderContext } from '../contexts/headerContexts'

const BlogAddedModal = () => {
    const navigate = useNavigate()
    const { refetch } = useHeaderContext()

    const closeModal = () => {
        refetch()
        navigate('/')
        
      };
    
      const stopPropagation = (e) => {
        e.stopPropagation();
      };
  return (
    <div className={styles.modalBackground} onClick={closeModal}>
    <div className={styles.modalContent} onClick={stopPropagation}>
    <img src={x} alt="x" className={styles.x} onClick={closeModal} />
       <div className={styles.logedIn}>
       <div className={styles.greenCheck}>
            <img src={greenCheckbox} alt="green check mark" />
          </div>
        <p>ჩანაწი წარმატებით დაემატა</p>
        <button onClick={closeModal}>მთავარ გვერდზე დაბრუნება</button>
      </div>
    </div>
  </div>
  )
}

export default BlogAddedModal