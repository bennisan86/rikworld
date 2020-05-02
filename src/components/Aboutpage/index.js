import React from 'react';
import { CloseButton } from '../Navigation';
import FullRik from '../../svgs/FullRik';
import { Button } from 'antd';

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

                <div className="aboutpage_total">
                    <FullRik />
                    <div className="aboutpage_txt">
                        <h2>Hoi!</h2>
                        <p>Ik ben Rik. Ik heb jammer genoeg maar  een heel korte tijd hier op deze wereld mogen zijn. Graag zou ik verder willen leven in jullie gedachten en leuke plekken bezoeken. <br /><br />Mag ik met jullie mee reizen? Stuur mijn mama en papa een mailtje met jullie adres, en zij sturen je een sticker op! Trek er een leuke foto mee en plaats deze dan met een tof tekstje op de map.<br /><br />Dikke zoenen,<br /><strong>Rik</strong></p>
                    </div>
                    {/* <div className="stickers_btn"> */}
                        <div className="stickers_btn centeredrow navshadow"><a href="mailto:rikworldwebsite@gmail.com">stickers aanvragen</a></div>
                    {/* </div> */}
                </div>
                </>
            );
            // }
}


export default About;