import React from "react";
import { Link } from "react-router-dom";
import "./Attrezzaggio.css";

import { connect } from "react-redux";
import * as actionCreators from "../../Redux/actions";

import Header from "../shared/Header";
import InputDataCon from "../shared/InputDataCon";
import Modal from "../../Modal";
import history from "../Routers/history";

class Attrezzaggio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonOption: true,
      sospendi: true,
      showModal: false,
    };
    this.handlClickSospendi = this.handlClickSospendi.bind(this);
    this.handlClickRiprendi = this.handlClickRiprendi.bind(this);
    this.handlClickCompletato = this.handlClickCompletato.bind(this);
  }
  componentDidMount() {
    this.props.fetchForAttrezzaggio(this.props.Barcode.BarcodeSelected);

    this.props.editBarcodeStatus(this.props.Barcode.BarcodeSelected, {
      status: "Attrezzaggio Started",
    });
  }
  renderActions() {
    return (
      <React.Fragment>
        <button
          onClick={() => {
            history.push("/Ingresso");
            this.props.editBarcodeStatus(this.props.Barcode.BarcodeSelected, {
              status: "Attrezzaggio Sospeso",
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
    return "If yes, click 'Yes' to go back to Ingresso. If no, click 'Cancel' to return to the attrezzaggio page.";
  }
  handlClickIndietro = () => {
    this.setState({ showModal: true });
  };
  handlClickSospendi() {
    this.setState((prevState) => ({
      sospendi: !prevState.sospendi,
    }));
    const sospendi = new Date();
    this.props.addSospendi(sospendi);
    this.props.setAttrezzaggioSospeso();
    this.props.editBarcodeStatus(this.props.Barcode.BarcodeSelected, {
      status: "Attrezzaggio Sospeso",
    });
  }
  handlClickRiprendi() {
    this.setState((prevState) => ({
      sospendi: !prevState.sospendi,
    }));
    const riprendi = new Date();
    this.props.addRiprendi(riprendi);
    this.props.setAttrezzaggioRipreso();
    this.props.editBarcodeStatus(this.props.Barcode.BarcodeSelected, {
      status: "Attrezzaggio Ripreso",
    });
  }
  handlClickCompletato() {
    const completato = new Date();
    this.props.setCompletatoAtrrezzaggio(completato);
    this.props.setAttrezzaggioCompletato();
    this.props.editBarcodeStatus(this.props.Barcode.BarcodeSelected, {
      status: "Attrezzaggio Completato",
    });
  }

  render() {
    return (
      <div className="AttrezzaggioContainer">
        <Modal
          title="Are you sure you want to exit out of attrezzaggio?"
          content={this.renderContent()}
          actions={this.renderActions()}
          show={this.state.showModal === true ? "visable active" : ""}
          onDismiss={() => this.setState({ showModal: false })}
        ></Modal>

        <Header
          headerText={"Attrezzaggio"}
          handlClick={this.handlClickIndietro}
          buttonName={"Indietro"}
          buttonOption={this.state.buttonOption}
        />
        <div className="BodyContainer">
          <InputDataCon
            dataTitle="Riferimenti ODP"
            dataIn={this.props.Barcode.BarcodeSelected}
            inputStyle="InputClassStyle"
          />
          <InputDataCon
            dataTitle="Cliente"
            dataIn={this.props.Barcode.Cliente}
            inputStyle="InputClassStyle"
          />
          <InputDataCon
            dataTitle="Articolo"
            dataIn={this.props.Barcode.Articolo}
            inputStyle="InputClassStyle"
          />
          <InputDataCon
            dataTitle="Note"
            dataIn={this.props.Barcode.Note}
            inputStyle="InputClassStyle"
          />
          <InputDataCon
            dataTitle="Quantita"
            dataIn={this.props.Barcode.Quantita}
            inputStyle="InputClassStyle"
          />
          <InputDataCon
            dataTitle="Ricetta ancorante"
            dataIn={this.props.Barcode.RicettaAncorante}
            inputStyle="InputClassStyle"
          />
          <InputDataCon
            dataTitle="Ricetta riporto"
            dataIn={this.props.Barcode.RicettaRiporto}
            inputStyle="InputClassStyle"
          />
        </div>
        <div className="FooterContainerAttrezzaggio">
          <button
            disabled={!this.state.sospendi}
            onClick={this.handlClickSospendi}
            className="footerButtons"
          >
            Sospendi attrezzaggio
          </button>
          <button
            disabled={this.state.sospendi}
            className="footerButtons"
            onClick={this.handlClickRiprendi}
          >
            Riprendi attrezzaggio
          </button>
          <Link to={"./Riporto"}>
            <button
              className="footerButtons"
              onClick={this.handlClickCompletato}
            >
              Attrezzaggio completato
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
export default connect(mapStateToProps, actionCreators)(Attrezzaggio);
