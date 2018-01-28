import React, { Component } from "react";
import Loading from "./Loading";
import { withFetchFlow } from "redux-fetch-flow";
import { connect } from "react-redux";
import { compose } from "redux";

const enhance = compose(
  connect(({ app }) => {
    const { invoices } = app;
    return {
      invoices
    };
  }),
  withFetchFlow({
    component: <Loading />,
    flag: "invoice",
    getFetchAction: props => ({
      type: "INVOICES_REQUESTED"
      //do something with props if needed
    })
  })
);

class Invoices extends Component {
  static defaultProps = {
    invoices: []
  };
  render() {
    return this.props.invoices.map((invoice, i) => {
      return <h2 key={i}>{invoice.name}</h2>;
    });
  }
}

export default enhance(Invoices);
