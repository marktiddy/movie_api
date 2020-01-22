import React from "react";
import ReactDOM from "react-dom";

//Import statement to say you need to bundle the SCSS code
import "./index.scss";

//Main component which will use all the others
class MyFlixApplication extends React.Component {
  render() {
    return (
      <div className="my-flix">
        <div>Good morning</div>
      </div>
    );
  }
}

//finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

//Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
