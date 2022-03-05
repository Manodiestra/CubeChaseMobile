import React from 'react';
import _ from 'lodash';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Cube from './common/Cube';
import RowContainer from './rowContainer';

const ROWS = 8;
const COLS = 5;
const UPDATE_SCORE = 12;

export default class GamePage extends React.Component {
  styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      color: 'white',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    title: {
      color: 'white',
      fontSize: 24,
      margin: 8,
    },
  });

  state = {
    score: 0,
    grid: null,
    timerId: null,
    timerValue: 10,
  };

  componentDidMount() {
    this.setState({
      grid: this.buildGrid(),
    });
    // starting the timer
    if (this.props.level <= 2) {
      this.timerId = setInterval(() => {
        this.setState(state => {
          const newState = {...state};
          newState.timerValue = state.timerValue - 1;
          return newState;
        });
      }, 1000);
    } else {
      this.timerId = setInterval(() => {
        this.setState(state => {
          const newState = {...state};
          newState.timerValue = state.timerValue - 1;
          return newState;
        });
      }, 1000 - this.props.level * 100);
    }
  }

  componentDidUpdate() {
    if (this.state.timerValue === 0) {
      this.props.navigateTo('ready');
    }
  }

  componentWillUnmount = () => {
    clearTimeout(this.timerId);
    if (this.props.level === 1) {
      if (this.state.score >= UPDATE_SCORE) {
        this.props.updateLevel(true);
      }
    } else if (this.props.level === 2) {
      if (this.state.score >= UPDATE_SCORE) {
        this.props.updateLevel(true);
      }
    } else if (this.props.level >= 2) {
      if (this.state.score >= UPDATE_SCORE) {
        this.props.updateLevel(true);
      }
    }
  };

  buildGrid() {
    let stack = [];
    if (this.props.level !== 1) {
      for (let i = 0; i < COLS * ROWS; i++) {
        stack.push([_.random(0, 256), _.random(0, 256), 0]);
      }
    } else {
      for (let i = 0; i < COLS * ROWS; i++) {
        stack.push([0, 0, 0]);
      }
    }
    stack[0] = [0, 0, 256];
    stack = _.shuffle(stack);
    const grid = _.map(_.range(0, ROWS), () => {
      return _.map(_.range(0, COLS), () => stack.pop());
    });
    return grid;
  }

  updateScore = () => {
    this.state.score++;
    this.setState({
      grid: this.buildGrid(),
    });
  };

  gameOver = () => {
    this.props.setGameOver(true);
    this.props.navigateTo('ready');
  };

  get rowComponents() {
    return _.map(this.state.grid, (row, i) => {
      return (
        <RowContainer
          row={row}
          key={`row_${i}`}
          level={this.props.level}
          updateScore={this.updateScore}
          gameOver={this.gameOver}
        />
      );
    });
  }

  render() {
    return (
      <SafeAreaView style={this.styles.container}>
        <View style={this.styles.header}>
          <Text style={this.styles.title}>Time is {this.state.timerValue}</Text>
          <Text style={this.styles.title}>Score is {this.state.score}</Text>
        </View>
        {this.rowComponents}
      </SafeAreaView>
    );
  }
}
