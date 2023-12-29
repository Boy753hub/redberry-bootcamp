import React, { useState } from 'react'
import styles from '../styles/Categories.module.css'

const Categories = ({title, text_color , background_color, handleCategoryClick, id, adress}) => {
  const [borderClicked, handleBorderClick] = useState(false)
    const hexToRgba = (hex, opacity) => {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      };
      const onClick = () => {
        if(adress === 'main'){
          handleCategoryClick(id);
          handleBorderClick(last => last = !last)
        } 
      }
      
  return (
    <div className={styles.categorie} style={{backgroundColor: hexToRgba(background_color, 0.1), color: background_color, border: borderClicked ? '2px solid black' : ''}} onClick={onClick}>
        <p>{title}</p>
    </div>
  )
}

export default Categories