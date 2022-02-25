import React, { useState, useEffect } from "react";
import Add from "./Add";
import SearchBar from "./searchBar";
import "./Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function Dashboard(props) {
  const [events, cEvents] = useState([]);
  const [current, cCurrent] = useState(undefined);
  const [location, cLocation] = useState(undefined);
  const [name, cName] = useState(undefined);

  const refreshList = () => {
    props.client.getEvents().then((response) => cEvents(response.data));
  };

  const removeEvent = (id) => {
    props.client.removeEve(id).then(() => refreshList());
  };

  const getByLocation = (loc) => {
    props.client.getByLocation(loc).then((response) => cEvents(response.data));
  };

  const getByName = (nam) => {
    props.client.getByName(nam).then((response) => cEvents(response.data));
  };

  const updateEvent = (ad) => {
    cCurrent(ad);
  };

  useEffect(() => {
    refreshList();
  }, []);

  const buildrows = () => {
    return events.map((current) => {
      return (
        <>
          <tr key={current._id}>
            <td>{current.name}</td>
            <td>{current.location}</td>
            <td>{current.information}</td>
            <td>{current.date}</td>
            <td>
              <button
                className="remove"
                onClick={() => removeEvent(current._id)}
              >
                remove
              </button>
              <button className="update" onClick={() => updateEvent(current)}>
                update
              </button>
            </td>
          </tr>
        </>
      );
    });
  };

  return (
    <div className="dashboard">
      <div>
        <Navbar bg="white" variant="light" className="navbar">
          <Container>
            <Navbar.Brand href="#home" className="navtitle">
              <img
                alt=""
                src="https://learning.thedeveloperacademy.com/pluginfile.php/1/theme_moove/logo/1624462331/TheDevAcademy%20Logo%20NB.png"
                width="60"
                height="60"
              />{" "}
              Events APP
            </Navbar.Brand>
            <Button variant="secondary" onClick={() => props.logOut()}>
              Logout
            </Button>
          </Container>
        </Navbar>
      </div>
      <br />
      <SearchBar
        refreshList={() => {
          refreshList();
          cCurrent(undefined);
        }}
        cName={cName}
        cLocation={cLocation}
        getByLocation={(loc) => getByLocation(loc)}
        getByName={(nam) => getByName(nam)}
      />

      <Table className="table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Location</th>
            <th>Information</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{buildrows()}</tbody>
      </Table>
      <br />
      <Add
        client={props.client}
        refreshList={() => {
          refreshList();
          cCurrent(undefined);
        }}
        currentEvent={current}
        cCurrentEvent={cCurrent}
        currentLocation={location}
        currentName={name}
        getByLocation={(loc) => getByLocation(loc)}
        getByName={(nam) => getByName(nam)}
      />
    </div>
  );
}

export default Dashboard;
