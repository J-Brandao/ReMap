import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setToken } from '../Store/Token/Actions';

export default () => {
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    getAccessTokenSilently()
      .then(token => dispatch(setToken(token)))
      .catch(err => loginWithRedirect())
  }, [dispatch, getAccessTokenSilently, loginWithRedirect])
}