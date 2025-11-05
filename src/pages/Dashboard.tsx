import React from "react";
import { useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  ArrowUpCircle,
  Clock,
  AlertTriangle,
  CheckCircle,
  Wrench,
  DollarSign,
  BarChart2,
  Calendar,
  ThermometerSun,
} from "lucide-react";

// Mock data for dashboard
const repairVsPurchaseData = [
  { name: "HP-102", purchasePrice: 85000, repairCost: 12450 },
  { name: "CNC-305", purchasePrice: 120000, repairCost: 18700 },
  { name: "CB-201", purchasePrice: 45000, repairCost: 5200 },
  { name: "IM-405", purchasePrice: 95000, repairCost: 3450 },
  { name: "IO-103", purchasePrice: 72000, repairCost: 8900 },
];

const departmentCostData = [
  { name: "Manufacturing", cost: 24500 },
  { name: "Packaging", cost: 12800 },
  { name: "Production", cost: 18200 },
  { name: "Logistics", cost: 8900 },
];

const temperatureReadings = [
  { time: "08:00", HP102: 45, CNC305: 52, CB201: 48 },
  { time: "10:00", HP102: 47, CNC305: 54, CB201: 49 },
  { time: "12:00", HP102: 46, CNC305: 53, CB201: 50 },
  { time: "14:00", HP102: 48, CNC305: 55, CB201: 51 },
  { time: "16:00", HP102: 47, CNC305: 54, CB201: 49 },
];

const frequentRepairData = [
  { name: "CNC-305", repairs: 12 },
  { name: "HP-102", repairs: 8 },
  { name: "IO-103", repairs: 6 },
];

const Dashboard: React.FC = () => {
  const location = useLocation();
  const showSuccessModal = location.state?.showSuccessModal;
  const [isModalOpen, setIsModalOpen] = React.useState(
    showSuccessModal || false
  );

  React.useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => setIsModalOpen(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex space-x-2">
          <select className="px-4 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="lastQuarter">Last Quarter</option>
            <option value="thisYear">This Year</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div className="flex items-start p-6 bg-white rounded-xl shadow">
          <div className="p-3 mr-4 bg-blue-100 rounded-full">
            <Wrench size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Machines</p>
            <h3 className="text-2xl font-bold text-gray-800">248</h3>
            <p className="flex items-center mt-1 text-xs text-green-600">
              <ArrowUpCircle size={14} className="mr-1" />
              <span>+12 this month</span>
            </p>
          </div>
        </div>

        <div className="flex items-start p-6 bg-white rounded-xl shadow">
          <div className="p-3 mr-4 bg-indigo-100 rounded-full">
            <Calendar size={24} className="text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Maintenance Tasks
            </p>
            <h3 className="text-2xl font-bold text-gray-800">156</h3>
            <p className="flex items-center mt-1 text-xs text-amber-600">
              <Clock size={14} className="mr-1" />
              <span>42 scheduled today</span>
            </p>
          </div>
        </div>

        <div className="flex items-start p-6 bg-white rounded-xl shadow">
          <div className="p-3 mr-4 bg-green-100 rounded-full">
            <CheckCircle size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tasks Complete</p>
            <h3 className="text-2xl font-bold text-gray-800">89</h3>
            <p className="flex items-center mt-1 text-xs text-green-600">
              <ArrowUpCircle size={14} className="mr-1" />
              <span>+23% from last month</span>
            </p>
          </div>
        </div>

        <div className="flex items-start p-6 bg-white rounded-xl shadow">
          <div className="p-3 mr-4 bg-amber-100 rounded-full">
            <Clock size={24} className="text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tasks Pending</p>
            <h3 className="text-2xl font-bold text-gray-800">42</h3>
            <p className="flex items-center mt-1 text-xs text-amber-600">
              <AlertTriangle size={14} className="mr-1" />
              <span>8 due today</span>
            </p>
          </div>
        </div>

        <div className="flex items-start p-6 bg-white rounded-xl shadow">
          <div className="p-3 mr-4 bg-red-100 rounded-full">
            <AlertTriangle size={24} className="text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tasks Overdue</p>
            <h3 className="text-2xl font-bold text-gray-800">25</h3>
            <p className="flex items-center mt-1 text-xs text-red-600">
              <ArrowUpCircle size={14} className="mr-1 transform rotate-180" />
              <span>+5 this week</span>
            </p>
          </div>
        </div>

        <div className="flex items-start p-6 bg-white rounded-xl shadow">
          <div className="p-3 mr-4 bg-purple-100 rounded-full">
            <DollarSign size={24} className="text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Cost</p>
            <h3 className="text-2xl font-bold text-gray-800">$36,450</h3>
            <p className="flex items-center mt-1 text-xs text-red-600">
              <ArrowUpCircle size={14} className="mr-1 transform rotate-180" />
              <span>-5% vs budget</span>
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-xl shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="flex items-center text-lg font-bold text-gray-800">
              <BarChart2 size={20} className="mr-2 text-indigo-600" />
              Repair Cost vs Purchase Price
            </h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={repairVsPurchaseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar
                  dataKey="purchasePrice"
                  name="Purchase Price"
                  fill="#4F46E5"
                />
                <Bar dataKey="repairCost" name="Repair Cost" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="flex items-center text-lg font-bold text-gray-800">
              <DollarSign size={20} className="mr-2 text-indigo-600" />
              Department Cost Analysis
            </h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentCostData}
                  dataKey="cost"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {departmentCostData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#4F46E5", "#60A5FA", "#F59E0B", "#10B981"][index % 4]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="flex items-center text-lg font-bold text-gray-800">
              <ThermometerSun size={20} className="mr-2 text-indigo-600" />
              Temperature Readings
            </h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureReadings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="HP102"
                  name="HP-102"
                  stroke="#4F46E5"
                />
                <Line
                  type="monotone"
                  dataKey="CNC305"
                  name="CNC-305"
                  stroke="#F59E0B"
                />
                <Line
                  type="monotone"
                  dataKey="CB201"
                  name="CB-201"
                  stroke="#10B981"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="flex items-center text-lg font-bold text-gray-800">
              <Wrench size={20} className="mr-2 text-indigo-600" />
              Frequent Repairs
            </h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={frequentRepairData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="repairs"
                  name="Number of Repairs"
                  fill="#EF4444"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 bg-white rounded-xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">
            Recent Maintenance Activities
          </h2>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex items-start pb-4 border-b border-gray-100"
            >
              <div className="flex flex-shrink-0 justify-center items-center mr-3 w-10 h-10 bg-blue-100 rounded-full">
                <Wrench size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Hydraulic Press #HP-{item + 100} Maintenance
                  </p>
                  <span className="text-xs text-gray-500">2h ago</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Scheduled maintenance completed by John Doe
                </p>
                <div className="flex items-center mt-2">
                  <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">
                    Completed
                  </span>
                  <span className="ml-2 text-xs text-gray-500">Cost: $420</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
          <div className="p-6 mx-4 w-full max-w-sm text-center bg-green-50 rounded-lg border border-green-200">
            <p className="font-semibold text-green-800">Login Successful!</p>
            <p className="mb-4 text-green-600">Welcome to MaintenancePro.</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Dashboard;
