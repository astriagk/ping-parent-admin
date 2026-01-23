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
        title: 'List',
        lang: 'pe-list',
        link: '/admins/list',
        dropdownPosition: null,
        children: [],
      },
    ],
  },
  {
    separator: true,
    title: 'Users',
    lang: 'pe-users',
    children: [],
  },
  {
    title: 'Users',
    lang: 'pe-users',
    icon: 'gauge',
    link: '#',
    separator: false,
    children: [
      {
        title: 'Drivers',
        lang: 'pe-drivers',
        link: '/users/drivers',
        dropdownPosition: null,
        children: [
          {
            title: 'List',
            lang: 'pe-list',
            link: '/users/drivers/list',
            dropdownPosition: null,
            children: [],
          },
        ],
      },
      {
        title: 'Parents',
        lang: 'pe-parents',
        link: '/users/parents',
        dropdownPosition: null,
        children: [
          {
            title: 'List',
            lang: 'pe-list',
            link: '/users/parents/list',
            dropdownPosition: null,
            children: [],
          },
        ],
      },
    ],
  },
  {
    separator: true,
    title: 'Schools',
    lang: 'pe-schools',
    children: [],
  },
  {
    title: 'Schools',
    lang: 'pe-schools',
    icon: 'gauge',
    link: '#',
    separator: false,
    children: [
      {
        title: 'List',
        lang: 'pe-list',
        link: '/schools/list',
        dropdownPosition: null,
        children: [],
      },
    ],
  },
]

export { menu }
