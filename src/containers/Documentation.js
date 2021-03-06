import React, { Component } from 'react';

class Documentation extends Component {
    render () {
        return (
            <div>
                <h1>Problem Statement</h1>
                <p>Implement a React component "AirportChooser" which is a button used to select one of many airports. The button when clicked should show a dropdown with list of all available airports. Each airport should display its name, city/country, and airport code. Display a loading state in case list of airports is not ready initially. Ensure the component can effectively support a large number of airports (40,000+). Include CSS styles for the component as well as a usage example. Do not use any 3rd party components for this project, only React itself. The actual list of airports should not be hardcoded in the component, but uploaded from a file. This list of airports may be useful for testing: https://gist.github.com/tdreyno/4278655</p>
            </div>
        );
    }
}

export default Documentation;