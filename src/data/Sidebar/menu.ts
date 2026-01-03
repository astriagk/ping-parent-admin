import { MegaMenu } from '@src/dtos'

const menu: MegaMenu[] = [
  {
    separator: true,
    title: 'Admins',
    lang: 'pe-dashboards',
    children: [],
  },
  {
    title: 'Admins',
    lang: 'pe-dashboards',
    icon: 'gauge',
    link: '#',
    separator: false,
    children: [
      {
        title: 'list',
        lang: 'pe-analytics',
        link: '/admins/list',
        dropdownPosition: null,
        children: [],
      },
    ],
  },
]

export { menu }
