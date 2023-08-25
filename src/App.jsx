import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';


const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
  </div>
);

class SearchBar extends React.Component{
  state = {userName:""};
  handleSubmission = async (event) =>{
    event.preventDefault();
    //console.log(this.state.userName);
    const response = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmitting(response.data);
    this.setState({userName:''});//not working, dont know why
    document.getElementById("inputProfile").reset();
  };
  render(){
    return(
      <div className='searchbar-div'>
        <form id = "inputProfile"  onSubmit={this.handleSubmission}>
          <input type = "text" placeholder='Enter Github Username' onChange={ event => this.setState({userName: event.target.value}) }/>
          <button> Add Card </button>
        </form>
      </div>
      
    );
  }
}

class Card extends React.Component{
  render() {
    const profile = this.props;
    return (
       <div>
          <img className="logo" src={profile.avatar_url}/>
        <div className="info">
          <div>{profile.name}</div>
          <div>{profile.company}</div>
        </div>
       </div>
    );
  }
}

class App extends React.Component {
   state = {
      profiles:[],
    };

  addNewProfile = (profileData) => {
    //console.log('App', profileData);
    this.setState(previousState => (
      {
        profiles :[...previousState.profiles,profileData]
      }
    )
    );
  };

    render(){
      return (
      <div className="github-main-div">
        <h2>Github Profiles Application</h2>
        <SearchBar onSubmitting={this.addNewProfile}/>
        <CardList profiles={this.state.profiles} />
      </div>
      );
    }
} 

export default App;
