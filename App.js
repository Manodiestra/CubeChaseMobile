import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import GamePage from './components/GamePage';
import ReadyPage from './components/ReadyPage';

export default class AppContainer extends React.Component {
  styles = StyleSheet.create({
    topper: {
      flex: 0,
      backgroundColor: 'red',
    },
    wrapper: {
      backgroundColor: 'black',
      color: 'white',
      flex: 1,
    },
  });

  state = {
    route: 'ready',
    level: 1,
    gameOver: false,
  };

  routes = {
    ready: ReadyPage,
    game: GamePage,
  };

  get currentPageComponent() {
    const RouteComponent = this.routes[this.state.route];
    return (
      <RouteComponent
        navigateTo={this.navigateTo}
        updateLevel={this.updateLevel}
        level={this.state.level}
        setGameOver={this.setGameOver}
        gameOver={this.state.gameOver}
      />
    );
  }

  setGameOver = (setTo) => {
    this.setState({
      gameOver: setTo,
    });
  };

  updateLevel = update => {
    if (update) {
      console.log("LEVEL UP!!");
      this.setState(state => {
        const newState = {...state};
        newState.level = state.level + 1;;
        return newState;
      });
    }
  }

  navigateTo = route => {
    this.setState({route});
  };

  render() {
    return (
      <>
        <SafeAreaView style={this.styles.topper}></SafeAreaView>
        <SafeAreaView style={this.styles.wrapper}>
          {this.currentPageComponent}
        </SafeAreaView>
      </>
    );
  }
}
