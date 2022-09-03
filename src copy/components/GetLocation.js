import React, {useState} from 'react';
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
} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Icon} from 'native-base';
const {width, height} = Dimensions.get('window');

export function GetLocation(props) {
  const [showModal, setShowModal] = useState(false);
  const [placeHolder, setplaceHolder] = useState('Enter Location');
  const [selectedLocation, setSelectedLocation] = useState();

  const saveValue = data => {
    props.onChangeValue(data);

    setTimeout(() => {
      setShowModal(false);
    }, 200);
  };

  const renderRow = (data, index) => {
    return (
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View style={{alignItems: 'baseline'}}>
          <Text style={{color: Colors.black}}>{data.description}</Text>
          <Text style={{color: Colors.black}}>
            {data['structured_formatting']['secondary_text']}
          </Text>
        </View>
      </View>
    );
  };

  const GooglePlacesInput = props => {
    return (
      <GooglePlacesAutocomplete
        placeholder={placeHolder}
        onPress={(data, details = null) => {
          saveValue(data.description);
          setSelectedLocation(data.description);

          console.log(
            '================================+==>',
            details?.geometry,
          );
        }}
        query={{
          key: 'AIzaSyC-MPat5umkTuxfvfqe1FN1ZMSafBpPcpM',
          language: 'en',
        }}
        currentLocation={true}
        renderRow={renderRow}
        GooglePlacesSearchQuery={{rankby: 'distance'}}
        GooglePlacesDetailsQuery={{fields: ['formatted_address', 'geometry']}}
        renderDescription={row => row.description}
        currentLocationLabel="Current location"
        enablePoweredByContainer={false}
        keepResultsAfterBlur={true}
        nearbyPlacesAPI="GooglePlacesSearch"
        textInputProps={{placeholderTextColor: Colors.grey}}
        styles={{
          container: {
            // backgroundColor: 'red',
            alignItems: 'center',
          },

          textInputContainer: {
            backgroundColor: 'white',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',

            borderColor: Colors.grey,
            borderWidth: 0.5,
            borderRadius: 10,
            // fontFamily: FONTFAMILY.Bold,
            fontSize: 15,
            // paddingVertical: SIZES.five - 3,
          },
          textInput: [
            {
              color: Colors.grey,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              flex: 1,
              // fontFamily: FONTFAMILY.Bold,
              fontSize: 15,
              marginTop: 5,
              textTransform: 'capitalize',
            },
          ],
          listView: {
            marginVertical: 15,
            // backgroundColor: COLORS.transparent,
          },
          separator: {
            borderColor: Colors.grey,
            borderBottomWidth: 0.8,
            // backgroundColor: COLORS.transparent,
          },
          description: {
            // backgroundColor: COLORS.transparent,
          },
        }}
      />
    );
  };

  return (
    <View style={styles.card}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setShowModal(false);
          }}
          style={{
            flex: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
            paddingTop: '15%',
            paddingHorizontal: '5%',
          }}>
          <GooglePlacesInput />
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity
        onPress={() => {
          setShowModal(true);
        }}>
        <Text style={styles.text}>
          {selectedLocation !== undefined ? selectedLocation : 'Location'}
        </Text>
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
    shadowOffset: {x: 2, y: 2},
    overflow: 'visible',
    width: '100%',
    backgroundColor: Colors.white,
    paddingVertical: height * 0.02,
    paddingHorizontal: height * 0.01,
    // marginVertical: height * 0.01,
  },
  text: {
    fontSize: height * 0.02,
    color: Colors.grey,
    fontFamily: Constants.fontRegular,
    // marginLeft:height*0.03
  },
});
