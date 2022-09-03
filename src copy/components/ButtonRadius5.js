/* @flow weak */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from '../common/Styles';
import RegularText from './RegularText';

export default class ButtonRadius5 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.5} onPress={this.props.onPress}>
          <View style={[styles.btnRad5, this.props.style]}>
            <RegularText style={[styles.btnRad5Text]}>
              {this.props.children}
            </RegularText>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
