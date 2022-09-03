import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import {View, Image, TouchableOpacity, FlatList} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import styles from '../common/Styles';
import BackArrow from '../components/BackArrow';
import RegularText from '../components/RegularText';
import {CHATS} from '../data/data';
import moment from 'moment';

import {useSelector} from 'react-redux';

import database from '@react-native-firebase/database';

export default function ChatHistory({navigation}) {
  const UserProfile = useSelector(state => state.Profile.UserProfile);
  const [MessagesLists, setMessagesLists] = useState([]);
  console.log('message list', MessagesLists);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getChatList();
    });
    return unsubscribe;
  }, [navigation]);

  // console.log("chat history ===================================>'", database());

  const getChatList = async () => {
    try {
      await database()
        .ref(Constants.FIREBASE_USERS)
        .child(UserProfile.id.toString())
        .child(Constants.FIREBASE_CHATHEADS)
        .once('value')
        .then(snapshot => {
          let msgs = [];
          snapshot.forEach(child => {
            // console.log(child);
            msgs.push({
              currentUserId: child.val().currentUserId,
              lastMsgTime: child.val().lastMsgTime,
              otherUserName: child.val().otherUserName,
              otherUserImage: child.val().otherUserImage,
              otherUserId: child.val().otherUserId,
              message: child.val().message,
            });
          });
          setMessagesLists(msgs);
        });
    } catch (error) {
      console.log(
        ' getChatList error ===================================>',
        error,
      );
    }
  };

  const renderChatHistoryItem = ({item}) => {
    console.log('item.otherUserImage', item.otherUserImage);
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{padding: 7}}
        onPress={() => {
          navigation.navigate(Constants.chatScreen, {
            data: {
              id: item.otherUserId,
              name: item.otherUserName,
              image: item.otherUserImage,
            },
          });
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: Constants.imageURL + item.otherUserImage}}
            style={{width: 60, height: 60, borderRadius: 60 / 2}}
          />
          <View style={{marginStart: 10, flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <RegularText style={{fontSize: 16, color: Colors.black}}>
                {item.otherUserName}
              </RegularText>
              <RegularText style={{fontSize: 12, color: Colors.black}}>
                {moment(new Date()).format('YYYY/MM/DD HH:mm:ss')}
              </RegularText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <RegularText style={{fontSize: 14, color: Colors.black}}>
                {item.message}
              </RegularText>
              {/* {!item.message.isRead && (
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    backgroundColor: '#3aff00',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <RegularText style={{fontSize: 12, color: Colors.white}}>
                    {item.message.count}
                  </RegularText>
                </View>
              )} */}
            </View>
          </View>
        </View>
        <View style={{marginTop: 5}}>
          <View
            style={{
              height: 0.5,
              backgroundColor: 'black',
              width: '80%',
              alignSelf: 'flex-end',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.whiteContainer, {padding: 0}]}>
      <View style={{backgroundColor: Colors.white, alignItems: 'flex-end'}}>
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
          <RegularText style={[styles.borderedHeading, {marginHorizontal: 20}]}>
            Chat History
          </RegularText>
        </View>
        <FlatList
          style={{marginTop: 50}}
          data={MessagesLists}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderChatHistoryItem}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        />
      </View>
    </View>
  );
}
