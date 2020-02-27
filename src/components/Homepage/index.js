import React, { useState } from 'react';
import Useroverlay from '../Useroverlay';
import Navigation, { NewButton } from '../Navigation'

import ReactMapGL, { Marker, Popup, LinearInterpolator, GeolocateControl } from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import Avatar from '../Avatar';

import RikPin from '../../svgs/RikPin'
import { Button } from 'antd';


const geolocateStyle = {
    top: '120px',
    right: '35px',
    position: 'absolute',
    margin: '5px',
  };

const Homepage = (props) => {
    const [showOverlay, toggleShowOverlay] = useState(false);
    const maplist = props.maplist;
    const itemsList = props.itemsList;
    const clickedController = () => {
        document.querySelector('[title="Geolocate"]').click();
      };
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
                test
                {/* <Navigation currentuser={props.currentuser} onClick={() => toggleShowOverlay(true)} toggleMaplist={(maplist) => props.toggleMaplist(maplist)} maplist={maplist}/>
                {props.currentuser &&
                <NewButton />} */}

{/* 
                {props.maplist && 
                <Map itemsList={itemsList} />}
                {!props.maplist && 
                <div className="list">
                    {itemsList &&
                    itemsList.map((item) => (
                    <div className="listitem" key={item.uid}>
                        <img className="smallio" src={item.image.url} alt='item post' />
                        <small>{item.user.username} - {item.date}</small>
                        <Avatar view="otheruser" otheruser={item.user.avatar} />
                        <h4>{item.msg}</h4>
                        <small>{item.lat} - {item.long}</small>
                    </div>
                    ))
                    }
                </div>
                } */}
            </div>
        );
    }

    const Map = (props) => {
        const [viewport, setViewport] = useState({
            latitude: 51.246600,
            longitude: 4.432830,
            width: '100vw',
            height: '100vh',
            zoom: 12
        })

        const itemsList = props.itemsList;
        const [selectedItem, setSelectedItem] = useState(null);
        const [markPos, setMarkpos] = useState('markpos40');
        const [markSize, setMarksize] = useState(44);
        // const addLat = () => {
        //     console.log("vvvv",viewport);
        //     const addedlat = viewport.latitude + 0.03;
        //     setViewport({
        //         latitude: addedlat,
        //         longitude: viewport.longitude,
        //         width: viewport.width,
        //         height: viewport.height,
        //         zoom: viewport.zoom,
        //     })
        // }

        const setAlteredViewport = (item,viewport) => {
                const addedlat = item.lat + 0.03;
                setViewport({
                latitude: addedlat,
                longitude: item.long,
                width: viewport.width,
                height: viewport.height,
                zoom: viewport.zoom,
                transitionDuration: 700,
                transitionInterpolator: new LinearInterpolator(),
                    transitionEasing: easeCubic
                })


        }
        
        const logView = (viewport) => {
            setViewport(viewport);

                if(viewport.zoom > 13.25) {
                    setMarksize(80);
                    setMarkpos('markpos80');
                } else {
                    if(viewport.zoom > 12) {
                        setMarksize(68);
                        setMarkpos('markpos68');
                    } else {
                        if(viewport.zoom > 11.2) {
                            setMarksize(56);
                            setMarkpos('markpos56');
                        } else {
                            if(viewport.zoom > 10.5) {
                                setMarksize(44);
                                setMarkpos('markpos44');
                            } else {

                                if(viewport.zoom > 9.9) {
                                    setMarksize(36);
                                    setMarkpos('markpos36');
                                } else {

                                    if(viewport.zoom > 8.8) {
                                        setMarksize(26);
                                        setMarkpos('markpos26');    
                                    } else {
                                        setMarksize(18);
                                        setMarkpos('markpos18');    
                                    }
                                }
                            }
                        }
                    }
                }
            console.log('current zoom',viewport.zoom,'current latitude',viewport.latitude);
        }
        return(
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/bennisan86/ck5z4fzh61v6v1ilhbx39414i"
                onViewportChange={viewport => logView(viewport)}>

                <GeolocateControl
                    style={geolocateStyle}
                    positionOptions={{enableHighAccuracy: true}}
                    trackUserLocation={true}
                    className="tester"
                    />


                {itemsList && itemsList.map((item) => (
                <Marker
                    key={item.uid}
                    latitude={item.lat}
                    longitude={item.long}
                    className={markPos}>

                    <button className="marker-btn" onClick={(e) => {
                        e.preventDefault();
                        setSelectedItem(item);
                        setAlteredViewport(item,viewport);
                        // setViewport({
                        // latitude: item.lat,
                        // longitude: item.long,
                        // width: viewport.width,
                        // height: viewport.height,
                        // zoom: viewport.zoom,
                        // transitionDuration: 700,
                        // transitionInterpolator: new LinearInterpolator(),
                        //   transitionEasing: easeCubic
                        // });
                        }}>
                            <RikPin className="rikpin" width={markSize}/>
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
                <img className="smallio" src={selectedItem.image.url} alt='item post' />
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
