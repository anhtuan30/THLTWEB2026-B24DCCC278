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
		path:'trang-chu',
		name:'Trang chủ',
		component:'./TH07/Trang chủ',
		icon:'HomeOutlined',
	},

	{
		path:'trang-chi-tiet-bai-viet',
		name:'Trang chi tiết bài viết',
		component:'./TH07/Trang chi tiết bài viết',
		icon:'FileTextOutlined',
	},

	{
		path:'trang-gioi-thieu',
		name:'Trang giới thiệu',
		component:'./TH07/Trang giới thiệu',
		icon:'InfoCircleOutlined',
	},

	{
		path:'quan-li-bai-viet',
		name:'Quản lí bài viết',
		component:'./TH07/Quản lí bài viết',
		icon:'EditOutlined',
	},

	{
		path:'quan-li-the',
		name:'Quản lí thẻ',
		component:'./TH07/Quản lí thẻ',
		icon:'CreditCardOutlined',
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
