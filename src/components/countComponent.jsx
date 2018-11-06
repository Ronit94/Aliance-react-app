import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0,
    address: {
      street: "",
      state: "",
      country: "",
      pincode: ""
    },
    tags: []
  };

  constructor() {
    super();
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <span className={this.getBadgesClass()}>{this.formatCount()}</span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={this.handleIncrement}
        >
          Increment
        </button>
        <ul>
          {this.state.tags.map(tags => (
            <li key={tags}>{tags}</li>
          ))}
        </ul>
      </React.Fragment>
    );
  }

  handleIncrement = () => {
    let tags = "tags " + this.state.count;
    this.state.tags.push(tags);
    this.setState({ count: this.state.count + 1 });
  };

  getBadgesClass() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
