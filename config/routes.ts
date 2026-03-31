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
		path:'Quan-li-so-van-bang',
		name:'Quản lí sổ văn bằng',
		component:'./TH04/Quản lí sổ văn bằng',
		icon:'FileTextOutlined',
	},

	{
		path:'Quan-li-quyet-dinh-van-bang',
		name:'Quản lí quyết định văn bằng',
		component:'./TH04/Quản lí quyết định văn bằng',
		icon:'FileDoneOutlined',
	},

	{
		path:'Cau-hinh-so-van-bang',
		name:'Cấu hình sổ văn bằng',
		component:'./TH04/Cấu hình sổ văn bằng',
		icon:'SettingOutlined',
	},

	{
		path:'Thong-tin-van-bang',
		name:'Thông tin văn bằng',
		component:'./TH04/Thông tin văn bằng',
		icon:'InfoCircleOutlined',
	},

	{
		path:'Tra-cuu-van-bang',
		name:'Tra cứu văn bằng',
		component:'./TH04/Tra cứu văn bằng',
		icon:'SearchOutlined',
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
