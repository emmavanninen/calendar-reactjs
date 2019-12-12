import React, { Component } from "react";

export default class Day extends Component {
  state = {
    popupToggle: false,
    eventToggle: false,
    eventArr: [],
    day: this.props.day,
    date: Date,
    newEvent: "",
    newEventDesc: ""
  };

  newEventPopup = () => {
    console.log("poop");
  };

  getEvents = () => {
    if (this.props.event === undefined) {
      return;
    } else {
      return this.props.event.event.title;
    }
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
    e.preventDefault();

    this.props.createNewEvent(
      this.state.newEvent,
      this.state.newEventDesc,
      this.state.date
    );

    const event = this.state.eventArr;
    event.push(
      <div className="event" onClick={this.handleEventToggle}>
        {this.props.event.event.title}
      </div>
    );
    this.setState({
      eventArr: event
      //   newEvent: this.state.newEvent,
      //   newEventDesc: this.state.eventDesc
    });

    this.handlePopupToggle();
  };

  handleChange = e => {
    if (e.target.name === "newEvent") {
      this.setState({
        newEvent: e.target.value,
        date: this.getDate()
      });
    } else if (e.target.name === "newEventDesc") {
      this.setState({
        newEventDesc: e.target.value,
        date: this.getDate()
      });
    }
  };

  getDate = () => {
    const date = `${this.props.year}-${this.props.month}-${this.props.day}`;

    return date;
  };

  //! name this.props under variables
  render() {
    const {
      //
    } = this.props;

    return (
      <div className="day">
        <p onClick={this.handleEventToggle}> {this.getEvents()}</p>
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
            <div name="eventDate" value={this.getDate()}>
              {this.getDate()}
            </div>
            <input
              name="newEvent"
              placeholder="New event"
              value={this.state.newEvent}
              onChange={this.handleChange}
            />
            <input
              name="newEventDesc"
              placeholder="Descripition"
              value={this.state.newEventDesc}
              onChange={this.handleChange}
            />

            <button className="buttonClass">Add Event</button>
          </form>
        ) : (
          ""
        )}
        {this.state.eventToggle ? (
          <form className="eventPopup">
            <button
              id="close-popup"
              type="button"
              onClick={this.handleEventToggle}
            >
              X
            </button>
            <div className="eventInfo">
              <div name="eventdate">{this.props.fullDate.toLocaleDateString('en-US', {timezone: "America/New_York"})}</div>
                        <div name="eventdate">{this.props.fullDate.toLocaleTimeString('en-US')}</div>
              <div name="event">Event: {this.props.event.event.title}</div>
              <div name="eventdescription">
                Description: {this.props.event.event.description}
              </div>
            </div>
            <br />
            <div className="eventMadeBy">Event made: 1.2.1992 By User</div>
          </form>
        ) : (
          ""
        )}
      </div>
    );
  }
}
