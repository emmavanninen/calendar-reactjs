import React, { Component } from "react";
import "../style/nav.css";
import { apiAuth, apiRegister, apiLogin, apiLogout } from "../api/api";
import setAuthJWT from "../api/setAuthJWT";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";
// import { Sonnet } from "react-bootstrap";


class Nav extends Component {
  state = {
    name: "",
    password: "",
    isAuth: false,
    loggedinas: "",
    errorMsg: false,
    errorToggle: false
  };

  componentDidMount = () => {
    apiAuth()
      .then(userObj => {
          console.log(`userObj`, userObj);
          
        this.setState(
          {
            isAuth: true,
            loggedinas: userObj.email
          },
          () => {
            console.log(`when hitting componentdidmount`);

            // this.props.appHandleAuthSubmit();
          }
        );
      })
      .catch(error => console.log(error));
  };

  appHandleAuthSubmit = () => {
    this.setState({
      isAuth: true
    });
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
        .then(result => {
          const { email } = result;
console.log(`result email?`, result);

          this.setState(
            {
              email: "",
              password: "",
              isAuth: true,
              loggedinas: email,
              errorToggle: false,
              errorMsg: ""
            },
            () => {
              console.log('you registered a user');
              
            }
          );
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
        email: this.state.email,
        password: this.state.password
      })
        .then(result => {
          const { email } = result;
          this.setState(
            {
              email: "",
              password: "",
              isAuth: true,
              loggedinas: email,
              errorToggle: false,
              errorMsg: ""
            },
            () => {
              console.log('poop');
              
            }
          );
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

  handleLogout = event => {
    this.setState(
      {
        isAuth: false
      },
      () => {
        //Todo: check api need
        apiLogout();
        localStorage.removeItem("jwtToken");
        setAuthJWT(null);
      }
    );
  };

  render() {
    return (
      <>
        <nav id="navigation" className="navbar">
          <h1 className="title">Venue Booking</h1>
          {this.state.isAuth ? (
            <form className="navbar-brand">
              <p>Logged in as {this.state.loggedinas}</p>
              <button onClick={this.handleLogout} className="logout-btn">
                Log Out
              </button>
            </form>
          ) : (
              <div className='login-register'>
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
                      <button className="btn">
                        Login
                      </button>
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
                    <button className="btn">
                      Register
                    </button>
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
