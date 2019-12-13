import React, { Component } from "react";
import "../style/nav.css";
import { apiAuth, apiRegister, apiLogin, apiLogout } from "../api/api";
import setAuthJWT from "../api/setAuthJWT";
import "bootstrap/dist/css/bootstrap.min.css";

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
            loggedinas: userObj.name
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
      this.state.name === ""
    ) {
      console.log("error");
    } else {
      apiRegister({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
        .then(result => {
          const { name } = result;
console.log(`result email?`, result);

          this.setState(
            {
              email: "",
              password: "",
              isAuth: true,
              loggedinas: name,
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
          const { name } = result;
          this.setState(
            {
              email: "",
              password: "",
              isAuth: true,
              loggedinas: name,
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
          <a href="/" className="navbar-brand">
            Venue Booking
          </a>
          {this.state.isAuth ? (
            <form className="navbar-brand">
              <p>Logged in as {this.state.loggedinas}</p>
              <button onClick={this.handleLogout} className="logout-btn">
                Log Out
              </button>
            </form>
          ) : (
            <>
              <form
                className="navbar-brand"
                onSubmit={this.handleSubmitRegister}
              >
                {/* <span
                style={{ padding: "0px" }}
                className={this.state.errorToggle ? "error-warning" : ""}
              >
                {this.state.errorToggle ? this.state.errorMsg : ""}
              </span> */}
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  className="form-control"
                  onChange={this.handleOnCHange}
                ></input>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="form-control"
                  onChange={this.handleOnCHange}
                ></input>
                <input
                  type="text"
                  placeholder="password"
                  name="password"
                  className="form-control"
                  onChange={this.handleOnCHange}
                ></input>
                <button className="btn btn-outline-success my-2 my-sn-0">
                  Register
                </button>
              </form>

              <form className="navbar-brand" onSubmit={this.handleSubmitLogin}>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="form-control"
                  onChange={this.handleOnCHange}
                ></input>
                <input
                  type="text"
                  placeholder="password"
                  name="password"
                  className="form-control"
                  onChange={this.handleOnCHange}
                ></input>
                <button className="btn btn-outline-success my-2 my-sn-0">
                  Login
                </button>
              </form>
            </>
          )}
        </nav>
      </>
    );
  }
}

export default Nav;
