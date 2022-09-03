import React, {useState} from 'react';
import {Platform} from 'react-native';
import {Image, View} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import styles from '../common/Styles';
import BackArrow from '../components/BackArrow';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularText from '../components/RegularText';

export default function SelectDate(props) {
  const data = props.route.params.data;
  console.log('props data selectDate.js ==============>', data);

  const [selected, setselected] = useState('');

  const onDayPress = day => {
    setselected(day.dateString);
    //console.log('selected: =======' + day.dateString);
  };

  const buttonCuntinue = () => {
    if (selected) {
      props.navigation.navigate(Constants.selectTimeScreen, {
        data: data,
        currentDate: selected,
      });
    } else {
      alert('Please Select Date');
    }
  };

  const onDateChange = (date, type) => {
    console.log('date', date, 'tyoe ', type);
  };

  return (
    <View style={[styles.whiteContainer, {padding: 0}]}>
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
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <BackArrow
            onPress={() => {
              props.navigation.goBack();
            }}
          />
          <RegularText style={[styles.borderedHeading, {marginHorizontal: 20}]}>
            Select Date
          </RegularText>
        </View>

        <CalendarList
          onVisibleMonthsChange={months => {
            //console.log('now these months are visible', months);
          }}
          current={data.available_from}
          minDate={data.available_from}
          maxDate={data.available_to}
          pastScrollRange={50}
          futureScrollRange={50}
          scrollEnabled={true}
          showScrollIndicator={false}
          onDayPress={onDayPress}
          markingType="custom"
          markedDates={{
            [selected]: {
              customStyles: {
                container: styles.selectedDateBG,
                text: {
                  color: Colors.mango,
                  fontFamily: Constants.fontRegular,
                },
              },
            },
          }}
          theme={{
            calendarBackground: 'transparent',
            dayTextColor: Colors.mango,
            monthTextColor: Colors.black,
            textDayFontFamily: Constants.fontRegular,
            textMonthFontFamily: Constants.fontRegular,
            textDayHeaderFontFamily: Constants.fontRegular,
            textMonthFontSize: 20,
          }}
        />

        <View
          style={{
            position: 'absolute',
            bottom: 60,
            width: '100%',
          }}>
          <ButtonRadius10
            bgColor={Colors.deepBlue}
            label="Continue"
            onPress={() => {
              buttonCuntinue();
            }}
          />
        </View>
      </View>
    </View>
  );
}
