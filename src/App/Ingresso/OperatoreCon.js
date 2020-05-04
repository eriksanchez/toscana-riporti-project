import React from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../Redux/actions";
import Operatore from "./Operatore";

class OperatoreCon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      OperatoreSelected: false,
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchOperatore();
  }
  onChange(selectedItem) {
    this.props.selectOperatore(selectedItem);
  }

  render() {
    const listOfOperatores = this.props.Operatore.OperatoreList.map((op) => {
      return {
        value: op.name,
        label: op.name,
      };
    });
    listOfOperatores.sort(function (a, b) {
      if (a.value < b.value) {
        return -1;
      }
      if (a.value > b.value) {
        return 1;
      }
      return 0;
    });
    return (
      <div>
        <Operatore
          OperatoreList={listOfOperatores}
          selectedValue={this.props.OperatoreSelected}
          handlChange={this.onChange}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actionCreators)(OperatoreCon);
