import React from "react";
import "./style.css";
// import nelio from './nelio.jpg';


function UserPicture(props) {
    return (
      <div >
        <img id="userPicture" className="img-responsive" src={props.sessionImage} alt="You need to upload a profile picture" />
      </div>
    );
  }
  
  export default UserPicture;


  


