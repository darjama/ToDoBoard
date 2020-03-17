import React from 'react';

function Task(props) {

  var deleteCard = function() {
    props.delCard(props.id)
  }
  var moveLeft = function() {
    props.moveCard(props.id, -1)
  }
  var moveRight = function() {
    props.moveCard(props.id, 1)
  }
  return (
    <p className="task">
      <span className="leftArrow" onClick={moveLeft}>
      {"<"}
      </span>
      <span className="taskText" onClick={deleteCard}>
        {props.text}
      </span>
      <span className="rightArrow" onClick={moveRight}>
        {}
        {">"}
      </span>
    </p>

  )
}

export default Task;