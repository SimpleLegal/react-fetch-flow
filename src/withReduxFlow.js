import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


const withReduxFlow = ({ getFetchAction, flag="", component }) => {
  return WrappedComponent => {
    @connect(({ loading }) => {
      const isLoading = loading[`${flag}Loading`];
      const dataLoaded = loading[`${flag}Loaded`];
      return {
        isLoading,
        dataLoaded
      };
    })
    @withRouter
    class ApiFlowWrapper extends React.Component {
      componentDidMount() {
        const { history, dataLoaded } = this.props;

        let action = getFetchAction(this.props);

        // detects back button pressing, dont fetch on back button
        if (history.action === "POP" && !!dataLoaded) {
          return;
        }

        action.refs = {
          isLoading: `${flag}Loading`,
          dataLoaded: `${flag}Loaded`
        };
        this.props.dispatch(action);
      }

      componentWillReceiveProps(nextProps) {
        const { history, location } = this.props;
        // detects refresh by navigating to same route
        let action = getFetchAction(nextProps);
        if (
          history.action === "PUSH" &&
          nextProps.location.key !== location.key &&
          location.pathname === nextProps.location.pathname
        ) {
          action.refs = {
            isLoading: `${flag}Loading`,
            dataLoaded: `${flag}Loaded`
          };
          this.props.dispatch(action);
        }
      }

      render() {
        if (this.props.isLoading) {
          return component;
        }

        return <WrappedComponent {...this.props} />;
      }
    }
    return ApiFlowWrapper;
  };
};

export default withReduxFlow;
