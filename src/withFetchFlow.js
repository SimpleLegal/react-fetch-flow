import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


const withFetchFlow = ({ getFetchAction, ref="", loadingComponent }) => {
  return WrappedComponent => {
    @connect(({ loading }) => {
      const isLoading = loading[`${ref}Loading`];
      const dataLoaded = loading[`${ref}Loaded`];
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
          isLoading: `${ref}Loading`,
          dataLoaded: `${ref}Loaded`
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
            isLoading: `${ref}Loading`,
            dataLoaded: `${ref}Loaded`
          };
          this.props.dispatch(action);
        }
      }

      render() {
        if (this.props.isLoading) {
          return loadingComponent;
        }

        return <WrappedComponent {...this.props} />;
      }
    }
    return ApiFlowWrapper;
  };
};

export default withFetchFlow;
