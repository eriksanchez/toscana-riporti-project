import React from "react";

import { connect } from "react-redux";
import * as actionCreators from "../../Redux/actions";

import Barcode from "./Barcode";

class BarcodeCon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BarcodeSelected: false
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.props.selectBarcode(e.target.value);
  }
  render() {
    return (
      <div>
        <Barcode
          handlChange={this.onChange}
          inputStyle={this.props.inputStyle}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, actionCreators)(BarcodeCon);
