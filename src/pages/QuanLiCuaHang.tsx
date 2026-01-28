import { Table } from 'antd';
const QuanLiCuaHang = () => {
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 100,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 300,
        },
    ];

    return (
        <div style ={{ padding: 24, minHeight: 360 }}>
            Quản Lí Cửa Hàng
            <Table dataSource={dataSource} columns={columns}  />
        </div>
    );
};
export default QuanLiCuaHang;
