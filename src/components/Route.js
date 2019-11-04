import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import SignIn from './SignIn';
import InputAutocomplete from './InputAutocomplete'
import { FirebaseContext } from './Firebase';
import { connect } from 'react-redux';

class RouteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.status[this.props.status.length - 1].status,
    }
  }
  static getDerivedStateFromProps(props) {
    return {
      auth: props.status[props.status.length - 1].status,
    };
  }
  render() {
    return  <Router >
      <Route exact
        path='/'
        render={() => 
          <FirebaseContext.Consumer>
            {firebase => <SignIn firebase={firebase} />}
          </FirebaseContext.Consumer>} />
          {
            this.state.auth && <Route path='/usersuccess' component={InputAutocomplete}/>   
          }
          {
            !this.state.auth && <Redirect to='/'/>   
          }
    </Router>
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.status
  }
}
export default connect(mapStateToProps)(RouteApp);