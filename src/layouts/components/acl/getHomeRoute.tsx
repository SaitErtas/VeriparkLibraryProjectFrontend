/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'client') return '/acl'

  //else return '/home'
  else return '/books/list'
}

export default getHomeRoute
