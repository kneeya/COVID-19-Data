import React, { Component } from "react";
import "./addnotes.css";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel(e) {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="additional-notes-wrap"
          onClick={(e) => this.togglePanel(e)}
        >
          <div className="additional">Additional Notes</div>

          <span class="material-icons">expand_more</span>
          {/* <div className="chev-right"></div>
            <div className="chev-left"></div> */}
        </div>
        {this.state.open ? <div className="notes">{this.props.notes}</div> : ""}
      </React.Fragment>
    );
  }
}

export default Add;
