import React, { Component } from 'react';
import axios from 'axios';

const Card = (props) => {
  return (
    <div style={{ margin: '1em', display: 'inline-block'}}>
      <img width="70" src={props.avatar_url} alt="profile"/>
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
          {props.name}
        </div>
        <div> {props.location} </div>
      </div>
    </div>
  )
}


const CardList = (props) => {
  return(
    <div>
      { props.cards.map( (card, i) => <Card {...card} key={i}/> )}
    </div>
  )
}

class Form extends Component{
  state = { username: 'dsadsa'}
  
  handleSubmit = (event) => {
    event.preventDefault()
    axios.get(`https://api.github.com/users/${this.state.username}`)
      .then(resp => {
        this.props.onSubmit(resp.data)
      })
  }

  handleOnchange = (event) => {
    this.setState({ username: event.target.value })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit} >
          <input type="text" placeholder="Github username" value={this.state.username} onChange ={this.handleOnchange} required />
          <button type="submit"> Add card</button>
        </form>
      </div>
    )
  }
}

class App extends Component {
  state = {
    cards: []
  }

  addNewCard = (cardInfo) => {
    this.setState(prevState => ({ cards: prevState.cards.concat(cardInfo) }))
  }

  render() {
    return (
      <div className="App">
        <Form onSubmit = {this.addNewCard} />
        <CardList cards = {this.state.cards} />
      </div>
    );
  }
}

export default App;
