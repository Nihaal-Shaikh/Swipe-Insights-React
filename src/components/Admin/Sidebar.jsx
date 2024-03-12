import React from 'react';
import { FcLineChart } from "react-icons/fc";
import { DASHBOARD_SIDEBAR_LINKS } from './lib/constants/navigation';
import { Link } from "react-router-dom";

const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

export default function Sidebar() {
  return (
    <div className='bg-neutral-900 w-60 p-3 flex flex-col text-white'>
      <div className='flex items-center gap-2 px-1 py-3'>
        <FcLineChart fontSize={24} />
        <span className='text-neutral-100 text-lg'>Swipe Insights</span>
      </div>
      <div className='py-8 flex flex-1 flex-col gap-0.5'>
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
};

function SidebarLink({ item }) {

  return (
    <Link to={item.path} className={linkClasses}>
      <span className='text-xl'>{item.icon}</span>
      {item.label}
    </Link>
  );
}