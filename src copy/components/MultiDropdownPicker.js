import React, { useState } from "react";
import {
  Dimensions,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import Colors from "../common/Colors";
import Constants from "../common/Constants";
import Images from "../common/Images";

const { width, height } = Dimensions.get("window");

export function MultiDropdownPicker(props) {
  let val = [props.label];
  let ids = [];
  if (props.value != undefined && props.value != "") {
    ids = props.value.toString().split(",");
    val = [];
    ids.forEach((x) => {
      let values = props.data.filter((y) => y.id == x);
      if (values.length > 0) {
        val.push(values[0][props.viewProperty]);
      }
    });
  }

  const renderList = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        selectMultipleValues(item);
        setShowModal(false);
      }}
      key={index.toString()}
      style={{
        width: "100%",
        backgroundColor: multiIds ? Colors.mango : null,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        marginVertical: 2,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: multiIds ? "white" : "black",
        }}
      >
        {item[props.viewProperty]}
      </Text>
    </TouchableOpacity>
  );

  const [multiVal, setMultiValue] = useState(val);
  const [multiIds, setMultiIds] = useState();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(props.data ?? []);

  const selectMultipleValues = (item) => {
    props.onChangeValue(item);
  };
  return (
    <View style={styles.card}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            width: "100%",
            backgroundColor: "rgba(52, 52, 52, 0.5)",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setShowModal(!showModal);
            }}
            style={{ flex: 1 }}
          />
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              shadowColor: "#c5c5c5",
              shadowOffset: { width: 5, height: 5 },
              shadowOpacity: 1.0,
              shadowRadius: 10,
              elevation: 10,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowModal(!showModal);
              }}
              style={{
                width: "100%",
                paddingHorizontal: 20,
                alignItems: "flex-end",
                marginTop: 20,
                padding: 5,
              }}
            ></TouchableOpacity>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: Colors.sickGreen }}>
                {props.name}
              </Text>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 10,
                  top: -5,
                  padding: 10,
                }}
                onPress={() => {
                  setShowModal(!showModal);
                }}
              >
                {/* <Image style={{ height: 15, width: 15, }} resizeMode="contain" source={Images.iconClose} /> */}
              </TouchableOpacity>

              <View
                style={{ width: "100%", marginTop: 10, alignItems: "center" }}
              >
                <View style={{ width: "100%", height: 150, marginBottom: 20 }}>
                  <View>
                    <FlatList
                      data={props.data}
                      renderItem={renderList}
                      keyExtractor={(i, idx) => idx.toString()}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          // paddingHorizontal: '1%',
          paddingRight: "5%",
        }}
        onPress={() => {
          setShowModal(true);
        }}
      >
        <Text style={styles.text}>
          {props.value ? props.value : props.name}
        </Text>

        <Image
          style={{
            height: width * 0.035,
            width: width * 0.035,
            tintColor: Colors.warmGrey,
          }}
          source={Images.iconArrowDown}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 15,
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.grey,
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowOffset: { x: 2, y: 2 },
    overflow: "visible",
    width: "100%",
    backgroundColor: Colors.white,
    paddingVertical: height * 0.02,
    paddingHorizontal: height * 0.01,
    // marginVertical: height * 0.01,
  },
  text: {
    fontSize: height * 0.022,
    paddingHorizontal: height * 0.022,
    color: Colors.grey,
    fontFamily: Constants.fontRegular,
    // marginLeft:height*0.03
  },
});
