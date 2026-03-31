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
		path: '/danh-sach-CLB',
		name:'Danh Sách CLB',
		component: './TH05/Danh sách CLB',
		icon: 'UnorderedListOutlined',
	},
	{
		path:'/quan-li-don-dang-ki-thanh-vien',
		name:'Quản Lí Đơn Đăng Kí Thành Viên',
		component:'./TH05/Quản lí đơn đăng kí thành viên',
		icon:'FormOutlined',
	},
	{
		path:'/quan-li-thanh-vien-CLB',
		name:'Quản Lí Thành Viên CLB',
		component:'./TH05/Quản lí thành viên CLB',
		icon:'UserOutlined',
	},
	{
		path:'/bao-cao-thong-ke',
		name:'Báo Cáo Thống Kê',
		component:'./TH05/Báo cáo và thống kê',
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
