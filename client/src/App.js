import React, { Component } from "react";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import HomePage from './containers/HomePage';
import Login from './containers/Login';
import Registration from './containers/Registration';
import BattlePage from "./containers/BattlePage";
import MemeMaker from "./containers/MemeMaker";
// import Api from './utils/API';
import InviteFriendsContainer from "./containers/InviteFriends";
import WebCam from './components/WebCam';


class App extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      session:null
    }
  }
  componentDidMount()
  {
    
    try{
      this.setState({session:JSON.parse(localStorage.getItem("session"))})
      // console.log(this.state.session)
    }
    catch(error)
    {}
    
  }
  signIn = (session) => {
    // debugger;
    this.setState({session});
    // console.log(session.name)
    localStorage.setItem("session", JSON.stringify(session));
    console.log("signIn function");
  }

  logOut=()=>{
    this.setState({
      session: null
    })
    localStorage.empty();
    console.log("the app.js logout function is found");
  }


  render() {

    console.log( "this is the render app.js" + JSON.stringify(this.state ));

    return <Router>
         <Switch>
            

            

            {!this.state.session&&<Route path="/register" component={()=><Registration onRegister={this.signIn}/>} /> }

            {!this.state.session&&<Route path="/webcam" component={()=><WebCam onCamera={this.camera}/>} /> }


            {this.state.session&&[
            <Route path= "/battle" component={()=><BattlePage sessionName={this.state.session.name} />} />,
            <Route path= "/mememaker" component={()=><MemeMaker session={this.state.session} sessionName={this.state.session.name}/>} />,
            <Route path= "/homepage" component={()=><MemeMaker session={this.state.session} sessionName={this.state.session.name}/>} />,
            <Route path= "/invite" component={()=><InviteFriendsContainer session={this.state.session} sessionName={this.state.session.name} />} />,
            <Route path="/" component={()=><HomePage onLogin={this.signIn} session={this.state.session} sessionName={this.state.session.name}/>} />
            ]}
            {!this.state.session&&<Route component={()=><Login onLogin={this.signIn}/>} /> }
            
          
          


        </Switch>
      </Router>
  }
}

export default App;
