import Firebase from './firebaseConfig';

export const AddUser = async (name, uid, profileImg) => {
  try {
    return await Firebase.database()
      .ref('users/' + uid)
      .set({
        name: name,
        uuid: uid,
        profileImg: profileImg,
      });
  } catch (error) {
    console.log('Add User Error ========>', error);
    return error;
  }
};

export const UpdateUser = async (uuid, imgSource) => {
  try {
    return await firebase
      .database()
      .ref('users/' + uuid)
      .update({
        profileImg: imgSource,
      });
  } catch (error) {
    return error;
  }
};
