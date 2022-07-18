import React from "react";
import axios from "axios";
import Pattern from "../assets/pattern-bg.png";
import SearchIcon from "../assets/icon-arrow.svg";
import "./index.styles.scss";
import Map from "../assets/map_demo.JPG";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedIP: "empty",
      geoApi: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchInput = this.searchInput.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ searchedIP: event.target.value });
    console.log(this.state.searchedIP);
  }

  searchInput(event) {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_5tj3NdYRAfJdJArEDpmQlAObspU26&ipAddress=${this.state.searchedIP}`
      )
      .then((geoapi) => {
        console.log("here", geoapi.data.location);
        this.setState({ geoApi: geoapi.data.location });
      });
  }

  componentDidMount() {
    axios
      .get(" https://api.ipify.org/?format=json")
      .then((response) => {
        console.log(response.data);
        this.setState({
          searchedIP: response.data.ip,
        });
        return axios.get(
          `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_5tj3NdYRAfJdJArEDpmQlAObspU26&ipAddress=${response.data.ip}`
        );
      })
      .then((geoapi) => {
        console.log("here", geoapi.data.location);
        this.setState({ geoApi: geoapi.data.location });
      });
  }

  render() {
    console.log(this.state.searchedIP);
    return (
      <div>
        <div
          className="navbar"
          style={{
            backgroundImage: `url(${Pattern})`,
          }}
        >
          <div className="page-heading">IP Address Tracker</div>
          <div className="searchbar-parent">
            <input
              className="search-bar"
              type="text"
              onChange={this.handleChange}
              placeholder="Search for any IP address"
            ></input>

            <button className="search-button" onClick={this.searchInput}>
              <img className="search-icon" src={SearchIcon}></img>
            </button>
          </div>
        </div>
        <div className="info-card">
          <div>
            <span className="heading">IP address</span> <br />
            <span className="textContent">{this.state.searchedIP}</span>
          </div>
          <div>
            <span className="heading">Location</span>
            <br />
            <span className="textContent">
              {this.state.geoApi.country},{this.state.geoApi.city},
            </span>
            <br />
            <span className="textContent">{this.state.geoApi.postalCode}</span>
          </div>
          <div>
            <span className="heading">Timezone</span>
            <br />
            <span className="textContent">{this.state.geoApi.timezone}</span>
          </div>
          <div style={{ border: "none" }}>
            {" "}
            <span className="heading">ISP</span>
            <br />
            <span className="textContent">{this.state.geoApi.region}</span>
          </div>
        </div>
        <div>
          <img style={{ width: "100%", height: "100%" }} src={Map}></img>
        </div>
      </div>
    );
  }
}
export default Profile;
