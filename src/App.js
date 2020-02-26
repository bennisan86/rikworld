import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Homepage from './components/Homepage';
import About from './components/Aboutpage';
import Profile from './components/Profilepage';
import Newitem from './components/Newitempage';
import Locationdragger from './components/Locationdraggerpage';
import { withAuthentication } from './components/Session';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsList: null,
      tempitem: {
        msg: '',
        date: '',
        lat: null,
        long: null,
        image: {
          image: null,
          url: ''
          }
      },
      maplist: true,
      currentuser: null
    };
  }

  componentDidMount() {

    this.listener = this.props.firebase.auth.onAuthStateChanged(
      async authUser => {
        if(authUser){
          const user = await this.props.firebase.user(authUser.uid).once('value', snapshot => { return snapshot.val()});
          this.setState({
            currentuser:user.val(),
          })
        } else {
          this.setState({
            currentuser:null,
          });
        }  
      }

    );

    this.props.firebase.items().on('value', async snapshot => {
      console.log("Yellow");

      const ItemsObject = snapshot.val();
        const itemsList = await Promise.all(Object.keys(ItemsObject).map(async(key) => {
          const user = await this.props.firebase.users().child(ItemsObject[key].userId).once('value', snapshot => { return snapshot.val()});
            return(
              {...ItemsObject[key],
              user: user.val(),
              uid: key}
              )
          })
        );
        this.setState({
          itemsList:itemsList,
        })
    });

  }

  componentWillUnmount() {
    this.listener();
  }

  setTempData(tempdata) {
    this.setState({
      tempitem: {
        msg: tempdata.msg,
        date: tempdata.date,
        lat: tempdata.lat,
        long: tempdata.long,
        image: tempdata.image,
      }
    })
  }

  toggleMaplist(maplist){
    if(this.state.maplist){
      this.setState({
        maplist: false,
      })
    } else {
      this.setState({
        maplist: true,
      })
    }
  }


  render(){
    return (
          <Switch>
            <Route exact path="/" render={(props) =>
              <Homepage
              {...this.state}
              toggleMaplist={(maplist) => this.toggleMaplist(maplist)} />} />
            <Route exact path="/about" component={About} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/newitem" render={(props) => <Newitem {...props} tempitem={this.state.tempitem} onSubmit={(tempdata) => this.setTempData(tempdata)} />} />
            <Route exact path="/locationdragger" render={(props) => <Locationdragger tempitem={this.state.tempitem} {...props} onSubmit={(tempdata) => this.setTempData(tempdata)} />} />
          </Switch>
    );
  }
}

export default withRouter(withAuthentication(App));
