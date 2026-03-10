import { Table, Button, Space } from 'antd';
const DanhMucKhoiKienThuc =() =>{
    const columns =[
        {
            title :'STT',
            dataIndex:'stt',
            key:'stt',
        },
        {
            title :'Tên Khối Kiến Thức',
            dataIndex:'tenKK',
            key:'tenKK',
        },
        {
            title :'Thao tác',
            key:'thaoTac',
            render:()=>{
                <Space>
                    <Button type='primary'>Sửa</Button>
                    <Button type='default'>Xóa</Button>
                </Space>;
            }
        },
    ];
    return(
        <div style={{padding:24}}>
            <h1>Danh Mục Khối Kiến Thức</h1>
            <Button type='primary' style ={{marginBottom: '20px'}}> Thêm mới</Button>
            <Table columns={columns} dataSource={[]} />
        </div>

    );


};
export default DanhMucKhoiKienThuc;