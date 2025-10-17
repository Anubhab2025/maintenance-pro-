import React from 'react';
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
  Line
} from 'recharts';
import { 
  ArrowUpCircle, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Wrench,
  DollarSign,
  BarChart2,
  Calendar,
  ThermometerSun
} from 'lucide-react';

// Mock data for dashboard
const repairVsPurchaseData = [
  { name: 'HP-102', purchasePrice: 85000, repairCost: 12450 },
  { name: 'CNC-305', purchasePrice: 120000, repairCost: 18700 },
  { name: 'CB-201', purchasePrice: 45000, repairCost: 5200 },
  { name: 'IM-405', purchasePrice: 95000, repairCost: 3450 },
  { name: 'IO-103', purchasePrice: 72000, repairCost: 8900 },
];

const departmentCostData = [
  { name: 'Manufacturing', cost: 24500 },
  { name: 'Packaging', cost: 12800 },
  { name: 'Production', cost: 18200 },
  { name: 'Logistics', cost: 8900 },
];

const temperatureReadings = [
  { time: '08:00', HP102: 45, CNC305: 52, CB201: 48 },
  { time: '10:00', HP102: 47, CNC305: 54, CB201: 49 },
  { time: '12:00', HP102: 46, CNC305: 53, CB201: 50 },
  { time: '14:00', HP102: 48, CNC305: 55, CB201: 51 },
  { time: '16:00', HP102: 47, CNC305: 54, CB201: 49 },
];

const frequentRepairData = [
  { name: 'CNC-305', repairs: 12 },
  { name: 'HP-102', repairs: 8 },
  { name: 'IO-103', repairs: 6 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex space-x-2">
          <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="lastQuarter">Last Quarter</option>
            <option value="thisYear">This Year</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex items-start">
          <div className="p-3 rounded-full bg-blue-100 mr-4">
            <Wrench size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Machines</p>
            <h3 className="text-2xl font-bold text-gray-800">248</h3>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpCircle size={14} className="mr-1" />
              <span>+12 this month</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-start">
          <div className="p-3 rounded-full bg-indigo-100 mr-4">
            <Calendar size={24} className="text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Maintenance Tasks</p>
            <h3 className="text-2xl font-bold text-gray-800">156</h3>
            <p className="text-xs text-amber-600 flex items-center mt-1">
              <Clock size={14} className="mr-1" />
              <span>42 scheduled today</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-start">
          <div className="p-3 rounded-full bg-green-100 mr-4">
            <CheckCircle size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Tasks Complete</p>
            <h3 className="text-2xl font-bold text-gray-800">89</h3>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpCircle size={14} className="mr-1" />
              <span>+23% from last month</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-start">
          <div className="p-3 rounded-full bg-amber-100 mr-4">
            <Clock size={24} className="text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Tasks Pending</p>
            <h3 className="text-2xl font-bold text-gray-800">42</h3>
            <p className="text-xs text-amber-600 flex items-center mt-1">
              <AlertTriangle size={14} className="mr-1" />
              <span>8 due today</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-start">
          <div className="p-3 rounded-full bg-red-100 mr-4">
            <AlertTriangle size={24} className="text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Tasks Overdue</p>
            <h3 className="text-2xl font-bold text-gray-800">25</h3>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <ArrowUpCircle size={14} className="mr-1 transform rotate-180" />
              <span>+5 this week</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-start">
          <div className="p-3 rounded-full bg-purple-100 mr-4">
            <DollarSign size={24} className="text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Cost</p>
            <h3 className="text-2xl font-bold text-gray-800">$36,450</h3>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <ArrowUpCircle size={14} className="mr-1 transform rotate-180" />
              <span>-5% vs budget</span>
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
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
                <Bar dataKey="purchasePrice" name="Purchase Price" fill="#4F46E5" />
                <Bar dataKey="repairCost" name="Repair Cost" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
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
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentCostData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#4F46E5', '#60A5FA', '#F59E0B', '#10B981'][index % 4]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
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
                <Line type="monotone" dataKey="HP102" name="HP-102" stroke="#4F46E5" />
                <Line type="monotone" dataKey="CNC305" name="CNC-305" stroke="#F59E0B" />
                <Line type="monotone" dataKey="CB201" name="CB-201" stroke="#10B981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
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
                <Bar dataKey="repairs" name="Number of Repairs" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Recent Maintenance Activities</h2>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-start pb-4 border-b border-gray-100">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                <Wrench size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-900">Hydraulic Press #HP-{item + 100} Maintenance</p>
                  <span className="text-xs text-gray-500">2h ago</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Scheduled maintenance completed by John Doe
                </p>
                <div className="mt-2 flex items-center">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
                  <span className="ml-2 text-xs text-gray-500">Cost: $420</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;