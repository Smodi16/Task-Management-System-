import React from 'react';
import Select from 'react-select';
import { selectUserGroups } from '../../reducers/selectors';
import { withRouter } from 'react-router-dom';

class TaskCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      estTime: "",
      deadline: "",
      userId: null,
      groupId: null,
      validGroups: [],
      validUsers: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const task = {
      name: this.state.name,
      description: this.state.description,
      estTime: this.state.estTime,
      deadline: this.state.deadline,
      userId: this.state.userId.value,
      groupId: this.state.groupId.value
    };

    this.props.createTask(task);
    this.clearInput();
    this.props.snack();
  }

  clearInput() {
    this.setState({
      name: "",
      description: "",
      estTime: "",
      deadline: "",
      userId: null,
      groupId: null,
      validGroups: [],
      validUsers: []
    });
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleUserChange = user => {
    this.setState({userId: user})
  }

  handleGroupChange = group => {
    this.setState({ groupId: group })
  }

  updateDeadline(deadline) {
    return e => this.setState({
      deadline: e.currentTarget.value
    });
  }

  render() {
    if (!this.props.users) return null;

    let { users, groups, currentUserId } = this.props;
    let userOptions = [];
    users.forEach(user => {
      userOptions.push({
        label: user.username,
        value: user.id
      });
    });

    let groupOptions = [];
    const groupFilter = selectUserGroups(currentUserId, groups);
    groupFilter.forEach(group => {
      groupOptions.push({
        label: group.name,
        value: group._id
      });
    });


    return (
      <div className="task-modal-container">
        <div className="label">
          <h1>Create New Task</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <i className="fas fa-tasks prefix"></i>
              <input
                autoComplete="off"
                value={this.state.name}
                id="name" type="text"
                className="validate"
                onChange={this.update("name")}
              />
              <label htmlFor="name">Name of Task</label>
            </div>
            <div className="input-field col s6">
              <i className="fas fa-comment prefix"></i>
              <input
                autoComplete="off"
                value={this.state.description}
                id="description"
                type="text"
                className="validate"
                onChange={this.update("description")}
              />
              <label htmlFor="description">Additional Info</label>
            </div>
            <div className="input-field col s6">
              <i className="far fa-clock prefix"></i>
              <input
                autoComplete="off"
                value={this.state.estTime}
                id="estTime"
                type="number"
                className="validate"
                onChange={this.update("estTime")}
              />
              <label htmlFor="estTime">Estimated Time</label>
            </div>
            <div className="input-field col s6">
              <i className="far fa-calendar-alt prefix"></i>
              <input type="date" value={this.state.deadline} onChange={this.update("deadline")} />
            </div>
            <div className="input-field col s6">
              <i className="fas fa-user prefix"></i>
              <Select
                id="userId"
                value={this.state.userId}
                options={userOptions}
                isSearchable="true"
                placeholder="Assign To?"
                onChange={this.handleUserChange}
              />
            </div>
            <div className="input-field col s6">
              <i className="far fa-folder-open prefix"></i>
              <Select
                id="groupId"
                value={this.state.groupId}
                options={groupOptions}
                isSearchable="true"
                placeholder="Which Group?"
                onChange={this.handleGroupChange}
              />
            </div>
          </div>
          <div id="close-button">
            <button className="btn waves-effect waves-light modal-close" type="submit"> Create Task </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(TaskCreate);
