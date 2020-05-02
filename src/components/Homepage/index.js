import React, { useState,useEffect, Component } from 'react';
import Useroverlay from '../Useroverlay';
import Navigation, { NewButton } from '../Navigation'


import ReactMapGL, { Marker, Popup, LinearInterpolator, GeolocateControl } from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import Avatar from '../Avatar';

import RikPin from '../../svgs/RikPin'
import { Locationpin } from '../../svgs/OtherIcons'

import Masonry from 'react-masonry-css'


const geolocateStyle = {
    top: '120px',
    right: '35px',
    position: 'absolute',
    margin: '5px',
  };

  const Listitem = (props) => {
      const item = props.item;
    return(
    <div className="listitem shadow">
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
        <div className="innerBox_location_total">
            <div className="innerBox_location" onClick={props.onClick}>
                <Locationpin width={16} />
                <div className="innerBox_location_latlong centeredrow">
                    <p>toon op map</p>
                </div>
            </div>
        </div>
    </div>
    );
  }
      


const Homepage = (props) => {
    const [showOverlay, toggleShowOverlay] = useState(false);
    const [buttonStyle, setButtonstyle] = useState('nowyouseeme');

    const [currentItem, setCurrentItem] = useState(props.currentitem);

    const maplist = props.maplist;
    const itemsList = props.itemsList;

    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
      };

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
                    <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                        {itemsList &&
                        itemsList.map((item) => (
                            <Listitem
                                key={item.uid}
                                item={item}
                                onClick={() => showItemOnMap(item)}
                                history={props.history}/>
                        ))
                        }
                    </Masonry>
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
                setSelectedItem(props.currentItem);
                setAlteredViewport(props.currentItem,viewport);
            } else {
                // console.log("in map is null");
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
                <div className="innerBox_img centeredcolumn">
                    <AtomicImage src={selectedItem.image.url}/>
                </div>
                {/* <img className="innerBox_img" src={selectedItem.image.url} alt='item post' /> */}
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




class AtomicImage  extends Component {
    constructor(props) {
            super(props);
            this.state = {
                dimensions: {},
                woord: '',
                style: 'innerBox_img_landsc'
            };
            this.onImgLoad = this.onImgLoad.bind(this);
        }
        onImgLoad({target:img}) {
            if (img.offsetHeight > img.offsetWidth) {
                this.setState({
                    woord:'staand',
                    style: 'innerBox_img_portrait'
                });
            } else {
                this.setState({
                    woord:'liggend',
                    style: 'innerBox_img_landsc'

                });
            }

            this.setState({
                dimensions:{
                    height:img.offsetHeight,
                    width:img.offsetWidth
                }
            });
        }
        render(){
            const {src} = this.props;
            const style = this.state.style;
        
            return (
                    <img className={style} onLoad={this.onImgLoad} src={src} alt='item post' />
                );
        }
    }



export default Homepage;
export { Listitem, AtomicImage };