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
  //app states
  state = {
    data: [],
    activeName: null
  };

  //EFFECTS: fetch data on initial render 
  componentDidMount() {
    json(URL)
      .then(data => this.setState({ data }))
      .catch(error => console.log(error))
      .finally(() => "cleanup")
  };

  //EFFECTS: returns chart component if data has been fetched, returns string otherwise
  renderChart() {
    if (this.state.data.length === 0) {
      return "NO DATA YET"
    }
    return <ChartWrapper data={this.state.data}
      updateData={this.updateData}
      updateName={this.updateName} />;
  }

  //EFFECTS: updates data state
  updateData = (newData) => {
    this.setState({ data: newData });
  }

  //EFFECTS: updates name state
  updateName = (name) => {
    this.setState({ activeName: name })
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
            <Col md={6} xs={12}>
              <Table data={this.state.data}
                updateData={this.updateData}
                activeName={this.state.activeName} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
