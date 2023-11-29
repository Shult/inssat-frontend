import Keycloak from "keycloak-js";
let initOptions = {
  url: 'http://localhost:8080/',
  realm: 'intranet',
  clientId: 'intranet-front',
  onLoad: 'check-sso', // check-sso | login-required
  KeycloakResponseType: 'code',
}


const _kc = new Keycloak(initOptions);

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
          console.log(_kc)
        }
      })
      .catch(console.error);
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const getTokenParsed : any = () => _kc.tokenParsed;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback : any) =>
    _kc.updateToken(60)
        .then(successCallback)
        .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const manageAccount = () => _kc.accountManagement()

// const hasRole = (roles : any) => roles.some((role : any) => _kc.hasRealmRole(role));

const hasRole = (role: string) => { return _kc.hasRealmRole(role) }

const getKeycloakInstance : any = () => _kc;

const createAccountUrl = () => _kc.createAccountUrl();

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
  getKeycloakInstance,
  createAccountUrl
};

export default UserService;
