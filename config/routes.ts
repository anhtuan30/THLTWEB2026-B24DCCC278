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
		path:'/trang-chu',
		name:'Trang giao diện',
		component:'./TH08/Dashboard',
		icon:'DashboardOutlined',
	},

	{
		path:'/Nhat-ki-tap-luyen',
		name:'Nhật kí tập luyện',
		component:'./TH08/Nhatkitapluyen',
		icon:'BookOutlined',
	},

	{
		path:'/Nhat-ki-chi-so-suc-khoe',
		name:'Nhật ký chỉ số sức khỏe',
		component:'./TH08/Nhatkichisosuckhoe',
		icon:'HeartOutlined',
	},

	{
		path:'/Quan-li-muc-tieu',
		name:'Quản lí mục tiêu',
		component:'./TH08/Quanlimuctieu',
		icon:'CheckCircleOutlined',
	},

	{
		path:'/Thu-vien-bai-tap',
		name:'Thư viện bài tập',
		component:'./TH08/Thuvienbaitap',
		icon:'AppstoreOutlined',
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
