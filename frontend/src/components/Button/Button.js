import React from 'react';

function Button (props) {

return (
    <div className="container">
        <button className="container__button" type="button" onClick={props.functionName}> {props.text} </button>
    </div>
);
}

export default Button;