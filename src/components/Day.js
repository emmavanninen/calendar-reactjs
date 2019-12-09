import React, { Component } from "react";

export default class Day extends Component {
  state = {
    popupToggle: false,
    eventArr: [],
    currentDate: ''
  };

  newEventPopup = () => {
    console.log("poop");
  };

  currentDate = () =>{

  }

  handlePopupToggle = () => {
    this.setState(prevState => {
      return {
        popupToggle: !prevState.popupToggle
      };
    });
  };

  createEvent = e => {
    e.preventDefault();
    const event = this.state.eventArr;
    event.push(<div className="event">Poop</div>);
    this.setState({ eventArr: event });
    this.handlePopupToggle()
  };

  //! name this.props under variables
  render() {
    const {
      //
    } = this.props;

    return (
      <div className="day">
        <div className="date-title">
          <div>Day X</div>
          <button onClick={this.handlePopupToggle}>+</button>
        </div>
        <div className="events">
          <div>
            {this.state.eventArr.map((event, i) => {
              return (
                <div className="newEvent" key={i}>
                  {event}
                </div>
              );
            })}
          </div>
        </div>
        {this.state.popupToggle ? (
          <form className="addEventPopup" onSubmit={this.createEvent}>
                    <button id='close-popup' type='button' onClick={this.handlePopupToggle}>X</button>
                    <input type='date' name="eventDate"  />
            <input name="event" placeholder="New event" />
            <input name="eventDescripition" placeholder="Descripition" />

            <button className="buttonClass">Add Event</button>
          </form>
        ) : (
          ""
        )}
      </div>
    );
  }
}
