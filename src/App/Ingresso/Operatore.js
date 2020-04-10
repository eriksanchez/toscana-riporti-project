import React from "react";
import CreatableSelect from "react-select/creatable";
import "./Operatore.css";
import * as actionCreators from "../../Redux/actions";
import { connect } from "react-redux";

class Operatore extends React.Component {
  render() {
    return (
      <div className="OperatoreContainer">
        <div>Operatore</div>
        <div>
          <CreatableSelect
            className="SelectStyle"
            isClearable
            onChange={this.props.handlChange}
            value={this.props.selectedValue}
            options={this.props.OperatoreList}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps, actionCreators)(Operatore);
