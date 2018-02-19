import React from "react";
import { withRouter } from "react-router-dom";

const withRequestFlow = ({ onRequest, flag="", component }) => { 
  return WrappedComponent => {
    class ApiFlowWrapper extends React.Component {

      constructor(props){
        super(props)
        this.state = {
          isLoading: true,
          dataLoaded: false
        }
      }

      componentDidMount(){
        const { history,  } = this.props;
        const { dataLoaded } = this.state

        // detects back button pressing, dont fetch on back button
        if (!!dataLoaded) {
          return;
        }

        onRequest().then(this.onSuccess);
      }


      componentWillReceiveProps(nextProps) {
        const { history, location } = this.props;
        // detects refresh by navigating to same route
        if (
          history.action === "PUSH" &&
          nextProps.location.key !== location.key &&
          location.pathname === nextProps.location.pathname
        ) {
          this.setState({isLoading: true, dataLoaded: false})
          onRequest().then(this.onSuccess)
        }
      }

      onSuccess  = (result) => {
        let state = {};
        state[flag] = result
        state.dataLoaded = true
        state.isLoading = false
        this.setState(state);
      }

      render() {
        if (this.state.isLoading) {
          return component;
        }

        return <WrappedComponent {...this.props} {...this.state} />;
      }
    }
    return withRouter(ApiFlowWrapper);
  };
};

export default withRequestFlow;
