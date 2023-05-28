import React, { Component } from "react";
import Home from "./home";
import TableData from "./tabledata";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      store: null,
      login: false,
      role: null,
    };

    this.Login = this.Login.bind(this);
  }

  componentDidMount() {
    this.storeCollector();
    // console.log(store);
  }

  storeCollector() {
    // console.log("Hello from storeCollector");
    let store = JSON.parse(localStorage.getItem("login"));
    this.setState({
      store: store,
    });
    if (store && store.login) {
      this.setState({
        login: true,
      });
    }
  }

  Login() {
    // console.log("from data", this.state);
    fetch("https://portal.payprocc.com/api/login", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      resp.json().then((result) => {
        console.log("result", result);
        localStorage.setItem(
          "login",
          JSON.stringify({
            login: true,
            access_token: result.access_token,
            refresh_token: result.refresh_token,
            role: result.role,
          })
        );
        this.setState({ login: true });
        this.storeCollector();
      });
    });
  }

  render() {
    const { login } = this.state;
    let role = null;
    if (typeof window !== "undefined") {
      role = localStorage.getItem("login")
        ? JSON.parse(localStorage.getItem("login")).role
        : null;
    }
    // const role= JSON.parse(localStorage.getItem('login')).role;
    console.log("role is : ", role);
    return (
      <>
        {!this.state.login ? (
          <div className="w-[30%] mx-auto mt-[10vh] ">
            <h1 className="text-4xl font-bold text-center my-10">
              Please Login
            </h1>
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="login"
                className="text-white font-semibold text-lg"
              >
                Login :
              </label>
              <input
                type="text"
                id="login"
                name="login"
                onChange={(event) => {
                  this.setState({ email: event.target.value });
                }}
                className="h-12 p-2 w-70vw border-[3px] border-green-500 rounded-lg text-white bg-gray-700 focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="password"
                className="text-white font-semibold text-lg"
              >
                Password :
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(event) => {
                  this.setState({ password: event.target.value });
                }}
                className="h-12 p-2 w-70vw border-[3px] border-green-500 rounded-lg text-white bg-gray-700 focus:outline-none"
              />
            </div>
            <button
              // type="submit"
              onClick={this.Login}
              className=" w-auto h-auto p-4 bg-green-500 text-white font-semibold rounded-lg my-4"
            >
              Submit
            </button>
          </div>
        ) : (
          <>
            {role === "external" ? (
              <Home role={role} />
              ) : (
                <TableData role={role} />
            )}
          </>
        )}
      </>
    );
  }
}

export default Login;
