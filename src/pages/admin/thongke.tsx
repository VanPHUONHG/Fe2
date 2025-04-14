import { useQuery } from "@tanstack/react-query";
import { Table, Spin, Statistic, Card } from "antd";
import { FaUsers, FaBoxOpen } from "react-icons/fa";
import { api } from "../../services/data";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const fetchUsers = async () => {
  const { data } = await api.get("/users");
  return data.length;
};

const fetchProducts = async () => {
  const { data } = await api.get("/products");
  return data.length;
};

const COLORS = ["#0088FE", "#00C49F"];

const ThongKe = () => {
  const { data: userCount, isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { data: productCount, isLoading: loadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const chartData = [
    { name: "Người dùng", value: userCount || 0 },
    { name: "Sản phẩm", value: productCount || 0 },
  ];

  const tableData = [
    {
      key: "1",
      icon: <FaUsers className="text-blue-500" />,
      name: "Người dùng",
      total: userCount || 0,
    },
    {
      key: "2",
      icon: <FaBoxOpen className="text-green-500" />,
      name: "Sản phẩm",
      total: productCount || 0,
    },
  ];

  const columns = [
    {
      title: "Hạng mục",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <span className="flex items-center gap-2">
          {record.icon}
          {text}
        </span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "total",
      key: "total",
      render: (value: number) => <Statistic value={value} />,
    },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Thống kê tổng quan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Bảng thống kê */}
        <Card
          title="Bảng thống kê"
          className="shadow-md rounded-2xl hover:shadow-lg transition"
        >
          {loadingUsers || loadingProducts ? (
            <div className="flex justify-center py-12">
              <Spin tip="Đang tải dữ liệu..." size="large" />
            </div>
          ) : (
            <Table
              dataSource={tableData}
              columns={columns}
              pagination={false}
              bordered
            />
          )}
        </Card>

        {/* Biểu đồ thống kê */}
        <Card
          title="Biểu đồ thống kê"
          className="shadow-md rounded-2xl hover:shadow-lg transition flex justify-center items-center"
        >
          {loadingUsers || loadingProducts ? (
            <Spin tip="Đang tải dữ liệu..." size="large" />
          ) : (
            <PieChart width={350} height={300}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ThongKe;
