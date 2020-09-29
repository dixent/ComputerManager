import React, { Component } from 'react';

export class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { computers: [] };
    }

    getComputers() {
        fetch("api/computers")
            .then(response => response.json())
            .then((computers) => {
                console.log(computers);
                this.setState({
                        computers: computers,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.getComputers()
    }

    returnComputer(computer) {
        return(
            <tr>
                <th scope="row">{computer.id}</th>
                <td>{computer.firm}</td>
                <td>{computer.version}</td>
                <td>{computer.price}</td>
                <td>{computer.year}</td>
            </tr>
        ) 
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Computers</h1>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Firm name</th>
                            <th scope="col">Version</th>
                            <th scope="col">Price</th>
                            <th scope="col">Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.computers.map((computer) => this.returnComputer(computer))}
                    </tbody>
                </table>
            </div>
        );
    }
}
