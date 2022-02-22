import React, { useState, useEffect } from "react";
import Add from "./Add";
import "./Dashboard.css";
import SearchBar from  "./searchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

//import searchBar from "./searchBar.js"

function Dashboard(props) {
  const [events, cEvents] = useState([]);
  const [current, cCurrent] = useState(undefined);
  const [location, cLocation] = useState(undefined);
  const [name, cName] = useState(undefined);
  const [sort, cSort] = useState('unsorted');

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


  /* const searchBar=()=>{
   props.client.searchLocation(location).then(()=>)
 } */
  //how it works?
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
       {" "}
       remove
     </button>
     <button className="update" onClick={() => updateEvent(current)}>
       {" "}
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
        <Navbar bg="light" variant="warning">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="https://learning.thedeveloperacademy.com/pluginfile.php/1/theme_moove/logo/1624462331/TheDevAcademy%20Logo%20NB.png"
                width="50"
                height="50"
                className="d-inline-block align-top"
              />{" "}
              Events APP
              <nav className="navbar">
                <Button
                  className="justify-content-end"
                  onClick={() => props.logOut()}
                >
                  Logout
                </Button>
              </nav>

              <SearchBar 
              refreshList={() => {
                refreshList();
                cCurrent(undefined);
              }}
              cName = {cName}
              cLocation = {cLocation}
              getByLocation = {(loc) => getByLocation(loc)}
              getByName = {(nam) => getByName(nam)}
            />
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
      <br />
      <searchBar placeholder="search by location" />
      {/* <button onClick={()=>props.logOut()}>Logout</button> */}
      {/* <form >
        <label>Search Location</label>
        <input type="text" name="location" value={location}/>
        <button onClick={()=>searchBar(location)}></button>
      </form> */}
      <Table>
        <thead>
          <tr >
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
      <br />
      <Add
        client={props.client}
        refreshList={() => {
          refreshList();
          cCurrent(undefined);
        }}
        currentEvent={current}
      />
    </div>
  );
}

export default Dashboard;
