import Keycloak from "keycloak-js";
const _kc = new Keycloak('keycloak.json');

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback : any) => {
  _kc.init({
    onLoad: 'login-required',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
  })
      .then((authenticated : boolean) => {
        if (!authenticated) {
          console.log("user is not authenticated..!");
        }else{
          onAuthenticatedCallback();
          console.log(getTokenParsed())
        }
      })
      .catch(console.error);
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const getTokenParsed = () => _kc.tokenParsed;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback : any) =>
    _kc.updateToken(60)
        .then(successCallback)
        .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const manageAccount = () => _kc.accountManagement()

const hasRole = (roles : any) => roles.some((role : any) => _kc.hasRealmRole(role));

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  getTokenParsed,
  updateToken,
  getUsername,
  hasRole,
  manageAccount
};

export default UserService;
