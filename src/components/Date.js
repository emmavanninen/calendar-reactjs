import React from "react";
import PropTypes from "prop-types";


//! call props
const Date = (props) => {
    return (
        //! no this in stateless component
        <div>{props.num}</div>
    );
};

export default Date;


Date.propTypes = {
    Date: PropTypes.arrayOf(
        PropTypes.shape({
            num: PropTypes.number,
        })
    )
}