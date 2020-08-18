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
import Cookies from 'universal-cookie';

const cookies = new Cookies();


export default class Home extends Component {
  state = {
    testUser: cookies.get('userN')
  };
  
  componentDidMount = () =>{
    console.log(this.state.testUser + "!!!")
    var name = this.state.testUser.split("@")[0];
  //   var cookies = new Cookies();
  //   var name = cookies.get('userN')
   this.setState({ testUser: name });
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
              inverted= 'true'
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
                {/* <h2 id="ut" className="under-title">
          -Collection-
        </h2> */}
                <Grid.Row>
                  <Grid.Column>
                    <div className="movie">
                      <h3
                        id="title"
                        className="wow"
                        style={{ color: "yellow" }}
                      >
                        Add a new Series
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
                  </Grid.Column>
                  <Grid.Column>
                    <div className="movie">
                      <h3 id="title">{this.state.testUser}</h3>
                      <div class="container">
                        <img
                          alt=""
                          id="pic2"
                          class="image"
                          src="https://image.tmdb.org/t/p/w500/vBaLz8kZNXYvTjHwrTewkTw3l7k.jpg"
                        />
                        <div className="colorOver">
                          <div class="overlay">
                            <Popup
                              content="Edit"
                              trigger={
                                <Button
                                  style={{
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    backgroundColor: "#faff72",
                                    color: "black",
                                  }}
                                  icon="edit outline"
                                />
                              }
                            />

                            <div>
                              <DropStatus id="dropStyle" />
                            </div>

                            <p className="desc">
                              Lorem ipsum dolor sit amet, consetetur sadipscing
                              elitr, sed diam nonumy eirmod tempor invidunt ut
                              labore et.Lorem ipsum dolor sit amet, consetetur
                              sadipscing elitr, sed diam nonumy eirmod tempor
                              invidunt ut labore et.Lorem ipsum dolor sit amet,
                              consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div className="movie">
                      <h3 id="title">Series Title</h3>
                      <div class="container">
                        <img
                          id="pic2"
                          alt=""
                          class="image"
                          src="https://cdn.flickeringmyth.com/wp-content/uploads/2020/02/The-Letter-for-the-King-poster-600x889.jpg"
                        />
                        <div className="colorOver">
                          <div class="overlay">
                            <Popup
                              content="Edit"
                              trigger={
                                <Button
                                  style={{
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    backgroundColor: "#faff72",
                                    color: "black",
                                  }}
                                  icon="edit outline"
                                />
                              }
                            />

                            <div>
                              <DropStatus id="dropStyle" />
                            </div>

                            <p className="desc">
                              Lorem ipsum dolor sit amet, consetetur sadipscing
                              elitr, sed diam nonumy eirmod tempor invidunt ut
                              labore et.Lorem ipsum dolor sit amet, consetetur
                              sadipscing elitr, sed diam nonumy eirmod tempor
                              invidunt ut labore et.Lorem ipsum dolor sit amet,
                              consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div className="movie">
                      <h3 id="title">Series Title</h3>
                      <div class="container">
                        <img
                          alt=""
                          id="pic2"
                          class="image"
                          src="https://i.redd.it/xwjlz1zljf921.jpg"
                        />
                        <div className="colorOver">
                          <div class="overlay">
                            <Popup
                              content="Edit"
                              trigger={
                                <Button
                                  style={{
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    backgroundColor: "#faff72",
                                    color: "black",
                                  }}
                                  icon="edit outline"
                                />
                              }
                            />

                            <div>
                              <DropStatus id="dropStyle" />
                            </div>

                            <p className="desc">
                              Lorem ipsum dolor sit amet, consetetur sadipscing
                              elitr, sed diam nonumy eirmod tempor invidunt ut
                              labore et.Lorem ipsum dolor sit amet, consetetur
                              sadipscing elitr, sed diam nonumy eirmod tempor
                              invidunt ut labore et.Lorem ipsum dolor sit amet,
                              consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div className="movie">
                      <h3 id="title">Series Title</h3>
                      <div class="container">
                        <img
                          alt=""
                          id="pic2"
                          class="image"
                          src="https://www.indiewire.com/wp-content/uploads/2017/09/first-they-killed-my-father.jpg?w=674"
                        />
                        <div className="colorOver">
                          <div class="overlay">
                            <Popup
                              content="Edit"
                              trigger={
                                <Button
                                  style={{
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    backgroundColor: "#faff72",
                                    color: "black",
                                  }}
                                  icon="edit outline"
                                />
                              }
                            />

                            <div>
                              <DropStatus id="dropStyle" />
                            </div>

                            <p className="desc">
                              Lorem ipsum dolor sit amet, consetetur sadipscing
                              elitr, sed diam nonumy eirmod tempor invidunt ut
                              labore et.Lorem ipsum dolor sit amet, consetetur
                              sadipscing elitr, sed diam nonumy eirmod tempor
                              invidunt ut labore et.Lorem ipsum dolor sit amet,
                              consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div className="movie">
                      <h3 id="title">Series Title</h3>
                      <div class="container">
                        <img
                          alt=""
                          id="pic2"
                          class="image"
                          src="https://lh3.googleusercontent.com/proxy/mH59Yei7huqczx-Ps70qOJh30sxbRzVvGdrdE73GyzpfoOLBTx6XhXSUiQ0XIoMHSDVDLRpHrk84rhYg6pU2glpNgHLkqcLrSl0VbWEdDKlwee3ka0w5dkXWjppPRZt45sXILoKmZPrBZWzIQA7uDOAXPbZqZXBCkltcJvlo4imJw9YA0AFd0ITPaoUB5w"
                        />
                        <div className="colorOver">
                          <div class="overlay">
                            <Popup
                              content="Edit"
                              trigger={
                                <Button
                                  style={{
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    backgroundColor: "#faff72",
                                    color: "black",
                                  }}
                                  icon="edit outline"
                                />
                              }
                            />

                            <div>
                              <DropStatus id="dropStyle" />
                            </div>

                            <p className="desc">
                              Lorem ipsum dolor sit amet, consetetur sadipscing
                              elitr, sed diam nonumy eirmod tempor invidunt ut
                              labore et.Lorem ipsum dolor sit amet, consetetur
                              sadipscing elitr, sed diam nonumy eirmod tempor
                              invidunt ut labore et.Lorem ipsum dolor sit amet,
                              consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
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
