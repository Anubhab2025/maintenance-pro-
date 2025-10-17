import React, { useState } from "react";
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
} from "recharts";
import {
  Download,
  Calendar,
  Filter,
  DollarSign,
  Wrench,
  BarChart2,
} from "lucide-react";

// Simplified mock data
const monthlyCostData = [
  { name: "Jan", cost: 420000 },
  { name: "Feb", cost: 380000 },
  { name: "Mar", cost: 510000 },
  { name: "Apr", cost: 270000 },
  { name: "May", cost: 390000 },
  { name: "Jun", cost: 480000 },
];

const departmentCostData = [
  { name: "Manufacturing", cost: 2450000 },
  { name: "Packaging", cost: 1280000 },
  { name: "Production", cost: 1820000 },
];

const machineReliabilityData = [
  { name: "Machine A", value: 85, color: "#10B981" },
  { name: "Machine B", value: 65, color: "#F59E0B" },
  { name: "Machine C", value: 92, color: "#10B981" },
];

// Helper function to format currency in Indian Rupees
const formatIndianRupees = (value: number) => {
  return `₹${value.toLocaleString("en-IN")}`;
};

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState("costAnalysis");
  const [selectedTimeframe, setSelectedTimeframe] = useState("thisYear");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 justify-between items-center sm:flex-row">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <button className="inline-flex justify-center items-center px-4 py-2 w-full text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm sm:w-auto hover:bg-gray-50">
          <Download size={16} className="mr-2" />
          Export Report
        </button>
      </div>

      {/* Report Selection and Filters */}
      <div className="flex flex-col p-4 space-y-4 bg-white rounded-lg shadow">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center space-x-2">
            <select
              className="px-4 py-2 w-full rounded-lg border border-gray-300"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="costAnalysis">Cost Analysis</option>
              <option value="machineReliability">Machine Reliability</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar size={16} className="flex-shrink-0 text-gray-500" />
            <select
              className="px-4 py-2 w-full rounded-lg border border-gray-300"
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
            >
              <option value="thisMonth">This Month</option>
              <option value="lastQuarter">Last Quarter</option>
              <option value="thisYear">This Year</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={16} className="flex-shrink-0 text-gray-500" />
            <select
              className="px-4 py-2 w-full rounded-lg border border-gray-300"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Packaging">Packaging</option>
              <option value="Production">Production</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cost Analysis Report */}
      {reportType === "costAnalysis" && (
        <div className="space-y-6">
          <div className="p-4 bg-white rounded-lg shadow sm:p-6">
            <h2 className="flex items-center mb-6 text-lg font-semibold">
              <DollarSign size={20} className="mr-2 text-indigo-600" />
              Monthly Maintenance Costs
            </h2>
            <div className="h-60 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyCostData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `₹${value / 1000}K`} />
                  <Tooltip
                    formatter={(value) => formatIndianRupees(value as number)}
                  />
                  <Legend />
                  <Bar dataKey="cost" name="Monthly Cost" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="p-4 bg-white rounded-lg shadow sm:p-6">
              <h2 className="flex items-center mb-6 text-lg font-semibold">
                <Wrench size={20} className="mr-2 text-indigo-600" />
                Department Cost Breakdown
              </h2>
              <div className="h-60 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentCostData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="cost"
                      nameKey="name"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {departmentCostData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={["#4F46E5", "#60A5FA", "#F59E0B"][index % 3]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatIndianRupees(value as number)}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow sm:p-6">
              <h2 className="flex items-center mb-6 text-lg font-semibold">
                <BarChart2 size={20} className="mr-2 text-indigo-600" />
                Machine Reliability
              </h2>
              <div className="h-60 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={machineReliabilityData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="value"
                      name="Reliability Score (%)"
                      background={{ fill: "#eee" }}
                    >
                      {machineReliabilityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
