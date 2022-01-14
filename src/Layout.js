import React, { Component } from "react";
import "./Layout.css";

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      data: [],
    };
    this.baseUrl = "http://ctp-zip-api.herokuapp.com/city/";
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.city !== this.state.city) {
      this.setState({ data: [] });
      fetch(this.baseUrl + this.state.city.toUpperCase())
        .then((res) => res.json())
        .then((data) => this.setState({ data: data }))
        .catch((error) => console.log(error));
    }
  }

  updateCity = (event) => {
    this.setState({ city: event.target.value });
  };

  getResults = () => {
    return this.state.data.map((zipcode) => <li>{zipcode}</li>);
  };

  render() {
    return (
      <div className="layout-container">
        <h1 className="header">City Search</h1>
        <label className="input-label">
          City:
          <input
            className="search-field"
            type="text"
            value={this.state.city}
            onChange={this.updateCity}
          />
        </label>
        {this.state.data.length ? (
          <div className="results-container">
            <ul className="results">{this.getResults()}</ul>
          </div>
        ) : (
          <p>No Results</p>
        )}
      </div>
    );
  }
}
