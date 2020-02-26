import React from "react";
import ReactAvatarEditor from 'react-avatar-editor'
import avataredit from '../Avatareditor/avatar_edit.png';
import { Up, Cancel, Confirm } from '../../svgs/OtherIcons'
import { Slider } from 'antd';

class Avatareditor extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    image: avataredit,
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5},
    scale: 2,
    rotate: 0,
    borderRadius: 50,
    preview: null,
    width: 80,
    height: 80,
    newimg: '',
    currentv: true
  }
  this.triggerClick = this.triggerClick.bind(this);
}


  handleNewImage = e => {
    this.setState({ image: e.target.files[0] })
  }

  handleScale = e => {
    this.setState({ scale: e })
  }

  handlePositionChange = position => {
    this.setState({ position })
  }

  onClickSave = () => {
    if (this.editor) {
      const canvasScaled = this.editor.getImageScaledToCanvas()
      const newimg = new Image();
      newimg.id = "pic";
      newimg.src = canvasScaled.toDataURL();
        this.props.onSetImage(newimg.src);
        this.setState({
            image:newimg.src,
           currentv: true
          })
    }
  }

  onClickNope = () => {
    this.setState({
      image:avataredit,
        currentv: true
      })
  }

  setEditorRef = (editor) => this.editor = editor;

  triggerClick = () => {
    this.setState({
      currentv: false
    })
    document.getElementById("selectImage").click()
  }
  
  render() {
    return (
      <div>
            <input
            // name="newImage"
            id='selectImage'
            hidden="hidden"
            type="file"
            onChange={this.handleNewImage}
          />

        {this.state.currentv ? 
        <div className="avatar_total">
            <button className="avatar_edit_btn shadow" onClick={this.triggerClick}>
              <Up width={16}/>
            </button>
            <div className="avatar">
                <img src={this.state.image} alt="uploaded avatar"/>
            </div>
        </div>
        :
        <div className="centeredcolumn">
          <div className="centeredcolumn">
            <ReactAvatarEditor
              ref={this.setEditorRef}
              scale={parseFloat(this.state.scale)}
              width={this.state.width}
              height={this.state.height}
              position={this.state.position}
              onPositionChange={this.handlePositionChange}
              rotate={parseFloat(this.state.rotate)}
              borderRadius={this.state.width / (100 / this.state.borderRadius)}
              image={this.state.image}
              className="editor-canvas"
            />
          </div>
          <Slider
            className="zoomslider"
            name="scale"
            tooltipVisible={false}
            onChange={this.handleScale}
            min={1}
            max={5}
            step={0.01}
            defaultValue={0}
            value={this.state.scale}
          />
          <div className="centeredrow">
            <button className="avatar_cc_btn shadow" onClick={this.onClickNope}>
              <Cancel width={14}/>
            </button>
            <button className="avatar_cc_btn shadow" onClick={this.onClickSave}>
              <Confirm width={22}/>
            </button>
          </div>
        </div>
      }
      </div>
    )
  }
}

export default Avatareditor;
