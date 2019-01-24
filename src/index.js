import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component { // subb classing React.Component. borriwing functionality into our class
    state = { lat: null, errorMessage: '' };

    // same as below for initialising state since using component did mount, because babel will transpile it w/constructor

    // constructor(props) {
    //     super(props); // call to the parent's constructor function
    //     // Only time we do direct assignment to this.state
    //     this.state = { lat: null, errorMessage: '' };
    // }

    // Data loading code!
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({ lat: position.coords.latitude }),
            (err) => this.setState({ errorMessage: err.message })
        );
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }

        return <Spinner message="Please accept location request" />
    }

    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
