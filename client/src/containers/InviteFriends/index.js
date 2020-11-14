import React, {Component} from 'react';
import UserProfile from '../../components/UserProfile';
import NavBar from '../../components/NavBar';
import InviteFriends from "../../components/InviteFriends";
import "./style.css";

class InviteFriendsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: ""
        }
    }

    render() {
        return <div>
            <div className="col-12" id="navbarDiv">
                <NavBar/>
            </div>

            <div className="row col-12" id="mainBodyDiv">
                <div id="userProfileDiv">
                    <UserProfile componentDidMount={this.componentDidMount} sessionName={this.props.sessionName} sessionImage={this.props.sessionImage}/>
                </div>
                <InviteFriends/>
            </div>
        </div>
    }
}

export default InviteFriendsContainer;

