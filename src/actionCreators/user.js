/**
 * @fileoverview Contains functions for loading users and interacting
 * with loaded users. Functions dispatch redux actions.
 */
import githubApi from '../utils/githubApi';
import { usersLoaded, userLoaded } from '../actions/user';
import { setAlert } from '../actionCreators/alert';

/**
 * Loads information for users matching the username query using the github API
 * @param {string} nameQuery The username query used to search users
 */
const getUsers = (nameQuery) => async (dispatch) => {
  try {
    const res = await githubApi.get(`/search/users?q=${nameQuery}`);

    const payload = res.data.items.map((item) => ({
      username: item.login,
      avatar: item.avatar_url,
      id: item.id,
      num_repos: item.public_repos,
    }));

    dispatch(usersLoaded(payload, nameQuery));
  } catch (err) {
    dispatch(
      setAlert(
        'There was a problem searching for users, please try again.',
        false
      )
    );
  }
};

/**
 * Loads information for the user matching the username using the github API
 * @param {string} username The username of the user being loaded.
 */
const loadUser = (username) => async (dispatch) => {
  try {
    const res = await githubApi.get(`/users/${username}`);

    const user = {
      id: res.data.id,
      username: res.data.login,
      avatar: res.data.avatar_url,
      num_repos: res.data.public_repos,
    };

    dispatch(userLoaded(user));
  } catch (err) {
    dispatch(setAlert('Could not retrieve user, please try again.', false));
  }
};

export default {
  getUsers,
  loadUser,
};
