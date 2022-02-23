import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./searchBar.css";

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
      <Container>
        <Row>
          <Col xs={5}>
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
              <button className="button" type="submit">

                search
              </button>
            </form>
          </Col>
          <Col xs={5}>
          <form onSubmit={(e) => nameSubmitHandler(e)} id="addNameSearchForm">
              <input
                className="search-field"
                type="text"
                name="name"
                placeholder="Search by name"
                autoComplete="off"
              />
              <button className="button" type="submit">
                {" "}
                search{" "}
              </button>
            </form>
          </Col>
          <Col className="showallbutton">
            <button className="showall-button" onClick={() => showAll()}>
              {" "}
              Show All{" "}
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Searchbar;
