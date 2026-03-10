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
		path: "Oan-Tu-Ti",
	    name: "Oẳn Tù Tì",
	    component: './Bài 1_TH02/Oẳn Tù Tì',
		icon: 'PlayCircleOutlined',

	},
	{
		path: "Danh-Muc-Khoi-Kien-Thuc",
		name: "Danh Mục Khối Kiến Thức",
		component: './Bài 2_TH02/DanhMucKhoiKienThuc',
		icon: 'AppstoreOutlined',

	},
	{
		path: "Danh-Muc-Mon-Hoc",
		name: "Danh Mục Môn Học",
		component: './Bài 2_TH02/DanhMucMonHoc',
		icon: 'BookOutlined',
	},

	{
		path: "Quan-Ly-Cau-Hoi",
		name: "Quản Lý Câu Hỏi",
		component: './Bài 2_TH02/QuanLyCauHoi',
		icon: 'QuestionOutlined',
	},

	{
		path: "Quan-Ly-De-Thi",
		name: "Quản Lý Đề Thi",
		component: './Bài 2_TH02/QuanLyDeThi',
		icon: 'FileTextOutlined',
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
