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
      myItemsList: null,
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
      currentuser: null,
      currentuserid: null
    };
  }

  componentDidMount() {
    // this.setAllItems();
    this.listener = this.props.firebase.items().on('value', async snapshot => {
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
        });
        this.setMyItems();

      });
    this.entryAuth();
  }

  setAllItems(){
    // this.listener = this.props.firebase.items().on('value', async snapshot => {
    //   const ItemsObject = snapshot.val();
    //   const itemsList = await Promise.all(Object.keys(ItemsObject).map(async(key) => {
    //       const user = await this.props.firebase.users().child(ItemsObject[key].userId).once('value', snapshot => { return snapshot.val()});
    //         return(
    //           {...ItemsObject[key],
    //           user: user.val(),
    //           uid: key}
    //           )
    //       })
    //     );
    //     this.setState({
    //       itemsList:itemsList,
    //     });
    // });
  }
  setMyItems(){
    if(this.state.itemsList && this.state.currentuserid){
    const myitems = this.state.itemsList.filter((key) => key.userId === this.state.currentuserid);
    console.log("myitems in f:",myitems);
      this.setState({
        myItemsList:myitems,
      });
    }
  }

  entryAuth(){
    this.authlistener = this.props.firebase.auth.onAuthStateChanged(
      async authUser => {
        if(authUser){
          const user = await this.props.firebase.user(authUser.uid).once('value', snapshot => { return snapshot.val()});
          this.setState({
            currentuser:user.val(),
            currentuserid: authUser.uid
          });
          this.setMyItems();
        } else {
          // this.setMyItems();
          this.setState({
            currentuser:null,
            currentuserid: null,
            myItemsList:null,
          });
        }  
      }
    );
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

  newUserStuff(stuff){
    if(stuff.newAvatar !== null && stuff.newUsername !== null) {
      // console.log("alles verandert!")
      this.props.firebase.users().child(this.state.currentuserid).set({
          avatar: stuff.newAvatar,
          email:this.state.currentuser.email,
          username: stuff.newUsername,
      })
    }
    if(stuff.newAvatar === null && stuff.newUsername !== null) {
      // console.log("Enkel username verandert!")
      this.props.firebase.users().child(this.state.currentuserid).set({
          avatar: this.state.currentuser.avatar,
          email:this.state.currentuser.email,
          username: stuff.newUsername,
      })
    }

    if(stuff.newAvatar !== null && stuff.newUsername === null) {
      // console.log("Enkel avatar verandert!")
      this.props.firebase.users().child(this.state.currentuserid).set({
          avatar: stuff.newAvatar,
          email:this.state.currentuser.email,
          username: this.state.currentuser.username,
      })
    }

    if(stuff.newAvatar === null && stuff.newUsername === null) {
      // console.log("Niks verandert!")
      this.props.firebase.users().child(this.state.currentuserid).set({
          avatar: this.state.currentuser.avatar,
          email:this.state.currentuser.email,
          username: this.state.currentuser.username,
      })
    }
    this.entryAuth();
  }


  render(){
    return (
          <Switch>
            <Route exact path="/" render={(props) =>
              <Homepage
              {...this.state}
              toggleMaplist={(maplist) => this.toggleMaplist(maplist)} />} />
            <Route exact path="/about" render={(props) =>
              <About 
              {...this.props}
              />} />
            <Route 
              exact path="/profile" render={(props) =>
                <Profile
                {...this.state}
                {...this.props}
                newUserStuff={(stuff) => this.newUserStuff(stuff)} />}/>
            <Route
              exact path="/newitem"
              render={(props) => <Newitem {...props} tempitem={this.state.tempitem} onSubmit={(tempdata) => this.setTempData(tempdata)} />} />
            <Route exact path="/locationdragger" render={(props) => <Locationdragger tempitem={this.state.tempitem} {...props} onSubmit={(tempdata) => this.setTempData(tempdata)} />} />
          </Switch>
    );
  }
}

export default withRouter(withAuthentication(App));
