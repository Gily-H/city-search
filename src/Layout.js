import React, { Component } from "react";

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      data: [],
    };
    this.fetch = false;
    this.baseUrl = "http://ctp-zip-api.herokuapp.com/city/";
  }

  componentDidUpdate(prevState) {
    console.log(this.state.city);

    if (this.fetch === true) {
      fetch(this.baseUrl + this.state.city.toUpperCase())
        .then((res) => res.json())
        .then((data) => {
          this.fetch = false;
          this.setState({ data: data });
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  }

  updateCity = (event) => {
    this.setState({ city: event.target.value });
    this.fetch = true;
  };

  getResults = () => {
    return this.state.data.map((zipcode) => <li>{zipcode}</li>);
  };

  render() {
    return (
      <div>
        <h1>City Search</h1>
        <div className="search">
          <p>Enter City</p>
          <input type="text" value={this.state.city} onChange={this.updateCity} />
          { this.state.city === "" ? <p></p> : this.fetch ? <p>no results</p> : <ul>{this.getResults()}</ul>}
        </div>
        <div className="cont"></div>
      </div>
    );
  }
}
