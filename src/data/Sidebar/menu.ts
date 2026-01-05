import { MegaMenu } from '@src/dtos'

const menu: MegaMenu[] = [
  {
    separator: true,
    title: 'Admins',
    lang: 'pe-admins',
    children: [],
  },
  {
    title: 'Admins',
    lang: 'pe-admins',
    icon: 'gauge',
    link: '#',
    separator: false,
    children: [
      {
        title: 'list',
        lang: 'pe-list',
        link: '/admins/list',
        dropdownPosition: null,
        children: [],
      },
    ],
  },
]

export { menu }
