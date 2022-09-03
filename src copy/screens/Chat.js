import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import styles from '../common/Styles';
import BackArrow from '../components/BackArrow';
import RegularText from '../components/RegularText';

import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAvoidingView} from 'react-native';
import {height} from '../config/theme';

export default function Chat({route, navigation}) {
  const UserProfile = useSelector(state => state.Profile.UserProfile);
  const [message, setmessage] = useState('');
  const {data} = route.params;

  const time = moment(new Date()).format('YYYY/MM/DD HH:mm:ss');
  const [MessageList, setMessageList] = useState();
  const [deviceToken, setdeviceToken] = useState(null);
  console.log('data ========>>>>>>  List ===>', data);
  // console.log('UserProfile ========>>>>>>  List ===>', UserProfile);

  const ref = useRef();

  useEffect(() => {
    getChat();
  }, []);

  // console.log("===================================>'", database());

  const getChat = async () => {
    const userId = UserProfile.id.toString();
    try {
      await database()
        .ref(Constants.FIREBASE_CHAT)
        .child(userId)
        .child(data.id.toString())
        .child(Constants.FIREBASE_MESSAGES)
        .on('value', dataSnapshot => {
          // console.log('get chat =======================>', dataSnapshot);
          let msgs = [];
          dataSnapshot.forEach(child => {
            console.log(child);
            msgs.push({
              senderId: child.val().senderId,
              body: child.val().body,
              type: child.val().type,
              time: child.val().time,
            });
          });
          setMessageList(msgs);
          setTimeout(() => {
            ref?.current?.scrollToEnd();
          }, 1500);
        });
    } catch (error) {
      console.log(
        ' get chat error ===================================>',
        error,
      );
    }
  };

  /*
   * Creating Chat Head current user and other user
   */
  const createChatHead = async () => {
    let userId = UserProfile.id;
    let userImage = `${UserProfile.image}`;
    let userName = UserProfile?.name;

    //3 other user k liye chat head banaya
    try {
      await database()
        .ref(Constants.FIREBASE_USERS)
        .child(data.id.toString())
        .child(Constants.FIREBASE_CHATHEADS)
        .child(data.name + userId)
        .set({
          currentUserId: data.id,
          otherUserId: userId,
          otherUserImage: userImage,
          otherUserName: userName,
          lastMsgTime: time,
          message: message,
        })
        .then(() => console.log('Data Upload.'));
    } catch (error) {
      console.log('error ====>', error);
    }

    //4 current user k liye chat head banaya
    try {
      await database()
        .ref(Constants.FIREBASE_USERS)
        .child(userId.toString())
        .child(Constants.FIREBASE_CHATHEADS)
        .child(userName + data.id)
        .set({
          currentUserId: userId,
          otherUserId: data.id,
          otherUserImage: data.image,
          otherUserName: data.name,
          lastMsgTime: time,
          message: message,
        })
        .then(() => console.log('Data Upload.'));
    } catch (error) {
      console.log('error ==============> ', error);
    }
  };

  const sendMessage = () => {
    createChatHead();
    setUserMessage();
  };

  /*
   * Creating and Sending nessage for current and other user
   */
  const setUserMessage = () => {
    const userId = UserProfile.id.toString();

    // current user k liye msg banaya
    database()
      .ref(Constants.FIREBASE_CHAT)
      .child(userId)
      .child(data.id.toString())
      .child(Constants.FIREBASE_MESSAGES)
      .push({
        body: message,
        senderId: userId,
        time: time,
        type: 1,
      });

    // sendFcm(body, userName)

    // other user k liye msg banaya
    database()
      .ref(Constants.FIREBASE_CHAT)
      .child(data.id.toString())
      .child(userId)
      .child(Constants.FIREBASE_MESSAGES)
      .push({
        body: message,
        senderId: userId,
        time: time,
        type: 1,
      });
    setmessage('');
  };

  const renderChatItem = ({item}) => {
    // console.log(item.senderId + ' ' + UserProfile.id);
    return (
      <View
        style={{
          backgroundColor:
            item.senderId === UserProfile.id.toString()
              ? Colors.mango
              : Colors.deepBlue,
          padding: 10,
          borderRadius: 10,
          marginVertical: 2,
          alignSelf:
            item.senderId === UserProfile.id.toString()
              ? 'flex-end'
              : 'baseline',
        }}>
        <RegularText
          style={{
            fontSize: 14,
            color:
              item.senderId === UserProfile.id.toString()
                ? Colors.black
                : Colors.white,
          }}>
          {item.body}
        </RegularText>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <View
        style={{
          backgroundColor: Colors.white,
          alignItems: 'flex-end',
        }}>
        <Image
          source={Images.topWave}
          style={{width: '80%', height: 250, resizeMode: 'stretch'}}
        />
      </View>

      <View
        style={[
          {
            flex: 1,
            position: 'absolute',
            top: Platform.OS === 'android' ? 15 : 40,
            bottom: 15,
            left: 15,
            right: 15,
          },
        ]}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <BackArrow
            onPress={() => {
              navigation.goBack();
            }}
          />
          <View style={{flex: 1, alignItems: 'center'}}>
            {data.image === '' ? (
              <View
                style={[
                  styles.userImage,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <RegularText style={[styles.borderedHeading, {fontSize: 32}]}>
                  {data.name[0].toUpperCase()}
                </RegularText>
              </View>
            ) : (
              <Image
                source={{uri: `${Constants.imageURL}${data.image}`}}
                style={styles.userImage}
              />
            )}

            <RegularText style={[styles.borderedHeading]}>
              {data.name}
              {/* exemple */}
            </RegularText>
          </View>
          <TouchableOpacity>
            <Image
              source={Images.moreDots}
              style={{height: 10, width: 15, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
          <FlatList
            ref={ref}
            data={MessageList}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderChatItem}
            style={{marginTop: 10}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 150,
              flexDirection: 'column',
            }}
          />
        </View>

        <KeyboardAvoidingView
          Enabled={Platform.OS === 'ios'}
          behavior={Platform.OS === 'ios' && 'padding'}
          keyboardVerticalOffset={height * 0.039}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 10,
              backgroundColor: Colors.veryLightPink,
              // backgroundColor: 'red',
              marginBottom: 10,
            }}>
            <TextInput
              value={message}
              onChangeText={setmessage}
              placeholder={'Write your message'}
              placeholderTextColor={Colors.grey}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              blurOnSubmit={true}
              keyboardType="default"
              returnKeyType={'done'}
              style={{
                flex: 1,
                paddingHorizontal: 10,
                paddingVertical: 15,
                color: Colors.deepBlue,
                fontFamily: Constants.fontRegular,
              }}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  if (message !== '') {
                    sendMessage();
                  }
                }}>
                <Image
                  source={Images.iconSend}
                  style={{
                    height: 20,
                    width: 25,
                    resizeMode: 'contain',
                    marginHorizontal: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
