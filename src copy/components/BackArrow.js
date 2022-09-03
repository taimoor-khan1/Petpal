import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Images from '../common/Images';
import styles from '../common/Styles';

export default class BackArrow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.5} onPress={this.props.onPress}>
          <Image
            source={Images.arrowLeft}
            style={[styles.iconBack, this.props.style]}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
