import { Table, Button, Space} from 'antd';
const DanhMucMonHoc = () => {
    const columns = [
        {
            title: 'Mã môn học',
            dataIndex: 'maMonHoc',
            key: 'maMonHoc',
        },
        {
            title: 'Tên môn học',
            dataIndex: 'tenMonHoc',
            key: 'tenMonHoc',
        },
        {
            title: 'Số tín chỉ',
            dataIndex: 'soTinChi',
            key: 'soTinChi',

        },
        {
            title: 'Thao tác',
            key: 'thaoTac',
            render: () => (
                <Space>
                    <Button type="primary">Sửa</Button>
                    <Button type="default">Xóa</Button>
                </Space>
            ),
        }
    ];

const datasource = [
    {
        maMonHoc: 'MH001',
        tenMonHoc: 'Toán học',
        soTinChi: 3,
    },
    {
        maMonHoc: 'MH002',
        tenMonHoc: 'Vật lý',
        soTinChi: 4,
    },
];

    return(
        <div style ={{padding:24}}>
            <h1>Danh Mục Môn Học</h1>
            <Button type='primary' style={{marginBottom: '20px'}}>Thêm mới</Button>
            <Table dataSource={datasource} columns={columns} />
        </div>
    );

};
export default DanhMucMonHoc;