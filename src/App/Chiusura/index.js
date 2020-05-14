import React from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../Redux/actions/index";
import Header from "../shared/Header";
import InputDataCon from "../shared/InputDataCon";
import Modal from "../../Modal";
import "./Chiusura.css";
import history from "../Routers/history";

class Chiusura extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonOption: true,
      showModal: false,
      showModalChiusura: false,
      chiusuraODP: false,
    };
  }
  componentDidMount() {
    this.props.fetchForChiusuraLavorazione(this.props.Barcode.BarcodeSelected);

    if (this.props.Barcode.Status === "Chiusura ODP") {
      this.setState({ chiusuraODP: true });
    }
  }
  renderActions() {
    return (
      <React.Fragment>
        <button
          onClick={() => {
            history.push("/Riporto");
            this.props.editBarcodeStatus(this.props.Barcode.BarcodeSelected, {
              status: "Chiusura Sospesa",
            });
          }}
          className="ui button negative"
        >
          Yes
        </button>
        <button
          onClick={() =>
            this.setState({ showModal: false, chiusuraODP: false })
          }
          className="ui button"
        >
          Cancel
        </button>
      </React.Fragment>
    );
  }
  renderActionsChiusuraBtn() {
    return (
      <React.Fragment>
        <button
          onClick={() => {
            history.push("/");
            this.setState({ chiusuraODP: true });
            this.props.setChiusuraODP();
            this.props.editBarcodeStatus(this.props.Barcode.BarcodeSelected, {
              status: "Chiusura ODP",
            });
          }}
          className="ui button negative"
        >
          Yes
        </button>
        <button
          onClick={() => this.setState({ showModalChiusura: false })}
          className="ui button"
        >
          Cancel
        </button>
      </React.Fragment>
    );
  }
  renderContent() {
    return "If yes, click 'Yes' to go back to Riporto. If no, click 'Cancel' to return to the Chiusura page.";
  }
  renderContentChiusuraBtn() {
    return "If yes, click 'Yes' to go to Ingresso. If not, click 'Cancel' to return to the Chiusura page.";
  }
  handlClickIndietro = () => {
    this.setState({ showModal: true });
  };
  handlClickChiusuraODP = () => {
    this.setState({ showModalChiusura: true });
  };

  render() {
    return (
      <div className="ChiusuraContainer">
        <Modal
          title="Go back to Riporto?"
          content={this.renderContent()}
          actions={this.renderActions()}
          show={this.state.showModal === true ? "visable active" : ""}
          onDismiss={() => this.setState({ showModal: false })}
        ></Modal>
        <Modal
          title="Are you sure you are finished with Chiusura?"
          content={this.renderContentChiusuraBtn()}
          actions={this.renderActionsChiusuraBtn()}
          show={this.state.showModalChiusura === true ? "visable active" : ""}
          onDismiss={() => this.setState({ showModalChiusura: false })}
        ></Modal>

        <Header
          headerText={"Chiusura lavorazione"}
          handlClick={this.handlClickIndietro}
          buttonName={"Indietro"}
          buttonOption={this.state.buttonOption}
        />
        <div className="BodyContainer">
          <InputDataCon
            dataTitle="Riferimenti ODP"
            dataIn={this.props.Barcode.BarcodeSelected}
            inputStyle="InputChiusuraStyle"
          />
          <InputDataCon
            dataTitle="Cliente"
            dataIn={this.props.Barcode.Cliente}
            inputStyle="InputChiusuraStyle"
          />
          <InputDataCon
            dataTitle="Articolo"
            dataIn={this.props.Barcode.Articolo}
            inputStyle="InputChiusuraStyle"
          />
          <InputDataCon
            dataTitle="Note"
            dataIn={this.props.Barcode.Note}
            inputStyle="InputChiusuraStyle"
          />
          <InputDataCon
            dataTitle="Quantita"
            dataIn={this.props.Barcode.Quantita}
            inputStyle="InputChiusuraStyle"
          />
        </div>
        <div className="BottomBodyChiusura">
          <InputDataCon
            dataTitle="Numero' pezzi lavorati"
            dataIn={this.props.Barcode.NumPezzi}
            inputStyle="InputChiusuraBottomStyle"
          />
          <InputDataCon
            dataTitle="Quantita' ancorante utilizzata (gr)"
            dataIn={this.props.Barcode.QuantitaAncoranteUtiliz}
            inputStyle="InputChiusuraBottomStyle"
          />
          <InputDataCon
            dataTitle="Quantita' riporto utilizzata (gr)"
            dataIn={this.props.Barcode.QuantitaRiportoUtilz}
            inputStyle="InputChiusuraBottomStyle"
          />
          <InputDataCon
            dataTitle="Durata lavorazione (min)"
            dataIn={this.props.Barcode.DurataLavorazione}
            inputStyle="InputChiusuraBottomStyle"
          />
          <InputDataCon
            dataTitle="Barcode uscita da postazione"
            dataIn="Striscia il barcode sulla scheda di lavorazione"
            inputStyle="InputChiusuraBottomStyle"
          />
        </div>
        <div className="FooterContainerAttrezzaggio">
          <button
            disabled={this.state.chiusuraODP}
            onClick={this.handlClickChiusuraODP}
            className="footerButtons"
          >
            Chiusura ODP
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actionCreators)(Chiusura);
