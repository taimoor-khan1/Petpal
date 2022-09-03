import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Constants from '../common/Constants';

export default class BoldText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={[styles.default, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  default: {
    fontFamily: Constants.fontBold,
  },
});
