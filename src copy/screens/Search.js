import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  Easing,
  TouchableOpacity,
  Text,
  TextInput,
  ImageBackground,
  Modal,
  ScrollView,
} from "react-native";
import Colors from "../common/Colors";
import Images from "../common/Images";
import styles from "../common/Styles";
import BackArrow from "../components/BackArrow";
import RegularText from "../components/RegularText";
import Constants from "../common/Constants";

import { Col, Icon } from "native-base";
import { height, width } from "../config/theme";

import { useSelector, useDispatch } from "react-redux";
import Axios from "../network/APIKit";
import utils from "../../utils";
import RenderList from "../components/RenderList";
import SearchView from "../components/SearchView";

export default function Search(props) {
  const Token = useSelector((state) => state.Auth.AccessToken);

  const [isVisible, setisVisible] = useState(false);
  const [searchItem, setsearchItem] = useState(null);

  const [allFilters, setAllFilters] = useState();
  const [SearchData, setSearchData] = useState([]);

  const [data, setSetdata] = useState([]);

  const [price, setPrice] = useState();
  const [location, setLocation] = useState();
  const [rating, setRating] = useState();
  const [breeds, setBreeds] = useState();
  const [age, setAge] = useState();
  const [breedid, setbreedid] = useState();

  const clearAll = () => {
    setPrice(undefined);
    setLocation(undefined);
    setBreeds(undefined);
    setAge(undefined);
    setRating(undefined);
    // setisVisible(false);
  };

  useEffect(() => {
    getFilters();
    ApplyFilter();
  }, []);

  const ApplyFilter = () => {
    let config = {
      headers: {
        Authorization: Token,
      },
    };

    let body = {
      min_price: price !== undefined ? price.split("-")[0] : undefined,
      max_price: price !== undefined ? price.split("-")[1] : undefined,
      min_age: age !== undefined ? age.split("-")[0] : undefined,
      max_age: age !== undefined ? age.split("-")[1] : undefined,
      max_rating: rating !== undefined ? rating.split("-")[0] : undefined,
      min_rating: rating !== undefined ? rating.split("-")[1] : undefined,
      // lat: 24.064584152,
      // lng: 54.02154875,
      distance: location,
      breedId: breedid,
    };

    const onSuccess = ({ data }) => {
      console.log("filters ===============>>");
      setSearchData(data.data);
      setSetdata(data.data);
      setisVisible(false);
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
      console.log(" Apply filters Error ===============>", error);
    };
    Axios.post(Constants.searchFilter, body, config)
      .then(onSuccess)
      .catch(onFailure);
  };

  const getFilters = () => {
    let config = {
      headers: {
        Authorization: Token,
      },
    };

    const onSuccess = ({ data }) => {
      // console.log("filters ===============>>",data.data.breeds);
      setAllFilters(data.data);
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
      console.log(" filters Error ===============>", error);
    };
    Axios.get(Constants.getFilter, config).then(onSuccess).catch(onFailure);
  };

  const renderItem = ({ item, index }) => {
    // console.log('index', item);
    return (
      <RenderList
        search
        item={item}
        onPress={() => {
          props.navigation.navigate(Constants.petDetailsScreen, { item: item });
        }}
      />
    );
  };

  const ListView = ({ data, title, onchange, value }) => {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onchange(item)}
          style={{
            backgroundColor:
              item.name === value ? Colors.denimBlue : Colors.deepBlue,
            width: width * 0.25,
            height: height * 0.055,
            marginHorizontal: height * 0.02,
            alignItems: "center",
            justifyContent: "center",

            // paddingVertical:height* 0.012,
            // paddingHorizontal : height* 0.025 ,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: height * 0.025,
              color: Colors.white,
              fontFamily: Constants.fontRegular,
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            {item.name || item.title}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ paddingTop: "2%" }}>
        <Text
          style={{
            fontSize: height * 0.03,
            fontFamily: Constants.fontBold,
            margin: height * 0.02,
          }}
        >
          {title}
        </Text>
        <View style={{ alignSelf: "center" }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}

            // horizontal
            // showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  };

  const ShoeFilter = () => {
    return (
      <Modal animationType="slide" visible={isVisible}>
        <>
          <ScrollView
            style={{
              backgroundColor: Colors.mango,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              marginTop: 20,
            }}
            contentContainerStyle={{ paddingBottom: 80 }}
          >
            <View
              style={{
                flex: 1,
                paddingTop: 10,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                paddingTop: 10,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: height * 0.015,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setisVisible(false);
                    // console.log('click');
                  }}
                  style={{ padding: 5 }}
                >
                  <Icon
                    name="ios-close-outline"
                    type="Ionicons"
                    style={{ fontSize: height * 0.04 }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: height * 0.038,
                    color: Colors.black,
                    alignSelf: "center",
                    fontFamily: Constants.fontRegular,
                    // marginStart:height*0.05
                  }}
                >
                  Filters
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    clearAll();
                  }}
                >
                  <Text
                    style={{
                      fontSize: height * 0.025,
                      color: Colors.black,
                      alignSelf: "center",
                      fontFamily: Constants.fontRegular,
                      textDecorationStyle: "solid",
                      textDecorationLine: "underline",
                    }}
                  >
                    Clear all
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <ListView
                  data={allFilters?.locations}
                  title={"Location"}
                  onchange={(val) => {
                    setLocation(val.name);
                  }}
                  value={location}
                />
              </View>
              <View style={{ flex: 1 }}>
                <ListView
                  data={allFilters?.prices}
                  title={"Price"}
                  onchange={(val) => {
                    setPrice(val.name);
                  }}
                  value={price}
                />
              </View>
              <View style={{ flex: 1 }}>
                <ListView
                  data={allFilters?.ratings}
                  title={"Rating"}
                  onchange={(val) => {
                    setRating(val.name);
                  }}
                  value={rating}
                />
              </View>
              <View style={{ flex: 1 }}>
                <ListView
                  data={allFilters?.breeds}
                  title={"Breed"}
                  onchange={(val) => {
                    setBreeds(val.name);
                    setbreedid(val.id);
                  }}
                  value={breeds}
                />
              </View>
              <View style={{ flex: 1 }}>
                <ListView
                  data={allFilters?.age}
                  title={"Age"}
                  onchange={(val) => {
                    setAge(val.name);
                  }}
                  value={age}
                />
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            activeOpacity={0.85}
            style={{ backgroundColor: Colors.deepBlue, padding: 10 }}
            onPress={() => {
              ApplyFilter();
            }}
          >
            <Text
              style={{
                fontSize: height * 0.03,
                color: Colors.white,
                alignSelf: "center",
              }}
            >
              Apply
            </Text>
          </TouchableOpacity>
        </>
      </Modal>
    );
  };

  const searchText = (e) => {
    if (e !== "") {
      console.log("=====>", e);
      let text = e.toLowerCase();
      let trucks = SearchData;
      let filteredList = trucks.filter((item) => {
        return item.name.toLowerCase().match(text);
      });
      setSearchData(filteredList);
    } else {
      setSearchData(data);
    }

    // console.log(filteredList);
  };

  return (
    <View style={[styles.whiteContainer, { padding: 0 }]}>
      <View style={{ flex: 0.3 }}>
        <ImageBackground
          style={{ height: "100%", width: "100%" }}
          source={Images.topWave}
          resizeMode="stretch"
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 40,
              marginHorizontal: 15,
            }}
          >
            <BackArrow
              onPress={() => {
                props.navigation.goBack();
              }}
            />
            <RegularText
              style={[styles.borderedHeading, { marginHorizontal: 20 }]}
            >
              Search Results
            </RegularText>
          </View>
          <SearchView
            onPress={() => {
              setisVisible(true);
            }}
            value={searchItem}
            onChangeText={(text) => {
              searchText(text);
            }}
          />
          {/* <SearchFilterView /> */}
        </ImageBackground>
      </View>
      <View style={{ flex: 1, marginTop: 30 }}>
        <FlatList
          bounces={false}
          data={SearchData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ marginTop: 5, paddingBottom: 200 }}
          ListEmptyComponent={() => {
            return (
              <View>
                <Text
                  style={{
                    fontSize: height * 0.04,
                    fontFamily: Constants.fontBold,
                    color: Colors.deepBlue,
                    textAlign: "center",
                  }}
                >
                  No Record
                </Text>
              </View>
            );
          }}
        />
      </View>
      {ShoeFilter()}
    </View>
  );
}
