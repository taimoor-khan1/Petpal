import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
  Animated,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import {Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import RegularText from '../components/RegularText';
import Colors from '../common/Colors';
import Images from '../common/Images';
import Constants from '../common/Constants';
const {width, height} = Dimensions.get('window');

import * as StoriesAction from '../store/Action/stories';
import {useSelector, useDispatch} from 'react-redux';

const Stories = props => {
  const dispatcher = useDispatch();
  const ALLSTORIES = useSelector(state => state.Story.Stories);
  const CURRENTINDEX = useSelector(state => state.Story.CurrenttIndex);
  const USERINDEX = useSelector(state => state.Story.UserIndex);

  const passRef = useRef();
  // THE CONTENT
  const [content, setContent] = useState(ALLSTORIES);
  // userIndex is for get the current user  content is playing
  const [userIndex, setUserIndex] = useState(0);

  // current is for get the current content is now playing
  const [current, setCurrent] = useState(0);

  // progress is the animation value of the bars content playing the current state
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {}, [passRef]);

  function start(time) {
    Animated.timing(progress, {
      toValue: 1,
      duration: time, // if content type is an image set the duration to 5 seconds
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        next();
      }
    });
  }
  function Pause() {
    Animated.timing(progress, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).stop();
  }

  async function next() {
    // console.log(
    //   'chech is current user is last story',
    //   CURRENTINDEX !== ALLSTORIES[USERINDEX].stories.length - 1,
    // );
    await dispatcher(StoriesAction.UpdateStories(ALLSTORIES, 1));
    if (CURRENTINDEX !== ALLSTORIES[USERINDEX].stories.length - 1) {
      console.log(' =============> If Condication <==========');
      await dispatcher(StoriesAction.CurrentIndex(CURRENTINDEX + 1));

      progress.setValue(0);
    } else if (
      CURRENTINDEX === ALLSTORIES[USERINDEX].stories.length - 1 &&
      USERINDEX !== content.length - 1
    ) {
      console.log(' =============> Else If Condication <==========');
      await dispatcher(StoriesAction.CurrentIndex(0));
      await dispatcher(StoriesAction.UserIndex(USERINDEX + 1));
      progress.setValue(0);
    } else {
      console.log(' =============> Else Condication <==========');
      close();
    }
  }

  // previous() is for changing the content of the CURRENTINDEX content to -1
  async function previous() {
    let data = [...content];
    // ////////console.log('previous userIndex: ' + userIndex)
    // checking if the previous content is not empty
    if (CURRENTINDEX - 1 >= 0) {
      data[USERINDEX].stories[CURRENTINDEX].finish = 0;
      setContent(data);
      await dispatcher(StoriesAction.CurrentIndex(CURRENTINDEX - 1));

      progress.setValue(0);
      // ////////console.log("previous if call ==> ")
    } else if (USERINDEX - 1 >= 0) {
      const mUserIndex = USERINDEX - 1;
      // setUserIndex(mUserIndex);
      await dispatcher(StoriesAction.UserIndex(USERINDEX - 1));
      await dispatcher(StoriesAction.CurrentIndex(0));
      progress.setValue(0);
      passRef.current.scrollTo(mUserIndex, true);
      // ////////console.log("previous else if call ==>")
    } else {
      // the previous content is empty
      close();
    }
  }

  // handle if the content run out
  async function close() {
    await dispatcher(StoriesAction.CurrentIndex(0));
    await dispatcher(StoriesAction.UserIndex(0));
    progress.setValue(0);

    props.navigation.goBack();
  }

  // pause Story
  const pauseStory = () => {
    Pause();
  };
  const resumeStory = () => {
    //console.log('current diff', 1 - progress._value);
    Animated.timing(progress, {
      toValue: 1 - progress._value,
      duration: 3000, // if content type is an image set the duration to 5 seconds
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        next();
      }
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'blue'}}>
        <View style={styles.containerModal}>
          <StatusBar backgroundColor="black" barStyle="light-content" />
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color={Colors.mango} />
          </View>

          <View style={styles.backgroundContainer}>
            <Image
              onLoadEnd={() => {
                progress.setValue(0);
                start(2000);
              }}
              source={{
                uri: `${Constants.imageURL}${ALLSTORIES[USERINDEX].stories[CURRENTINDEX].images}`,
              }}
              style={{width: width, height: height, resizeMode: 'cover'}}
            />
          </View>

          <View style={{flexDirection: 'column', flex: 1}}>
            <LinearGradient
              colors={['rgba(0,0,0,1)', 'transparent']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: 100,
              }}
            />
            {/* ANIMATION BARS */}
            <View
              style={{
                flexDirection: 'row',
                paddingTop: Platform.OS === 'android' ? 10 : 40,
                paddingHorizontal: 10,
              }}>
              {ALLSTORIES[USERINDEX].stories.map((item, key) => {
                return (
                  <View
                    key={key}
                    style={{
                      height: 2,
                      flex: 1,
                      flexDirection: 'row',
                      backgroundColor: 'rgba(117, 117, 117, 0.5)',
                      marginHorizontal: 2,
                    }}>
                    <Animated.View
                      style={{
                        flex: CURRENTINDEX === key ? progress : item.finish,
                        height: 2,
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                      }}
                    />
                  </View>
                );
              })}
            </View>

            {/* END OF ANIMATION BARS */}
            <View
              style={{
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              {/* THE AVATAR AND USERNAME  */}
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate(Constants.OtherUserProfile)
                }
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{height: 40, width: 40, borderRadius: 30}}
                  source={ALLSTORIES[USERINDEX].images}
                />
                <RegularText
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    paddingLeft: 10,
                  }}>
                  {ALLSTORIES[USERINDEX].name}
                </RegularText>
              </TouchableOpacity>
              {/* END OF THE AVATAR AND USERNAME */}
              {/* THE CLOSE BUTTON */}
              <TouchableOpacity
                onPress={() => {
                  close();
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                  }}>
                  <Icon
                    name="close-circle-outline"
                    type={'Ionicons'}
                    style={{color: Colors.white, fontSize: height * 0.04}}
                  />
                </View>
              </TouchableOpacity>
              {/* END OF CLOSE BUTTON */}
            </View>
            {/* HERE IS THE HANDLE FOR PREVIOUS AND NEXT PRESS */}
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableWithoutFeedback onPress={() => previous()}>
                <View style={{flex: 1}} />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onLongPress={() => {
                  pauseStory();
                }}
                onPressOut={() => {
                  resumeStory();
                }}>
                <View style={{flex: 1}} />
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => next()}>
                <View style={{flex: 1}} />
              </TouchableWithoutFeedback>
            </View>
            {/* END OF THE HANDLE FOR PREVIOUS AND NEXT PRESS */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Stories;
const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const data = [
  {
    id: 1,
    name: 'Jordan',
    image: Images.user1,
    stories: [
      {
        content:
          'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHVwcHklMjBkb2d8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        finish: 0,
      },
      {
        content:
          'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        finish: 0,
      },
    ],
  },
  {
    id: 2,
    name: 'Chris',
    image: Images.user2,
    stories: [
      {
        content:
          'https://images.pexels.com/photos/4668425/pexels-photo-4668425.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        type: 'image',
        finish: 0,
      },
    ],
  },
  {
    id: 3,
    name: 'King',
    image: Images.user3,
    stories: [
      {
        content:
          'https://images.pexels.com/photos/3361723/pexels-photo-3361723.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        type: 'image',
        finish: 0,
      },
    ],
  },
];
