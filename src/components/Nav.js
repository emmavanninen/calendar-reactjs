import React, { Component } from "react";
import "../style/nav.css";
import { apiAuth, apiRegister, apiLogin, apiLogout } from "../api/api";
import User from "./User";
import Title from "./Title";
import setAuthJWT from "../api/setAuthJWT";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";

class Nav extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    isAuth: false,
    loggedinas: "",
    errorMsg: false,
    errorToggle: false,
  };

  componentDidMount = () => {
    apiAuth()
      .then(decoded => {
        if (decoded === null) {
          this.setState({
            isAuth: false,
              email: '',
              name: '',
              loggedinas: ''
          });
        } else {
          this.setState({
            isAuth: true,
            email: decoded.email,
            name: decoded.name,
            loggedinas: decoded.name
          });
        }
        console.log(`decoded`, decoded);
      })
      .catch(error => console.log(error));
  };

  handleOnCHange = event => {
    this.setState({ [event.target.name]: event.target.value });
    //! log to see letter by letter
    //   console.log(this.state);
  };

  handleSubmitRegister = event => {
    event.preventDefault();

    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.email === ""
    ) {
      console.log("error");
    } else {
      apiRegister({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
        .then(decoded => {
          this.setState({
            email: decoded.email,
            password: "",
            isAuth: true,
            loggedinas: decoded.name,
            errorToggle: false,
            errorMsg: ""
          });
        })
        .catch(errormsg => {
          console.log(errormsg);

          this.setState({
            errorMsg: errormsg,
            errorToggle: true
          });
        });
    }
  };

  handleSubmitLogin = event => {
    event.preventDefault();

    if (this.state.email === "" || this.state.password === "") {
      console.log("error");
    } else {
      apiLogin({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
        .then(result => {
          this.setState({
            email: result.email,
            password: "",
            isAuth: true,
            loggedinas: result.name,
            errorToggle: false,
            errorMsg: ""
          });
        })
        .catch(errormsg => {
          console.log(errormsg);

          this.setState({
            errorMsg: errormsg,
            errorToggle: true
          });
        });
    }
  };

  handleLogout = user => {
    apiLogout(user)
      .then(result => {
        localStorage.removeItem("jwtToken");
        setAuthJWT(null);
        this.setState({
          isAuth: false,
          loggedinas: ""
        });
      })
      .catch();
  };

  loggedInUser = () => {
    if (this.state.isAuth) {
      return this.state.loggedinas;
    }
  };

  render() {
    return (
      <>
        <nav id="navigation" className="navbar">
          <Title />
          {this.state.isAuth ? (
            <form className="navbar-brand">
              <p>Logged in as</p>
              <User loggedInUser={this.state.loggedinas} />
              <button
                className="logout-btn"
                onClick={e => {
                  e.preventDefault();
                  this.handleLogout(this.state.email);
                }}
              >
                Log Out
              </button>
            </form>
          ) : (
            <div className="login-register">
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="profile" title="Login">
                  {" "}
                  <form
                    className="navbar-brand"
                    onSubmit={this.handleSubmitLogin}
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="form-control"
                      onChange={this.handleOnCHange}
                    ></input>
                    <input
                      type="text"
                      placeholder="Password"
                      name="password"
                      className="form-control"
                      onChange={this.handleOnCHange}
                    ></input>
                    <button className="btn">Login</button>
                  </form>
                </Tab>

                <Tab eventKey="register" title="Register">
                  <form
                    className="navbar-brand"
                    onSubmit={this.handleSubmitRegister}
                  >
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="name"
                      className="form-control"
                      onChange={this.handleOnCHange}
                    ></input>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="form-control"
                      onChange={this.handleOnCHange}
                    ></input>
                    <input
                      type="text"
                      placeholder="Password"
                      name="password"
                      className="form-control"
                      onChange={this.handleOnCHange}
                    ></input>
                    <button className="btn">Register</button>
                  </form>
                </Tab>
              </Tabs>
            </div>
          )}
        </nav>
      </>
    );
  }
}

export default Nav;
