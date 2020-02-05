import React from "react";
import ReactDOM from "react-dom";
import rootReducer from "./reducers/reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";
import store from "./store/store";

// const newStore = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

//import our mainView class
import MainView from "./components/main-view/main-view";

//Import statement to say you need to bundle the SCSS code
import "./index.scss";
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
