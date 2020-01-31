import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux"; //
import { Provider } from "react-redux";

//Import our reducers
import moviesApp from "./reducers/reducers";

//import our mainView class
import MainView from "./components/main-view/main-view";

//Import statement to say you need to bundle the SCSS code
import "./index.scss";

//Create a store
const store = createStore(moviesApp);

//Main component which will use all the others
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

//finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

//Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
