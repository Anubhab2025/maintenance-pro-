import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  DollarSign,
  BarChart2,
  Thermometer,
  Wrench,
  ArrowUp,
  ArrowDown,
  FileText,
  Download,
  Edit,
  User,
  Package,
  ShoppingCart,
  Building,
  Link as LinkIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock machine data
const mockMachine = {
  id: 2,
  name: "CNC Machine CNC-305",
  serialNumber: "CNC305-2019-X47Z",
  model: "CNC-3000 Series",
  manufacturer: "Precision Dynamics Inc.",
  department: "Manufacturing",
  location: "Building A, Floor 2, Section 3",
  status: "maintenance",
  purchaseDate: "2019-03-22",
  purchasePrice: 120000,
  vendor: "Industrial Machines USA",
  warrantyExpiration: "2024-03-22",
  lastMaintenance: "2024-01-20",
  nextMaintenance: "2024-04-20",
  maintenanceSchedule: ["quarterly", "annual"],
  totalRepairCost: 18700,
  repairCount: 12,
  healthScore: 78,
  specifications: [
    { name: "Power", value: "220V, 30A" },
    { name: "Weight", value: "2,500 kg" },
    { name: "Dimensions", value: "240 x 180 x 190 cm" },
    { name: "Max RPM", value: "12,000" },
    { name: "Control System", value: "FANUC 31i-B5" },
  ],
  temperatureData: [
    { time: "08:00", temp: 28 },
    { time: "10:00", temp: 32 },
    { time: "12:00", temp: 38 },
    { time: "14:00", temp: 42 },
    { time: "16:00", temp: 40 },
    { time: "18:00", temp: 36 },
    { time: "20:00", temp: 33 },
  ],
  repairHistory: [
    {
      id: 1,
      date: "2023-12-15",
      type: "Repair",
      issue: "Z-axis alignment issues",
      technician: "John Smith",
      cost: 2850,
      parts: ["Z-axis drive belt", "Linear bearings", "Guide rails"],
      resolution: "Replaced worn guide rails and realigned Z-axis",
      storeItems: ["BLT-ZAXIS-001", "BRG-LIN-205", "RL-GUIDE-300"],
    },
    {
      id: 2,
      date: "2023-09-05",
      type: "Maintenance",
      issue: "Regular quarterly maintenance",
      technician: "Sarah Johnson",
      cost: 1200,
      parts: ["Lubrication oil", "Filters", "Coolant"],
      resolution: "Completed standard maintenance checklist",
      storeItems: ["OIL-LUB-50", "FIL-HVAC-02", "COOL-ANTI-5L"],
    },
    {
      id: 3,
      date: "2023-06-20",
      type: "Repair",
      issue: "Control panel errors",
      technician: "Mike Anderson",
      cost: 3450,
      parts: ["Control board", "Display unit"],
      resolution: "Replaced faulty control board and updated firmware",
      storeItems: ["CTRL-BRD-F31", "DISP-UNIT-15"],
    },
    {
      id: 4,
      date: "2023-03-10",
      type: "Maintenance",
      issue: "Regular quarterly maintenance",
      technician: "Sarah Johnson",
      cost: 950,
      parts: ["Lubrication oil", "Filters"],
      resolution: "Completed standard maintenance checklist",
      storeItems: ["OIL-LUB-50", "FIL-HVAC-02"],
    },
    {
      id: 5,
      date: "2022-11-08",
      type: "Repair",
      issue: "Spindle overheating",
      technician: "John Smith",
      cost: 4200,
      parts: ["Spindle assembly", "Coolant pump"],
      resolution: "Replaced damaged spindle and upgraded cooling system",
      storeItems: ["SPINDLE-ASM-05", "PUMP-COOL-200"],
    },
  ],
  documents: [
    {
      id: 1,
      name: "CNC-305 User Manual.pdf",
      type: "PDF",
      size: "12.5 MB",
      uploadedBy: "Admin",
      date: "2019-03-25",
    },
    {
      id: 2,
      name: "Maintenance Checklist.doc",
      type: "DOC",
      size: "2.3 MB",
      uploadedBy: "Sarah Johnson",
      date: "2019-04-10",
    },
    {
      id: 3,
      name: "Warranty Information.pdf",
      type: "PDF",
      size: "1.8 MB",
      uploadedBy: "Admin",
      date: "2019-03-25",
    },
    {
      id: 4,
      name: "Dec 2023 Repair Report.pdf",
      type: "PDF",
      size: "4.2 MB",
      uploadedBy: "John Smith",
      date: "2023-12-18",
    },
    {
      id: 5,
      name: "Technical Specifications.xlsx",
      type: "XLSX",
      size: "3.7 MB",
      uploadedBy: "Mike Anderson",
      date: "2019-05-15",
    },
  ],
  maintenanceTasks: [
    {
      id: 1,
      title: "Quarterly Maintenance Q2 2024",
      dueDate: "2024-04-20",
      status: "scheduled",
      assignedTo: "Sarah Johnson",
      type: "Quarterly",
    },
    {
      id: 2,
      title: "Annual Safety Inspection",
      dueDate: "2024-03-22",
      status: "scheduled",
      assignedTo: "External Inspector",
      type: "Annual",
    },
    {
      id: 3,
      title: "Quarterly Maintenance Q1 2024",
      dueDate: "2024-01-20",
      status: "completed",
      assignedTo: "Sarah Johnson",
      type: "Quarterly",
      completedDate: "2024-01-20",
    },
    {
      id: 4,
      title: "Z-axis Alignment Check",
      dueDate: "2024-02-15",
      status: "completed",
      assignedTo: "John Smith",
      type: "Special",
      completedDate: "2024-02-14",
    },
  ],
  yearlyRepairCosts: [
    { year: 2019, cost: 1450 },
    { year: 2020, cost: 2800 },
    { year: 2021, cost: 3600 },
    { year: 2022, cost: 5700 },
    { year: 2023, cost: 4800 },
    { year: 2024, cost: 350 },
  ],
  storePurchases: [
    {
      id: 1,
      purchaseOrder: "PO-2023-0456",
      date: "2023-12-10",
      vendor: "Industrial Parts Supply",
      totalAmount: 3250,
      status: "delivered",
      items: [
        {
          id: "BLT-ZAXIS-001",
          name: "Z-Axis Drive Belt",
          quantity: 2,
          unitPrice: 450,
          totalPrice: 900,
          category: "Mechanical",
          usedInRepair: "2023-12-15",
        },
        {
          id: "BRG-LIN-205",
          name: "Linear Bearing Set",
          quantity: 1,
          unitPrice: 850,
          totalPrice: 850,
          category: "Mechanical",
          usedInRepair: "2023-12-15",
        },
        {
          id: "RL-GUIDE-300",
          name: "Guide Rail Assembly",
          quantity: 1,
          unitPrice: 1500,
          totalPrice: 1500,
          category: "Mechanical",
          usedInRepair: "2023-12-15",
        },
      ],
    },
    {
      id: 2,
      purchaseOrder: "PO-2023-0389",
      date: "2023-08-28",
      vendor: "Fluid Systems Corp",
      totalAmount: 1850,
      status: "delivered",
      items: [
        {
          id: "OIL-LUB-50",
          name: "High-Temp Lubrication Oil",
          quantity: 4,
          unitPrice: 75,
          totalPrice: 300,
          category: "Consumables",
          usedInRepair: "2023-09-05",
        },
        {
          id: "FIL-HVAC-02",
          name: "HVAC Filter Set",
          quantity: 2,
          unitPrice: 125,
          totalPrice: 250,
          category: "Consumables",
          usedInRepair: "2023-09-05",
        },
        {
          id: "COOL-ANTI-5L",
          name: "Anti-freeze Coolant",
          quantity: 3,
          unitPrice: 65,
          totalPrice: 195,
          category: "Consumables",
        },
        {
          id: "PUMP-COOL-200",
          name: "Coolant Pump Assembly",
          quantity: 1,
          unitPrice: 1105,
          totalPrice: 1105,
          category: "Electrical",
          usedInRepair: "2022-11-08",
        },
      ],
    },
    {
      id: 3,
      purchaseOrder: "PO-2023-0251",
      date: "2023-05-15",
      vendor: "Electro Controls Ltd",
      totalAmount: 2950,
      status: "delivered",
      items: [
        {
          id: "CTRL-BRD-F31",
          name: "FANUC Control Board",
          quantity: 1,
          unitPrice: 1850,
          totalPrice: 1850,
          category: "Electronics",
          usedInRepair: "2023-06-20",
        },
        {
          id: "DISP-UNIT-15",
          name: "15\" Display Unit",
          quantity: 1,
          unitPrice: 1100,
          totalPrice: 1100,
          category: "Electronics",
          usedInRepair: "2023-06-20",
        },
      ],
    },
  ],
  fixedAssets: [
    {
      id: "FA-001",
      name: "CNC Machine CNC-305",
      tag: "CNC305-2019-X47Z",
      category: "Manufacturing Equipment",
      purchaseDate: "2019-03-22",
      purchasePrice: 120000,
      depreciation: 36000,
      currentValue: 84000,
      location: "Building A, Floor 2, Section 3",
      status: "active",
    },
    {
      id: "FA-002",
      name: "Cooling System Unit",
      tag: "COOL-SYS-2019-A1",
      category: "Support Equipment",
      purchaseDate: "2019-04-10",
      purchasePrice: 8500,
      depreciation: 2550,
      currentValue: 5950,
      location: "Building A, Floor 2, Section 3",
      status: "active",
    },
    {
      id: "FA-003",
      name: "Dust Collection System",
      tag: "DUST-COL-2019-B2",
      category: "Environmental Control",
      purchaseDate: "2019-05-15",
      purchasePrice: 6200,
      depreciation: 1860,
      currentValue: 4340,
      location: "Building A, Floor 2, Section 3",
      status: "active",
    },
  ],
  itemUsageHistory: [
    {
      id: "BLT-ZAXIS-001",
      name: "Z-Axis Drive Belt",
      category: "Mechanical",
      totalPurchased: 5,
      totalUsed: 3,
      currentStock: 2,
      lastUsed: "2023-12-15",
      avgLifespan: "6 months",
      totalCost: 2250,
    },
    {
      id: "BRG-LIN-205",
      name: "Linear Bearing Set",
      category: "Mechanical",
      totalPurchased: 3,
      totalUsed: 2,
      currentStock: 1,
      lastUsed: "2023-12-15",
      avgLifespan: "12 months",
      totalCost: 2550,
    },
    {
      id: "OIL-LUB-50",
      name: "High-Temp Lubrication Oil",
      category: "Consumables",
      totalPurchased: 12,
      totalUsed: 8,
      currentStock: 4,
      lastUsed: "2023-09-05",
      avgLifespan: "3 months",
      totalCost: 900,
    },
    {
      id: "CTRL-BRD-F31",
      name: "FANUC Control Board",
      category: "Electronics",
      totalPurchased: 2,
      totalUsed: 1,
      currentStock: 1,
      lastUsed: "2023-06-20",
      avgLifespan: "24 months",
      totalCost: 3700,
    },
  ],
};

const MachineDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [machine] = useState(mockMachine);
  const [activeTab, setActiveTab] = useState("overview");
  const [sortColumn, setSortColumn] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [showNewPurchaseModal, setShowNewPurchaseModal] = useState(false);
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);

  // Handle sorting for repair history
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  // Sort repair history
  const sortedRepairHistory = [...machine.repairHistory].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a];
    const bValue = b[sortColumn as keyof typeof b];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  // Calculate total repair cost percentage compared to purchase price
  const repairCostPercentage =
    (machine.totalRepairCost / machine.purchasePrice) * 100;

  // Calculate total store purchases cost
  const totalStorePurchases = machine.storePurchases.reduce(
    (sum, purchase) => sum + purchase.totalAmount,
    0
  );

  // Calculate category distribution for store items
  const categoryData = machine.storePurchases
    .flatMap((purchase) =>
      purchase.items.map((item) => ({
        category: item.category,
        amount: item.totalPrice,
      }))
    )
    .reduce((acc, item) => {
      const existing = acc.find((i) => i.category === item.category);
      if (existing) {
        existing.amount += item.amount;
      } else {
        acc.push({ category: item.category, amount: item.amount });
      }
      return acc;
    }, [] as { category: string; amount: number }[]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  // Status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
            <CheckCircle size={16} className="mr-1" />
            Operational
          </span>
        );
      case "maintenance":
        return (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
            <Wrench size={16} className="mr-1" />
            Maintenance
          </span>
        );
      case "repair":
        return (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-amber-800 bg-amber-100 rounded-full">
            <AlertTriangle size={16} className="mr-1" />
            Repair
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-full">
            Unknown
          </span>
        );
    }
  };

  const getPurchaseStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Delivered
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Unknown
          </span>
        );
    }
  };

  // Get health indicator color
  const getHealthColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-blue-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  // Task status badges
  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" />
            Completed
          </span>
        );
      case "scheduled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Calendar size={12} className="mr-1" />
            Scheduled
          </span>
        );
      case "in-progress":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <Clock size={12} className="mr-1" />
            In Progress
          </span>
        );
      case "overdue":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertTriangle size={12} className="mr-1" />
            Overdue
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Link
          to="/machines"
          className="flex items-center mr-4 text-indigo-600 hover:text-indigo-900"
        >
          <ChevronLeft size={20} />
          <span>Back to Machines</span>
        </Link>
        <h1 className="flex-1 text-2xl font-bold text-gray-800">
          {machine.name}
        </h1>
        <div className="flex items-center space-x-2">
          {getStatusBadge(machine.status)}
          <Link
            to={`/machines/₹{id}/edit`}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Edit size={16} className="mr-1" />
            Edit
          </Link>
        </div>
      </div>

      {/* Machine Overview */}
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ₹{
                activeTab === "overview"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ₹{
                activeTab === "maintenance"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("maintenance")}
            >
              Maintenance
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ₹{
                activeTab === "repairs"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("repairs")}
            >
              Repair History
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ₹{
                activeTab === "purchases"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("purchases")}
            >
              <ShoppingCart size={16} className="inline mr-1" />
              Purchases & Assets
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ₹{
                activeTab === "documents"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("documents")}
            >
              Documents
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ₹{
                activeTab === "analytics"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h3 className="mb-4 text-lg font-medium">
                    Machine Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Serial Number:</span>
                      <span className="font-medium">
                        {machine.serialNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Model:</span>
                      <span className="font-medium">{machine.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Manufacturer:</span>
                      <span className="font-medium">
                        {machine.manufacturer}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Department:</span>
                      <span className="font-medium">{machine.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location:</span>
                      <span className="font-medium">{machine.location}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-medium">Purchase Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Purchase Date:</span>
                      <span className="font-medium">
                        {new Date(machine.purchaseDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Purchase Price:</span>
                      <span className="font-medium">
                        ₹{machine.purchasePrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Vendor:</span>
                      <span className="font-medium">{machine.vendor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Warranty Until:</span>
                      <span className="font-medium">
                        {new Date(
                          machine.warrantyExpiration
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Asset Age:</span>
                      <span className="font-medium">
                        {Math.floor(
                          (new Date().getTime() -
                            new Date(machine.purchaseDate).getTime()) /
                            (365.25 * 24 * 60 * 60 * 1000)
                        )}{" "}
                        years
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-medium">
                    Health & Maintenance
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-500">Health Score:</span>
                        <span className="font-medium">
                          {machine.healthScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ₹{getHealthColor(
                            machine.healthScore
                          )}`}
                          style={{ width: `₹{machine.healthScore}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Maintenance:</span>
                      <span className="font-medium">
                        {new Date(machine.lastMaintenance).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Next Maintenance:</span>
                      <span className="font-medium">
                        {new Date(machine.nextMaintenance).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Maintenance Schedule:
                      </span>
                      <span className="font-medium capitalize">
                        {machine.maintenanceSchedule.join(", ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Repairs:</span>
                      <span className="font-medium">{machine.repairCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Repair Cost:</span>
                      <span className="font-medium">
                        ₹{machine.totalRepairCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 text-lg font-medium">Specifications</h3>
                <div className="grid grid-cols-1 gap-4 p-4 bg-gray-50 rounded-lg sm:grid-cols-2 md:grid-cols-3">
                  {machine.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-500">{spec.name}:</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="flex items-center mb-4 text-lg font-medium">
                  <Thermometer size={20} className="mr-2 text-indigo-600" />
                  Latest Temperature Readings
                </h3>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={machine.temperatureData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis domain={[0, 50]} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="temp"
                          name="Temperature (°C)"
                          stroke="#4F46E5"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Purchases & Assets Tab */}
          {activeTab === "purchases" && (
            <div className="space-y-6">
              {/* Header with Action Buttons */}
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">Purchases & Assets</h3>
                <div className="flex space-x-3">
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg border border-transparent shadow-sm transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setShowNewPurchaseModal(true)}>
                    <ShoppingCart size={16} className="mr-2" />
                    New Purchase
                  </button>
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg border border-transparent shadow-sm transition-colors duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => setShowAddAssetModal(true)}>
                    <Building size={16} className="mr-2" />
                    Add Asset
                  </button>
                </div>
              </div>

              {/* Cost Summary Table */}
              <div className="overflow-hidden bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800">Cost Summary</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Category
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                          Percentage
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <div className="flex justify-center items-center w-10 h-10 bg-blue-500 rounded-full">
                                <DollarSign className="w-6 h-6 text-white" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Machine Purchase</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-right text-gray-900 whitespace-nowrap">
                          ₹{machine.purchasePrice.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap">
                          {((machine.purchasePrice / (machine.purchasePrice + totalStorePurchases + machine.totalRepairCost)) * 100).toFixed(1)}%
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <div className="flex justify-center items-center w-10 h-10 bg-green-500 rounded-full">
                                <ShoppingCart className="w-6 h-6 text-white" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Store Purchases</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-right text-gray-900 whitespace-nowrap">
                          ₹{totalStorePurchases.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap">
                          {((totalStorePurchases / (machine.purchasePrice + totalStorePurchases + machine.totalRepairCost)) * 100).toFixed(1)}%
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <div className="flex justify-center items-center w-10 h-10 bg-amber-500 rounded-full">
                                <Wrench className="w-6 h-6 text-white" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Repair Costs</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-right text-gray-900 whitespace-nowrap">
                          ₹{machine.totalRepairCost.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap">
                          {((machine.totalRepairCost / (machine.purchasePrice + totalStorePurchases + machine.totalRepairCost)) * 100).toFixed(1)}%
                        </td>
                      </tr>
                      <tr className="bg-gray-50 hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <div className="flex justify-center items-center w-10 h-10 bg-purple-500 rounded-full">
                                <Package className="w-6 h-6 text-white" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Total Investment</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-right text-gray-900 whitespace-nowrap">
                          ₹{(
                            machine.purchasePrice +
                            totalStorePurchases +
                            machine.totalRepairCost
                          ).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right text-gray-900 whitespace-nowrap">
                          100.0%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Purchase Categories & Fixed Assets */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-800">Purchase Categories</h4>
                  </div>
                  <div className="p-6">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ category, percent }) =>
                              `${category} (${(percent * 100).toFixed(0)}%)`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="amount"
                          >
                            {categoryData.map((_, index) => (
                              <Cell
                                key={`cell-₹{index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`₹₹{value}`, "Amount"]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-800">Fixed Assets</h4>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {machine.fixedAssets.map((asset) => (
                      <div key={asset.id} className="p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-base font-medium text-gray-900">
                              {asset.name}
                            </span>
                            <p className="mt-1 text-sm text-gray-600">{asset.category}</p>
                          </div>
                          <span className="text-lg font-bold text-green-600">
                            ₹{asset.currentValue.toLocaleString()}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-xs text-gray-500">
                          <div>
                            <span className="font-medium">Tag:</span> {asset.tag}
                          </div>
                          <div>
                            <span className="font-medium">Purchase:</span> {new Date(asset.purchaseDate).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">Depreciation:</span> ₹{asset.depreciation.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Store Purchases Table */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800">Recent Store Purchases</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Purchase Order
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Date
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Vendor
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Items
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {machine.storePurchases.map((purchase) => (
                        <tr key={purchase.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-800">
                              {purchase.purchaseOrder}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(purchase.date).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-700">{purchase.vendor}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              {purchase.items.map((item) => (
                                <div key={item.id} className="flex justify-between px-3 py-2 text-sm bg-gray-50 rounded-md">
                                  <span className="text-gray-600">{item.name}</span>
                                  <span className="font-medium text-gray-900">
                                    {item.quantity} × ₹{item.unitPrice}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap">
                            <span className="text-sm font-semibold text-gray-900">
                              ₹{purchase.totalAmount.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getPurchaseStatusBadge(purchase.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Item Usage History Table */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800">Item Usage History</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Item
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Category
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Last Used
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Avg Lifespan
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                          Total Cost
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {machine.itemUsageHistory.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <span className="font-medium text-gray-900">
                                {item.name}
                              </span>
                              <div className="text-sm text-gray-500">{item.id}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-900">
                                {item.currentStock} / {item.totalPurchased}
                              </span>
                              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-green-500 h-1.5 rounded-full"
                                  style={{
                                    width: `₹{(item.currentStock / item.totalPurchased) * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                              {item.lastUsed
                                ? new Date(item.lastUsed).toLocaleDateString()
                                : "Never"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">{item.avgLifespan}</span>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap">
                            <span className="text-sm font-semibold text-gray-900">
                              ₹{item.totalCost.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Maintenance Tab */}
          {activeTab === "maintenance" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Maintenance Schedule</h3>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md border border-transparent shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Schedule Maintenance
                </button>
              </div>

              {/* Maintenance tasks */}
              <div className="mt-4">
                <div className="overflow-hidden bg-white rounded-lg border border-gray-200 shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Task
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Due Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Assigned To
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {machine.maintenanceTasks.map((task) => (
                        <tr key={task.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {task.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {task.type}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                            {task.completedDate && (
                              <div className="text-xs text-green-600">
                                Completed:{" "}
                                {new Date(
                                  task.completedDate
                                ).toLocaleDateString()}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getTaskStatusBadge(task.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <User size={16} className="mr-2 text-gray-400" />
                              <span className="text-sm text-gray-900">
                                {task.assignedTo}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <Link
                              to={`/tasks/₹{task.id}`}
                              className="mr-3 text-indigo-600 hover:text-indigo-900"
                            >
                              View
                            </Link>
                            <button className="text-indigo-600 hover:text-indigo-900">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Maintenance Checklist */}
              <div className="mt-8">
                <h3 className="mb-4 text-lg font-medium">
                  Standard Maintenance Checklist
                </h3>
                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-medium text-gray-700">
                        Mechanical Components
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Inspect all moving parts for wear</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Check belt tension and condition</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Inspect spindle for play and vibration</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Lubricate all required points</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Check axis alignment</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium text-gray-700">
                        Electrical & Control Systems
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Test emergency stop functionality</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Check all electrical connections</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Verify control panel operation</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Test limit switches</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Check firmware version</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium text-gray-700">
                        Coolant & Hydraulic Systems
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Check coolant level and quality</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Inspect coolant pumps and lines</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Check hydraulic pressure</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Inspect for leaks</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Replace filters as needed</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium text-gray-700">
                        Safety & Calibration
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Verify all safety guards</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Check interlocks and sensors</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Perform accuracy test</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Verify operating parameters</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          <span>Run test cycle</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Repair History Tab */}
          {activeTab === "repairs" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Repair History</h3>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md border border-transparent shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Add Repair Record
                </button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                        onClick={() => handleSort("date")}
                      >
                        <div className="flex items-center">
                          Date
                          {sortColumn === "date" &&
                            (sortDirection === "asc" ? (
                              <ArrowUp size={14} className="ml-1" />
                            ) : (
                              <ArrowDown size={14} className="ml-1" />
                            ))}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                        onClick={() => handleSort("type")}
                      >
                        <div className="flex items-center">
                          Type
                          {sortColumn === "type" &&
                            (sortDirection === "asc" ? (
                              <ArrowUp size={14} className="ml-1" />
                            ) : (
                              <ArrowDown size={14} className="ml-1" />
                            ))}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Issue
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                        onClick={() => handleSort("technician")}
                      >
                        <div className="flex items-center">
                          Technician
                          {sortColumn === "technician" &&
                            (sortDirection === "asc" ? (
                              <ArrowUp size={14} className="ml-1" />
                            ) : (
                              <ArrowDown size={14} className="ml-1" />
                            ))}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                        onClick={() => handleSort("cost")}
                      >
                        <div className="flex items-center">
                          Cost
                          {sortColumn === "cost" &&
                            (sortDirection === "asc" ? (
                              <ArrowUp size={14} className="ml-1" />
                            ) : (
                              <ArrowDown size={14} className="ml-1" />
                            ))}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedRepairHistory.map((repair) => (
                      <tr key={repair.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(repair.date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ₹{
                              repair.type === "Repair"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {repair.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {repair.issue}
                          </div>
                          <div className="mt-1 text-xs text-gray-500 line-clamp-1">
                            {repair.resolution}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <User size={16} className="mr-2 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {repair.technician}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ₹{repair.cost.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <button className="mr-3 text-indigo-600 hover:text-indigo-900">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 text-lg font-medium">
                  Commonly Replaced Parts
                </h3>
                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="mb-2 font-medium text-blue-700">
                        Control Board
                      </h4>
                      <div className="text-sm text-gray-600">
                        <div className="flex justify-between mb-1">
                          <span>Replaced:</span>
                          <span className="font-medium">2 times</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Last replaced:</span>
                          <span className="font-medium">Jun 2023</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average cost:</span>
                          <span className="font-medium">₹1,450</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h4 className="mb-2 font-medium text-amber-700">
                        Spindle Assembly
                      </h4>
                      <div className="text-sm text-gray-600">
                        <div className="flex justify-between mb-1">
                          <span>Replaced:</span>
                          <span className="font-medium">1 time</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Last replaced:</span>
                          <span className="font-medium">Nov 2022</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average cost:</span>
                          <span className="font-medium">₹3,200</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="mb-2 font-medium text-green-700">
                        Guide Rails
                      </h4>
                      <div className="text-sm text-gray-600">
                        <div className="flex justify-between mb-1">
                          <span>Replaced:</span>
                          <span className="font-medium">3 times</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Last replaced:</span>
                          <span className="font-medium">Dec 2023</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average cost:</span>
                          <span className="font-medium">₹950</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="mb-2 font-medium text-purple-700">
                        Coolant Pump
                      </h4>
                      <div className="text-sm text-gray-600">
                        <div className="flex justify-between mb-1">
                          <span>Replaced:</span>
                          <span className="font-medium">1 time</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Last replaced:</span>
                          <span className="font-medium">Nov 2022</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average cost:</span>
                          <span className="font-medium">₹680</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Documents</h3>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md border border-transparent shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Upload Document
                </button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Size
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Uploaded By
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {machine.documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <FileText
                              size={16}
                              className="mr-2 text-gray-400"
                            />
                            <span className="text-sm font-medium text-indigo-600">
                              {doc.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ₹{
                              doc.type === "PDF"
                                ? "bg-red-100 text-red-800"
                                : doc.type === "DOC"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {doc.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {doc.size}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {doc.uploadedBy}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(doc.date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <button className="inline-flex items-center mr-3 text-indigo-600 hover:text-indigo-900">
                            <Download size={16} className="mr-1" />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="flex items-center mb-4 text-lg font-medium">
                    <BarChart2 size={20} className="mr-2 text-indigo-600" />
                    Yearly Repair Costs
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={machine.yearlyRepairCosts}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₹₹{value}`, "Cost"]} />
                        <Legend />
                        <Bar dataKey="cost" name="Repair Cost" fill="#4F46E5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="flex items-center mb-4 text-lg font-medium">
                    <DollarSign size={20} className="mr-2 text-indigo-600" />
                    Cost Analysis
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex flex-col justify-center items-center p-4 bg-gray-50 rounded-lg">
                      <p className="mb-2 text-sm text-gray-500">
                        Purchase Price
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        ₹{machine.purchasePrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-center p-4 bg-gray-50 rounded-lg">
                      <p className="mb-2 text-sm text-gray-500">
                        Total Repair Cost
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        ₹{machine.totalRepairCost.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col col-span-2 justify-center items-center p-4 bg-gray-50 rounded-lg">
                      <p className="mb-2 text-sm text-gray-500">
                        Repair to Purchase Ratio
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        {repairCostPercentage.toFixed(1)}%
                      </p>
                      <div className="w-full mt-2 bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ₹{
                            repairCostPercentage < 10
                              ? "bg-green-500"
                              : repairCostPercentage < 20
                              ? "bg-blue-500"
                              : repairCostPercentage < 30
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: `₹{Math.min(repairCostPercentage, 100)}%`,
                          }}
                        ></div>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        {repairCostPercentage < 10
                          ? "Excellent value - low maintenance costs"
                          : repairCostPercentage < 20
                          ? "Good value - reasonable maintenance costs"
                          : repairCostPercentage < 30
                          ? "Fair value - increasing maintenance costs"
                          : "Poor value - high maintenance costs, consider replacement"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <h3 className="flex items-center mb-4 text-lg font-medium">
                  <AlertTriangle size={20} className="mr-2 text-indigo-600" />
                  Failure Analysis
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="mb-2 text-sm font-medium text-gray-700">
                      Most Common Issues
                    </p>
                    <ol className="pl-4 space-y-1 list-decimal">
                      <li className="text-sm">
                        Control system errors (4 times)
                      </li>
                      <li className="text-sm">Spindle problems (3 times)</li>
                      <li className="text-sm">Axis alignment (3 times)</li>
                      <li className="text-sm">Cooling system (2 times)</li>
                    </ol>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="mb-2 text-sm font-medium text-gray-700">
                      Average Repair Time
                    </p>
                    <div className="flex flex-col justify-center items-center h-full">
                      <p className="text-3xl font-bold text-gray-800">3.2</p>
                      <p className="text-sm text-gray-500">days per repair</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="mb-2 text-sm font-medium text-gray-700">
                      Down Time Impact
                    </p>
                    <div className="mt-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500">
                          Total down time:
                        </span>
                        <span className="text-xs font-medium">38 days</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500">
                          Production loss:
                        </span>
                        <span className="text-xs font-medium">
                          ₹85,000 est.
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">
                          Availability:
                        </span>
                        <span className="text-xs font-medium">94.8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <h3 className="flex items-center mb-4 text-lg font-medium">
                  <Wrench size={20} className="mr-2 text-indigo-600" />
                  Maintenance Effectiveness
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-700">
                      Maintenance Compliance
                    </p>
                    <div className="flex flex-col">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">
                          Scheduled maintenance tasks:
                        </span>
                        <span className="text-sm font-medium">16</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Completed on time:</span>
                        <span className="text-sm font-medium">15 (93.8%)</span>
                      </div>
                      <div className="w-full mt-2 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="h-2.5 rounded-full bg-green-500"
                          style={{ width: `93.8%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-700">
                      Post-Maintenance Issues
                    </p>
                    <div className="flex flex-col">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Issues within 30 days:</span>
                        <span className="text-sm font-medium">2</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">
                          Maintenance effectiveness:
                        </span>
                        <span className="text-sm font-medium">87.5%</span>
                      </div>
                      <div className="w-full mt-2 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="h-2.5 rounded-full bg-blue-500"
                          style={{ width: `87.5%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Purchase Modal */}
      {showNewPurchaseModal && (
        <div className="overflow-y-auto fixed inset-0 z-50">
          <div className="flex justify-center items-center p-4 min-h-screen">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowNewPurchaseModal(false)}></div>
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl transition-all transform">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="flex justify-center items-center w-10 h-10 bg-indigo-100 rounded-full">
                        <ShoppingCart className="w-5 h-5 text-indigo-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">New Purchase Order</h3>
                      <p className="text-sm text-gray-500">Create a new purchase order</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNewPurchaseModal(false)}
                    className="text-gray-400 transition-colors hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-6 space-y-6">
                <div className="space-y-5">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Purchase Order </label>
                    <input
                      type="text"
                      className="px-4 py-3 w-full rounded-lg border border-gray-300 transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="PO-2024-XXXX"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Vendor</label>
                    <input
                      type="text"
                      className="px-4 py-3 w-full rounded-lg border border-gray-300 transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Vendor Name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="date"
                        className="px-4 py-3 w-full rounded-lg border border-gray-300 transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Total Amount</label>
                      <input
                        type="number"
                        step="0.01"
                        className="px-4 py-3 w-full rounded-lg border border-gray-300 transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
                    <select className="px-4 py-3 w-full bg-white rounded-lg border border-gray-300 transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option>Delivered</option>
                      <option>Pending</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-200">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowNewPurchaseModal(false)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg border border-transparent transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Create Purchase Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Asset Modal */}
      {showAddAssetModal && (
        <div className="overflow-y-auto fixed inset-0 z-50">
          <div className="flex justify-center items-center p-4 min-h-screen">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowAddAssetModal(false)}></div>
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl transition-all transform">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="flex justify-center items-center w-10 h-10 bg-green-100 rounded-full">
                        <Building className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Add New Asset</h3>
                      <p className="text-sm text-gray-500">Register a new asset in the system</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddAssetModal(false)}
                    className="text-gray-400 transition-colors hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-6 space-y-5">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Asset Name</label>
                    <input
                      type="text"
                      className="px-4 py-3 w-full rounded-lg border border-gray-300 transition-colors focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Asset Name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Asset Tag</label>
                      <input
                        type="text"
                        className="px-4 py-3 w-full rounded-lg border border-gray-300 transition-colors focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="ASSET-XXXX"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                      <select className="px-4 py-3 w-full bg-white rounded-lg border border-gray-300 transition-colors focus:ring-2 focus:ring-green-500 focus:border-green-500">
                        <option>Manufacturing Equipment</option>
                        <option>Support Equipment</option>
                        <option>Environmental Control</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Purchase Date</label>
                      <input
                        type="date"
                        className="px-4 py-3 w-full rounded-lg border border-gray-300 transition-colors focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Purchase Price</label>
                      <input
                        type="number"
                        step="0.01"
                        className="px-4 py-3 w-full rounded-lg border border-gray-300 transition-colors focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Current Value</label>
                      <input
                        type="number"
                        step="0.01"
                        className="px-4 py-3 w-full rounded-lg border border-gray-300 transition-colors focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
                      <select className="px-4 py-3 w-full bg-white rounded-lg border border-gray-300 transition-colors focus:ring-2 focus:ring-green-500 focus:border-green-500">
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Maintenance</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      className="px-4 py-3 w-full rounded-lg border border-gray-300 transition-colors focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Building A, Floor 2, Section 3"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-200">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAddAssetModal(false)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg border border-transparent transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Add Asset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MachineDetails;
