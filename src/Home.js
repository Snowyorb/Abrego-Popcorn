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
  Radio,
  Sidebar,
  Menu,
} from "semantic-ui-react";
import add from "./images/add_icon.jpg";
import place from "./images/placeholder.jpg";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.delObj = this.delObj.bind(this);
    this.addObj = this.addObj.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      testUser: cookies.get("userN"),
      currentUser: cookies.get("userN"),
      testTitle: "",
      movies: "HI",
      newSeriesName: "",
      newImageUrl: "",
      newDescription: "",
      newStatus: "",
      series: "",
      description: "",
      image: "",
      status: "",
      activeEdit: false,
      activeRadio: false,
      selectedFilter: "",
      watchOpt: [
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
        {
          key: "ww",
          value: "ww",
          text: "Want to Watch",
          image: {
            avatar: true,
            src: "https://static.thenounproject.com/png/642123-200.png",
          },
        },
      ],
    };
  }

  componentDidMount = () => {
    console.log(this.state.testUser + "!!!");

    var cookies = new Cookies();
    var name = cookies.get("userN").split("@")[0];
    this.setState({ testUser: name });
    this.getData();
  };

  changeStatus(movieStatus) {
    console.log("current Status: " + movieStatus);
  }

  delObj = (movieId) => {
    console.log("delete: " + movieId);
    fetch(
      `https://lwtuvh36nl.execute-api.us-east-2.amazonaws.com/pop/findseries/${movieId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({ movies: json.body });
        this.getData();
      });
  };

  refresh = () => {
    window.location.reload(false);
  };

  addObj = () => {
    const data = {
      seriesName: this.state.newSeriesName,
      imageUrl: this.state.newImageUrl,
      description: this.state.newDescription,
      user: this.state.currentUser,
      status: this.state.newStatus,
    };
    fetch(
      `https://lwtuvh36nl.execute-api.us-east-2.amazonaws.com/pop/findseries`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    {
      this.handleHide();
      this.getData();
    }

    this.getData();
    console.log(
      "IT SAVED: " +
        this.state.newSeriesName +
        " " +
        this.state.newImageUrl +
        " " +
        this.state.newDescription +
        " " +
        this.state.newStatus
    );
  };

  getData() {
    console.log(this.state.search);

    let url = `https://lwtuvh36nl.execute-api.us-east-2.amazonaws.com/pop/series/${this.state.currentUser}`;

    fetch(url, {
      method: "GET",
      headers: { "Access-Control-Allow-Origin": "*" },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.body === undefined) {
          console.log("Please Login");
        } else {
          console.log(json.body);
          this.setState({
            movies: json.body.map((show, i) => {
              if (show.imageUrl == "") {
                show.imageUrl = place;
                return (
                  <Grid.Column key={i}>
                    <div className="movie">
                      <h3 id="title">{show.seriesName}</h3>
                      <div class="container">
                        <img
                          alt=""
                          id="pic2"
                          class="image"
                          src={show.imageUrl}
                        />
                        <div className="colorOver">
                          <div class="overlay">
                            <h4 className="ser">{show.seriesName}</h4>
                            <div>
                              <h3 style={{ color: "#faff72" }}>Status</h3>
                            </div>
                            <Dropdown
                              defaultValue
                              placeholder={show.status}
                              onChange={(e) =>
                                (show.status = e.target.textContent)
                              }
                              fluid
                              selection
                              options={this.state.watchOpt}
                              id="dropStyle"
                            />

                            <p className="desc">{show.description}</p>
                            <Button.Group icon>
                              <Popup
                                content="Delete"
                                trigger={
                                  <Button
                                    class="ui circular icon button"
                                    onClick={() => this.delObj(show.id)}
                                    style={{
                                      backgroundColor: "#5ECCFD",
                                      color: "white",
                                    }}
                                    icon="trash alternate outline"
                                  />
                                }
                              />
                              <Button.Or />
                              <Popup
                                content="Edit"
                                trigger={
                                  <Button
                                    style={{
                                      backgroundColor: "#faff72",
                                      color: "black",
                                    }}
                                    icon="edit outline"
                                  />
                                }
                              />
                            </Button.Group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid.Column>
                );
              } else {
                return (
                  <Grid.Column key={i}>
                    <div className="movie">
                      <h3 id="title">{show.seriesName}</h3>
                      <div class="container">
                        <img
                          alt=""
                          id="pic2"
                          class="image"
                          src={show.imageUrl}
                        />
                        <div className="colorOver">
                          <div class="overlay">
                            <h4 className="ser">{show.seriesName}</h4>
                            <div>
                              <h3 style={{ color: "#faff72" }}>Status</h3>
                            </div>
                            <Dropdown
                              placeholder={show.status}
                              defaultValue
                              fluid
                              selection
                              onChange={(e) =>
                                (show.status = e.target.textContent)
                              }
                              options={this.state.watchOpt}
                              id="dropStyle"
                            />

                            <p className="desc">{show.description}</p>
                            <Button.Group icon>
                              <Popup
                                content="Delete"
                                trigger={
                                  <Button
                                    class="ui circular icon button"
                                    onClick={() => this.delObj(show.id)}
                                    style={{
                                      backgroundColor: "#5ECCFD",
                                      color: "white",
                                    }}
                                    icon="trash alternate outline"
                                  />
                                }
                              />
                              <Button.Or />
                              <Popup
                                content="Edit"
                                trigger={
                                  <Button
                                    style={{
                                      backgroundColor: "#faff72",
                                      color: "black",
                                    }}
                                    icon="edit outline"
                                  />
                                }
                              />
                            </Button.Group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid.Column>
                );
              }
            }),
          });
        }
        return <div>{this.state.movies}</div>;
      });
  }

  handleSubmit = () => {
    this.setState({ newImageUrl: this.state.image });
    this.setState({ newDescription: this.state.description });
    this.setState({ newStatus: this.state.status });
    this.setState({ newSeriesName: this.state.series });
    console.log("HELLO?" + this.state.newSeriesName);
    {
      this.addObj();
    }
    {
      this.getData();
    }
  };

  sideRadio = () => {
    return (
      <Sidebar
      onClickOutside={this.handleHideFilter}
        as={Menu}
        animation="push"
        direction="top"
        icon="labeled"
        inverted
        vertical
        visible={this.state.activeRadio}
        width="thin"
      >
        <Menu.Item as="a">
          <Form.Field>
            <label className="rad">Completed</label>
            <Radio
              name="radioGroup"
              value="Completed"
              checked={this.state.selectedFilter === "Completed"}
              onChange={(e) => this.setState({ selectedFilter: "Completed" })}
            />
          </Form.Field>
        </Menu.Item>
        <Menu.Item as="a">
          <Form.Field>
            <label className="rad">Want to Watch</label>
            <Radio
              name="radioGroup"
              value="Want to Watch"
              checked={this.state.selectedFilter === "Want to Watch"}
              onChange={(e) =>
                this.setState({ selectedFilter: "Want to Watch" })
              }
            />
          </Form.Field>
        </Menu.Item>
        <Menu.Item as="a">
          <Form.Field>
            <label className="rad">Currently Watching</label>
            <Radio
              name="radioGroup"
              value="Completed"
              checked={this.state.selectedFilter === "Currently Watching"}
              onChange={(e) =>
                this.setState({ selectedFilter: "Currently Watching" })
              }
            />
          </Form.Field>
        </Menu.Item>
        <Menu.Item as="a">
          <label className="rad">Dropped</label>
          <Radio
            name="radioGroup"
            value="Dropped"
            checked={this.state.selectedFilter === "Dropped"}
            onChange={(e) => this.setState({ selectedFilter: "Dropped" })}
          />
        </Menu.Item>
      </Sidebar>
    );
  };

  renderRadio = () => {
    return (
      <div className="border">
        <Form.Field className="radTitle">
          Filter By: <b>{this.state.selectedFilter}</b>
        </Form.Field>
        <Form.Field>
          <label className="rad">Completed</label>
          <Radio
            name="radioGroup"
            value="Completed"
            checked={this.state.selectedFilter === "Completed"}
            onChange={(e) => this.setState({ selectedFilter: "Completed" })}
          />
        </Form.Field>
        <Form.Field>
          <label className="rad">Want to Watch</label>
          <Radio
            name="radioGroup"
            value="Want to Watch"
            checked={this.state.selectedFilter === "Want to Watch"}
            onChange={(e) => this.setState({ selectedFilter: "Want to Watch" })}
          />
        </Form.Field>
        <Form.Field>
          <label className="rad">Currently Watching</label>
          <Radio
            name="radioGroup"
            value="Completed"
            checked={this.state.selectedFilter === "Currently Watching"}
            onChange={(e) =>
              this.setState({ selectedFilter: "Currently Watching" })
            }
          />
        </Form.Field>
        <Form.Field>
          <label className="rad">Dropped</label>
          <Radio
            name="radioGroup"
            value="Dropped"
            checked={this.state.selectedFilter === "Dropped"}
            onChange={(e) => this.setState({ selectedFilter: "Dropped" })}
          />
        </Form.Field>
      </div>
    );
  };
  // showModal = () => {
  //   return  (<Modal
  //   closeOnEscape={closeOnEscape}
  //   closeOnDimmerClick={closeOnDimmerClick}
  //   open={open}
  //   onOpen={() => dispatch({ type: 'OPEN_MODAL' })}
  //   onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
  //   trigger={<Button>Show Modal</Button>}
  // >
  //   <Modal.Header>Delete Your Account</Modal.Header>
  //   <Modal.Content>
  //     <p>Are you sure you want to delete your account</p>
  //   </Modal.Content>
  //   <Modal.Actions>
  //     <Button onClick={() => dispatch({ type: 'CLOSE_MODAL' })} negative>
  //       No
  //     </Button>
  //     <Button onClick={() => dispatch({ type: 'CLOSE_MODAL' })} positive>
  //       Yes
  //     </Button>
  //   </Modal.Actions>
  // </Modal>)
  // }

  handleShow = () => this.setState({ active: true });
  handleHide = () => this.setState({ active: false });
  handleShowEdit = () => this.setState({ activeEdit: true });
  handleHideFilter = () => this.setState({ activeRadio: false });
  render() {
    const { active } = this.state;
    return (
      <Dimmer.Dimmable dimmed={active}>
        <Dimmer active={active} onClickOutside={this.handleHide}>
          <Header as="h2" icon inverted>
            <Icon name="tv" />
            Add a Show
          </Header>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field
              name="series"
              value={this.state.series}
              onChange={(e) => this.setState({ newSeriesName: e.target.value })}
            >
              <label className="show-me">Series Name</label>
              <input placeholder="Series Name" />
            </Form.Field>
            <Form.Field
              name="image"
              value={this.state.image}
              onChange={(e) => this.setState({ newImageUrl: e.target.value })}
            >
              <label className="show-me">Image Url</label>
              <input placeholder="Image Url" />
            </Form.Field>
            <label className="show-me">Description</label>

            <Form.Field
              control={TextArea}
              inverted="true"
              onChange={(e) =>
                this.setState({ newDescription: e.target.value })
              }
              name="description"
              value={this.state.newDescription}
              placeholder="Enter a short description"
              maxLength="250"
              id="des-show"
              className="show-me"
            ></Form.Field>
            <Form.Field name="status" value={this.state.status}>
              <label className="show-me">Status</label>
              <Dropdown
                placeholder="Status"
                fluid
                selection
                options={this.state.watchOpt}
                onChange={(e) =>
                  this.setState({ newStatus: e.target.textContent })
                }
              />
            </Form.Field>
            <Form.Button type="submit">Submit</Form.Button>
          </Form>
        </Dimmer>
        <Form></Form>
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

          <button type='button' onClick={()=> this.setState({activeRadio: !this.state.activeRadio})}>Filter</button>
          {this.sideRadio()}
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
                        Add a Series
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
                  </Grid.Column>
                  {this.state.movies}
                </Grid.Row>
              </Grid>
            </div>
          </div>
        </div>
      </Dimmer.Dimmable>
    );
  }
}
