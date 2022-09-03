import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';

import {Icon} from 'native-base';
import Colors from '../common/Colors';
import Constants from '../common/Constants';

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      disabled = false,
      onPress = null,
      placeholder = 'Search here...',
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={disabled ? 0.7 : 1.0}
        style={[
          {
            flexDirection: 'row',
            backgroundColor: Colors.white,
            borderRadius: 10,
            marginVertical: 10,
            elevation: 15,
            shadowColor: Colors.grey,
            shadowRadius: 10,
            shadowOpacity: 0.5,
            shadowOffset: {x: 2, y: 2},
          },
          this.props.style,
        ]}
        onPress={disabled ? onPress : null}>
        <View
          style={{
            width: 30,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 15,
          }}>
          <Icon
            name="search"
            style={{
              width: 22,
              height: 22,
              fontSize: 20,
              color: Colors.deepBlue,
              textAlign: 'center',
              marginTop: 5,
            }}
          />
        </View>
        <TextInput
          ref={'search'}
          placeholder={placeholder}
          placeholderTextColor={Colors.brownGrey}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          blurOnSubmit={true}
          returnKeyType={'done'}
          editable={!disabled}
          onChangeText={text => {
            this.setState({
              search: text,
            });
          }}
          style={{
            fontFamily: Constants.fontRegular,
            fontSize: 16,
            height: 50,
            flex: 1,
            paddingHorizontal: 10,
            color: Colors.black,
          }}
        />
        <View
          style={{
            width: 30,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 15,
          }}>
          <Icon
            name="filter"
            style={{
              width: 22,
              height: 22,
              fontSize: 20,
              color: Colors.mango,
              textAlign: 'center',
              marginTop: 5,
            }}
            onPress={disabled ? null : onPress}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export {SearchBox};
