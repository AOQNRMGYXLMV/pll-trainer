import * as React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { RubicCanvas } from './components/RubicCanvas';
import { Button, Container, Grid, Select, Header, DropdownProps } from 'semantic-ui-react';
import { randomInt } from './utils/math';
import { pllNames } from './cube/State';

const options = [{
  key: '-1', value: '-1', text: 'Color Neutral'
}, {
  key: '0', value: '0', text: 'Yellow'
}, {
  key: '1', value: '1', text: 'White'
}, {
  key: '2', value: '2', text: 'Red'
}, {
  key: '3', value: '3', text: 'Orange'
}, {
  key: '4', value: '4', text: 'Blue'
}, {
  key: '5', value: '5', text: 'Green'
}];

class App extends React.Component {
  state = {
    colorSelect: undefined,
    begin: false,
    pllIndex: 0,
    answerVisible: false,
  }

  onSelectChange = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    this.setState({
      colorSelect: Number(data.value),
    });
  }

  onBegin = () => {
    this.setState({ begin: true });
  }

  nextPLL = () => {
    this.setState({ pllIndex: randomInt(0, 21), answerVisible: false });
  }

  showAnswer = () => {
    if (!this.state.answerVisible) {
      this.setState({ answerVisible: true });
    }
  }

  public render() {
    const { colorSelect, begin, pllIndex, answerVisible } = this.state;
    return (
      <Container style={{ marginTop: '3em' }}>
        <Grid columns={2} stackable>
          <Grid.Column>
            <RubicCanvas
              colorScheme={colorSelect}
              pllIndex={pllIndex}
              cubeLength={200}
            />
          </Grid.Column>
          {!begin && <Grid.Column>
            <Header as="h2">Select U Face Color</Header>
              <Select
                fluid
                options={options}
                onChange={this.onSelectChange}
              />
              <Button onClick={this.onBegin} style={{width: '100%'}}>Go</Button>
          </Grid.Column>}
          {begin && <Grid.Column>
            <Grid stackable centered columns={1}>
              <Grid.Column textAlign="center">
                <Button.Group>
                  <Button onClick={this.nextPLL}>U</Button>
                  <Button onClick={this.nextPLL}>H</Button>
                  <Button onClick={this.nextPLL}>Z</Button>
                </Button.Group>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Button.Group color="red">
                  <Button onClick={this.nextPLL}>A</Button>
                  <Button onClick={this.nextPLL}>E</Button>
                </Button.Group>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Button.Group color="blue">
                  <Button onClick={this.nextPLL}>R</Button>
                  <Button onClick={this.nextPLL}>J</Button>
                  <Button onClick={this.nextPLL}>T</Button>
                  <Button onClick={this.nextPLL}>F</Button>
                </Button.Group>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Button.Group color="orange">
                  <Button onClick={this.nextPLL}>V</Button>
                  <Button onClick={this.nextPLL}>Y</Button>
                  <Button onClick={this.nextPLL}>N</Button>
                </Button.Group>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Button.Group color="olive">
                  <Button onClick={this.nextPLL}>G</Button>
                </Button.Group>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={this.showAnswer}>Show Answer:</Button>
                {answerVisible && <span>{pllNames[pllIndex]}</span>}
              </Grid.Column>
            </Grid>
          </Grid.Column>}
        </Grid>
      </Container>
    );
  }
}

export default App;
