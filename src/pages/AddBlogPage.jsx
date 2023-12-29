import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/AddBlog.module.css";
import goBack from "../assets/Arrow.png";
import folderAdd from "../assets/folder-add.png";
import gallery from "../assets/gallery.png";
import X from "../assets/X.png";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AddBlog, getCategories } from "../api/serverApi";
import Select from "react-select";
import info_circle from "../assets/info-circle.png";
import { debounce } from 'lodash';
import { useForm} from 'react-hook-form';
import BlogAddedModal from "../components/BlogAddedModal";



const AddBlogPage = () => {
  const [authorValue, setAuthorValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [categoriesValue, setSetCategoriesValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [Aerrors, AsetErrors] = useState({});
  const [Terrors, TsetErrors] = useState({});
  const [Derrors, DsetErrors] = useState({});
  const [Eerrors, EsetErrors] = useState({});
  const [submited, setSubmited] = useState(false)
  const [submitErros, setSubmitErros] = useState(false)
  const { handleSubmit} = useForm()
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  
  const {  data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const sessionStorageKeys = [
    'authorValue',
    'titleValue',
    'descValue',
    'dateValue',
    'categoriesValue',
    'emailValue',
  ];
  useEffect(() => {
    sessionStorageKeys.forEach((key) => {
      const storedValue = sessionStorage.getItem(key);

      if (storedValue) {
        const parsedValue = JSON.parse(storedValue);

        switch (key) {
          case 'authorValue':
            setAuthorValue(parsedValue);
            break;
          case 'titleValue':
            setTitleValue(parsedValue);
            break;
            
          case 'descValue':
            setDescValue(parsedValue);
            break;
            
          case 'categoriesValue':
            setSetCategoriesValue(parsedValue);
            break;
            
          case 'dateValue':
            setDateValue(parsedValue);
            break;
            
          case 'emailValue':
            setEmailValue(parsedValue);
            break;

          default:
            break;
        }
      }
    });
  }, []);

  const updateSessionStorageDebounced = debounce(() => {
    sessionStorageKeys.forEach((key) => {
      const value = eval(key);
      sessionStorage.setItem(key, JSON.stringify(value));
    });
  }, 500); 
  
  useEffect(() => {
    updateSessionStorageDebounced();
  }, [authorValue, titleValue, descValue, dateValue, categoriesValue, emailValue]);
  
  const goBackF = () => {
    navigate("/");
  };

  

  const onSubmit = async(event) => {
    // event.preventDefault();
   
      let newErrors = {};
      if(emailValue){
        
        if (!emailValue.endsWith("@redberry.ge")) {
          newErrors.EmailErr = "მეილი უნდა მთავრდებოდეს @redberry.ge–ით";
      }
      EsetErrors(newErrors);
    }
    
    if(file && authorValue && dateValue && titleValue && descValue && categoriesValue ){
      
      const formData = new FormData()
      formData.append('image', file)
      formData.append('title', titleValue)
      formData.append('description', descValue)
      formData.append('author', authorValue)
      formData.append('publish_date', dateValue)
      formData.append('categories', JSON.stringify(categoriesValue))
      formData.append('email', emailValue ? emailValue : '')
      try {
        setSubmitErros(false)
        const res =  await AddBlog(formData)
        setSubmited(true)
        sessionStorageKeys.forEach((key) => {
          sessionStorage.removeItem(key);
        });
        setFile(null)
        setTitleValue('')
        setDescValue('')
        setAuthorValue('')
        setDateValue('')
        setTitleValue('')
        setSetCategoriesValue('')
      } catch (error) {
        console.error(error);
      }
      
    }else{
      setSubmitErros(true)
      }
      

    };


    const customStyles = {
      control: (provided, state) => {
        const border = state.isSelected ? '1px solid #4CAF50' : '1px solid #ccc';
        const errorBorder = submitErros && !categoriesValue ? '1px solid red' : border;
    
        return {
          ...provided,
          border: errorBorder,
          boxShadow: 'none',
          borderRadius: '8px',
          width: '100%',
          display: 'flex',
        };
      },
      option: (provided, state) => ({
        ...provided,
        borderRadius: '8px',
        backgroundColor: state.data.style.backgroundColor,
        color: state.data.style.color,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        flexWrap: 'nowrap',
        overflowX: 'auto',
      }),
      multiValue: (provided, state) => ({
        ...provided,
        backgroundColor: state.data.style.backgroundColor,
        color: state.data.style.color,
        borderRadius: '8px',
        height: '33px',
        display: 'flex',
        alignItems: 'center',
      }),
      menu: (provided) => ({
        ...provided,
        display: 'flex',
        flexDirection: 'row',
        maxHeight: '150px',
        overflowY: 'auto',
        width: '100%',
      }),
      menuValue: (provided) => ({
        ...provided,
        display: 'flex',
        flexDirection: 'row',
        maxHeight: '200px',
        overflowY: 'auto',
        width: 'auto',
      }),
    };
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFile(droppedFiles[0]);
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleUploadClick = () => {
    console.log('Upload clicked');
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const isGeorgianAlphabet = (value) => {
    const georgianAlphabetRegex = /^[\u10A0-\u10FF\s]+$/;
    return georgianAlphabetRegex.test(value);
  };

  const validTitleValue = (e) => {
    const value = e.target.value;
    setTitleValue(value);
    let newErrors = {};
    if (value.length < 4) {
      newErrors.TitlefourSymbol = "მინიმუმ 4 სიმბოლო";
    }
    TsetErrors(newErrors);
  };
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescValue(value);
    let newErrors = {};
    if (value.length < 4) {
      newErrors.DescfourSymbol = "მინიმუმ 4 სიმბოლო";
    }
    DsetErrors(newErrors);
  };

  const handleDataChange = (e) => {
    let value = e.target.value;
    setDateValue(value);
  };

  const ValidateAuthorValue = (e) => {
    const value = e.target.value;
    setAuthorValue(value);
    let newErrors = {};
    if (value.split(" ").length < 2) {
      newErrors.AuthortwoWord = "მინიმუმ ორი სიტყვა";
    }
    if (value.length < 4) {
      newErrors.AuthorfourSymbol = "მინიმუმ 4 სიმბოლო";
    }
    if (!isGeorgianAlphabet(value)) {
      newErrors.Authorgeorgian = "მხოლოდ ქართული სიმბოლოები";
    }
    AsetErrors(newErrors);
  };

  const selectAnswer = (e) => {
    const selectedStrings = e.map((option) => option.id);
    setSetCategoriesValue(selectedStrings);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailValue(value);
    const newError = {}
    EsetErrors(newError)
  };

  return (
    <div className={styles.AddBlog}>
      <div className={styles.backButton}>
        <img src={goBack} alt="Back" onClick={goBackF} />
      </div>
      <div className={styles.content}>
        <div
          className={styles.addBlogContent}
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>ბლოგის დამატება</h1>
            <div className={styles.photoUpload}>
              <p>ატვირთეთ ფოტო *</p>
              {!file ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={(event) => event.preventDefault()}
                  className={`${styles.addPhoto} ${submitErros ? styles.errorBorder : ''}`}
                >
                  <div className={styles.folder}>
                    <img src={folderAdd} alt="" />
                  </div>
                  <div className={styles.photoP}>
                    <p>ჩააგდეთ ფაილი აქ ან </p>
                    <p
                      onClick={handleUploadClick}
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      აირჩიეთ ფაილი
                    </p>
                  </div>
                  <input
                   type="file"
                   accept="image/*"
                   onChange={handleFileInputChange}
                   style={{ display: 'none' }}
                   ref={fileInputRef}
                  //  {...register('image')}
                  />
                </div>
              ) : (
                <div className={styles.uploadedImg}>
                  <div className={styles.folderName}>
                    <img src={gallery} alt="done" />
                    {file.name}{" "}
                  </div>
                  <div className={styles.uploadedImgRemove}>
                    <img
                      src={X}
                      alt="X"
                      onClick={handleRemoveFile}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className={styles.inputHub}>
              <div className={styles.author}>
                <p>ავტორი *</p>
                <input
                  type="text"
                  value={authorValue}
                  onChange={ValidateAuthorValue}
                  placeholder="შეიყვანეთ ავტორი"
                  style={{
                    border:
                      (!Aerrors.AuthortwoWord &&
                      authorValue.length >= 4 &&
                      isGeorgianAlphabet(authorValue)
                        ? "#14D81C"
                        : submitErros || (authorValue && !authorValue)
                        ? "red"
                        : "#E4E3EB") + " solid 1px",
                  }}
                />
                <p
                  className={styles.authorErr}
                  style={{
                    color: Aerrors.AuthortwoWord
                      ? "#85858D"
                      : authorValue.split(" ").length >= 2
                      ? "#14D81C"
                      : "#85858D",
                  }}
                >
                  <span className={styles.bulletPoint}>&bull;</span>
                  მინიმუმ ორი სიტყვა
                </p>
                <p
                  className={styles.authorErr}
                  style={{
                    color: Aerrors.AuthorfourSymbol
                      ? "#85858D"
                      : authorValue.length >= 4
                      ? "#14D81C"
                      : "#85858D",
                  }}
                >
                  <span className={styles.bulletPoint}>&bull;</span>
                  მინიმუმ 4 სიმბოლო
                </p>
                <p
                  className={styles.authorErr}
                  style={{
                    color: Aerrors.Authorgeorgian
                      ? "#85858D"
                      : isGeorgianAlphabet(authorValue)
                      ? "#14D81C"
                      : "#85858D",
                  }}
                >
                  <span className={styles.bulletPoint}>&bull;</span>
                  მხოლოდ ქართული სიმბოლოები
                </p>
              </div>
              <div className={styles.title}>
                <p>სათაური *</p>
                <input
                  type="text"
                  value={titleValue}
                  placeholder="შეიყვანეთ სათაური"
                  onChange={validTitleValue}
                  style={{
                    border:
                      titleValue.length >= 4
                        ? "#14D81C solid 1px"
                        : submitErros || (titleValue && !titleValue)
                        ? "red solid 1px"
                        : "#E4E3EB solid 1px",
                  }}
                />
                <p
                  className={styles.authorErr}
                  style={{
                    color: Terrors.TitlefourSymbol
                      ? "#85858D"
                      : titleValue.length >= 4
                      ? "#14D81C"
                      : "#85858D",
                  }}
                >
                  <span className={styles.bulletPoint}></span>
                  მინიმუმ 4 სიმბოლო
                </p>
              </div>
            </div>
            <div className={styles.Description}>
              <p>Description *</p>
              <textarea
                rows="4"
                value={descValue}
                placeholder="შეიყვანეთ აღწერა"
                onChange={handleDescriptionChange}
                style={{
                  resize: "none",
                  border:
                    !Derrors.DescfourSymbol && descValue.length >= 4
                      ? "#14D81C solid 1px"
                      : submitErros || (descValue && !descValue)
                      ? "red solid 1px"
                      : "#E4E3EB solid 1px",
                }}
              />
              <p
                className={styles.authorErr}
                style={{
                  color: Derrors.DescfourSymbol
                    ? "#85858D"
                    : descValue.length >= 4
                    ? "#14D81C"
                    : "#85858D",
                  marginTop: "10px",
                }}
              >
                <span className={styles.bulletPoint}></span>
                მინიმუმ 4 სიმბოლო
              </p>
            </div>
            <div className={styles.inputHub}>
              <div className={styles.uploadDate}>
                <p>გამოქვეყნების თარიღი *</p>
                <input
                  type="date"
                  selected={dateValue}
                  onChange={handleDataChange}
                  style={{
                    border:
                      dateValue
                        ? "#14D81C solid 1px"
                        : submitErros  || (dateValue && !dateValue)
                        ? "red solid 1px"
                        : "#E4E3EB solid 1px",
                  }}
                />
              </div>
              <div className={styles.categories}>
                <p>კატეგორია *</p>
                {data && (
                  <Select
                    options={data.data.map((e) => ({
                      value: e.title,
                      label: e.title,
                      id: e.id,
                      style: {
                        backgroundColor: e.background_color,
                        color: e.text_color,
                      },
                    }))}
                    isMulti
                    name="colors"
                    styles={customStyles}
                    className={styles.multi_select_cat}
                    classNamePrefix="select"
                    placeholder="აირჩიეთ კატეგორია"
                    onChange={selectAnswer}
                  />
                )}
              </div>
            </div>
            <div className={styles.emailContainer}>
              <div className={styles.email}>
                <p>ელ–ფოსტა</p>
                <input
                  type="email"
                  placeholder="Example@redberry.ge"
                  value={emailValue}
                  onChange={handleEmailChange}
                  style={{
                    border: Eerrors.EmailErr ? "1px solid red" : "2px solid #E4E3EB;",
                  }}
                />
                {Eerrors.EmailErr && (
                  <div className={styles.info}>
                    {" "}
                    <img src={info_circle} alt="!" />
                    <p className={styles.error}> {Eerrors.EmailErr}</p>
                  </div>
                )}
              </div>
              <div className={styles.emptyspace}></div>
            </div>
            <div className={styles.submit}>
              <div className={styles.emptyspace}></div>
              <button type="submit">გამოქვეყნება</button>
            </div>
          </form>
        </div>
      </div>
      {
        submited  ? <BlogAddedModal/>: " "
      }
    </div>
  );
};

export default AddBlogPage;
