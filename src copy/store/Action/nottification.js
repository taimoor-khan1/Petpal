import {NOTIFICATIONS} from '../actionType';
import Axios from '../../network/APIKit';
import Constants from '../../common/Constants';

export const GetNotification = () => {
  return (dispatch, getState) => {
    const token = getState().Auth.AccessToken;

    let config = {
      headers: {
        Authorization: token,
      },
    };
    const onSuccess = ({data}) => {
      //   console.log(' Notification response ======>', data.data);
      dispatch({
        type: NOTIFICATIONS,
        notification: data.data,
      });
    };
    const onFailure = error => {
      console.log(' Notification error ==================>', error);
    };
    Axios.get(Constants.notifications, config).then(onSuccess).catch(onFailure);
  };
};
