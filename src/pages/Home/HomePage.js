import React, {useState, useRef, useLayoutEffect, useEffect} from "react";
import "./HomePage.css";
import Layout from "../../components/Layout/Layout";
import SearchComponent from "../../components/Search/SearchComponent";
import BookComponent from "../../components/Book/BookComponent";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const contentRef = useRef(null);

  const token = sessionStorage.getItem("token");

  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };


  const fetchBooks = async () => {
    try {
      const response = await axios.get(
       process.env.REACT_APP_BACKEND + `/project/api/v1/service/book?page=${page}`,
        header
      );
      const data = response.data;

      if (data.length === 0) {
        setHasMore(false);
        return;
      }
      console.log(data)
      setBooks((prevBooks) => [...prevBooks, ...data]);
    } catch (error) {}
  };

  useEffect(() => {
    fetchBooks(false);
    // eslint-disable-next-line
  }, [page]);


  useLayoutEffect(() => {
    const contentHeight = contentRef.current.clientHeight;
    if(contentHeight < window.innerHeight) {
      setPage(0)
    }
  }, []);

  const searchData = (booksData) => {
    setBooks(booksData);
  };

  return (
    <Layout>
      <div id="books-main-content" className="books-main-content">
      <div ref={contentRef}>

        <SearchComponent searchData={searchData}/>
        <InfiniteScroll
            dataLength={books.length}
            next={() => setPage((page) => page + 1)}
            hasMore={hasMore}
            loader={<h4>...</h4>}
            scrollableTarget={"books-main-content"}
          >
            {books.map((book, index) => (
                <BookComponent
                  key={index}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  genre={book.genre}
                  publisher={book.publisher}
                  description={book.description}
                  year={book.year}
                  status={book.status}
                  owner={book.owner}
                />
            ))}
          </InfiniteScroll>
      </div>
      </div>
    </Layout>
  );
};

export default HomePage;