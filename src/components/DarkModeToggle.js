import React from 'react';
import PropTypes from "prop-types";
import { isDarkModeEnabled } from "../services/dark-mode-service";
import { Moon, Sun } from "heroicons-react";

class DarkModeToggle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOn: isDarkModeEnabled()
    };
  }

  render() {
    return (
      <button
        type="button"
        onClick={() => {
          this.setState({ isOn: !this.state.isOn})
          this.props.action();
        }}
        className={`${this.state.isOn ? "bg-gray-800 focus:ring-offset-gray-900" : "bg-gray-200"} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={`${this.state.isOn ? "translate-x-5 bg-gray-600" : "translate-x-0 bg-white"} pointer-events-none relative inline-block h-5 w-5 rounded-full shadow transform ring-0 transition ease-in-out duration-200`}
        >
        <span
          className={`${this.state.isOn ? "opacity-0 ease-out duration-100" : "opacity-100 ease-in duration-200"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
        >
          <Sun className="h-4 w-4 text-yellow-400" />
        </span>
        <span
          className={`${this.state.isOn ? "opacity-100 ease-in duration-200" : "opacity-0 ease-out duration-100"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
        >
          <Moon className="h-3 w-3 text-white" />
        </span>
      </span>
      </button>
    )
  }
}

DarkModeToggle.propTypes = {
  action: PropTypes.func
}

export default DarkModeToggle;
