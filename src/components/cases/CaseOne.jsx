import React from 'react';
import PropTypes from 'prop-types';

import Form from '../Form';

class CaseOne extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            calculatingRoute: ''
        };

        this.handleEnter = this.handleEnter.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    
    handleEnter(route) {
        const calculatingRoute = route.toUpperCase();
        this.setState({calculatingRoute});
    }

    calculateCost(route) {
        return this.props.graph.weightOfPathFromString(route);
    }

    handleReset() {
        this.setState({
            calculatingRoute: ''
        });
    }

    render() {
        return (
            <div>
                <h2>CaseOne. The delivery cost of route.</h2>
                <Form
                    caseForm
                    onEnter={this.handleEnter}
                    description="Enter the route to calcualte the cost of delivery. Only latin letters allowed (e.g. 'ABC', 'ADEF')"
                    placeholder="e.g. 'ABC', 'ADEF'"
                />
                <div>
                    {this.state.calculatingRoute &&
                    <div>
                        <div className="result">{this.calculateCost(this.state.calculatingRoute)}</div>
                        <button className="reset-case-button" onClick={this.handleReset}>RESET THE LAST COUNTED ROUTE</button>
                    </div>
                    }
                </div>
            </div>
        );
    }
}


export default CaseOne;