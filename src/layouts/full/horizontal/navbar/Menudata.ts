import {
  IconHome,
  IconPoint,
  IconApps,
  IconClipboard,
  IconFileDescription,
  IconBorderAll,
  IconZoomCode,
  IconRotate,
  IconUserPlus,
  IconLogin,
  IconAlertCircle,
  IconSettings,
} from '@tabler/icons-react';
import { uniqueId } from 'lodash';

const Menuitems = [
   
  {
    id: uniqueId(),
    title: 'APPS',
    icon: IconApps,
    href: '/apps/',
    children: [      
      {
        id: uniqueId(),
        title: 'Calendar',
        icon: IconPoint,
        href: '/apps/calendar',
      },     
    ],
  },

  {
    id: uniqueId(),
    title: 'SERVICE',
    icon: IconFileDescription,
    href: '/modernize/test',
    children: [
      {
        id: uniqueId(),
        title: 'AM Poc',
        icon: IconPoint,
        href: '/modernize/test', 
        children: [
          {
            id: uniqueId(),
            title: '즉시이체',
            icon: IconPoint,
            href: '/modernize/test',
          },
        ]
      },      
    ],
  },
  
];
export default Menuitems;
