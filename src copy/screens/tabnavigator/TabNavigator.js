import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Home from './tabs/Home';
import Constants from '../../common/Constants';
import Nearby from './tabs/Nearby';
import More from './tabs/More';
import TabBar from './tabbar/TabBar';
import Images from '../../common/Images';
import Demo from './tabs/Demo';
import TermsAndConditions from '../TermsAndConditions';
import Help from '../Help';
import Settings from '../Settings';
import Updates from '../Updates';
import FavoritePets from '../FavoritePets';
import OrderHistory from '../OrderHistory';
import PetDetails from '../PetDetails';
import Search from '../Search';
import SelectDate from '../SelectDate';
import SelectTime from '../SelectTime';
import ConfirmRent from '../ConfirmRent';
import Faqs from '../Faqs';
import ChatHistory from '../ChatHistory';
import MyProfile from '../MyProfile';
import ProfileSettings from '../ProfileSettings';
import PaymentScreen from '../PaymentScreen';
import AddNewCard from '../AddNewCard';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const NearbyStack = createStackNavigator();
const MoreStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      headerMode={'none'}
      initialRouteName={Constants.homeScreen}
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <HomeStack.Screen name={Constants.homeScreen} component={Home} />
      <HomeStack.Screen name={Constants.searchScreen} component={Search} />
      <HomeStack.Screen
        name={Constants.petDetailsScreen}
        component={PetDetails}
      />
      <HomeStack.Screen
        name={Constants.selectDateScreen}
        component={SelectDate}
      />
      <HomeStack.Screen
        name={Constants.selectTimeScreen}
        component={SelectTime}
      />
      <HomeStack.Screen
        name={Constants.confirmRentScreen}
        component={ConfirmRent}
      />
      <HomeStack.Screen
        name={Constants.PaymentScreen}
        component={PaymentScreen}
      />
      <HomeStack.Screen name={Constants.AddNewCard} component={AddNewCard} />
      <HomeStack.Screen
        name={Constants.myProfileScreen}
        component={MyProfile}
      />
      <MoreStack.Screen
        name={Constants.profileSettingsScreen}
        component={ProfileSettings}
      />
    </HomeStack.Navigator>
  );
};

const NearbyNavigator = () => {
  return (
    <NearbyStack.Navigator
      headerMode={'none'}
      initialRouteName={Constants.nearbyScreen}
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <NearbyStack.Screen name={Constants.nearbyScreen} component={Nearby} />
      <NearbyStack.Screen
        name={Constants.petDetailsScreen}
        component={PetDetails}
      />
      <NearbyStack.Screen
        name={Constants.selectDateScreen}
        component={SelectDate}
      />
      <NearbyStack.Screen
        name={Constants.selectTimeScreen}
        component={SelectTime}
      />
      <NearbyStack.Screen
        name={Constants.confirmRentScreen}
        component={ConfirmRent}
      />
    </NearbyStack.Navigator>
  );
};

const MoreNavigator = () => {
  return (
    <MoreStack.Navigator
      headerMode={'none'}
      initialRouteName={Constants.moreScreen}
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <MoreStack.Screen name={Constants.moreScreen} component={More} />
      <MoreStack.Screen
        name={Constants.termsAndConditionsScreen}
        component={TermsAndConditions}
      />
      <MoreStack.Screen name={Constants.faqsScreen} component={Faqs} />
      <MoreStack.Screen name={Constants.helpScreen} component={Help} />
      <MoreStack.Screen name={Constants.settingsScreen} component={Settings} />
      <MoreStack.Screen name={Constants.updatesScreen} component={Updates} />
      <MoreStack.Screen
        name={Constants.favoritePetsScreen}
        component={FavoritePets}
      />
      <MoreStack.Screen
        name={Constants.orderHistoryScreen}
        component={OrderHistory}
      />
      <MoreStack.Screen
        name={Constants.petDetailsScreen}
        component={PetDetails}
      />
      <MoreStack.Screen
        name={Constants.selectDateScreen}
        component={SelectDate}
      />
      <MoreStack.Screen
        name={Constants.selectTimeScreen}
        component={SelectTime}
      />
      <MoreStack.Screen
        name={Constants.confirmRentScreen}
        component={ConfirmRent}
      />
      <MoreStack.Screen
        name={Constants.chatHistoryScreen}
        component={ChatHistory}
      />

      <MoreStack.Screen
        name={Constants.myProfileScreen}
        component={MyProfile}
      />
      <MoreStack.Screen
        name={Constants.profileSettingsScreen}
        component={ProfileSettings}
      />
    </MoreStack.Navigator>
  );
};
const TabScreens = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name={Constants.homeScreen}
        component={HomeNavigator}
        initialParams={{icon: Images.bottomBarRabbit}}
      />
      <Tab.Screen
        name={Constants.nearbyScreen}
        component={NearbyNavigator}
        initialParams={{icon: Images.bottomBarLocation}}
      />
      <Tab.Screen
        name={Constants.demoScreen}
        component={Demo}
        initialParams={{icon: Images.bottomBarSelection}}
      />
      <Tab.Screen
        name={Constants.moreScreen}
        component={MoreNavigator}
        initialParams={{icon: Images.bottomBarMore}}
      />
    </Tab.Navigator>
  );
};

const TabNavigator = () => {
  return <TabScreens />;
};

export default TabNavigator;
