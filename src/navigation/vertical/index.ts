// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    // {
    //   title: 'Home',
    //   path: '/home',
    //   icon: 'mdi:home-outline',
    // },
    // {
    //   title: 'Second Page',
    //   path: '/second-page',
    //   icon: 'mdi:email-outline',
    // },
    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   title: 'Access Control',
    //   icon: 'mdi:shield-outline',
    // }
    {
      title: 'Books',
      path: '/books/list',
      icon: 'mdi:book-outline'
    },
    {
      title: 'CheckOuts',
      path: '/checkouts',
      icon: 'mdi:check-outline'
    },
    {
      title: 'CheckIns',
      path: '/CheckIns',
      icon: 'icon-park:check-in'
    }
  ]
}

export default navigation
