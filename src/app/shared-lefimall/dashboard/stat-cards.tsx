'use client';

import cn from '@/utils/class-names';
import TicketIcon from '@/components/icons/ticket';

import ShipWithContainer from '@/components/icons/ship-with-container';
import ShippingBox from '@/components/icons/shipping-box';
import CargoPallet from '@/components/icons/cargo-pallet';
import MoneyInHand from '@/components/icons/money-in-hand';
import Containers from '@/components/icons/containers';
import Truck from '@/components/icons/truck';

import Meter from '@/components/icons/meter';

import Notion from '@/components/icons/notion';
import Sales from '@/components/icons/sales';

import Plane from '@/components/icons/plane';

import UserInfo from '@/components/icons/user-info';


import MetricCard from '@/components/corky/metric-card';

import TagIcon from '@/components/icons/tag';
import TagIcon2 from '@/components/icons/tag-2';
import TagIcon3 from '@/components/icons/tag-3';

import {
  PiTShirtFill,
  PiBowlFoodFill,
  PiAirplaneTakeoffFill,
  PiBasketballFill,
  PiBuildingsFill,
  PiTruckFill,
  PiBasketFill,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiArrowsClockwiseFill,
  PiAnchorFill,
  PiDatabase,
} from 'react-icons/pi';




const ticketStats = [
  {
    id: 1,
    icon: <PiDatabase className="h-full w-full" />,
    title: 'User',
    subtitle1: '가입',
    subtitle2: '탈퇴',
    metric: '450',
    metric1: '450',
    metric2: '40',
    metric3: '2,440',
    metric4: '434',
  },
  {
    id: 2,
    icon: <PiDatabase className="h-full w-full" />,
    title: '피드',
    subtitle1: '피드등록',
    subtitle2: '피드 피드백',
    metric: '1,390',
    metric1: '190',
    metric2: '290',
    metric3: '2,390',
    metric4: '4,390',
  },
  {
    id: 3,
    icon: <PiDatabase className="h-full w-full" />,
    title: '자유게시판',
    subtitle1: '게시물등록',
    subtitle2: '댓글등록',
    metric: '2,890',
    metric1: '890',
    metric2: '423',
    metric3: '2,390',
    metric4: '4,390',
  },

];

export default function StatCards({ className }: { className?: string }) {
  return (
    <div
      className={cn('grid grid-cols-1 gap-5 3xl:gap-8 4xl:gap-9', className)}
    >
      {ticketStats.map((stat) => (
        <MetricCard
          key={stat.title + stat.id}
          title={stat.title}
          subtitle1={stat.subtitle1}
          subtitle2={stat.subtitle2}
          metric={stat.metric}
          metric1={stat.metric1}
          metric2={stat.metric2}
          metric3={stat.metric3}
          metric4={stat.metric4}
          icon={stat.icon}
          //iconClassName="bg-transparent w-11 h-11"
          titleClassName=' font-bold text-black '
          
        />
      ))}
    </div>
  );
}
