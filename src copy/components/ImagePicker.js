import {Icon} from 'native-base';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import {height, width} from '../config/theme';
// import ImgToBase64 from 'react-native-image-base64';

export default function ImgesPicker() {
  const [images, setimages] = useState([]);
  const [imagesTo64, setimagesTo64] = useState([]);

  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 4}, response => {
      if (response.didCancel) {
        console.log('user conacel image  picker');
      } else if (response.errorCode) {
        console.log('Image Picker Error', response.errorCode);
      } else if (response.errorMessage) {
        console.log('Image Picker Error', response.errorMessage);
      } else if (response.assets) {
        // console.log('=======response', response);
        var imageuri = [];
        var imageuriBase64 = [];
        response.assets.map(item => {
          imageuri.push(item.uri);
          ImgToBase64.getBase64String(item.uri)
            .then(base64String => {
              // console.log("image converted to base 64 =======>>>>", 'data:image/png;base64,'+base64String)
              imageuriBase64.push('data:image/png;base64,' + base64String);
            })
            .catch(err =>
              console.log(
                'catch error while converting image to base 64=====>>>>',
                err,
              ),
            );
        });
        setimagesTo64(imageuriBase64);
        props.onSelect(imagesTo64);
        setimages(imageuri);
      } else {
      }
    });
  };

  const remove = image => {
    let temp = [];
    let imagess = [];
    images.filter(item => {
      if (item !== image) {
        imagess.push(item);
        ImgToBase64.getBase64String(item)
          .then(base64String => {
            // console.log("image converted to base 64 =======>>>>", 'data:image/png;base64,'+base64String)
            temp.push('data:image/png;base64,' + base64String);
          })
          .catch(err =>
            console.log(
              'catch error while REMOVING image to base 64=====>>>>',
              err,
            ),
          );
      }
    });
    setimagesTo64(temp);
    props.onSelect(imagesTo64);
    setimages(imagess);
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={openGallery}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginVertical: '5%',
        }}>
        <Text
          style={{
            fontSize: height * 0.02,
            color: Colors.warmGrey,
            fontFamily: Constants.fontRegular,
          }}>
          Upload picture(s)
        </Text>

        <Image
          source={Images.iconCamera}
          style={{
            height: height * 0.035,
            width: height * 0.035,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
      {images.length > 0 ? (
        <View style={{height: 50, marginVertical: 10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {images.map(item => {
              return (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      height: height * 0.1,
                      width: width * 0.2,
                      backgroundColor: 'red',
                      marginHorizontal: 10,
                      borderRadius: 20,
                      overflow: 'hidden',
                    }}>
                    <Image
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      source={{uri: item}}
                      resizeMode="cover"
                    />
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      padding: 5,
                      top: 4,
                      right: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        remove(item);
                      }}
                      style={{
                        backgroundColor: Colors.mango,
                        borderRadius: 10,
                        overflow: 'hidden',
                      }}>
                      <Icon
                        name="cross"
                        type="Entypo"
                        style={{fontSize: 12, color: Colors.white}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
