import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  LayoutAnimation,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Colors from '../common/Colors';
import Images from '../common/Images';
import styles from '../common/Styles';
import BackArrow from '../components/BackArrow';
import RegularText from '../components/RegularText';
import Constants from '../common/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from '../network/APIKit';
import utils from '../../utils';
import {DATA} from '../data/data';

export default function Faqs(props) {
  const [mData, setMdata] = React.useState(DATA);
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [faqList, setFaqList] = useState([]);


  useEffect(async () => {
    getUserAccessToken();
  }, []);

  const getUserAccessToken = async () => {
    setIsloading(true);
    const value = await AsyncStorage.getItem('user');
    const accessToken = JSON.parse(value);
    if (accessToken !== undefined) {
      getFaqList(accessToken.token);
    }
  };

  const getFaqList = token => {
    // console.log('get Pet List =========>', token);
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const onSuccess = ({data}) => {
      let temp = data.data.faq_paragraph.map((faq) => ({
        ...faq,
        isExpanded: false,
      }));
      console.log('response faqqqqq ======================>', temp);
      setFaqList(temp);
      // setPets(data?.data);
      setIsloading(false);
    };
    const onFailure = error => {
      utils.showResponseError(error);
      setIsloading(false);
      console.log('===============>', error);
    };
    Axios.get(Constants.faq, config).then(onSuccess).catch(onFailure);
  };




  const onChangeLayout = title => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(title);
  };

  const renderFaqItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.card,
          {
            padding: 15,
            borderWidth: item.isExpanded ? 1 : 0,
            borderColor: Colors.mango,
          },
        ]}
        onPress={() => {
          onChangeLayout(item.question);
          faqList.map(childItem => {
            childItem.isExpanded = false;
          });
          item.isExpanded = true;
          setMdata(faqList);
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RegularText style={{fontSize: 16, color: Colors.black, flex: 1}}>
            {item.question}
          </RegularText>
          <Image
            source={item.isExpanded ? Images.iconDash : Images.iconArrowDown}
            style={{
              tintColor: item.isExpanded ? Colors.mango : Colors.black,
              height: 10,
              width: 10,
              resizeMode: 'contain',
            }}
          />
        </View>
        {item.isExpanded && (
          <View style={{height: item.isExpanded ? null : 0}}>
            <RegularText style={{fontSize: 14, color: Colors.coolGrey}}>
              {item.answer}
            </RegularText>
          </View>
        )}
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
              props.navigation.goBack();
            }}
          />
          <RegularText style={[styles.borderedHeading, {marginHorizontal: 20}]}>
            FAQ's
          </RegularText>
        </View>
        <FlatList
          style={{marginTop: 50}}
          data={faqList}
          showsVerticalScrollIndicator={false}
          keyExtractor={data => data.question}
          renderItem={renderFaqItem}
        />
      </View>
    </View>
  );
}
