import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  ChangeUserPassword,
  IsEdit,
  IsNotEdit,
  Clear
} from "./../actions/userActions";

import "./styles/EditProfile.css";
import "./styles/ChangePassword.css";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        password: "",
        verifyPassword: ""
      },
      error: "",
      error_status: false
    };
  }

  HandleOnBlur = e => {
    if (this.state.user.password !== this.state.user.verifyPassword) {
      this.setState(() => ({
        ...this.state,
        error: "Password does not match",
        error_status: true
      }));
    }
  };

  HandleSave = e => {
    e.preventDefault();
    if (
      (this.state.user.password || this.state.user.verifyPassword) === "" ||
      (this.state.user.password.trim() ||
        this.state.user.verifyPassword.trim()) === ""
    ) {
      this.setState(() => ({
        ...this.state,
        error: "Empty field not allowed",
        error_status: true
      }));
    } else {
      this.props.ChangeUserPassword(
        this.state.user,
        this.props.match.params.id
      );
      this.props.IsNotEdit();
    }
  };

  HandleCancel = e => {
    e.preventDefault();
    this.props.Clear();
    this.props.IsNotEdit();
    this.props.history.push("/login");
  };

  componentDidMount() {
    this.props.Clear();
    this.props.IsEdit();
    this.setState(() => ({
      ...this.state,
      error: ""
    }));
  }

  componentDidUpdate() {
    if (this.props.fetchInfo !== null) {
      this.props.IsNotEdit();
      this.props.Clear();
      this.props.history.push("/todos");
    } else {
      this.props.IsEdit();
    }
  }

  HandleInputChanges = e => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    this.props.Clear();
    this.setState(() => ({
      ...this.state,
      user: { ...this.state.user, [targetName]: targetValue },
      error: "",
      error_status: false
    }));
  };
  render() {
    return (
      <div className="EditProfile_wrapper">
        <div
          className=" login
        EditProfile"
        >
          <h1>Change Password</h1>
          <p>Enter your new password</p>
          <form onSubmit={this.HandleSubmit}>
            <div>
              <p className="show_hide">Password</p>
              <input
                autoFocus={true}
                type="password"
                name="password"
                required={true}
                value={this.state.password}
                onBlur={this.HandleOnBlur}
                onChange={this.HandleInputChanges}
                placeholder="Password"
              />
            </div>
            <div>
              <p className="show_hide">Verify Password</p>
              <input
                type="password"
                name="verifyPassword"
                required={true}
                value={this.state.verifyPassword}
                onBlur={this.HandleOnBlur}
                onChange={this.HandleInputChanges}
                placeholder=" Verify Password"
              />
            </div>
            <div>
              <button
                className={this.state.error ? "disabledbtn" : ""}
                onClick={this.HandleSave}
                disabled={
                  this.props.isLoading || this.state.error_status ? true : false
                }
              >
                Save
              </button>
              <button onClick={this.HandleCancel}>Cancel</button>
            </div>
            {(this.props.error || this.state.error) && (
              <p className="edit_profile_error">
                {this.props.error || this.state.error}
              </p>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetchInfo: state.User.fetchInfo,
    error: state.User.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ChangeUserPassword,
      IsEdit,
      IsNotEdit,
      Clear
    },
    dispatch
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChangePassword)
);
