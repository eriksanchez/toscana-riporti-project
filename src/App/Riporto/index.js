import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Header from "../shared/Header";
import InputDataCon from "../shared/InputDataCon";
import Modal from "../../Modal";
import history from "../Routers/history";
import * as actionCreators from "../../Redux/actions/index";

import "./Riporto.css";
class Riporto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonOption: true,
      showModal: false,
    };
    this.handlClick = this.handlClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchForRiporto(this.props.Barcode.BarcodeSelected);
  }
  handlClick() {
    this.props.setRiportoCompletato();
    this.props.editBarcodeStatus(this.props.Barcode.BarcodeSelected, {
      status: "Riporto Completato",
    });
  }
  renderActions() {
    return (
      <React.Fragment>
        <button
          onClick={() => {
            history.push("/Attrezzaggio");
            this.props.editBarcodeStatus(this.props.Barcode.BarcodeSelected, {
              status: "Riporto Sospeso",
            });
          }}
          className="ui button negative"
        >
          Yes
        </button>
        <button
          onClick={() => this.setState({ showModal: false })}
          className="ui button"
        >
          Cancel
        </button>
      </React.Fragment>
    );
  }
  renderContent() {
    return "If yes, click 'Yes' to go back to Attrezzaggio. If no, click 'Cancel' to return to the Riporto page.";
  }
  handlClickIndietro = () => {
    this.setState({ showModal: true });
  };

  render() {
    return (
      <div className="RiportoContainer">
        <Modal
          title="Are you sure you want to exit out of riporto?"
          content={this.renderContent()}
          actions={this.renderActions()}
          show={this.state.showModal === true ? "visable active" : ""}
          onDismiss={() => this.setState({ showModal: false })}
        ></Modal>
        <Header
          headerText={"Riporto"}
          handlClick={this.handlClickIndietro}
          buttonName={"Indietro"}
          buttonOption={this.state.buttonOption}
        />
        <div className="BodyContainer">
          <InputDataCon
            dataTitle="Riferimenti ODP"
            dataIn={this.props.Barcode.BarcodeSelected}
            inputStyle="InputClassStyleRiporto"
          />
          <InputDataCon
            dataTitle="Cliente"
            dataIn={this.props.Barcode.Cliente}
            inputStyle="InputClassStyleRiporto"
          />
          <InputDataCon
            dataTitle="Articolo"
            dataIn={this.props.Barcode.Articolo}
            inputStyle="InputClassStyleRiporto"
          />
          <InputDataCon
            dataTitle="Note"
            dataIn={this.props.Barcode.Note}
            inputStyle="InputClassStyleRiporto"
          />
          <InputDataCon
            dataTitle="Quantita"
            dataIn={this.props.Barcode.Quantita}
            inputStyle="InputClassStyleRiporto"
          />
          <InputDataCon
            dataTitle="Ricetta ancorante"
            dataIn={this.props.Barcode.RicettaAncorante}
            inputStyle="InputClassStyleRiporto"
          />
          <InputDataCon
            dataTitle="Ricetta riporto"
            dataIn={this.props.Barcode.RicettaRiporto}
            inputStyle="InputClassStyleRiporto"
          />
          <hr />
          <div className="BottomBodyRiporto">
            <InputDataCon
              dataTitle="Num. pezzi lavorati"
              dataIn={this.props.Barcode.NumPezzi}
              inputStyle="BottomBodyInputStyle"
              classStyleInputTitle="InputTitleClass"
            />
            <InputDataCon
              dataTitle="Data / ora"
              dataIn={this.props.Barcode.DataOra}
              inputStyle="BottomBodyInputStyle"
              classStyleInputTitle="InputTitleClass"
            />
          </div>
          <hr />
        </div>

        <div className="FooterContainer">
          <Link to={"./Chiusura"}>
            <button className="footerButton" onClick={this.handlClick}>
              Riporto completato
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, actionCreators)(Riporto);
