import React, { useState } from 'react';
import * as ROUTES from '../../constants/routes';
import ReactMapGL, { GeolocateControl } from 'react-map-gl';

import Geocoder from 'react-mapbox-gl-geocoder'
import { Button } from 'antd';
import { Cancel, Confirm } from '../../svgs/OtherIcons'

const geolocateStyle = {
    top: '120px',
    right: '35px',
    position: 'absolute',
    margin: '5px',
    opacity: '0'
  };


const Locationdragger = (props) => {
    const [viewport, setViewport] = useState({
        latitude: 51.209800,
        longitude: 4.472290,
        width: '100vw',
        height: '60vh',
        zoom: 12
    })

    const clickedController = () => {
        document.querySelector('[title="Geolocate"]').click();
        console.log('clickerd');
      };

    const cancelThis = () => {
    props.history.push(ROUTES.NEWITEM);
    };


    const submitThis = (tempdata) => {
        props.onSubmit(
            {
                msg: props.tempitem.msg,
                date: props.tempitem.date,
                lat: viewport.latitude,
                long: viewport.longitude,
                image: props.tempitem.image,
            }
        );
        props.history.push(ROUTES.NEWITEM);
    };
    const queryParams = {
        country: 'be'
    }

    const onSelected = (viewport, item) => {
        setViewport(viewport);
        console.log('Selected: ', viewport, item)
    }
    console.log('viewport',viewport);

    return (
        <div className="locationdragger_total">
            <Button
                className="findmyloc shadow"
                onClick={() => clickedController()}>mijn huidige locatie tonen</Button>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/bennisan86/ck5z4fzh61v6v1ilhbx39414i"
                onViewportChange={viewport => setViewport(viewport)}>
            <div className="pointer"></div>
            <GeolocateControl
                    style={geolocateStyle}
                    positionOptions={{enableHighAccuracy: true}}
                    trackUserLocation={true}
                    className="tester"
            />


            </ReactMapGL>
            <div className="locationdragger_bottom">
                <p>Sleep de map of geef een adres in.</p>
            <Geocoder       
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                viewport={viewport}
                initialInputValue="Laarsebaan"
                InputValue="test"
                onSelected={(viewport, item) => onSelected(viewport, item)}
                hideOnSelect={true}
                queryParams={queryParams}
            />

                <div className="centeredrow">
                    <button className="avatar_cc_btn shadow" onClick={() => cancelThis()}>
                    <Cancel width={14}/>
                    </button>
                    <button className="avatar_cc_btn shadow" onClick={() => submitThis()}>
                    <Confirm width={22}/>
                    </button>
                </div>

            </div>
        </div>
    );   
}


export default Locationdragger;