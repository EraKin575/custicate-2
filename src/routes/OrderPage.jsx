import { useState } from 'react';
import { Button, Input, Modal, Form, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import OrderTable from '../components/OrderTable';
import data from '../assets/DummyData.json';

const { Search } = Input;

const OrderPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalFormData, setModalFormData] = useState({
    id: '',
    customer_name: "",
    customer_email: "",
    quantity: "",
    product: ""
  });
  const [isValidEmail, setValidEmail] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    const filtered = data.filter(item => 
      item.customer_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleOk = () => {
    const newData = [...data, { ...modalFormData, id: `_${Math.random().toString(36).substr(2, 9)}` }];
    setFilteredData(newData);
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalFormData({
      ...modalFormData,
      [name]: value
    });
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setValidEmail(/\S+@\S+\.\S+/.test(value));
    setModalFormData({
      ...modalFormData,
      [name]: value
    });
  };

  return (
    <div className="mx-3 flex flex-col p-4 space-y-4">
      <div className="flex mb-4">
        <Search
          className=" rounded-lg"
          placeholder="Search by customer name"
          allowClear
          size="middle"
          value={searchText}
          onChange={handleSearchTextChange}
          enterButton="Search"
        />
        <Button
          type="primary"
          onClick={() => setModalOpen(true)}
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Order
        </Button>
      </div>

      <Modal
        title="Add New Order"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setModalOpen(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Customer Name" name="customer_name" rules={[{ required: true }]}>
            <Input
              onChange={handleChange}
              value={modalFormData.customer_name}
              name="customer_name"
              placeholder="Enter Customer Name"
            />
          </Form.Item>
          <Form.Item label="Customer Email" name="customer_email" rules={[{ required: true, type: 'email' }]}>
            <Input
              onChange={handleEmailChange}
              value={modalFormData.customer_email}
              name="customer_email"
              placeholder="Enter Customer Email"
              className={`w-full ${isValidEmail ? '' : 'border-red-500'}`}
            />
          </Form.Item>
          <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]}>
            <Input
              onChange={handleChange}
              value={modalFormData.quantity}
              name="quantity"
              placeholder="Enter Quantity"
              type="number"
              min="1"
            />
          </Form.Item>
          <Form.Item label="Product" name="product" rules={[{ required: true }]}>
            <Select
              onChange={(value) => setModalFormData({ ...modalFormData, product: value })}
              value={modalFormData.product}
              name="product"
              placeholder="Select Product"
              suffixIcon={<DownOutlined />}
            >
              {/* Assuming these are the product options you have */}
              <Select.Option value="Product 1">Product 1</Select.Option>
              <Select.Option value="Product 2">Product 2</Select.Option>
              <Select.Option value="Product 3">Product 3</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <OrderTable data={filteredData} />
    </div>
  );
};

export default OrderPage;
