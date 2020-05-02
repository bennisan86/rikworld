import React from "react";
import ReactAvatarEditor from 'react-avatar-editor'
import { Up, Cancel, Confirm, Rotate } from '../../svgs/OtherIcons'
import { Slider } from 'antd';

class Avatareditor extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    image: this.props.image,
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5},
    scale: 1,
    rotate: 0,
    borderRadius: 50,
    preview: null,
    width: 100,
    height: 100,
    newimg: '',
    currentv: true,
    classerzzzz: 'avatar_total'
  }
  this.triggerClick = this.triggerClick.bind(this);
}


  handleNewImage = e => {
    this.setState({ image: e.target.files[0] })
  }

  handleScale = e => {
    this.setState({ scale: e })
  }
  rotateThis = e => {
    const currentrotation = this.state.rotate + 90;
    this.setState({ rotate: currentrotation })
  }

  handlePositionChange = position => {
    this.setState({ position })
  }

  onClickSave = () => {
    if (this.editor) {
      const canvasScaled = this.editor.getImageScaledToCanvas();
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
    this.props.triggerClick();
    this.setState({
      image:this.props.image,
        currentv: true
      })
  }

  setEditorRef = (editor) => this.editor = editor;

  triggerClick = () => {
    this.props.triggerClick();
    this.setState({
      currentv: false
    })
    document.getElementById("selectImage").click();
  }
  componentDidMount(){
    if(this.props.classerzzz){
      const allclasses = 'avatar_total ' + this.props.classerzzz;
      this.setState({
        classerzzzz: allclasses
      })
    }
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
        <div className={this.state.classerzzzz}>
            <div className="avatar">
                <img src={this.state.image} alt="uploaded avatar"/>
            </div>
            <button className="avatar_edit_btn shadow" onClick={this.triggerClick}>
              <Up width={16}/>
            </button>
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
              borderRadius={this.state.width / (20 / this.state.borderRadius)}
              image={this.state.image}
              className="editor-canvas"
            />
          </div>
          <div className="centeredrow">
            <Slider
              className="zoomslider"
              name="scale"
              tooltipVisible={false}
              onChange={this.handleScale}
              min={0.1}
              max={5}
              step={0.01}
              defaultValue={0}
              value={this.state.scale}
            />
            <button className="avatar_rotate_btn shadow" onClick={this.rotateThis}>
                <Rotate width={16}/>
            </button>
          </div>
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
