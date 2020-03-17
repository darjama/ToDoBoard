import React from 'react';
import Task from './Task.js';

class Column extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    newText: ''
  }
  this.handleChange=this.handleChange.bind(this);
  this.addCard=this.addCard.bind(this);
}
  matchingTasks = this.props.cards.filter(
      x => {
        return x.name === this.props.name
      }
    )

  handleChange(e) {
    this.setState({newText: e.target.value});
  }

  addCard(e){
    e.preventDefault();
    this.props.addCards(this.state.newText, this.props.name);
    this.setState({newText: ""});
  }

  render() {
    return (
      <div className="taskList">
        <h2 className="listName">
        {this.props.name}
        </h2>
        {this.props.cards.map((x) =>
            <Task key={x.id.toString()} text={x.text} id={x.id} delCard={this.props.delCard} moveCard={this.props.moveCard}/>)}
          <form onSubmit={this.addCard} className="task addNew">
            <input type="text" name="text" value={this.state.newText} placeholder={"Add Card"} onChange={this.handleChange}/>
          </form>
      </div>
    )
  }

}

export default Column;