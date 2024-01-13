import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

class GeneralInfoForm extends React.Component {
  state = {
    pk: 0,
    EventTitle: "",
    EventDate: "",
    EventTime: "",
    EventLocation: "",
    EventAddress: "",
  };

  componentDidMount() {
    if (this.props.student) {
      const { pk, EventTitle, EventDate, EventTime, EventLocation, EventAddress } = this.props.student;
      this.setState({ pk, EventTitle, EventDate, EventTime, EventLocation, EventAddress });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createStudent = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  editStudent = (e) => {
    e.preventDefault();
    console.log(this.state.name);
  };

  defaultIfEmpty = (value) => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form
        onSubmit={this.props.student ? this.editStudent : this.createStudent}
      >
        <FormGroup>
          <TextField
            autoFocus
            style={{ float: "left" }}
            margin="dense"
            name="EventTitle"
            label="Event Title"
            type="text"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.EventTitle)}
            fullWidth
          />
        </FormGroup>
        <FormGroup>
          <TextField
            autoFocus
            style={{ float: "left" }}
            margin="dense"
            name="EventDate"
            label="Event Date"
            type="Date"
            InputLabelProps={{ shrink: true, required: false }}
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.EventDate)}
            fullWidth
          />
        </FormGroup>
        <FormGroup>
          <TextField
            autoFocus
            style={{ float: "left" }}
            margin="dense"
            name="EventTime"
            label="Event Time"
            type="text"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.EventTime)}
            fullWidth
          />
        </FormGroup>
        <FormGroup>
          <TextField
            autoFocus
            style={{ float: "left" }}
            margin="dense"
            name="EventLocation"
            label="Event Location"
            type="text"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.EventLocation)}
            fullWidth
          />
        </FormGroup>
        <FormGroup>
          <TextField
            autoFocus
            style={{ float: "left" }}
            margin="dense"
            name="EventAddress"
            label="Event Address"
            type="text"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.EventAddress)}
            fullWidth
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default GeneralInfoForm;
