import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import "./home.css";
import BodyClassName from "react-body-classname";
// import "semantic-ui-css/semantic.min.css";
import {
  Dropdown,
  Popup,
  Button,
  Grid,
  Dimmer,
  Header,
  Icon,
  Form,
  TextArea,
} from "semantic-ui-react";
import add from "./images/add_icon.jpg";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.state = {
      testUser: cookies.get("userN"),
      currentUser: cookies.get("userN"),
      testTitle: "",
      movies: "HI"
    };
  }

  componentDidMount = () => {
    console.log(this.state.testUser + "!!!");
    var name = this.state.testUser;
    var cookies = new Cookies();
    var name = cookies.get('userN')
    this.setState({ testUser: name });
    this.getData();
  };

  getData() {


    console.log(this.state.search);

 
      let url = `https://lwtuvh36nl.execute-api.us-east-2.amazonaws.com/pop/series/${this.state.currentUser}`;

      fetch(url, {
        method: "GET",
        headers:{ 'Access-Control-Allow-Origin' : '*' }
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.body === undefined) {
            console.log("Please Login");
          } else {
            console.log(json.body);
            this.setState({
              testTitle: json.body[1].seriesName,
            });

           
            this.setState({
              movies: json.body.map((show, i) => {
              
                return (<div key={i}>{show.seriesName}</div>);
              })
            });

            
          }
          return (<div>{this.state.movies}</div>)
          
        });

    
  }

  handleShow = () => this.setState({ active: true });
  handleHide = () => this.setState({ active: false });
  render() {
    const { active } = this.state;
    const watchOpt = [
      {
        key: "c",
        value: "c",
        text: "Completed",
        image: {
          avatar: true,
          src:
            "https://cdn.iconscout.com/icon/free/png-256/checkmark-1767470-1502540.png",
        },
      },
      {
        key: "w",
        value: "w",
        text: "Currently Watching",
        image: {
          avatar: true,
          src: "https://static.thenounproject.com/png/2931158-200.png",
        },
      },
      {
        key: "dr",
        value: "dr",
        text: "Dropped",
        image: {
          avatar: true,
          src:
            "https://cdn0.iconfinder.com/data/icons/free-daily-icon-set/512/Wrong-512.png",
        },
      },
    ];

    const DropStatus = () => (
      <Dropdown placeholder="Status" fluid selection options={watchOpt} />
    );
    return (
      <Dimmer.Dimmable dimmed={active}>
        <Dimmer active={active} onClickOutside={this.handleHide}>
          <Header as="h2" icon inverted>
            <Icon name="tv" />
            Add a Show
          </Header>
          <Form>
            <Form.Field>
              <label className="show-me">First Name</label>
              <input placeholder="First Name" />
            </Form.Field>
            <Form.Field
              control={TextArea}
              label="Description"
              inverted="true"
              placeholder="Enter a short description"
              maxLength="250"
              id="des-show"
              className="show-me"
            ></Form.Field>
            <Form.Field>
              <label className="show-me">Status</label>
              <DropStatus id="dropStyle" />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
        </Dimmer>
        <div className="home-display" id="homeBody">
          <title>Popcorn - Home</title>
          <BodyClassName className="home-page" />
          <header>
            <h1 className="popcorn" id="t">
              Popcorn
            </h1>

            <Link to="/">
              <a className="navi" id="top" style={{}}>
                {this.state.testUser}, Logout
              </a>
            </Link>
          </header>
          <div id="movieStack">
            <div class="movieBlock">
              <Grid
                columns={3}
                stackable
                class="ui grid middle aligned"
                id="gridBoi"
              >
                <Grid.Row>
                  <Grid.Column>
                    <div className="movie">
                      <h3
                        id="title"
                        className="wow"
                        style={{ color: "yellow" }}
                      >
                        {this.state.testTitle}
                      </h3>
                      <div class="container">
                        <img
                          id="addle"
                          alt=""
                          class="image"
                          src={add}
                          onClick={this.handleShow}
                        />
                        <div className="colorOver">
                          <div class="overlayClone"></div>
                        </div>
                      </div>
                    </div>
                    {/* {this.getData()} */}
                    <h1>{this.state.movies}</h1>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </div>
        </div>
      </Dimmer.Dimmable>
    );
  }
}
