import React, { Component } from "react";
import "../style/calendar.css";
import Day from "./Day";
// import PropTypes from "prop-types";

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: ""
    };
  }

  render() {
    return (
      <>
        <a href="/" className="navbar-brand">
          Calendar
        </a>
        <div className="page">
          <div className="dates">
            <Day />
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
