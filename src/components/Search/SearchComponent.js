import React, { useRef } from "react";
import axios from "axios";
import "./SearchComponent.css";

const SearchComponent = ({ searchData }) => {
  const searchInputRef = useRef(null);

  const handleChange = () => {
    autoResize(searchInputRef.current);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem("token");
  

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND + `/project/api/v1/service/search/${searchInputRef.current.value}`,
        header
      );
      if (response.data) {
        searchData(response.data)
        searchInputRef.current.value = null;
      }
    } catch (error) {
      console.log(error);
    }
    
  }
  const autoResize = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <div className="search-input-container">
      <form className="search-section" onSubmit={handleSubmit}>
        <textarea
          ref={searchInputRef}
          id="search-input"
          className="search-input"
          onChange={handleChange}
          placeholder="Search..."
        ></textarea>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;