import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {CreditCardInput} from '../components/StripCardComponent';
import {Secret_key, STRIPE_PUBLISHABLE_KEY} from '../../keys';
import Colors from '../common/Colors';
import BackArrow from '../components/BackArrow';
import ButtonRadius10 from '../components/ButtonRadius10';
import {Icon} from 'native-base';

import Axios from '../network/APIKit';
import Loader from '../components/Loader';

import Constants from '../common/Constants';
import {height, width} from '../config/theme';

import {useSelector, useDispatch} from 'react-redux';

function getCreditCardToken(creditCardData) {
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc,
    'card[name]': creditCardData.values.name,
  };

  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
    },

    // Use a proper HTTP method
    method: 'post',

    // Format the credit card data to a string of key-value pairs
    // divided by &

    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&'),
  })
    .then(response => response.json())
    .then(res => {
      // console.log('Response getCreditCardToken ------->', res);
      return {res, mcard: card};
    })
    .catch(error => console.log(error));
}

export default function AddNewCard({route, navigation}) {
  const CARDS = useSelector(state => state.CardList.CreditCardList);
  console.log('==========> cards', CARDS);

  const {data, currentDate, time} = route.params;

  const Token = useSelector(state => state.Auth.AccessToken);
  const [CardInput, setCardInput] = React.useState({});
  const [isLoading, setisLoading] = useState(false);
  const [selectedCArd, setselectedCard] = useState(null);

  const Header = () => {
    return (
      <View style={{margin: '10%', position: 'absolute', width: '80%'}}>
        <BackArrow
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text
          style={[
            styles.borderedHeading,
            {
              marginHorizontal: 20,
              position: 'absolute',
              alignSelf: 'center',
            },
          ]}>
          Payment
        </Text>
      </View>
    );
  };

  const checkIfSelected = () => {
    if (selectedCArd) {
      navigation.navigate(Constants.confirmRentScreen, {
        data: data,
        currentDate: currentDate,
        time: time,
        CardId: selectedCArd,
      });
    } else {
      onSubmit();
    }
  };

  const onSubmit = async () => {
    if (CardInput.valid == false || typeof CardInput.valid == 'undefined') {
      alert('Invalid Credit Card');
      return false;
    }
    setisLoading(true);

    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(CardInput);
      // console.log('creditCardToken', creditCardToken);

      if (creditCardToken.error) {
        alert('creditCardToken error');
        return;
      }
    } catch (e) {
      console.log('e', e);
      return;
    }
    setisLoading(false);

    saveCardOnServer(creditCardToken);
  };

  const _onChange = data => {
    setCardInput(data);
  };

  const saveCardOnServer = card => {
    let config = {
      headers: {
        Authorization: Token,
      },
    };

    let body = {
      cardholder_name: card.mcard['card[name]'],
      card_number: card.mcard['card[number]'],
      expiry_date: `${card.mcard['card[exp_month]']}/${card.mcard['card[exp_year]']}`,
      cvv: card.mcard['card[cvc]'],
      stripe_token: card.res.card.id,
      last4: card.res.card.last4,
      CardType: card.res.card.brand,
    };

    console.log('body==========>>>>>>>>>>', body);

    const onSuccess = response => {
      console.log(
        'Card add  response ======================>',
        response.data.data.id,
      );
      setisLoading(false);

      navigation.navigate(Constants.confirmRentScreen, {
        data: data,
        currentDate: currentDate,
        time: time,
        CardId: response.data.data.id,
      });

      // navigation.goBack();
    };

    const onFailure = error => {
      console.log(' Order error ===============>', error);
    };
    Axios.post(Constants.CardAdd, body, config)
      .then(onSuccess)
      .catch(onFailure);
  };
  const rendorCards = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setselectedCard(item.id);
          }}
          style={{
            // height: height * 0.15,
            paddingVertical: 15,
            width: width * 0.65,
            backgroundColor: index % 2 === 0 ? Colors.denimBlue : Colors.mango,
            marginLeft: 20,
            borderRadius: width * 0.035,
            justifyContent: 'space-evenly',
            paddingHorizontal: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: '500', color: Colors.white}}>
            **** **** **** 1234
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{fontSize: 16, fontWeight: '500', color: Colors.white}}>
                expiry
              </Text>
              <Text
                style={{fontSize: 16, fontWeight: '500', color: Colors.white}}>
                {item.expiry_date}
              </Text>
            </View>
            <View>
              <Text
                style={{fontSize: 16, fontWeight: '500', color: Colors.white}}>
                cvc
              </Text>
              <Text
                style={{fontSize: 16, fontWeight: '500', color: Colors.white}}>
                ***
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{fontSize: 16, fontWeight: '500', color: Colors.white}}>
              Account Holder Name
            </Text>
            <Text
              style={{fontSize: 16, fontWeight: '500', color: Colors.white}}>
              {item.cardholder_name}
            </Text>
          </View>
        </TouchableOpacity>
        {selectedCArd === item.id ? (
          <Icon
            name="check-circle"
            type="FontAwesome"
            style={{
              fontSize: 24,
              position: 'absolute',
              top: 5,
              right: 5,
              color: Colors.white,
            }}
          />
        ) : null}
      </>
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <FlatList
          data={CARDS}
          renderItem={rendorCards}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginVertical: height * 0.015}}
        />

        <View style={{flex: 1, paddingHorizontal: 20}}>
          <CreditCardInput
            cardBrandIcons={true}
            requiresName={true}
            onChange={_onChange}
          />
          <ButtonRadius10
            label={selectedCArd ? 'Pay Now' : 'Add Card'}
            style={styles.btnStyle}
            onPress={checkIfSelected}
          />
        </View>
      </ScrollView>
      <Header />

      {isLoading ? <Loader /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    paddingBottom: 200,
  },
  ImgStyle: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#2471A3',
    width: 150,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 15,
    color: '#f4f4f4',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  inputStyle: {
    // paddingLeft: 15,
    // borderRadius: 5,
    color: '#fff',
    backgroundColor: 'blue',
  },
  labelStyle: {
    // marginBottom: 5,
    fontSize: 12,
  },
  btnStyle: {
    marginHorizontal: 20,
  },
  borderedHeading: {
    color: Colors.deepBlue,
    fontSize: 20,
    color: Colors.white,
    textShadowColor: Colors.deepBlue,
    textShadowRadius: 0.8,
    textShadowOffset: {
      width: 0.8,
      height: 0.8,
    },
  },
});

const Card = [
  {
    id: 1,
    cardno: '3444',
  },
  {
    id: 2,
    cardno: '1111222333444',
  },
  {
    id: 3,
    cardno: '1111222333444',
  },
  {
    id: 4,
    cardno: '1111222333444',
  },
];
