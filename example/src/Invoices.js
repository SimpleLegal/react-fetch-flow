import React, { Component } from "react";
import Loading from "./Loading";
import { connect } from "react-redux";
import { compose } from "redux";
import { withFetchFlow } from 'react-fetch-flow'
import { onRequest } from "./fetch";
import { withRouter } from "react-router-dom";

const enhance = compose(
  connect(({ app }) => {
    const { invoices } = app;
    return {
      invoices
    };
  }),
  withFetchFlow({
    component: <Loading />,
    flag: "invoices",
    onRequest
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
