import React, { Component } from "react";
import "../style/calendar.css";
import Day from "./Day";
import { apiGetMonthEvents, apiCreateNewEvent } from "../api/api";

// import PropTypes from "prop-types";

class Calendar extends Component {
  state = {
    //TODO: Update month
    month: new Date().getMonth() + 1,
    year: new Date().getYear() + 1900,
    currentMonth: []
  };


  createNewEvent = (title, desc, date) => {
    apiCreateNewEvent(title, desc, date)
      .then(result => {
        return result;
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
    apiGetMonthEvents(this.state.month, this.state.year)
      .then(result => {
        // console.log(`all`, result);
        let items = [];

        for (let i = 0; i < month; i++) {
          items.push(
            <Day
              key={i}
              day={i + 1}
              month={this.state.month}
              year={this.state.year}
              createNewEvent={this.createNewEvent}
            />
          );

          result.filter(event => {
            if (Number(event.dateID) === i) {
              items.pop();
              items.push(
                <Day
                  key={i}
                  day={i + 1}
                  month={this.state.month}
                  year={this.state.year}
                  createNewEvent={this.createNewEvent}
                  event={event}
                />
              );
            }
          });
        }

           this.setState({
               currentMonth: items
           })
        console.log(this.state.currentMonth);

        // return items;
      })
      .catch(error => console.log("error: ", error));
  };

  render() {
    return (
      <>
        <a href="/" className="navbar-brand">
          Calendar
        </a>
        <div className="page">
          <div className="dates">
              {this.state.currentMonth}
          </div>
        </div>
      </>
    );
  }
}

// //! Stateless component
// const Nav = props => {
//     return (
//         <nav className='navbar navbar-dark bg-dark'>
//             <a className='navbar-brand'>Poop</a>
//             <form className='navbar-brand'>
//                 <input type='text' placeholder="email" className='form-control mr-sm-2'></input>
//                 <input type='text' placeholder="password"  className='form-control mr-sm-2'></input>
//                 <button className='btn btn-outline-success my-2 my-sn-0'>Sign Up | Sign In</button>
//             </form>
//         </nav>
//     );
// };

export default Calendar;

//TODO: propTypes; protect components, send an error
// calendar.propTypes = {
//     calendar: PropTypes.arrayOf(
//         PropTypes.shape({
//             something: PropTypes.string,
//         })
//     )
// }
