import React, { useState } from "react";
import "./add.css"

function Add(props) {
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    let result;
    if (props.currentEvent) {
      result = props.client.updateEve(
        props.currentEvent._id,
        e.target.adName.value,
        e.target.location.value,
        e.target.information.value,
        e.target.date.value
      );
    } else {
      result = props.client.addEve(
        e.target.adName.value,
        e.target.location.value,
        e.target.information.value,
        e.target.date.value
      );
    }
    result
      .then(() => {
        cDisabled(false);
        document.getElementById("addForm").reset();
        props.refreshList();
      })
      .catch(() => {
        alert("an error occured, please try again");
        cDisabled(false);
      });
  };

   // cancel event update
 const cancelUpdate = () => {
  props.cCurrentEvent(undefined)
  document.getElementById('addForm').reset()
 }

 // show cancel button
 const showCancelButton = () => {
   return (
      <button className = 'button-28' type = 'button' onClick={() => cancelUpdate()}>
        {' '}
        Cancel Update{' '}
      </button>)
 }

  return (
    <div className="newtitle">

      {props.currentEvent ? "Update" : "Add"}
      <br />

      <form onSubmit={(e) => submitHandler(e)} id="addForm" className="addtitles">

        <input
          type="text"
          defaultValue={props.currentEvent?.name}
          name="adName"
          disabled={disabled}
          id="addinput"
          placeholder="name"
        />

        <input
          type="text"
          defaultValue={props.currentEvent?.location}
          name="location"
          disabled={disabled}
          id="addinput"
          placeholder="location"
        />

        <input
          type="text"
          defaultValue={props.currentEvent?.information}
          name="information"
          disabled={disabled}
          id="addinput"
          placeholder="information"
        />

        <input
          type="date"
          defaultValue={props.currentEvent?.date}
          name="date"
          disabled={disabled}
          id="addinput"
          placeholder="date"
        />
        <br />
        <br />
        <button className ="add" type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </button>
      </form>
      {props.currentEvent ? showCancelButton() : null}
    </div>
  );
}

export default Add;
