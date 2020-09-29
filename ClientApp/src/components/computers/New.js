import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Col, Button } from 'react-bootstrap';

export class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firm: '', version: '', year: 2020, price: 0.0, validated: false,
            errors: {
                firm: [], version: [], price: [], year: []
            }
        };

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
            .then(response => response.text())
            .then((data) => {
             
            },
                (error) => {
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
            .then(response => response.text())
            .then((result) => {
                try {
                    const data = JSON.parse(result);
                    var errors = this.state.errors;
                    for (const [attribute, dataAttribute] of Object.entries(data)) {
                        errors[attribute.toLowerCase()] = dataAttribute.errors.map((error) => error["errorMessage"]);
                    }
                    this.setState({ errors: errors, validated: true });
                } catch (err) {
                    this.setState({
                        redirect_to_index: true,
                    });
                }
            },
 
                (error) => {
                    debugger;

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
        const { validated } = this.state;
            return (
            <div className="container-fluid">
                    <h1>New computer</h1>
                    <Form noValidate className={validated ? 'was-validated' : ''} onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="Firm">
                                <Form.Label>Firm name</Form.Label>
                                <Form.Control
                                    required
                                    name="firm"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.firm}
                                />
                                <Form.Control.Feedback type="invalid">{this.state.errors['firm'].join("\n")}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="Version">
                                <Form.Label>Version</Form.Label>
                                <Form.Control
                                    required
                                    name="version"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.version}
                                />
                                <Form.Control.Feedback type="invalid">{this.state.errors['version'].join("\n")}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="Price">
                                <Form.Label>Price, $</Form.Label>
                                <Form.Control
                                    required
                                    name="price"
                                    type="number"
                                    onChange={this.handleChange}
                                    value={this.state.price}
                                />
                                <Form.Control.Feedback type="invalid">{this.state.errors['price'].join("\n")}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="Year">
                                <Form.Label>Year</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="year"
                                    onChange={this.handleChange}
                                    value={this.state.year}
                                />
                                <Form.Control.Feedback type="invalid">{this.state.errors['year'].join("\n")}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit">Submit</Button>
                    </Form>
            </div>
        );
    }
}
