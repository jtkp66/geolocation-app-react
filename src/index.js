import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component { // subb classing React.Component. borriwing functionality into our class
    constructor(props) {
        super(props); // call to the parent's constructor function
                      // Only time we do direct assignment to this.state
        this.state = { lat: null, errorMessage: '' };

        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({ lat: position.coords.latitude });
            },
            (err) => {
                this.setState({ errorMessage: err.message });
            }
        );
    }
    
    render() {
        // Conditional rendering
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <div>Latitude: {this.state.lat}</div>
        }
        
        return <div>Loading...</div>
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
