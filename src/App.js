import React from 'react';
import Column from './Column.js';
import InitialData from './InitialData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: ['Winnie', 'Bob', 'Thomas', 'George'],
      cards: []
    }

    this.removeCard = this.removeCard.bind(this);
    this.addCard = this.addCard.bind(this);
    this.moveCard = this.moveCard.bind(this);
  }

  componentDidMount(){
    this.getLocalData()
  }

  getLocalData() {
    var localData = JSON.parse(localStorage.getItem('toDoListDM'));
    if (localData) {
      this.setState({cards: localData})
    } else {
      this.setState({cards: InitialData})
    }
  }

  removeCard(id) {
    var tempCards = this.state.cards;
    var arrayIndex;
    for (var i = 0; i < tempCards.length; i ++) {
      if (tempCards[i].id === id) {
        arrayIndex = i;
        break;
      }
    }
    tempCards.splice(arrayIndex, 1);
    this.setState({cards: tempCards}, localStorage.setItem('toDoListDM', JSON.stringify(tempCards)));
  }

  addCard(text, name) {
    var tempCards = this.state.cards;
    var newId = 0;
    for (var i = 0; i < tempCards.length; i++) {
      if (tempCards[i].id >= newId) {
        newId = tempCards[i].id + 1;
      }
    }
    tempCards.push({
      id: newId,
      name: name,
      text: text
    });
    this.setState({cards: tempCards},localStorage.setItem('toDoListDM', JSON.stringify(tempCards)));
  }

  moveCard(id, direction) {
    var tempCards = this.state.cards;
    var arrayIndex;
    for (var i = 0; i < tempCards.length; i ++) {
      if (tempCards[i].id === id) {
        arrayIndex = i;
        break;
      }
    }
    var oldAuthor = tempCards[arrayIndex].name;
    var oldAuthorIndex = this.state.columns.indexOf(oldAuthor);
    var newAuthorIndex = oldAuthorIndex + direction;
    if (newAuthorIndex < 0 || newAuthorIndex >= this.state.columns.length) {
      return;
    }
    var newAuthor = this.state.columns[newAuthorIndex];
    tempCards[arrayIndex].name = newAuthor;
    this.setState({cards: tempCards}, localStorage.setItem('toDoListDM', JSON.stringify(tempCards)))
  }

  render() {

    return(
      <div className="board">
        {this.state.columns.map((x) =>
    <Column key={x}
      className="column"
      name={x}
      cards={this.state.cards.filter(a => a.name === x)}
      delCard={this.removeCard}
      moveCard={this.moveCard}
      addCards={this.addCard}/>)}
      </div>

    )
  }
}

export default App;