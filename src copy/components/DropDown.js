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
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';

const {width, height} = Dimensions.get('window');

export function DropDown(props) {
  let val = [props.label];
  let ids = [];
  if (props.value != undefined && props.value != '') {
    ids = props.value.toString().split(',');
    val = [];
    ids.forEach(x => {
      let values = props.data.filter(y => y.id == x);
      if (values.length > 0) {
        val.push(values[0][props.viewProperty]);
      }
    });
  }

  const renderList = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        selectMultipleValues(item);
      }}
      key={index.toString()}
      style={{
        width: '100%',
        backgroundColor:
          multiIds.filter(x => x == item.id).length > 0
            ? Colors.sickGreen
            : null,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginVertical: 2,
      }}>
      <RegularTextCB
        style={{
          fontSize: 16,
          color:
            multiIds.filter(x => x == item.id).length > 0 ? 'white' : 'black',
        }}>
        {item[props.viewProperty]}
      </RegularTextCB>
    </TouchableOpacity>
  );

  const [multiVal, setMultiValue] = useState(val);
  const [multiIds, setMultiIds] = useState(ids);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(props.data ?? []);

  const selectMultipleValues = item => {
    var found = multiIds.filter(x => x == item.id).length > 0;
    if (found) {
      setMultiIds(multiIds.filter(x => x != item.id));
      setMultiValue(multiVal.filter(x => x != item[props.viewProperty]));
      props.onChangeValue([...multiIds.filter(x => x != item.id.toString())]);
    } else {
      setMultiIds([...multiIds, item.id]);
      setMultiValue([...multiVal, item[props.viewProperty]]);
      props.onChangeValue([
        ...multiIds.map(item => item.toString()),
        item.id.toString(),
      ]);
    }
  };
  return (
    <View
      style={[
        styles.card,
        {
          height: 60,
          borderRadius: 10,
          justifyContent: 'center',
          paddingHorizontal: 20,
          paddingVertical: 5,
          marginHorizontal: props.screenName === 'postJob' ? 0 : 15,
          marginTop: props.screenName === 'postJob' ? 0 : 11,
        },
      ]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            width: '100%',
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
          }}>
          <TouchableOpacity
            onPress={() => {
              setShowModal(!showModal);
            }}
            style={{flex: 1}}
          />
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              shadowColor: '#c5c5c5',
              shadowOffset: {width: 5, height: 5},
              shadowOpacity: 1.0,
              shadowRadius: 10,
              elevation: 10,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(!showModal);
              }}
              style={{
                width: '100%',
                paddingHorizontal: 20,
                alignItems: 'flex-end',
                marginTop: 20,
                padding: 5,
              }}></TouchableOpacity>
            <View style={{width: '100%', alignItems: 'center'}}>
              <RegularTextCB style={{fontSize: 18, color: Colors.sickGreen}}>
                Select Services
              </RegularTextCB>
              <TouchableOpacity
                style={{position: 'absolute', right: 10, top: -5, padding: 10}}
                onPress={() => {
                  setShowModal(!showModal);
                }}>
                <Image
                  style={{height: 15, width: 15}}
                  resizeMode="contain"
                  source={Images.iconClose}
                />
              </TouchableOpacity>

              <View
                style={{width: '100%', marginTop: 10, alignItems: 'center'}}>
                <View style={{width: '100%', height: 150, marginBottom: 20}}>
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
        onPress={() => {
          setShowModal(true);
        }}>
        <RegularTextCB>
          {multiVal.toString() ? multiVal.toString().substring(1) : 'Select'}{' '}
        </RegularTextCB>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
  },
});
