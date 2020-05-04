import React from "react";
import { connect } from "react-redux";

import "./Ingresso.css";
import OperatoreCon from "./OperatoreCon";
import BarcodeCon from "./BarcodeCon";
import Header from "../shared/Header";
import Modal from "../../Modal";
import Auth from "../Routers/Auth";
import * as actionCreators from "../../Redux/actions/index";

class Ingresso extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doesExist: false,
      showModal: false,
      showModalCompletedID: false,
    };
    this.handlClick = this.handlClick.bind(this);
  }

  async handlClick(e) {
    e.preventDefault();
    const barcodeExists = await this.props.fetchBarcodeCheck(
      this.props.Barcode.BarcodeSelected
    );
    const startTime = new Date();
    this.props.setStartTime(startTime);

    if (barcodeExists) {
      Auth.authenticate();
      this.props.fetchStatusCheck(this.props.Barcode.BarcodeSelected);
    } else this.setState({ showModal: true });
  }
  renderActions() {
    return (
      <React.Fragment>
        <button
          onClick={() => this.setState({ showModal: false })}
          className="ui button"
        >
          Ok
        </button>
      </React.Fragment>
    );
  }
  renderContent() {
    return "Please try again with an existing barcode id!";
  }

  render() {
    return (
      <div>
        <div className="IngressoContainer">
          <Modal
            title="Barcode ID does not exist"
            content={this.renderContent()}
            actions={this.renderActions()}
            show={this.state.showModal === true ? "visable active" : ""}
            onDismiss={() => this.setState({ showModal: false })}
          ></Modal>

          <Header
            headerText={"Ingresso in postazione"}
            buttonName={"Avanti"}
            handlClick={this.handlClick}
          />
          <OperatoreCon />
          <BarcodeCon inputStyle="InputStyleBarcode" />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, actionCreators)(Ingresso);
