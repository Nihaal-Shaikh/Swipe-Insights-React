import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
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
		icon: <HiOutlineCube />
	},
	{
		key: 'swipe-options',
		label: 'Swipe Options',
		path: '/web-admin/swipe-options',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'usrs',
		label: 'Users',
		path: '/web-admin/users',
		icon: <HiOutlineUsers />
	}
];