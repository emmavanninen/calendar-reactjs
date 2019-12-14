import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";

// import { CSSTransitionGroup } from "react-transition-group";

export default class Day extends Component {
  state = {
    popupToggle: false,
    eventToggle: false,
    editToggle: false,
    eventArr: [],
    day: this.props.day,
    date: Date,
    newEvent: "",
    newEventDesc: "",
    eventIndex: "",
    editedEventTitle: this.props.events[this.eventIndex],
    editedEventDesc: this.props.events[this.eventIndex],
    currentEvent: this.props.events[this.eventIndex]
  };

  getEvents = () => {
    return this.props.events.map((event, i) => {
      return (
        <p
          key={i}
          onClick={() => {
            this.handleEventToggle(i);
          }}
        >
          {event.event.title}
        </p>
      );
    });
  };

  createEvent = e => {
    e.preventDefault();

    this.props.createNewEvent(
      this.state.newEvent,
      this.state.newEventDesc,
      this.state.date
    );

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

  handleEditEvent = e => {
    //   console.log(e.target.value);

    if (e.target.name === "newEvent") {
      this.setState({
        editedEventTitle: e.target.value
      });
    } else if (e.target.name === "newEventDesc") {
      this.setState({
        editedEventDesc: e.target.value
      });
    }

    console.log(this.state.editedEventTitle);
    console.log(this.state.editedEventDesc);
  };

  //! TOGGLES
  handlePopupToggle = () => {
    this.setState(prevState => {
      return {
        popupToggle: !prevState.popupToggle
      };
    });
  };

  handleEventToggle = i => {
    this.setState(prevState => {
      return {
        eventToggle: !prevState.eventToggle,
        eventIndex: i
      };
    });
  };

  handleEditToggle = () => {
    this.setState(prevState => {
      return {
        editToggle: !prevState.editToggle,
        editEvent: this.state.currentEvent
      };
    });
  };

  getDate = () => {
    const date = `${this.props.year}-${this.props.month}-${this.props.day}`;

    return date;
  };

  render() {
    const { editEvent } = this.props;
    return (
      <div className="day">
        <div className="events-of-day">{this.getEvents()}</div>
        <div className="date-title">
          <div>{this.state.day}</div>
          <img
            className="addEventBtn icon"
            src="/add.png"
            alt="add new event icon"
            onClick={this.handlePopupToggle}
          />
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
          //   <CSSTransitionGroup transitionName='easepopup' transitionEnterTimeout={500}>
          // ! ADD EVENT POPUP
          <form className="addEventPopup" onSubmit={this.createEvent}>
            <img
              className="icon"
              src="/close.png"
              alt="close icon"
              onClick={this.handlePopupToggle}
            />
            <div name="eventDate" value={this.getDate()}>
              {this.getDate()}
            </div>
            <Form.Group controlId="exampleForm.ControlSelect1 selecttime">
              <Form.Label>Time: </Form.Label>
              <Form.Control as="select" className="select">
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </Form.Control>
              <Form.Control as="select">
                <option value="00">00</option>
                <option value="30">30</option>
              </Form.Control>
              <Form.Control as="select">
                <option value="pm">AM</option>
                <option value="am">PM</option>
              </Form.Control>
            </Form.Group>
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
            <button className="buttonClass addbtn">Add Event</button>
          </form>
        ) : (
          //   </CSSTransitionGroup>
          ""
        )}
        {this.state.eventToggle ? (
          // ! EVENT POPUP
          <form className="eventPopup">
            <div className="event-icons">
              <img
                className="icon"
                src="/close.png"
                alt="close icon"
                onClick={this.handleEventToggle}
              />
              {this.state.editToggle ? (
                <img
                  className="icon"
                  src="/back.png"
                  alt="back icon"
                  onClick={this.handleEditToggle}
                />
              ) : (
                <img
                  className="icon"
                  src="/edit.png"
                  alt="edit icon"
                  onClick={this.handleEditToggle}
                />
              )}
            </div>
            {/* //TODO: && user */}
            {this.state.editToggle ? (
              <form action="" className="editform">
                <Form.Group controlId="exampleForm.ControlSelect1 selecttime">
                  <Form.Label>Time: </Form.Label>
                  <Form.Control as="select" className="select">
                    <option value="00">00</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </Form.Control>
                  <Form.Control as="select">
                    <option value="00">00</option>
                    <option value="30">30</option>
                  </Form.Control>
                  <Form.Control as="select">
                    <option value="pm">AM</option>
                    <option value="am">PM</option>
                  </Form.Control>
                </Form.Group>
                <input
                  name="newEvent"
                  defaultValue={
                    this.props.events[this.state.eventIndex].event.title
                  }
                  onChange={this.handleEditEvent}
                />
                <input
                  name="newEventDesc"
                  defaultValue={
                    this.props.events[this.state.eventIndex].event.description
                  }
                  onChange={this.handleEditEvent}
                />
                <button
                  className="buttonClass addbtn"
                  onClick={e => {
                    e.preventDefault();

                    editEvent(
                      this.props.events[this.state.eventIndex]._id,
                      this.state.editedEventTitle,
                      this.state.editedEventDesc
                    );
                    this.handleEditToggle();
                  }}
                >
                  Submit
                </button>
              </form>
            ) : (
              <div className="eventInfo">
                <div name="eventdate">
                  {this.props.fullDate.toLocaleDateString("en-US", {
                    timezone: "America/New_York"
                  })}
                </div>
                <div name="eventdate">
                  {this.props.fullDate.toLocaleTimeString("en-US")}
                </div>
                <div name="event">
                  Event: {this.props.events[this.state.eventIndex].event.title}
                </div>
                <div name="eventdescription">
                  Description:{" "}
                  {this.props.events[this.state.eventIndex].event.description}
                </div>
              </div>
            )}
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
