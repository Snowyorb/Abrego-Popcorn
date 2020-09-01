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
  Sticky,
  Sidebar,
  Menu,
  Modal,
  Input,
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
    this.saveElements = this.saveElements.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      testUser: cookies.get("userN"),
      currentUser: cookies.get("userN"),
      testTitle: "",
      movies: "HI",
      fixSeriesName: "",
      fixImageUrl: "",
      fixDescription: "",
      fixStatus: "",
      series: "",
      description: "",
      image: "",
      status: "",
      editId: "",
      editSeriesName: "",
      editDescription: "",
      editImageUrl: "",
      editStatus: "",
      open: false,
      showUpdate: false,
      activeEdit: false,
      activeRadio: false,
      selectedFilter: "",
      watchOpt: [
        {
          key: "c",
          value: "c",
          text: "Completed",
        },
        {
          key: "w",
          value: "w",
          text: "Currently Watching",
        },
        {
          key: "dr",
          value: "dr",
          text: "Dropped",
        },
        {
          key: "ww",
          value: "ww",
          text: "Want to Watch",
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

  modalPopUp = () => {
    return (
      <Modal
        // trigger={<Button>Show Modal</Button>}
        onClickOutside={this.handleCloseModal}
        onClose={() => this.setState({ open: false })}
        open={this.state.open}
      >
        <Modal.Header>Update Series</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleUpdate}>
            <label>Series Name</label>

            <Form.Field
              control={Input}
              inverted="true"
              onChange={(e) => this.setState({ editSeriesName: e.target.value })}
              name="series"
              defaultValue={this.state.editSeriesName}
              placeholder="Enter a series title"
            ></Form.Field>

            <label>Image Url</label>

            <Form.Field
              control={Input}
              inverted="true"
              onChange={(e) => this.setState({ editImageUrl: e.target.value })}
              name="image"
              defaultValue={this.state.editImageUrl}
              placeholder="Enter a short image url"
            ></Form.Field>

            <label>Description</label>

            <Form.Field
              control={TextArea}
              inverted="true"
              onChange={(e) =>
                this.setState({ editDescription: e.target.value })
              }
              name="description"
              defaultValue={this.state.editDescription}
              // value={this.state.editDescription}
              placeholder="Enter a short description"
              maxLength="250"
              // id="des-show"
            ></Form.Field>
            <Form.Field name="status">
              <label>Status</label>
              <Dropdown
                placeholder="Status"
                placeholder={this.state.editStatus}
                fluid
                defaultValue={this.state.editStatus}
                selection
                options={this.state.watchOpt}
                onChange={(e) =>
                  this.setState({ editStatus: e.target.textContent })
                }
              />
            </Form.Field>
            {/* <Form.Button type="submit">Submit</Form.Button> */}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => this.setState({ open: false })}
            style={{ backgroundColor: "pink" }}
            negative
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={this.handleUpdate}
            style={{ backgroundColor: "#d93f87" }}
            positive
          >
            Update
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  editObj = () => {
    const dataIn = {
      id: this.state.editId,
      seriesName: this.state.editSeriesName,
      imageUrl: this.state.editImageUrl,
      description: this.state.editDescription,
      user: this.state.currentUser,
      status: this.state.editStatus,
    };

    fetch(
      `https://lwtuvh36nl.execute-api.us-east-2.amazonaws.com/pop/findseries/${this.state.editId}`,
      {
        method: "put",
        body: JSON.stringify(dataIn),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        console.log(dataIn);
        console.log("!!!!?? YOU COMING?")
        this.getData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log(this.state.editId + " ID GETTING IN");
  };

  saveElements = (series, description, image, status, id) => {
    this.setState({showUpdate : true})
    this.setState({open : true})
    this.setState({ editSeriesName: series });
    this.setState({ editDescription: description });
    this.setState({ editImageUrl: image });
    this.setState({ editStatus: status });
    this.setState({editId: id})
    {
      this.editObj();
    }
    {
      this.getData();
    }
    
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
                            <br />
                            <br />
                            <div>
                              <h3
                                style={{ color: "#faff72", fontSize: "20px" }}
                              >
                                Status
                              </h3>
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
                             <h3
                                style={{ color: "#faff72", fontSize: "20px", marginBottom: "-2px" }}
                              >
                                Status
                              </h3>
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
                                    onClick={() =>
                                      this.saveElements(
                                        show.seriesName,
                                        show.description,
                                        show.imageUrl,
                                        show.status,
                                        show.id
                                      )
                                    }
                                    style={{
                                      backgroundColor: "#E6438F",
                                      color: "white",
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
                            <br />
                            <br />
                            <div>
                              <h3
                                style={{ color: "#faff72", fontSize: "20px", marginBottom: "-2px" }}
                              >
                                Status
                              </h3>
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
                             <h3
                                style={{ color: "#faff72", fontSize: "20px" }}
                              >
                                Description
                              </h3>
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
                                    onClick={() =>
                                      this.saveElements(
                                        show.seriesName,
                                        show.description,
                                        show.imageUrl,
                                        show.status,
                                        show.id
                                      )
                                    }
                                    style={{
                                      backgroundColor: "#E6438F",
                                      color: "white",
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

  handleUpdate = () => {
    this.setState({ open: false });
    // this.setState({ fixImageUrl: this.state.editImageUrl });
    // this.setState({ fixSeriesName: this.state.editSeriesName });
    // this.setState({ fixDescription: this.state.editDescription });
    // this.setState({ fixStatus: this.state.editStatus });



     console.log("EMPTY? : " + this.state.fixSeriesName + " " + this.state.fixStatus + " " + this.state.fixImageUrl + " "+ this.state.fixDescription)
     console.log("EDIT? : " + this.state.editSeriesName + " " + this.state.editStatus + " " + this.state.editImageUrl + " "+ this.state.editDescription)

    // if(this.state.fixImageUrl === ""){this.setState({fixImageUrl: this.state.editImageUrl}); console.log(this.state.fixImageUrl +" afsfasf" + this.state.editImageUrl)}
    // if(this.state.fixSeriesName === ""){this.setState({fixImageUrl: this.state.editSeriesName})}
    // if(this.state.fixDescription === ""){this.setState({fixImageUrl: this.state.editDescription})}
    // if(this.state.fixStatus === ""){this.setState({fixImageUrl: this.state.editStatus})}
    // {
      this.editObj();
    // }
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

  handleShow = () => this.setState({ active: true });
  handleHide = () => this.setState({ active: false });
  handleShowEdit = () => this.setState({ activeEdit: true });
  handleHideFilter = () => this.setState({ activeRadio: false });
  handleCloseModal = () =>
    this.setState({ open: false }, console.log("BITCH AINT CLOSING"));

  render() {
    const { active } = this.state;
    return (
      <Dimmer.Dimmable dimmed={active}>
        <Dimmer
          active={active}
          onClickOutside={this.handleHide}
          verticalAlign="top"
        >
    
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
              
          {/* <button
            type="button"
            onClick={() =>
              this.setState({ activeRadio: !this.state.activeRadio })
            }
          >
            Filter
          </button>
          {this.sideRadio()} */}
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
                  <div>{this.state.showUpdate ? this.modalPopUp() : null}</div>
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
