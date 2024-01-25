import { userEnvironment } from './userEnvironment'

export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  apiRootUrl: userEnvironment().apiUrl,
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
