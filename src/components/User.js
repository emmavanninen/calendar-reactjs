import React from "react";


//! call props
const User = (props) => {
    return (
//! no this in stateless component
        <h1 className='loggedin-user'>{props.loggedUser}
        </h1>
    );
};

export default User;