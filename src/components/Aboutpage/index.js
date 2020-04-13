import React from 'react';
import { CloseButton } from '../Navigation';
import FullRik from '../../svgs/FullRik';
// import { Button } from 'antd';
// import axios from 'axios';

// class About extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             currentview: 'default',
//             msg: '',
//             adress: '',
//         };
//     }

//     onChange = event => {
//         this.setState({ [event.target.name]: event.target.value });
//     }

//     async subMit() {
//         console.log(this.state);
//         const form = await axios.post('/api/form', {
//             msg: this.state.msg,
//             adress: this.state.adress
//         })
//     }

//     render(){
//         const currentView = this.state.currentview;
//         const { msg, adress } = this.state;
//         switch(currentView) {
//             case 'msgview':
//             return (
//                 <>
//                 <CloseButton history={this.props.history} fill="#FFEF00" />
//                 <div className="aboutpage_total msgview">
//                     <Input
//                         type="msg"
//                         name="msg"
//                         size="large"
//                         value={msg}
//                         onChange={event => this.onChange(event)}
//                         />
//                     <Input
//                         type="adress"
//                         name="adress"
//                         size="large"
//                         value={adress}
//                         onChange={event => this.onChange(event)}
//                         />
//                     <Button className="loginbtn" onClick={() => this.subMit()}>submit!</Button>

//                 </div>
//                 </>
    
//             );
//             default:
//                 return (
//                     <>
//                     <CloseButton history={this.props.history} fill="#FFEF00" />
//                     <div className="stickers_btn">
//                         <Button className="navshadow" onClick={() => this.setState({currentview: "msgview"})}>stickers aanvragen</Button>
//                         {/* <Button className="navshadow" onClick="mailto:vandenbempt.gn@gmail.com?SUBJECT=Wij willen graag stickers aanvragen!&BODY=Wij%20willen%20graag%20stickers%20aanvragen!">stickers aanvragen</Button> */}
//                     </div>
//                     <div className="aboutpage_total">
//                         <FullRik />
//                         <div className="aboutpage_txt">
//                             <h2>Hoi!</h2>
//                             <p>Ik ben Rik. Ik heb jammer genoeg maar  een heel korte tijd hier op deze wereld mogen zijn. Graag zou ik verder willen leven in jullie gedachten en leuke plekken bezoeken. <br /><br />Mag ik met jullie mee reizen? Vraag een sticker aan mijn mama en papa, trek er een leuke foto mee en plaats deze dan met een tof tekstje op de map.<br /><br />Dikke zoenen,<br /><strong>Rik</strong></p>
//                         </div>
//                     </div>
//                     </>
//                 );
//                 }


//     }
// }


const About = (props) => {
    // const [currentView, setCurrentView] = useState('default');
    // switch(currentView) {
    //     case 'msgview':
    //     return (
    //         <>
    //         <CloseButton history={props.history} fill="#FFEF00" />
    //         <div className="aboutpage_total">
    //         </div>
    //         </>

    //     );
    //     default:
            return (
                <>
                <CloseButton history={props.history} fill="#FFEF00" />
                {/* <div className="stickers_btn">
                    <Button className="navshadow" onClick="mailto:vandenbempt.gn@gmail.com">stickers aanvragen</Button>
                </div> */}
                <div className="aboutpage_total">
                    <FullRik />
                    <div className="aboutpage_txt">
                        <h2>Hoi!</h2>
                        <p>Ik ben Rik. Ik heb jammer genoeg maar  een heel korte tijd hier op deze wereld mogen zijn. Graag zou ik verder willen leven in jullie gedachten en leuke plekken bezoeken. <br /><br />Mag ik met jullie mee reizen? Stuur <a href="mailto:vandenbempt.gn@gmail.com">mijn mama en papa</a> een mailtje met jullie adres, en zij sturen je een sticker op! Trek er een leuke foto mee en plaats deze dan met een tof tekstje op de map.<br /><br />Dikke zoenen,<br /><strong>Rik</strong></p>
                    </div>
                </div>
                </>
            );
            // }
}


export default About;