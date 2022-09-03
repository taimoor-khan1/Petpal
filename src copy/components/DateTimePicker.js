import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'native-base';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

// Date Picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-datepicker';

export default function DateTimePickerComponent(props) {
  const [date, setDate] = useState();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
  };

  const dateHandle = date => {
    const append = moment(date).format('YYYY-MM-DD');
    props.ondateChange(append);
  };
  const timeHandle = time => {
    const append = moment(time).format('HH:MM');
    props.ontimechange(append);
    setDatePickerVisibility(false);
  };

  return (
    <View style={styles.contaner}>
      <View style={[styles.containerView]}>
        <Icon
          name="calendar-outline"
          type="Ionicons"
          style={{fontSize: height * 0.025, color: Colors.mango}}
        />
        <DatePicker
          disabled={props.isDisable}
          useNativeDriver={false}
          style={styles.date}
          minDate={props.minEndDate}
          date={date}
          mode="date"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          placeholder={props.date}
          showIcon={false}
          customStyles={{
            dateInput: {borderColor: Colors.white},
            placeholderText: styles.text,
            backgroundColor: 'pink',
          }}
          onDateChange={date => {
            dateHandle(date);
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          showDatePicker();
        }}
        activeOpacity={0.6}
        style={styles.containerView}>
        <Icon
          name="time-outline"
          type="Ionicons"
          style={{fontSize: height * 0.025, color: Colors.mango}}
        />
        <Text style={styles.text}>{props.time}</Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          is24Hour={true}
          hideTitleContainerIOS={true}
          titleStyletitleStyle={{backgroundColor: 'red', color: 'red'}}
          confirmTextStyle={Colors.mango}
          onConfirm={time => {
            timeHandle(time);
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contaner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    elevation: 15,
    backgroundColor: Colors.white,
    borderRadius: height * 0.01,
    shadowColor: Colors.grey,
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowOffset: {x: 1, y: 1},
    overflow: 'visible',
    height: height * 0.07,
    paddingHorizontal: height * 0.02,
  },
  containerView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
  },
  text: {
    fontSize: height * 0.02,
    color: Colors.grey,
    fontFamily: Constants.fontRegular,
    marginLeft: height * 0.03,
  },
  datepicker: {
    backgroundColor: Colors.white,
    height: height * 0.3,
    width: width - 40,
    marginVertical: '10%',
  },
  date: {
    width: '100%',
  },
});
