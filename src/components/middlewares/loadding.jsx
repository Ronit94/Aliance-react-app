import React, { Component } from "react";
import { Spin } from 'antd';
import './loading.css'
class LoaddingComponent extends Component {
  render() {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }
}

export default LoaddingComponent;
