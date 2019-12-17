import React from "react";
import PropTypes from "prop-types";


//! call props
const User = (props) => {
    return (
//! no this in stateless component
        <p className='loggedin-user'>{props.loggedInUser}
        </p>
    );
};

export default User;

User.propTypes = {
    user: PropTypes.arrayOf(
        PropTypes.shape({
            loggedInUser: PropTypes.string,
        })
    )
}