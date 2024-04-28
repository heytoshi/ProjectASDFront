import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import "./ProfilePage.css";
import Layout from "../../components/Layout/Layout";
import MyBookComponent from "../../components/MyBook/MyBookComponent";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import TransactionTabsComponent from "../../components/TransactionTabs.js/TransactionTabsComponent";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("books");
  const [bookList, setBookList] = useState([]);
  // eslint-disable-next-line
  const [page, setPage] = useState(1);

  const contentRef = useRef(null);
  const titleRef = useRef();
  const authorRef = useRef();
  const genreRef = useRef();
  const descriptionRef = useRef();
  const yearRef = useRef();
  const publisherRef = useRef();

  const resetInfiniteScroll = () => {
    setPage(0);
    setBookList([]);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetInfiniteScroll();
  };

  const [showAddBookPopup, setShowAddBookPopup] = useState(false);
  // eslint-disable-next-line
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    publisher: "",
    description: "",
    year: "",
    status: "",
  });


  const fetchMyBook = async () => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND + `/project/api/v1/service/book/${username}`,
        header
      );
      const data = response.data;

      setBookList(data);

    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    resetInfiniteScroll();
    if (activeTab === "books") {
      fetchMyBook();
    } else if (activeTab === "transactions") {
    }
  }, [activeTab]);

  useLayoutEffect(() => {
    const contentHeight = contentRef.current.clientHeight;
    if (contentHeight < window.innerHeight) {
      setPage(0);
    }
  }, []);


  const handleAddBook = async () => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    const newBookData = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      genre: genreRef.current.value,
      description: descriptionRef.current.value,
      year: parseInt(yearRef.current.value),
      publisher: publisherRef.current.value,
      username: username
    };

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND + "/project/api/v1/service/book/",
        newBookData,
        header
      );
      if (response.data) {
        setBookList((prevBookList) => [...prevBookList, newBookData]);
      }
    } catch (error) {
      console.log(error)
    }
    //setShowAddBookPopup(false); 
  };

  const updatedData = (updatedBook) => {
    const index = bookList.findIndex((book) => book.id === updatedBook.id);

    if (index !== -1) {
      setBookList((prevBookList) => {
        const updatedList = [...prevBookList];
        updatedList[index] = updatedBook;
        return updatedList;
      });
    } else {
      console.log("Updated book not found in bookList.");
    }
  }


  const deletedData = (id) => {
    setBookList((prevBookList) =>
    prevBookList.filter((user) => user.id !== id)
    );
  };


  return (
    <Layout>
      <div id="mybook-main-content" className="mybook-main-content">
        <div ref={contentRef}>
          <div className="button-group">
            <button
              className={`tab ${activeTab === "transactions" ? "active" : ""}`}
              onClick={() => handleTabChange("transactions")}
            >
              Transactions
            </button>
            <button
              className={`tab ${activeTab === "books" ? "active" : ""}`}
              onClick={() => handleTabChange("books")}
            >
              My Books
            </button>
            {activeTab === "books" && (
              <button className="add-book-btn" onClick={() => setShowAddBookPopup(true)}>
                +
              </button>
            )}
          </div>
          <InfiniteScroll
            dataLength={
              activeTab === "books"
                ? bookList.length
                : null
            }
            scrollableTarget={"mybook-main-content"}
          >
            {activeTab === "books"
              ? bookList.map((book, index) => (
                <MyBookComponent
                  key={index}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  genre={book.genre}
                  publisher={book.publisher}
                  description={book.description}
                  year={book.year}
                  status={book.status}
                  updatedData={updatedData}
                  deletedData={deletedData}
                />
              ))
              : activeTab === "transactions"
              ? <TransactionTabsComponent>
                
              </TransactionTabsComponent>
                : null}
          </InfiniteScroll>
        </div>
        {showAddBookPopup && (
          <div className="overlay">
            <div className="add-book-popup">
              <h2>Add New Book</h2>
              <form id="add-book-form" onSubmit={handleAddBook}>
                <input
                  ref={titleRef}
                  id="title"
                  className="input-book"
                  type="text"
                  name="title"
                  placeholder="Title"
                  required
                />
                <input
                  ref={authorRef}
                  id="author"
                  className="input-book"
                  type="text"
                  name="author"
                  placeholder="Author"
                  required
                />
                <input
                  ref={genreRef}
                  id="genre"
                  className="input-book"
                  type="text"
                  name="genre"
                  placeholder="Genre"
                  required
                />
                <textarea
                  ref={descriptionRef}
                  id="description"
                  className="input-book"
                  name="description"
                  placeholder="Description"
                  rows="4"
                  required
                ></textarea>
                <input
                  ref={yearRef}
                  id="year"
                  className="input-book"
                  type="number"
                  name="year"
                  placeholder="Year"
                  required
                />
                <input
                  ref={publisherRef}
                  id="publisher"
                  className="input-book"
                  type="text"
                  name="publisher"
                  placeholder="Publisher"
                  required
                />
                <input className="submit-button" type="submit" value="Add Book" />
              </form>
              <button onClick={() => setShowAddBookPopup(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;