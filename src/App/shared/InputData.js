import React from "react";
import "./InputData.css";
class InputData extends React.Component {
  render() {
    return (
      <div className="InputContainer">
        <div className={this.props.classStyleInputTitle}>
          {this.props.dataInputTitle}
        </div>
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              className={this.props.inputStyle}
              placeholder={this.props.data}
              disabled
            ></input>
          </form>
        </div>
      </div>
    );
  }
}

export default InputData;
