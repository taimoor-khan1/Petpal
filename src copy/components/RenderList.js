import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Colors from "../common/Colors";
import Constants from "../common/Constants";
import Images from "../common/Images";
import { height, width } from "../config/theme";
import CustomizedStarRating from "react-native-customized-star-rating";
import ButtonRadius5 from "../components/ButtonRadius5";
import { Touchable } from "react-native";

export default function RenderList(props) {
  let item = props.item;
  //   console.log(item);
  return (
    <View
      // onPress={props.onPress}
      style={styles.container}
    >
      <View
        style={{
          height: width * 0.35,
          width: width * 0.3,
          backgroundColor: Colors.mango,
        }}
      >
        <Image
          source={{
            uri: `${Constants.imageURL}${item.featured_image || item.image}`,
          }}
          style={{ flex: 1 }}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: height * 0.01,
          // paddingVertical: height * 0.0001,
        }}
      >
        <View style={[styles.row, { flex: 0.4 }]}>
          <Text style={styles.txt}>{item.name} </Text>
          {!props.search ? (
            <TouchableOpacity activeOpacity={0.6} onPress={props.markedpress}>
              <Image
                source={
                  item.IsFavourite
                    ? Images.iconHeartFilled
                    : Images.iconHeartUnfilled
                }
                style={{
                  height: width * 0.06,
                  width: width * 0.06,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.txt1}>Gender {item.gender} </Text>
          <Text style={styles.txt1}>Age: {item.age} </Text>
          <Text style={styles.txt1}>Rent: {item.rent} </Text>
          <View style={styles.row}>
            <CustomizedStarRating
              noOfStars={"5"}
              selectedStar={item.ratings}
              starAnimationScale={1.15}
              starRowStyle={{ flexDirection: "row" }}
              starSizeStyle={{
                height: width * 0.04,
                width: width * 0.04,
                marginHorizontal: height * 0.002,
              }}
              animationDuration={300}
              // easingType={Easing.easeInCirc}
              emptyStarImagePath={Images.iconStarUnfilled}
              filledStarImagePath={Images.iconStarFilled}
              onClickFunc={(i) => {}}
            />
            <TouchableOpacity
              activeOpacity={0.6}
              // disabled={props.Booked ? true : false}
              onPress={props.onPress}
              style={{
                height: height * 0.04,
                width: width * 0.18,
                backgroundColor: props.Booked ? Colors.deepBlue : Colors.mango,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: props.Booked ? Colors.white : Colors.black,
                  fontFamily: Constants.fontRegular,
                }}
              >
                {props.Booked ? "Booked" : "Rent"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginBottom: "3%",
    marginHorizontal: height * 0.02,
    borderRadius: 10,
    borderColor: Colors.macaroniAndCheese,
    borderWidth: 0.5,
    overflow: "hidden",
    elevation: 20,
    backgroundColor: Colors.white,
    shadowColor: Colors.grey,
    shadowRadius: 10,
    shadowOpacity: 0.5,
    shadowOffset: { x: 2, y: 2 },
  },
  txt: {
    fontSize: height * 0.02,
    color: Colors.black,
    textTransform: "capitalize",
  },
  txt1: {
    fontSize: height * 0.018,
    color: Colors.black,
    textTransform: "capitalize",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: height * 0.012,
  },
});
