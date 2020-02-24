import React from "react";
import ReactDOM from "react-dom";
import ReactAvatarEditor from 'react-avatar-editor'
import avataredit from '../Avatareditor/avatar_edit.png';

class Avatareditor extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    image: avataredit,
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5},
    scale: 1.6,
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
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }

  handlePositionChange = position => {
    this.setState({ position })
  }

  onClickSave = () => {
    if (this.editor) {
      const canvas = this.editor.getImage();
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
            <button className="avatar_edit_btn" onClick={this.triggerClick}>up</button>
            <div className="avatar">
                <img src={this.state.image} alt="avatar image"/>
            </div>
        </div>
        :
        <div>
          <div>
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
          <br />

          <br />
          <input
            name="scale"
            type="range"
            onChange={this.handleScale}
            min={this.state.allowZoomOut ? '0.1' : '1'}
            max="2"
            step="0.01"
            defaultValue="1"
          />
          <br />
          <button onClick={this.onClickSave}>save!</button>
          <button onClick={this.onClickNope}>nope!</button>

        </div>
      }
      </div>
    )
  }
}

export default Avatareditor;
