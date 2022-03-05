import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Button from './common/button';

const UPDATE_SCORE = 12;

export default class ReadyPage extends React.Component {
  styles = StyleSheet.create({
    title: {
      color: 'white',
      fontSize: 32,
      textAlign: 'center',
    },
    subtitle: {
      color: 'white',
      fontSize: 24,
      textAlign: 'center',
    },
    paragraph: {
      color: 'white',
      fontSize: 24,
      margin: 16,
    },
  });

  get instructions() {
    if (this.props.gameOver) {
      return "Oops... You seem to have touched one of the deadly cubes. Fear not! The God of this universe is merciful. Try again?"
    } else if (this.props.level === 1) {
      return "Your objective is to tap " + UPDATE_SCORE + " blue Cubes. Good luck!";
    } else if (this.props.level === 2) {
      return "Your objective is to tap " + UPDATE_SCORE + " blue Cubes. BUT all of the other Cubes are deadly so if you touch any of them... GAME OVER!"
    } else if (this.props.level >= 3) {
      return "You beat the game!!\nBonus rounds: From here on time accelerates. How far can you go? Tap " + UPDATE_SCORE + " blue Cubes to advance. BUT if you touch any other Cubes... Certain DEATH!"
    }
  }

  render() {
    const {setGameOver, gameOver, navigateTo, level} = this.props;
    if (!gameOver) {
      return (
        <View>
          <Text style={this.styles.title}>Play CubeChase!!!</Text>
          <Text style={this.styles.subtitle}>You are on level {level}</Text>
          <Text style={this.styles.paragraph}>{this.instructions}</Text>
          <Button
            title="Start Level"
            onPress={() => navigateTo('game')}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={this.styles.title}>GAME OVER!!!</Text>
          <Text style={this.styles.subtitle}>You finished on level {level}</Text>
          <Text style={this.styles.paragraph}>{this.instructions}</Text>
          <Button
            title="Try Again"
            onPress={() => {
              setGameOver(false);
              navigateTo('game');
            }}
          />
        </View>
      );
    }
  }
}
