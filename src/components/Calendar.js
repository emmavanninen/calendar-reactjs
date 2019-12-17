import React, { Component } from "react";
import "../style/calendar.css";
import Day from "./Day";
import {
  apiGetMonthEvents,
  apiCreateNewEvent,
  apiEditEvent,
  apiDeleteEvent,
  apiAuth
} from "../api/api";


class Calendar extends Component {
  state = {
    //TODO: Update month
    month: new Date().getMonth() + 1,
    year: new Date().getYear() + 1900,
    user: ""
  };

  createNewEvent = (title, desc, year, month, day, time) => {
    apiAuth()
      .then(decoded => {
        let user = decoded.email;
        //TODO fix to userID later
        this.setState({
          user: decoded.name
        });

        apiCreateNewEvent(title, desc, year, month, day, time, user)
          .then(result => {
            this.createCurrentMonth(this.daysInCurrentMonth());
            return result;
          })
          .catch(error => console.log("error: ", error));
      })
      .catch(error => console.log("error: ", error));
  };

  deleteEvent = id => {
    apiDeleteEvent(id)
      .then(() => {
        this.createCurrentMonth(this.daysInCurrentMonth());
      })
      .catch(error => console.log("error: ", error));
  };

  editEvent = (id, title, desc) => {
    apiEditEvent(id, title, desc)
      .then(() => {
        this.createCurrentMonth(this.daysInCurrentMonth());
      })
      .catch(error => console.log("error: ", error));
  };

  daysInCurrentMonth = () => {
    let month = new Date().getMonth() + 1;
    let year = new Date().getYear() + 1900;
    return new Date(year, month, 0).getDate();
  };

  componentDidMount() {
    this.createCurrentMonth(this.daysInCurrentMonth());
  }

  createCurrentMonth = month => {
    apiAuth().then(decoded => {
      if (!decoded) {
          console.log('no user');
      } else {
        //TODO fix to userID later
        this.setState({
          user: decoded.name
        });
      }

      apiGetMonthEvents(this.state.month, this.state.year)
        .then(result => {
          let items = [];
          for (let i = 0; i < month; i++) {
            items.push(
              <Day
                key={i}
                day={i + 1}
                month={this.state.month}
                year={this.state.year}
                events={[]}
                fullDate={
                  new Date(this.state.year, this.state.month - 1, i + 1)
                }
                currentUser={this.state.user}
                createNewEvent={this.createNewEvent}
                editEvent={this.editEvent}
                deleteEvent={this.deleteEvent}
              />
            );

            result.filter(event => {
              if (Number(event.dateID) - 1 === i) {
                items[i].props.events.push(event);
                // TODO: sort by time
              }
              return result;
            });
          }

          this.setState({
            currentMonth: items
          });
        })
        .catch(error => console.log("error: ", error));
    });
  };

  render() {

    return (
      <>
        <div className="page">
          <div className="themonth">
            <h1 className="month-title">
              <img className="icon" src="./left.png" alt="icon"></img>
              December 2019
              <img className="icon" src="./right.png" alt="icon"></img>
            </h1>
          </div>
          <div className="dates">{this.state.currentMonth}</div>
        </div>
      </>
    );
  }
}


export default Calendar;


