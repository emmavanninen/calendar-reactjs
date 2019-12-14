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
    newEventDesc: ""
  };

  getEvents = () => {
    // console.log(this.props.day, this.props.events);

    //TODO: WHY ISNT LOOP OR MAP WORKING?!?!?!?

    for (let i of this.props.events) {
      // console.log(i);
      return <p onClick={this.handleEventToggle}>{i.event.title}</p>;
    }

    this.props.events.map(event => {
      //   console.log(`!!!!`, event.event.title)
      return event.event.title;
    });
  };

  currentDate = () => {};

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

  editEvent = () => {};

  //! TOGGLES
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

  handleEditToggle = () => {
    this.setState(prevState => {
      console.log(this.state.editToggle);

      return {
        editToggle: !prevState.editToggle
        //   newEditTodo: this.state.currentTodo
      };
    });
  };

  getDate = () => {
    const date = `${this.props.year}-${this.props.month}-${this.props.day}`;

    return date;
  };

  render() {
    const {
      //
    } = this.props;

    return (
      <div className="day">
        {this.getEvents()}
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
                onClick={this.handleEventToggle}
              />
              {this.state.editToggle ? (
                <img
                  className="icon"
                  src="/back.png"
                  onClick={this.handleEditToggle}
                />
              ) : (
                <img
                  className="icon"
                  src="/edit.png"
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
                {console.log(`!!!`, this.state)}
                <input
                  name="newEvent"
                  defaultValue={this.props.events[0].event.title}
                  onChange={this.handleChange}
                />
                <input
                  name="newEventDesc"
                  defaultValue={this.props.events[0].event.description}
                  onChange={this.handleChange}
                />

                <button className="buttonClass addbtn">Submit</button>
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
                {/* TODO: change index */}
                <div name="event">
                  Event: {this.props.events[0].event.title}
                </div>
                <div name="eventdescription">
                  Description: {this.props.events[0].event.description}
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
