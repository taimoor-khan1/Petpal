import { FAVPET, GETUSERPROFFILE } from "../actionType";
import Axios from "../../network/APIKit";
import Constants from "../../common/Constants";
import utils from "../../../utils";

export const GetAllFavPet = () => {
  return (dispatch, getState) => {
    const token = getState().Auth.AccessToken;
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const onSuccess = ({ data }) => {
      if (data.data === []) {
        let temp = data.data.records.map((e) => {
          return { ...e, IsFavourite: 1 };
        });
        // console.log('fav all pet response ======================>', temp);
        dispatch({
          type: FAVPET,
          favpet: temp,
        });
      } else {
        dispatch({
          type: FAVPET,
          favpet: [],
        });
      }
    };
    const onFailure = (error) => {
      utils.showResponseError(error);
      console.log(" fav all pet  error ===============>", error);
    };
    Axios.get(Constants.favouritePets, config).then(onSuccess).catch(onFailure);
  };
};

export const HandleMarkFav = (data, id) => {
  return async (dispatch, getState) => {
    const token = getState().Auth.AccessToken;
    let config = {
      headers: {
        Authorization: token,
      },
    };
    let body = {
      pet_id: id,
    };
    // ADD REMOVE SUCCESS
    const onSuccess = async ({ data }) => {
      // GET FAV PET  SUCCESS
      const onSuccess = ({ data }) => {
        let temp = data.data.records.map((e) => {
          return { ...e, IsFavourite: 1 };
        });
        dispatch({
          type: FAVPET,
          favpet: temp,
        });
      };
      const onFailure = (error) => {
        utils.showResponseError(error);
      };
      // GET FAV PET API
      Axios.get(Constants.favouritePets, config)
        .then(onSuccess)
        .catch(onFailure);
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
      // console.log(' fav screen add-remove error ===============>', error);
    };
    // ADD REMOVE FAV PET API
    Axios.post(Constants.addRemoveFav, body, config)
      .then(onSuccess)
      .catch(onFailure);
  };
};
