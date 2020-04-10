import React from "react";
import InputData from "./InputData";

class InputDataCon extends React.Component {
  render() {
    return (
      <div>
        <InputData
          dataInputTitle={this.props.dataTitle}
          data={this.props.dataIn}
          inputStyle={this.props.inputStyle}
          classStyleInputTitle={this.props.classStyleInputTitle}
        />
      </div>
    );
  }
}

export default InputDataCon;
