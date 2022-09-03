import {StyleSheet} from 'react-native';
import {height, tabHeight, width} from '../config/theme';
import Colors from './Colors';
import Constants from './Constants';

const styles = StyleSheet.create({
  whiteContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 15,
  },
  textInput: {
    fontSize: 14,
    flex: 1,
    paddingVertical: 10,
    fontFamily: Constants.fontRegular,
    color: Colors.deepBlue,
  },
  textInputContainer: {
    borderBottomWidth: 0.6,
    height: 45,
    fontFamily: Constants.fontRegular,
    borderColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
  },
  formLabel: {
    fontSize: 16,
    color: Colors.black,
  },
  iconPassword: {
    fontSize: 25,
    color: Colors.mango,
  },
  iconBack: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  loginBtnBg: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnRad5: {
    backgroundColor: Colors.mango,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
  },
  buttonLoginText: {
    fontSize: 18,
  },
  btnRad5Text: {
    color: Colors.black,
  },
  screenHeading: {
    color: Colors.deepBlue,
    fontSize: 24,
  },
  sectionHeading: {
    color: Colors.deepBlue,
    fontSize: height * 0.02,
  },
  bottomBarParent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  bottomBarChild: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  tab: {
    height: tabHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    height: '80%',
    position: 'absolute',
    left: 25,
    backgroundColor: Colors.deepBlue,
    borderRadius: 15,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: Colors.mango,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    elevation: 15,
    shadowColor: Colors.grey,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: {x: 2, y: -2},
    overflow: 'hidden',
    backgroundColor: Colors.deepBlue,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  story: {
    width: 70,
    height: 70,
    borderRadius: 20,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: {x: 2, y: -2},
  },
  card: {
    elevation: 15,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 15,
    shadowColor: Colors.grey,
    shadowRadius: 10,
    shadowOpacity: 0.5,
    shadowOffset: {x: 2, y: 2},
    overflow: 'visible',
    marginVertical: 10,
  },
  starRowStyle: {
    flexDirection: 'row',
  },
  starSizeStyle: {
    width: 12,
    height: 12,
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
  searchFilterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mango,
    borderRadius: 10,
    padding: 10,
    height: 35,
    margin: 10,
  },
  selectedDateBG: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.deepBlue,
  },
  CardStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 60,
    borderRadius: width * 0.04,
    color: Colors.black,
    marginVertical: '3%',
    // width: width,
  },
  CardImage: {
    height: width * 0.1,
    width: width * 0.1,
  },
});

export default styles;
