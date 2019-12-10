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

      this.props.createNewEvent(this.state.newEvent, this.state.newEventDesc, this.state.date)

      
    const event = this.state.eventArr;
    event.push(
      <div className="event" onClick={this.handleEventToggle}>
        Poop
      </div>
    );
    this.setState({
      eventArr: event,
    //   newEvent: this.state.newEvent,
    //   newEventDesc: this.state.eventDesc
    });

    this.handlePopupToggle();
  };

  handleChange = e => {
      if (e.target.name === 'newEvent'){
          this.setState({
              newEvent: e.target.value,
              date: this.getDate()
          });
      } else if (e.target.name === 'newEventDesc'){
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
