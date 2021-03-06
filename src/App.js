import React,{Component, Fragment} from 'react';
import { render } from 'react-dom';
import './App.css';
import {BrowserRouter as Router,Switch,Route}from 'react-router-dom';
import Navbar from './components/layout/navbar'
import UserItem from './components/users/UserItem'
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search'
import Alert  from './components/layout/Alert';
import About  from './components/pages/About';
//import User from './components/users/User';
class App extends Component {
  state={
    users:[],
    //user:{},
    loading:false,
    alert:null,
  }
  async componentDidMount(){
    this.setState({loading:true});
     const res=await axios.get('https://api.github.com/users');
     this.setState({users:res.data,loading:false});
     
  }
  //search github users
  searchUsers=async(text)=>{
    this.setState({loading:true});
    const res=await axios.get(`https://api.github.com/search/users?q=${text}`);
    this.setState({users:res.data.items,loading:false});
  }
  //to get single user
  // getUser= async(username)=>{
  //   this.setState({loading:true});
  //   const res=await axios.get(`https://api.github.com/search/users/${username}`);
  //   this.setState({user:res.data,loading:false});
  // }

  //clear users from state
  clearUsers=()=>{
    this.setState({users:[],loading:false});
  }
  setAlert=(msg,type)=>{
     this.setState({alert:{msg:msg,type:type}} );
      setTimeout(()=>this.setState({alert:null}),5000);
  }
  render() {
  return (
    <Router>
    <div className="App">
      <Navbar title ='Github Finder' icon ='fab fa-github'/>
      
      <div className='container'>
      <Switch>
          <Route exact path='/' render ={props=>(
            <Fragment>
              <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length>0?true :false} setAlert={this.setAlert}></Search>
        <Users loading={this.state.loading} users={this.state.users}/>

            </Fragment>

          )}/>
          <Route exact path='/about' component={About}></Route>
          
              </Switch>
      
        </div>
       
    </div>
    </Router>
  );
}
}

export default App;
