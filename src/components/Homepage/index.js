import React, { useState } from 'react';
import Useroverlay from '../Useroverlay';
import Navigation, { NewButton } from '../Navigation'
import { AuthUserContext } from '../Session';

import ReactMapGL, { Marker, Popup, LinearInterpolator, GeolocateControl } from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import Avatar from '../Avatar';

const geolocateStyle = {
    top: '2vw',
    left: '180px',
    position: 'absolute',
    margin: '5px',
  };

const Homepage = (props) => {
    const [showOverlay, toggleShowOverlay] = useState(false);
    const maplist = props.maplist;
    const itemsList = props.itemsList;
    return (
            <div className="map_canvas">
                <>
                {
                showOverlay && 
                <div className="overlay">
                     <Useroverlay currentuser={props.currentuser} onOuterClick={() => toggleShowOverlay(false)}/>
                </div>
                }
                </>
                <Navigation currentuser={props.currentuser} onClick={() => toggleShowOverlay(true)} toggleMaplist={(maplist) => props.toggleMaplist(maplist)} maplist={maplist}/>
                <NewButton />
                {props.maplist && 
                <Map itemsList={itemsList} />}
                {!props.maplist && 
                <div className="list">
                    {itemsList &&
                    itemsList.map((item) => (
                    <div className="listitem" key={item.uid}>
                        <img className="smallio" src={item.image.url} />
                        <small>{item.user.username} - {item.date}</small>
                        <Avatar view="otheruser" otheruser={item.user.avatar} />
                        <h4>{item.msg}</h4>
                        <small>{item.lat} - {item.long}</small>
                    </div>
                    ))
                    }
                </div>
                }
            </div>
        );
    }

    const Map = (props) => {
        const [viewport, setViewport] = useState({
            latitude: 51.209800,
            longitude: 4.472290,
            width: '100vw',
            height: '100vh',
            zoom: 12
        })

        const itemsList = props.itemsList;
        const [selectedItem, setSelectedItem] = useState(null);
        return(
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/bennisan86/ck5z4fzh61v6v1ilhbx39414i"
                onViewportChange={viewport => setViewport(viewport)}>

                <GeolocateControl
                        style={geolocateStyle}
                        positionOptions={{enableHighAccuracy: true}}
                        trackUserLocation={true}
                        />


                {itemsList && itemsList.map((item) => (
                <Marker
                    key={item.uid}
                    latitude={item.lat}
                    longitude={item.long}>

                    <button className="marker-btn" onClick={(e) => {
                        e.preventDefault();
                        setSelectedItem(item);
                        setViewport({
                        latitude: item.lat,
                        longitude: item.long,
                        width: viewport.width,
                        height: viewport.height,
                        zoom: viewport.zoom,
                        transitionDuration: 700,
                        transitionInterpolator: new LinearInterpolator(),
                          transitionEasing: easeCubic
                        });
                        }}>
                        R
                    </button>

                </Marker>
                ))}


        {selectedItem && (


            <Popup
            latitude={selectedItem.lat}
            longitude={selectedItem.long}
            captureScroll={true}
            onClose={() => {
            setSelectedItem(null);
            }}>
            <div className="innerBox">
                <img className="smallio" src={selectedItem.image.url} />
                <Avatar view="otheruser" otheruser={selectedItem.user.avatar} />
                <small>{selectedItem.user.username}</small>
                <h2>{selectedItem.msg}</h2>
                <p>{selectedItem.date}</p>
            </div>
            </Popup>
        )}


            </ReactMapGL>
        </div>);
    }

export default Homepage;
