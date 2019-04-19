import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import EventForm from "./component/EventForm";
import Gallery from "./container/Gallery";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      selectedEvent: { name: "", hashtag: "" }
    };
  }

  componentDidMount() {
    fetch("/api/events")
      .then(res => res.json())
      .then(events => {
        this.setState({ events });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedEvent.name === "" && this.state.events.length > 0) {
      this.setState({ selectedEvent: this.state.events[0] });
    }

    if (prevState.selectedEvent.id !== this.state.selectedEvent.id) {
      this.fetchSelectedEvent(this.state.selectedEvent);
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            path="/gallery"
            render={() => (
              <Gallery
                selectedEvent={this.state.selectedEvent}
                events={this.state.events}
                selectedValueHandler={this.selectedValueHandler}
              />
            )}
          />
          <Route
            path="/"
            render={() => (
              <EventForm addEventsHandler={this.addEventsHandler} />
            )}
          />
        </Switch>
      </div>
    );
  }

  selectedValueHandler = id => {
    const selectedEvent = this.state.events.find(event => event.id === id);
    this.setState({ selectedEvent });
  };

  addEventsHandler = eventInfo => {
    const { events } = this.state;
    events.unshift(eventInfo);
    this.setState({ events, selectedEvent: eventInfo });
  };

  fetchSelectedEvent = eventInfo => {
    //   const opts = {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(eventInfo)
    //   };
    //   fetch("/api/hashtag", opts)
    //     .then(res => res.json())
    //     .then(event => this.setState({ selectedEvent: event }));
  };
}

export default withRouter(App);
