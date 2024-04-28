import React, { useState } from "react";
import "./BookComponent.css";
import axios from 'axios';

const BookComponent = ({ id, title, author, genre, publisher, description, year, status, owner }) => {
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("username");
  const [showRequest, setShowRequest] = useState(false);
  const [bookList, setBookList] = useState([]);

  const handleRequest = async (e) => {
    e.preventDefault();
    const selectedId = e.target.book.value;

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const newData = {
      ownerUsername: owner.username,
      borrowerUsername: username,
      ownerBookId: id,
      borrowerBookId: parseInt(selectedId)
    }

    console.log(newData)
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND + `/project/api/v1/service/transaction/`,
        newData,
        header
      );
      if (response.data) {
       setShowRequest(false)
       alert("Request Sent")
      }
    } catch (error) {
      alert(error.response.data.errorMessage)
    }
  }
  const getBooks = async () => {
    setShowRequest(true)

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
  }

  return (
    <div className="book-container">
      <div className="home-book-section">
        <div className="home-book-title">{title}</div>
        <div className="home-book-author">Author: {author}</div>
        <div className="home-book-genre">Genre: {genre}</div>
        <div className="home-book-publisher">Publisher: {publisher}</div>
        <div className="home-book-year">Year: {year}</div>
        <div className="home-book-description">Description: {description}</div>
        <div className="home-book-status">Status: {status}</div>
      </div>
      <div className="home-book-owner">
        <div>Owner: {owner.firstName} {owner.lastName}</div>
        <div>Email: {owner.email}</div>
        <div>Phone Number: {owner.phoneNumber}</div>
        <div>Username: {owner.username}</div>

        {status === "AVAILABLE" && username !== owner.username ? <button className="request-button" onClick={() => getBooks(true)}> Request</button> : null}
      </div>
      {showRequest && (
        <div className="overlay">
          <div className="request-book-popup">
            <h2>Choose Book</h2>
            <form id="request-book-form" onSubmit={handleRequest}>
              <select name="book" id="book-select">
                {bookList.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title} by {book.author}
                  </option>
                ))}
              </select>
              <input className="submit-button" type="submit" value="Request Book" />
            </form>
            <button onClick={() => setShowRequest(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookComponent;
