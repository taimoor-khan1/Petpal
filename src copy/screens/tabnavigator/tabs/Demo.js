import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, View, StyleSheet, Image} from 'react-native';
import RegularText from '../../../components/RegularText';
import ItemBox from '../../../components/Notification';
import Images from '../../../common/Images';
import Colors from '../../../common/Colors';
import styles from '../../../common/Styles';
import BackArrow from '../../../components/BackArrow';

import {useSelector, useDispatch} from 'react-redux';
import * as NotificationAction from '../../../store/Action/nottification';

export default function Demo({navigation}) {
  const dispatcher = useDispatch();
  const Notification = useSelector(state => state.Notification.Notification);

  const [NotificationList, setNotificationList] = useState(Notification);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    await dispatcher(NotificationAction.GetNotification());
  };

  const deleteItem = index => {
    const arr = [...NotificationList];
    arr.splice(index, 1);
    setNotificationList(arr);
  };

  return (
    <SafeAreaView style={mStyles.container}>
      <Image
        source={Images.topWave}
        style={{
          width: '65%',
          height: 285,
          resizeMode: 'stretch',
          position: 'absolute',
          end: 0,
        }}
      />
      <View
        style={{
          alignSelf: 'center',
          marginTop: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View style={{opacity: 0}}>
            <BackArrow onPress={() => {}} />
          </View>
          <RegularText style={[styles.borderedHeading, {marginHorizontal: 20}]}>
            Notifications
          </RegularText>
        </View>
        <FlatList
          data={NotificationList}
          keyExtractor={data => data.id}
          renderItem={({item, index}) => {
            return (
              <ItemBox data={item} handleDelete={() => deleteItem(index)} />
            );
          }}
          contentContainerStyle={{
            marginTop: 20,
            paddingBottom: 150,
            flexGrow: 1,
          }}
          style={{
            flex: 1,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const mStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  seperatorLine: {
    height: 1,
    backgroundColor: 'black',
  },
});
