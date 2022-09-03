import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Colors from "../common/Colors";
import { Icon } from "native-base";
import { height, width } from "../config/theme";
import Constants from "../common/Constants";

export default function SearchView(props) {
  return (
    <View
      style={{
        // height: '32%',
        width: "90%",
        backgroundColor: Colors.white,
        marginTop: "5%",
        alignSelf: "center",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: "2%",
        paddingVertical: "2%",
        elevation: 15,
        shadowColor: Colors.grey,
        shadowRadius: 10,
        shadowOpacity: 0.5,
        shadowOffset: { x: 2, y: 2 },
      }}
    >
      <TextInput
        placeholder="Search Here"
        placeholderTextColor={Colors.grey}
        value={props.value}
        onChangeText={props.onChangeText}
        style={{
          height: "100%",
          width: "85%",
          fontFamily: Constants.fontRegular,
          fontSize: 18,
        }}
      />

      <Icon
        name="filter"
        style={{
          fontSize: width * 0.07,
          color: Colors.mango,
        }}
        onPress={props.onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
