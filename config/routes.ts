export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/Quan-li-nhan-vien-va-dich-vu',
		name: 'Quản lí nhân viên và dịch vụ',
		component: './TH03/Quản lý nhân viên và dịch vụ',
		icon: 'UserOutlined',
	},
	{
		path:'/Quan-li-lich-hen',
		name:'Quản lí lịch hẹn',
		component:'./TH03/Quản lí lịch hẹn',
		icon:'CalendarOutlined',
	},
	{
		path:'/Danh-gia-dich-vu-va-nhan-vien',
		name:'Đánh giá dịch vụ và nhân viên',
		component:'./TH03/Đánh giá dịch vụ và nhân viên',
		icon:'StarOutlined',
	},
	{
		path:'Thong-ke-va-bao-cao',
		name:'Thống kê và báo cáo',
		component: './TH03/Thống kê và báo cáo',
		icon:'BarChartOutlined',
	},

	
	
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo-list',
		name: 'TodoList',
		icon: 'OrderedListOutlined',
		component: './TodoList',
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',

	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
