import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import ReactMapGL from 'react-map-gl';

import Geocoder from 'react-mapbox-gl-geocoder'

const Locationdragger = (props) => {
    const [viewport, setViewport] = useState({
        latitude: 51.209800,
        longitude: 4.472290,
        width: '100vw',
        height: '60vh',
        zoom: 12
    })
    const subMit = (tempdata) => {
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

    const onSelected = (viewport, item) => {
        // setViewport({viewport});
        console.log('Selected: ', viewport)
    }
    console.log('viewport',viewport);

    return (
        <div className="locationdragger_total">
            <button {...viewport} onClick={() => onSelected(viewport)}>jooo</button>
                {/* <Geocoder
                    {...viewport}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onSelected={() => onSelected(viewport)}
                    viewport={viewport}
                    // hideOnSelect={true}
                    // queryParams={queryParams}
                /> */}

            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/bennisan86/ck5z4fzh61v6v1ilhbx39414i"
                onViewportChange={viewport => setViewport(viewport)}>
            <div className="pointer"></div>
            </ReactMapGL>
            <div className="below">
                {viewport.latitude}
                <br />
                {viewport.longitude}
                <br />
                <br />
                <button onClick={() => subMit()}>Submit location</button>
            </div>
        </div>
    );   
}


export default Locationdragger;