import {
	HiOutlineViewGrid,
	HiPhotograph,
	HiOutlineArrowsExpand
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/web-admin',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'images',
		label: 'Images',
		path: '/web-admin/images',
		icon: <HiPhotograph />
	},
	{
		key: 'swipe-options',
		label: 'Swipe Options',
		path: '/web-admin/swipe-options',
		icon: <HiOutlineArrowsExpand />
	}
];