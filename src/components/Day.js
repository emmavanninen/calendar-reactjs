import React, { Component } from "react";

export default class Day extends Component {
  state = {
    popupToggle: false,
    eventToggle: false,
    eventArr: [],
    currentDate: "",
    day: this.props.day,
    newEvent: ""
  };

  newEventPopup = () => {
    console.log("poop");
  };

  currentDate = () => {};

  handlePopupToggle = () => {
    this.setState(prevState => {
      return {
        popupToggle: !prevState.popupToggle
      };
    });
  };

  handleEventToggle = () => {
    this.setState(prevState => {
      return {
        eventToggle: !prevState.eventToggle
      };
    });
    console.log(this.props);
  };

  createEvent = e => {
    console.log(`state`, this.state.newEvent);
    e.preventDefault();

    const event = this.state.eventArr;
    event.push(
      <div className="event" onClick={this.handleEventToggle}>
        Poop
      </div>
    );
    this.setState({
      eventArr: event,
      newEvent: e.target.value
    });
    this.handlePopupToggle();
  };

  handleChange = e => {
    this.setState({
      newEvent: e.target.value
    });
  };

  //! name this.props under variables
  render() {
   const {
     //
   } = this.props;

    return (
      <div className="day">
        <div className="date-title">
          <div>{this.state.day}</div>
          <button className="addEventBtn" onClick={this.handlePopupToggle}>
            +
          </button>
        </div>
        <div className="events">
          <div>
            {this.state.eventArr.map((event, i) => {
              return (
                <div className="eventTitle" key={i}>
                  {event}
                </div>
              );
            })}
          </div>
        </div>
        {this.state.popupToggle ? (
          <form className="addEventPopup" onSubmit={this.createEvent}>
            <button
              id="close-popup"
              type="button"
              onClick={this.handlePopupToggle}
            >
              X
            </button>
            <input type="date" name="eventDate" />
            <input
              name="event"
              placeholder="New event" value={this.state.newEvent}
              onChange={this.handleChange}
            />
            <input name="eventDescripition" placeholder="Descripition" />

            <button className="buttonClass">Add Event</button>
          </form>
        ) : (
          ""
        )}
        {this.state.eventToggle ? (
          <form className="eventInfo">
            <button
              id="close-popup"
              type="button"
              onClick={this.handleEventToggle}
            >
              X
            </button>
            <div name="eventdate">1.2.1992</div>
            <div name="event">Event</div>
            <div name="eventdescription">Description:</div>
            <div>
              Event made
              <br />
              1.2.1992
              <br />
              By Emma
            </div>
          </form>
        ) : (
          ""
        )}
      </div>
    );
  }
}
