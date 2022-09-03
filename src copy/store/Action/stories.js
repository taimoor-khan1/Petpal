import {
  CURRENTINDEX,
  GETSTORIES,
  UPDATESTORIES,
  USERINDEX,
} from '../actionType';
import Axios from '../../network/APIKit';
import Constants from '../../common/Constants';
import utils from '../../../utils';
import Images from '../../common/Images';

export const GETALLSTORIES = () => {
  return (dispatch, getState) => {
    const token = getState().Auth.AccessToken;
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const onSuccess = ({data}) => {
      console.log('response Stories =========>', JSON.stringify(data.data));
      dispatch({
        type: GETSTORIES,
        stories: data.data,
      });
    };
    const onFailure = error => {
      console.log(' All Status ===============>', error);
    };
    Axios.get(Constants.story, config).then(onSuccess).catch(onFailure);
  };
};

export const StoriesViewed = imageId => {
  return (dispatch, getState) => {
    const token = getState().Auth.AccessToken;

    let config = {
      headers: {
        Authorization: token,
      },
    };
    let postData = {
      story_id: imageId,
    };
    const onSuccess = ({data}) => {
      console.log('response sccuess  ====================>', data);
      // GETALLSTORIES();
    };
    const onFailure = error => {
      console.log('===============>', error);
    };
    Axios.post(Constants.StoryView, postData, config)
      .then(onSuccess)
      .catch(onFailure);
  };
};

export const UserIndex = item => {
  return (dispatch, getState) => {
    dispatch({
      type: USERINDEX,
      userindex: item,
    });
  };
};

export const CurrentIndex = item => {
  // console.log('Action =========>', item);
  return (dispatch, getState) => {
    dispatch({
      type: CURRENTINDEX,
      currentindex: item,
    });
  };
};

export const UpdateStories = (data, state) => {
  console.log('Action update stories=========>', state);
  let updateStorey = [...data];

  return (dispatch, getState) => {
    const USERINDEX = getState().Story.UserIndex;
    const CURRENTINDEX = getState().Story.CurrenttIndex;

    updateStorey[USERINDEX].stories[CURRENTINDEX].finish = state;
    console.log('shohab update =========>  ', JSON.stringify(updateStorey));

    dispatch({
      type: UPDATESTORIES,
      update: updateStorey,
    });
  };
};

let dummeyData = [
  {
    id: 17,
    images: 'public/uploads/img/users/336705707.png',
    name: 'my name 1',
    stories: [
      {
        id: 33,
        images: Images.pet1,
        description: 'Had an amazing time with Max 5 star with the Pet.',
        finish: 0,
      },
      {
        id: 34,
        images: Images.pet2,
        description: 'Had an amazing time with Max 5 star with the Pet.',
        finish: 0,
      },
    ],
  },
  {
    id: 18,
    images: 'public/uploads/img/users/336705707.png',
    name: 'my name 2',
    stories: [
      {
        id: 36,
        images: Images.pet3,
        description: 'Had an amazing time with Max 5 star with the Pet.',
        finish: 0,
      },
    ],
  },
];
