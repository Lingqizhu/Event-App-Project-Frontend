import React, { useState } from "react";
import Col from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
//import "./add.css"
function Searchbar(props) {
  const resetName = () => {
    props.cName(undefined);
    document.getElementById("addNameSearchForm").reset();
  };

  const resetLocation = () => {
    props.cLocation(undefined);
    document.getElementById("addLocationSearchForm").reset();
  };

  const locationSubmitHandler = (e) => {
    console.log(e.target.location.value);
    e.preventDefault();
    props.getByLocation(e.target.location.value);
    props.cLocation(e.target.location.value);
    resetName();
  };

  const nameSubmitHandler = (e) => {
    e.preventDefault();
    props.getByName(e.target.name.value);
    props.cName(e.target.name.value);
    resetLocation();
  };

  const showAll = () => {
    props.refreshList();
    resetName();
    resetLocation();
  };

  return (
    <>
     {/*  <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Search
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => locationSubmitHandler(e)}>
            Location{" "}
          </Dropdown.Item>
          <Dropdown.Item href="#/addNameSearchForm">Name</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
      <form
        onSubmit={(e) => locationSubmitHandler(e)}
        id="addLocationSearchForm"
      >
        <input
          className="search-field"
          type="text"
          name="location"
          placeholder="Search by location"
          autoComplete="off"
        />
        <button className="search-button button-26" type="submit">
          {" "}
          search{" "}
        </button>
      </form>
      <form onSubmit={(e) => nameSubmitHandler(e)} id="addNameSearchForm">
        <input
          className="search-field"
          type="text"
          name="name"
          placeholder="Search by name"
          autoComplete="off"
        />
        <button className="search-button button-26" type="submit">
          {" "}
          search{" "}
        </button>
      </form>

      <button className="show-button button-26" onClick={() => showAll()}>
        {" "}
        Show All{" "}
      </button>
      <Col xs={7}></Col>
    </>
  );
}

export default Searchbar;
