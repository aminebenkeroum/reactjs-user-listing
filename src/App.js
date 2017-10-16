import React, { Component } from 'react';
import './App.css';
import jsonData from './userdata.json'

class User extends Component{

  constructor(props){
    super(props)
    this.props = props
  }
  
  render(){
    return (
      <a href="#" className="user-infos" onClick={this.props.editUser}>
        <img src={this.props.userPicture} />
        <h1>{this.props.fullname}</h1>
      </a>
    )
  }

}

class App extends Component {

  constructor(props){
    super(props)
    this.props=props
    this.state = {
      users: [],
      currentUser: {first_name: '', last_name: '', id: ''},
      showEdit: false,
    }
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
  }

  componentDidMount(){
    // Component Ready
    this.setState({
      users: jsonData
    })
  }

  handleEditing(event){
    event.preventDefault();

    // Looking for the user by ID since it's unique
    let user = null
    user = this.state.users.find( (user) => {
      return user.id === this.state.currentUser.id
    } )

    // If the user is not there
    if(!user)
      return alert('Cannot find User')

    // Everything is right, let's save the User and return a new state (Immutable)
    this.setState({
      users: this.state.users.map( (user) => {
        if(user.id === this.state.currentUser.id){
          // We got the right one
          user.first_name = this.state.currentUser.first_name,
          user.last_name = this.state.currentUser.last_name
        }
        return user
      }),
      showEdit: false
    })

  }

  handleFirstNameChange(event){
    this.setState({
      currentUser : {...this.state.currentUser, first_name: event.target.value }
    })
  }

  handleLastNameChange(event){
    this.setState({
      currentUser : {...this.state.currentUser, last_name: event.target.value }
    })
  }

  editUser(user) {
    this.setState({
      currentUser: user,
      showEdit: true
    })
  }

  render() {
    return (
      <section>
        <h1>Regily Code Challenge</h1>
        <div className='user-list'>
          {
            this.state.users.map( (user, index) => {
              return (
                <User editUser={this.editUser.bind(this, user)}  key={index} id={user.id} fullname={user.first_name + " " + user.last_name} userPicture={user.picture} />
              )
            }) 
          }
        </div>
        { this.state.showEdit ? 
            <form className="edit-user" onSubmit={this.handleEditing.bind(this)}>
              <input type="text" value={this.state.currentUser.id} hidden />
              <label htmlFor="">First Name : </label>
              <input type="text" value={this.state.currentUser.first_name } onChange={ this.handleFirstNameChange }/>
              <label htmlFor="">Last Name : </label>
              <input value={this.state.currentUser.last_name } onChange={this.handleLastNameChange} />
              <input type="text" type="submit" value="Save" />
              <button onClick={ () => this.setState({showEdit: false})}>Cancel</button>
            </form>
            : null
        }
      </section>
    );
  }
}

export default App;
