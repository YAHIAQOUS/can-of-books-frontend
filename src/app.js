import React from 'react';
import Header from './header';
// import IsLoadingAndError from './IsLoadingAndError';
import Footer from './footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';

import MyFavoriteBooks from './myFavoriteBooks'
import Profile from './components/Profile'


class App extends React.Component {

  render() {
    console.log('app', this.props)
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />

          <Switch>
            <Route exact path="/">

              {(this.props.auth0.isAuthenticated) ? <MyFavoriteBooks /> : <></>}

            </Route>
            <Route exact path="/profile">

              <Profile />

            </Route>
          </Switch>
          <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
