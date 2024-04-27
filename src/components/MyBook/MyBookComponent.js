import React, { useState, useRef } from "react";
import "./MyBookComponent.css";
import axios from "axios";

const MyBookComponent = ({ id, title, author, genre, publisher, description, year, status, updatedData, deletedData }) => {
  const [showUpdateBookPopup, setShowUpdateBookPopup] = useState(false);

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const genreRef = useRef(null);
  const descriptionRef = useRef(null);
  const yearRef = useRef(null);
  const publisherRef = useRef(null);

  const handleUpdateBook = async () => {
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
      const response = await axios.put(
        process.env.REACT_APP_BACKEND + `/project/api/v1/service/book/${id}`,
        newBookData,
        header
      );
      if (response.data) {
        updatedData(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteBook = async () => {
    const token = sessionStorage.getItem("token");

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.delete(
        process.env.REACT_APP_BACKEND + `/project/api/v1/service/book/${id}`,
        header
      );
      if (response.data) {
        deletedData(id)
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="book-container">
      <div className="book-section">
        <p className="book-title">{title}</p>
        <p className="book-author">Author: {author}</p>
        <p className="book-genre">Genre: {genre}</p>
        <p className="book-publisher">Publisher: {publisher}</p>
        <p className="book-year">Year: {year}</p>
        <p className="book-description">Description: {description}</p>
        <p className="book-status">Status: {status}</p>
      </div>
      <div className="book-owner">
        {status === "AVAILABLE" ?
          <> 
            <button className="update-button" onClick={() => setShowUpdateBookPopup(true)}>Update</button>
            <button className="delete-button" onClick={handleDeleteBook}>Delete</button>
          </>
          : null}
      </div>
      {showUpdateBookPopup && (
        <div className="overlay">
          <div className="update-book-popup">
            <h2>Update Book</h2>
            <form id="add-book-form" onSubmit={handleUpdateBook}>
              <input
                ref={titleRef}
                id="title"
                className="input-book"
                type="text"
                name="title"
                placeholder="Title"
                required
                defaultValue={title}
              />
              <input
                ref={authorRef}
                id="author"
                className="input-book"
                type="text"
                name="author"
                placeholder="Author"
                required
                defaultValue={author}
              />
              <input
                ref={genreRef}
                id="genre"
                className="input-book"
                type="text"
                name="genre"
                placeholder="Genre"
                required
                defaultValue={genre}
              />
              <textarea
                ref={descriptionRef}
                id="description"
                className="input-book"
                name="description"
                placeholder="Description"
                rows="4"
                required
                defaultValue={description}
              ></textarea>
              <input
                ref={yearRef}
                id="year"
                className="input-book"
                type="number"
                name="year"
                placeholder="Year"
                required
                defaultValue={year}
              />
              <input
                ref={publisherRef}
                id="publisher"
                className="input-book"
                type="text"
                name="publisher"
                placeholder="Publisher"
                required
                defaultValue={publisher}
              />
              <input className="submit-button" type="submit" value="Update Book" />
            </form>
            <button onClick={() => setShowUpdateBookPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookComponent;
