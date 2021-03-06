import React, { Component } from "react";
// import {withRouter} from 'react-router-dom'
import "./styles/CreateTodo.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import {
  IsEditActivity,
  FetchOneTodo,
  Clear,
  IsEdit,
  IsNotEdit
} from "./../actions/TodoActions";

class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: {
        activity: "",
        _Id: ""
      },
      token: this.props.token
    };
  }

  handleOnInputChange = e => {
    this.props.Clear();
    e.persist();
    this.setState(() => ({
      update: {
        ...this.state.update,
        activity: e.target.value
      }
    }));
  };

  // getDerivedStateFromProps is the same as componentWillReceiveProps and its function is to change the state of a component if the props changes.
  static getDerivedStateFromProps(props, state) {
    if (props.viewedTodo._id !== state.update._id) {
      return {
        update: {
          activity: props.viewedTodo.activity,
          _id: props.viewedTodo._id
        }
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.Clear();
    this.props.IsEdit();
    if (this.props.amount === 0 || this.props.amount < 0) {
      return this.props.history.push("/fund", {
        background: {
          hash: "",
          pathname: "/todos",
          search: ""
        }
      });
    }
    this.props.FetchOneTodo(this.props.match.params.id, this.state.token);
  }

  handleOnSubmit = e => {
    e.preventDefault();
    if (this.state.update.activity !== this.props.viewedTodo.activity) {
      this.props.IsEditActivity(this.state.update, this.state.token);
    }
    // this.props.history.push("/todos");
  };

  handleOnCancel = e => {
    e.stopPropagation();
    this.props.Clear();
    this.props.IsNotEdit();
    this.props.history.push("/todos");
  };

  componentDidUpdate() {
    if (this.props.createError === null && !this.props.isEditing) {
      this.props.history.push("/todos");
    }
  }
  render() {
    return (
      <div className="EditTodo_modal">
        <div className="EditTodo_modalContent">
          <h1>Edit Todo</h1>
          <form onSubmit={this.handleOnSubmit}>
            <div>
              <label htmlFor="Activity">
                Edit Activity:
                <br />
              </label>
              <textarea
                value={this.state.update.activity}
                onChange={this.handleOnInputChange}
              ></textarea>
            </div>
            <div className="editBtn">
              <button type="submit">Save</button>
              <button className="Cancel" onClick={this.handleOnCancel}>
                Cancel
              </button>
            </div>
            {this.props.createError && (
              <p className="signup_error">{this.props.createError}</p>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { IsEditActivity, FetchOneTodo, Clear, IsEdit, IsNotEdit },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    createError: state.Todos.todoError,
    isEditing: state.Todos.isEditing,
    viewedTodo: state.Todos.viewedTodo,
    token: state.User.user.token.token,
    amount: state.User.Amount
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditTodo)
);
