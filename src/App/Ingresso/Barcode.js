import React from "react";
import "./Barcode.css";
class Barcode extends React.Component {
  render() {
    return (
      <div className="BarcodeContainer">
        <div>Barcode ingresso in postazione</div>
        <div>
          <form>
            <input
              className={this.props.inputStyle}
              type="number"
              onChange={this.props.handlChange}
              placeholder="Scan/Insert Barcode"
            ></input>
          </form>
        </div>
      </div>
    );
  }
}

export default Barcode;
