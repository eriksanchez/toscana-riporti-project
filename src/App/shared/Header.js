import React from "react";
import { connect } from "react-redux";

import "./Header.css";
class Header extends React.Component {
  render() {
    return (
      <div className="Container">
        <div className="HeaderContainer">
          <h4 className="HeaderText">{this.props.headerText} </h4>
        </div>
        <div className="ButtonContainer">
          <button
            className="Button"
            disabled={
              this.props.Barcode.BarcodeSelected === null ||
              this.props.Operatore.OperatoreSelected === null
                ? true
                : false
            }
            //[Ingresso: modify to check if barcode exists]
            onClick={this.props.handlClick}
          >
            {this.props.buttonName}
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Header);
