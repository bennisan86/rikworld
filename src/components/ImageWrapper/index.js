import * as React from 'react';
import * as Reactdom from 'react-dom';
import * as loadimage from 'blueimp-load-image';
// import ChildComponent from "./child-component";

class ImageWrapper extends React.Component {
    imageCanvas;
    componentDidMount() {
      loadimage('IMAGE_URL', (img) => {
        img.className = 'fit_to_parent'; // css class: { max-width: 100%; max-height: 100%; }
        const node = Reactdom.findDOMNode(this);  
        console.log("in wrapper:",node);     

        node.appendChild(img);
      });
    }
  
    render() {
      return (
        // <div>
        //     pp
        // {this.props.children}
        // </div>
        <div
          style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
          ref={(ref) => this.imageCanvas = ref}
        >
                    {this.props.children}

            </div>
        
        );
    }
  }

  export default ImageWrapper;