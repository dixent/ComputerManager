import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class New extends Component {
    constructor(props) {
        super(props);
        this.state = { firm: '', version: '', year: 2020, price: 0.0 };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getComputer() {
        fetch("api/Computers/New", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then((data) => {
                debugger;
                console.log(data);

            },
                (error) => {
                    debugger;

                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    componentDidMount() {
      //  this.getComputer()

    }

    returnComputer(computer) {
        return (
            <tr>
                <th scope="row">{computer.computer_id}</th>
                <td>{computer.computer_firm}</td>
                <td>{computer.computer_version}</td>
                <td>{computer.computer_price}</td>
                <td>{computer.computer_year}</td>
            </tr>
        )
    }

    handleChange(event) {
        var target = event.target, value = target.value;
        this.setState({ [target.name]: value });
    }

    handleSubmit(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                computer: {
                    Firm: this.state.firm,
                    Version: this.state.version,
                    Price: parseFloat(this.state.price),
                    Year: parseInt(this.state.year)
                }
            })
        };
        fetch("api/computers", requestOptions)
            .then(response => response.json())
            .then((result) => {
                this.setState({
                    redirect_to_index: true,
                });
            },
 
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
        event.preventDefault();
    }

    render() {
        if (this.state.redirect_to_index) {
            return (<Redirect to="/computers" />);
        }
            return (
            <div className="container-fluid">
                <h1>New computer</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Firm name
                        <input name="firm" type="text" value={this.state.firm} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Version
                        <input name="version" type="text" value={this.state.version} onChange={this.handleChange} />
                    </label>
                    <label>
                        Price
                        <input name="price" type="number" value={this.state.price} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Year of issue
                        <input name="year" type="text" value={this.state.year} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Send" />
                </form>
            </div>
        );
    }
}
