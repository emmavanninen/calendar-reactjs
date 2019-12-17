import React from "react";


//! call props
const User = (props) => {
    return (
//! no this in stateless component
        <p className='loggedin-user'>{props.loggedInUser()}
        </p>
    );
};

export default User;