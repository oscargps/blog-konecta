import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LogPage from "../pages/login";
import Principal from "../pages/principal";
import Signup from "../pages/signup";
import BlogDetail from "../pages/blogDetail";
import './App.css';

function App() {
  let loggedIn = sessionStorage.getItem("resp") ? true : false;
  return (
    <div className="App">

<BrowserRouter>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Principal /> : <LogPage />}
        </Route>
        <Route exact path="/signup" component={Signup} />
        <Route path="/blog/:slug" children={<BlogDetail />} />
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
