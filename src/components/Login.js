import React, { Fragment, Component } from "react";
import { withRouter, Link } from "react-router-dom";

import axios from "../config/axios";
import Spinner from "../UI/Spinner";
import { encryptData, decryptData } from "../util/encryption";

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: "",
  };
  render() {
    return (
      <div>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100 p-t-50 p-b-90">
              {
                this.state.loading ? (
                  <Spinner />
                ) : (
                  <Fragment>
                    {/* // <form className="login100-form validate-form flex-sb flex-w"> */}
                    <span className="login100-form-title p-b-51">Login</span>

                    <div
                      className="wrap-input100 validate-input m-b-16"
                      data-validate="Username is required"
                    >
                      <input
                        className="input100"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.changeTextHandler}
                      />
                      <span className="focus-input100"></span>
                    </div>

                    <div
                      className="wrap-input100 validate-input m-b-16"
                      data-validate="Password is required"
                    >
                      <input
                        className="input100"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.changeTextHandler}
                      />
                      <span className="focus-input100"></span>
                    </div>

                    <div className="flex-sb-m w-full p-t-3 p-b-24">
                      {/* <div className="contact100-form-checkbox">
                                        <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                                        <label className="label-checkbox100" htmlFor="ckb1">
                                            Remember me
                                        </label>
                                    </div> */}

                      <div>
                        <Link to="/forgotpwd" className="txt1">
                          Forgot?
                        </Link>
                      </div>
                    </div>
                    <div className="flex-sb-m w-full p-t-3 text-danger">
                      {this.state.error}
                    </div>
                    <div className="container-login100-form-btn m-t-17">
                      <button
                        className="login100-form-btn"
                        onClick={this.login}
                      >
                        Login
                      </button>
                    </div>
                  </Fragment>
                )
                // </form> /
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (
      localStorage.getItem("Auth_token") !== null &&
      localStorage.getItem("Auth_token") !== undefined
    ) {
      this.props.history.push("/dashboard");
    }
  }

  login = (e) => {
    // const history = createHistory();
    // debugger;
    // e.preventDefault();
    const payload = {
      username: this.state.username,
      password: this.state.password,
    };
    // let data = crypto.AES.encrypt(JSON.stringify(params), env.encryptKey).toString();
    // let data = crypto.AES.encrypt(JSON.stringify(payload), config.cipherKey).toString();
    // console.log(data);
    if (payload.username.length < 2) {
      this.setState({ error: "Please enter a username" });
    } else if (payload.password.length < 1) {
      this.setState({ error: "Please enter a password" });
    } else {
      this.setState({ error: "", loading: true });
      // let data = crypto.AES.encrypt(
      //   JSON.stringify(payload),
      //   config.key
      // ).toString();
      let data = encryptData(payload);
      axios.post("admin/auth/login", { data }).then(
        (response) => {
          data = decryptData(response.data);
          // let data = response.data;
          if (data.status === 1) {
            this.setState({ loading: false });
            this.props.changeLogin();
            localStorage.setItem("Auth_token", data.token);
            this.props.history.push("/dashboard");
          } else if (data.status === 0) {
            this.setState({ loading: false, error: data.message });
          } else {
            this.setState({ loading: false, error: "Server Error!!!" });
          }
        },
        (error) => this.setState({ loading: false, error: error.message })
      );
    }
  };

  changeTextHandler = (e) => {
    let ctrlName = e.target.name;
    let ctrlValue = e.target.value;
    let newData = {
      ...this.state,
      [ctrlName]: ctrlValue,
    };

    this.setState(newData);
  };
}

export default withRouter(Login);
