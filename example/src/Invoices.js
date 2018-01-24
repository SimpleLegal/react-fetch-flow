import React, { Component } from 'react'
import Loading from './Loading'
import {withFetchFlow} from 'redux-fetch-flow'
import { connect } from 'react-redux'
import {compose} from 'redux'


const enhance = compose(
  connect(({ app }) => {
    const { invoices } = app.invoices
    return {
      invoices
    }
  }),
  withFetchFlow({
    component: <Loading />,
    ref: 'todo',
    getFetchAction: props => ({
      type: "INVOICES_REQUESTED"
      //do something with props if needed
    })
  })
)

class Invoices extends Component {
  render(){
    return this.props.invoices.map(invoice => {
      <div>{invoice.name}</div>
    })
  }
}

export default enhance(Invoices)
