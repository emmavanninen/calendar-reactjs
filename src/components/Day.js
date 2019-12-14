import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
// import { CSSTransitionGroup } from "react-transition-group";

export default class Day extends Component {
  state = {
    popupToggle: false,
    eventToggle: false,
    eventArr: [],
    day: this.props.day,
    date: Date,
    newEvent: "",
    newEventDesc: "",
    dummypoop: []
  };

  newEventPopup = () => {
    console.log("poop");
  };

  getEvents = () => {
    // console.log(this.props.day, this.props.events);

    //TODO WHY ISNT LOOP OR MAP WORKING?!?!?!?

    for (let i of this.props.events) {
      //   console.log(i);
      return <p>{i.event.title}</p>;
    }
    //     this.props.events.map(event => {
    //       console.log(event.event.title);
    //       console.log();
    //     });
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

    // const event = this.state.eventArr;
    // event.push(
    //   <div className="event" onClick={this.handleEventToggle}>
    //     {this.props.events[0].event.title}
    //   </div>
    // );
    // this.setState({
    //   eventArr: event
    //   //   newEvent: this.state.newEvent,
    //   //   newEventDesc: this.state.eventDesc
    // });

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
        {this.getEvents()}
        <div className="date-title">
          <div>{this.state.day}</div>
          {/* <div className="addEventBtn" onClick={this.handlePopupToggle}> */}
          <img
            className="addEventBtn icon"
            src="/add.png"
            alt="add new event icon"
            onClick={this.handlePopupToggle}
          />
          {/* </div> */}
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
          <form className="addEventPopup" onSubmit={this.createEvent}>
            <img
              className="icon"
              src="/close.png"
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
          <form className="eventPopup">
            <img
              className="icon"
              src="/close.png"
              onClick={this.handleEventToggle}
            />
            <div className="eventInfo">
              <div name="eventdate">
                {this.props.fullDate.toLocaleDateString("en-US", {
                  timezone: "America/New_York"
                })}
              </div>
              <div name="eventdate">
                {this.props.fullDate.toLocaleTimeString("en-US")}
              </div>
              <div name="event">Event: {this.props.events.event.title}</div>
              <div name="eventdescription">
                Description: {this.props.events.event.description}
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
