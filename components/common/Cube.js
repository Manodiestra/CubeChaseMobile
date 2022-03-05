import React from 'react';
import _ from 'lodash';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

export default class Cube extends React.Component {
  styles = StyleSheet.create({
    cube: {
      borderRadius: 4,
      padding: 8,
      flex: 1,
      margin: 8,
    },
    title: {
      color: 'white',
      fontSize: 24,
      alignSelf: 'center',
    },
  });

  get randomColor() {
    let value = this.props.cubeValue;
    return 'rgb(' + value[0] + ',' + value[1] + ',' + value[2] + ')';
  }

  handleCubePress = () => {
    let {cubeValue, gameOver, updateScore, level} = this.props;
    if (cubeValue[0] === 0 && cubeValue[1] === 0 && cubeValue[2] === 256) {
      updateScore();
    } else if (level === 2) {
      gameOver();
    } else {
      console.log('The user clicked cube value', cubeValue);
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={[this.styles.cube, {backgroundColor: this.randomColor}]}
        onPress={this.handleCubePress}
      />
    );
  }
}
