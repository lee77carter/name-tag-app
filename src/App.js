// Importing necessary React components
import React, { Component } from "react";
import NameTagList from "./NameTagList.js";
import UserInput from "./UserInput.js";

// App component definition
class App extends Component {
  // Initial state with an empty array for names
  state = {
    names: [],
  };

  // Function to remove a name from the list based on its index
  removeName = (clickedIndex) => {
    // to learn how the .filter method works, check out https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    const filterCallback = (_, index) => index !== clickedIndex;
    const newNames = this.state.names.filter(filterCallback);
    this.setState({ names: newNames });
  };

  // Function to add a new name to the list
  addName = (name) => {
    // Creating a new array with the new name at the beginning
    const newNames = [name, ...this.state.names];
    this.setState({ names: newNames });
  };

  // Lifecycle method: Save names data to local storage after each updat
  componentDidUpdate() {
    const savedNameString = JSON.stringify(this.state.names);
    localStorage.setItem("savedNames", savedNameString);
  }

  // Lifecycle method: Read saved names data from local storage after first render
  componentDidMount() {
    const savedNamesStrings = localStorage.getItem("savedNames");
    if (savedNamesStrings) {
      const savedNames = JSON.parse(savedNamesStrings);
      this.setState({ names: savedNames });
    }
  }

  // Render method: Output the Name Tag Generator UI components
  render() {
    return (
      <div className="App">
        <h1>Name Tag Generator</h1>
        {/* UserInput component for adding names */}
        <UserInput addName={this.addName} />
        {/* NameTagList component for displaying and removing names */}
        <NameTagList names={this.state.names} removeName={this.removeName} />
      </div>
    );
  }
}

// Exporting the App component as the default export
export default App;
