import React, { Component } from "react";
import "../style/calendar.css";
import Day from "./Day";
import { apiGetMonthEvents, apiCreateNewEvent } from "../api/api";

// import PropTypes from "prop-types";

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //TODO: Update month
      month: new Date().getMonth() + 1,
      year: new Date().getYear() + 1900,
      currentMonth: []
    };
  }

  getAllEvents = () => {
    apiGetMonthEvents(this.state.month)
      .then(result => console.log(`what did calendar get?`, result))
      .catch(error => console.log("error: ", error));
  };

  createNewEvent = (title, desc, date) => {
      apiCreateNewEvent(title, desc, date)
      .then(result => console.log(`new event?`, result))
      .catch(error => console.log("error: ", error));
  };

  daysInCurrentMonth = (month, year) => {
    month = new Date().getMonth() + 1;
    year = new Date().getYear() + 1900;
    return new Date(year, month, 0).getDate();
  };

  createCurrentMonth = (month, item) => {
      console.log(`this.props`, this.props);
      
    for (let i = 0; i < month; i++) {
    
      item = this.state.currentMonth;
      item.push(
        <Day
          key={i}
          day={i + 1}
          month={this.state.month}
          year={this.state.year}
          createNewEvent={this.createNewEvent}
        />
      );
    }
    return item;
  };

  render() {
    return (
      <>
        <a href="/" className="navbar-brand">
          Calendar
        </a>
        {this.getAllEvents()}
        <div className="page">
          <div className="dates">
            {this.createCurrentMonth(this.daysInCurrentMonth())}
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
