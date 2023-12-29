import React, {  useRef, useState } from 'react';
import styles from '../styles/MainPage.module.css';
import spaceLogo from '../assets/space_background.png';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/serverApi';
import Categories from '../components/Categories';
import Spinner from 'react-bootstrap/Spinner';
import { useHeaderContext } from '../contexts/headerContexts';
import Blog from '../components/Blog';

const MainPage = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const {  data: blogData } = useHeaderContext()
  const scrollContainerRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toLocaleDateString('en-GB'); 
  
  
  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(categoryId)) {
        return prevCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevCategories, categoryId];
      }
    });
  };  

  const isDateInFuture = (publishDate) => {
    const blogDate = new Date(publishDate.split('.').reverse().join('-'));
    return blogDate > currentDate;
  };

  const filteredBlogs = selectedCategories.length
  ? blogData?.data?.filter((blog) =>
      blog.categories.some((category) =>
        selectedCategories.includes(category.id)
      ) && !isDateInFuture(blog.publish_date)
    )
  : blogData?.data?.filter((blog) => !isDateInFuture(blog.publish_date));
  

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

  if (isLoading) return  <div className={styles.loading}><Spinner animation="border" variant="primary" /> <p>Loading...</p></div>
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.main}>
      <div className={styles.background}>
        <div className={styles.text}>
          <p>ბლოგი</p>
        </div>
        <div className={styles.backgroundImg}>
          <img src={spaceLogo} alt="background img" />
        </div>
      </div>
      <div
        className={styles.scrollContainer}
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className={styles.categories}>
          {data.data.map((category) => (
            <Categories
              key={category.id}
              title={category.title}
              text_color={category.text_color}
              background_color={category.background_color}
              handleCategoryClick={handleCategoryClick}
              id={category.id}
              adress={'main'}
            />
          ))}
        </div>
      </div>
      <div className={styles.blogsContainer}>

          <div className={styles.blogs}>
          {filteredBlogs?.map((data) => (
            <Blog
              key={data.id}
              title={data.title}
              email={data.email}
              image={data.image}
              desc={data.description}
              author={data.author}
              date={data.publish_date}
              categories={data.categories}
              id={data.id}
            />
          ))}
          </div>
        </div>
    </div>
  );
};

export default MainPage;
