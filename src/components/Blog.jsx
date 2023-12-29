import React, { useRef, useState } from 'react'
import styles from "../styles/Blog.module.css"
import smallArrow from '../assets/smallArrow.png'
import Categories from './Categories'
import { useNavigate } from 'react-router-dom'

const Blog = ({title,email, image, desc, author, date, categories, id}) => {
    const scrollContainerRef = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(null);
    const [scrollLeft, setScrollLeft] = useState(null);
    const navigate = useNavigate()

    const onLinkClick = () => {
        navigate("/blog/"+id);
    }

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
      };
    
      const handleMouseLeave = () => {
        setIsMouseDown(false);
      };
    
      const handleMouseUp = () => {
        setIsMouseDown(false);
      };
    
      const handleMouseMove = (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; //scroll-speed
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
      };
    
    

  return (
    <div className={styles.Blog}>
        <div className={styles.image}>
            <img src={image} alt="lol" />
        </div>
        <div className={styles.author}>
            <p>{author}</p>
        <div className={styles.date}>
            <p>{date}</p>
        </div>
        </div>
        <div className={styles.title}>
            <p>{title}</p>
        </div>
        <div className={styles.categories}>
            <div
            className={styles.scrollContainer}
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <div className={styles.categories}>
            {categories.map((category) => (
                <Categories
                key={category.id}
                title={category.title}
                text_color={category.text_color}
                background_color={category.background_color}
                />
            ))}
            </div>
      </div>
        </div>
        <div className={styles.desc}>
            <p>{desc}</p>
        </div>
        <a className={styles.link} onClick={onLinkClick}>
        <p>სრულად ნახვა</p> <img src={smallArrow} alt="" />
      </a>
    </div>
  )
}

export default Blog