import React, {Component} from 'react'

class ErrorBoundaries extends Component {
	constructor(props) {
    super(props);
   this.state = { error: null, errorInfo: null };

  }
  componentDidCatch(error, errorInfo) {
        this.setState({
          error: error,
          errorInfo: errorInfo
        });
      }
 

  

  render() {
        if (this.state.errorInfo) {
          return (
            <div>
              <h2>Something went wrong.</h2>
              
            </div>
          );
        }

        return this.props.children;
      }
}

export default ErrorBoundaries