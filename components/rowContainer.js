import React from 'react';

import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Cube from './common/Cube';
import _ from 'lodash';

export default class RowContainer extends React.Component {
  styles = StyleSheet.create({
    row: {
      margin: 0,
      flex: 1,
      flexDirection: 'row',
    },
  });

  render() {
    const {updateScore, gameOver, row, level} = this.props;

    return (
      <View style={this.styles.row}>
        {_.map(row, (cubeValue, j) => {
          return (
            <Cube
              key={`column_${j}`}
              cubeValue={cubeValue}
              level={level}
              updateScore={updateScore}
              gameOver={gameOver}
            />
          );
        })}
      </View>
    );
  }
}
