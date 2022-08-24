import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { json } from "d3"

import ChartWrapper from './ChartWrapper';
import Table from './Table';

const URL = "https://scatterplot-d9e41-default-rtdb.firebaseio.com/.json";

class App extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    json(URL)
      .then(data => this.setState({ data }))
      .catch(error => console.log(error))
      .finally(() => "cleanup")
  };

  renderChart() {
    if (this.state.data.length === 0) {
      return "NO DATA YET"
    }
    return <ChartWrapper data={this.state.data} />;
  }

  updateData = (newData) => {
    this.setState({ data: newData });
  }

  render() {
    return (
      <div>
        <Navbar className="navbar" bg="dark" variant="dark">
          <Navbar.Brand>ScatterPlot</Navbar.Brand>
        </Navbar>
        <Container>
          <Row>
            <Col md={6} xs={12}>{this.renderChart()}</Col>
            <Col md={6} xs={12}><Table data={this.state.data} updateData={this.updateData} /></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
