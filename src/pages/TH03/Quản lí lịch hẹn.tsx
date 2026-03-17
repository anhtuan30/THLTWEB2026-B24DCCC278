import {Table, Button} from 'antd';
const QuanLiLichHen =()=>{
    const columns =[
        {
            title: 'Ngày',
            dataIndex:'date',
            key: 'date',
        },
        {
            title:'Giờ',
            dataIndex:'time',
            key:'time',
        },
        {
            title:'Nhân viên phục vụ',
            dataIndex:'employee',
            key:'employee'
        },
    ];
    return(
        <div>
            <h1>Quản lí lịch hẹn</h1>
            <Button type='primary' style={{marginBottom:15}}>Đặt lịch</Button>
            <Table columns={columns} dataSource={[]}/>
            
        </div>
    );

};
export default QuanLiLichHen;