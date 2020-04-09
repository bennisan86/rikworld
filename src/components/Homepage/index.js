import React, { useState,useEffect } from 'react';
import Useroverlay from '../Useroverlay';
import Navigation, { NewButton } from '../Navigation'


import ReactMapGL, { Marker, Popup, LinearInterpolator, GeolocateControl } from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import Avatar from '../Avatar';

import RikPin from '../../svgs/RikPin'
import { Locationpin } from '../../svgs/OtherIcons'


const geolocateStyle = {
    top: '120px',
    right: '35px',
    position: 'absolute',
    margin: '5px',
  };

// const Mediaitem = (media) => {
//     console.log("mmmmedia",media);
//     return(
//         <>
//         <div>Komtiiee: {media}</div>
//         <img className="innerBox_img" src={media} alt='item post' />
//         </>
//     );
    
// };

  const Listitem = (props) => {
      const item = props.item;

    return(
    <div className="listitem shadow">
        {/* <Mediaitem media={item.image.url}/> */}
        <img className="innerBox_img" src={item.image.url} alt='item post' />
        <div className="innerBox_top">
            <div className="innerBox_avatar">
                <Avatar view="otheruser" otheruser={item.user.avatar} className={'useravatar'} />
                <p className="otherusername">{item.user.username}</p>  
            </div>
            <h5>{item.date}</h5>
        </div>
        <div className="innerBox_below">
            <p>{item.msg}</p>
        </div>
        <div className="innerBox_location" onClick={props.onClick}>
            <Locationpin width={16} />
            <div className="innerBox_location_latlong centeredrow">
                <p>toon op map</p>
            </div>
        </div>
    </div>
    );
  }
      


const Homepage = (props) => {
    const [showOverlay, toggleShowOverlay] = useState(false);
    const [buttonStyle, setButtonstyle] = useState('nowyouseeme');

    const [currentItem, setCurrentItem] = useState(null);

    const maplist = props.maplist;
    const itemsList = props.itemsList;

    const showItemOnMap = (item) => {
        props.toggleMaplist(maplist);
        setCurrentItem(item);
    }
    useEffect(() => {
        if(props.currentuser !== null) {
            setButtonstyle('nowyouseeme');
        } else {
            setButtonstyle('nowyoudont');
        }
    },[props.currentuser]);
    window.scrollTo(0, 0);
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
                <NewButton buttonStyle={buttonStyle} />
                
                {props.maplist && 
                    <Map
                        itemsList={itemsList}
                        currentItem={currentItem}
                        />
                }
                {!props.maplist && 
                    <div className="list">
                        {itemsList &&
                        itemsList.map((item) => (
                            <Listitem
                                key={item.uid}
                                item={item}
                                onClick={() => showItemOnMap(item)}/>
                        ))
                        }
                    </div>
                }
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

        useEffect(() => {
            if(props.currentItem !== null) {
                console.log("in map::", props.currentItem);
                setSelectedItem(props.currentItem);
                setAlteredViewport(props.currentItem,viewport);
            } else {
                console.log("in map is null");
            }
        },[]);


        const setAlteredViewport = (item,viewport) => {
            if (viewport.zoom > 17){
                const addedlat = item.lat + 0.0005;
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
            } else {
                if (viewport.zoom > 16.7){
                    const addedlat = item.lat + 0.001;
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
                } else {
                    if (viewport.zoom > 16){
                        const addedlat = item.lat + 0.0015;
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
                    } else {
                        if (viewport.zoom > 15.7){
                            const addedlat = item.lat + 0.002;
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
                        } else {
                            if (viewport.zoom > 15.2){
                                const addedlat = item.lat + 0.003;
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
                            } else {
                                if (viewport.zoom > 14.8){
                                    const addedlat = item.lat + 0.004;
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
                                } else {
                                    if (viewport.zoom > 14.2){
                                        const addedlat = item.lat + 0.006;
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
                                    } else {
                                        if (viewport.zoom > 13.85){
                                            const addedlat = item.lat + 0.0075;
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
                                        } else {
                                                if (viewport.zoom > 13.25){
                                                    const addedlat = item.lat + 0.01;
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
                                                } else {

                                                    if (viewport.zoom > 13){
                                                        const addedlat = item.lat + 0.0125;
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
                                                    else {

                                                        
                                                        if (viewport.zoom > 12.5){
                                                            const addedlat = item.lat + 0.021;
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
                                                        } else {

                                                            if (viewport.zoom === 12 || viewport.zoom > 12){

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
                                                            } else {
                                                                const addedlat = item.lat + 0.03;
                                                                setViewport({
                                                                    latitude: addedlat,
                                                                    longitude: item.long,
                                                                    width: viewport.width,
                                                                    height: viewport.height,
                                                                    zoom: 12,
                                                                    transitionDuration: 700,
                                                                    transitionInterpolator: new LinearInterpolator(),
                                                                        transitionEasing: easeCubic
                                                                    }) 

                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
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
            // console.log('current zoom',viewport.zoom,'current latitude',viewport.latitude);
        }
        return(
        <div className="map">
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
            anchor="top"
            onClose={(e) => {
            setSelectedItem(null);
            }}>
            <div className="innerBox mapitem">
                <div className="innerBox_top">
                    <div className="innerBox_avatar">
                        <Avatar view="otheruser" otheruser={selectedItem.user.avatar} className={'useravatar'} />
                        <p className="otherusername">{selectedItem.user.username}</p>  
                    </div>
                    <h5>{selectedItem.date}</h5>
                </div>
                {/* <Mediaitem media={selectedItem.image.url}/> */}

                <img className="innerBox_img" src={selectedItem.image.url} alt='item post' />
                <div className="innerBox_below">
                    <p>{selectedItem.msg}</p>
                </div>
                <div className="innerBox_location">
                    <Locationpin width={14} fill="#878787" />
                    <div className="innerBox_location_latlong">
                        <p>{selectedItem.long}°</p>
                        <p>{selectedItem.lat}°</p>
                    </div>
                </div>
            </div>
            </Popup>
        )}


            </ReactMapGL>
        </div>);
    }

export default Homepage;
export { Listitem };