import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Filter, 
  Plus,
  CheckCircle,
  Clock,
  X,
  AlertTriangle
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

// Mock maintenance tasks
const mockMaintenanceTasks = [
  {
    id: 1,
    machineId: 1,
    machineName: 'Hydraulic Press HP-102',
    department: 'Manufacturing',
    type: 'Quarterly',
    status: 'scheduled',
    date: '2024-03-10',
    assignedTo: 'John Smith',
    priority: 'medium'
  },
  {
    id: 2,
    machineId: 3,
    machineName: 'Conveyor Belt CB-201',
    department: 'Packaging',
    type: 'Monthly',
    status: 'completed',
    date: '2024-03-05',
    assignedTo: 'Sarah Johnson',
    priority: 'high'
  },
  {
    id: 3,
    machineId: 2,
    machineName: 'CNC Machine CNC-305',
    department: 'Manufacturing',
    type: 'Quarterly',
    status: 'scheduled',
    date: '2024-03-15',
    assignedTo: 'Mike Anderson',
    priority: 'medium'
  },
  {
    id: 4,
    machineId: 5,
    machineName: 'Industrial Oven IO-103',
    department: 'Production',
    type: 'Monthly',
    status: 'scheduled',
    date: '2024-03-20',
    assignedTo: 'John Smith',
    priority: 'low'
  },
  {
    id: 5,
    machineId: 4,
    machineName: 'Injection Molder IM-405',
    department: 'Manufacturing',
    type: 'Bi-annual',
    status: 'overdue',
    date: '2024-03-02',
    assignedTo: 'Emily Clark',
    priority: 'high'
  }
];

type Task = {
  id: number;
  machineId: number;
  machineName: string;
  department: string;
  type: string;
  status: string;
  date: string;
  assignedTo: string;
  priority: string;
};

const MaintenanceCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex items-center justify-between py-2 mb-4">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft size={20} />
        </button>
        <div className="text-lg font-bold">{format(currentDate, dateFormat)}</div>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="font-medium text-center text-sm py-2" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        
        // Filter tasks for this day
        const dayTasks = mockMaintenanceTasks.filter(task => 
          isSameDay(new Date(task.date), day)
        );
        
        days.push(
          <div
            className={`h-24 border p-1 relative transition cursor-pointer ${
              !isSameMonth(day, monthStart)
                ? "bg-gray-50 text-gray-400"
                : isSameDay(day, selectedDate)
                ? "bg-indigo-50 border-indigo-500"
                : ""
            }`}
            key={day.toString()}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className={`text-right p-1 ${
              isSameDay(day, new Date()) ? "bg-indigo-500 text-white rounded-full w-7 h-7 flex items-center justify-center ml-auto" : ""
            }`}>
              {formattedDate}
            </div>
            <div className="overflow-y-auto max-h-16">
              {dayTasks.map((task, index) => (
                <div 
                  key={index}
                  className={`text-xs mb-1 truncate rounded px-1 py-0.5 ${
                    task.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : task.status === 'overdue'
                      ? 'bg-red-100 text-red-800'
                      : task.priority === 'high'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {task.machineName}
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="bg-white">{rows}</div>;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" />
            Completed
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Calendar size={12} className="mr-1" />
            Scheduled
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <Clock size={12} className="mr-1" />
            In Progress
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertTriangle size={12} className="mr-1" />
            Overdue
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <X size={12} className="mr-1" />
            Unknown
          </span>
        );
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Low
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Normal
          </span>
        );
    }
  };

  const filteredTasks = mockMaintenanceTasks
    .filter(task => {
      const matchesDepartment = selectedDepartment === 'all' || task.department === selectedDepartment;
      const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
      return matchesDepartment && matchesStatus;
    });

  // Tasks for the selected date
  const selectedDateTasks: Task[] = filteredTasks.filter(task => 
    isSameDay(new Date(task.date), selectedDate)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Maintenance Calendar</h1>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <button
              className={`px-4 py-2 border rounded-lg ${
                view === 'calendar' 
                  ? 'bg-indigo-100 border-indigo-300 text-indigo-700' 
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
              onClick={() => setView('calendar')}
            >
              <Calendar size={16} className="inline mr-1" />
              Calendar
            </button>
            <button
              className={`px-4 py-2 border rounded-lg ${
                view === 'list' 
                  ? 'bg-indigo-100 border-indigo-300 text-indigo-700' 
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
              onClick={() => setView('list')}
            >
              <Calendar size={16} className="inline mr-1" />
              List
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-500" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Packaging">Packaging</option>
              <option value="Production">Production</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <select
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <Plus size={16} className="mr-2" />
            Add Task
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {view === 'calendar' ? (
          <div className="p-4">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
          </div>
        ) : (
          <div className="p-4">
            <div className="space-y-4">
              {filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                  <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <div className="text-lg font-medium">{task.machineName}</div>
                      <div className="flex space-x-2 mt-2 sm:mt-0">
                        {getStatusBadge(task.status)}
                        {getPriorityBadge(task.priority)}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Department:</span> {task.department}
                      </div>
                      <div>
                        <span className="text-gray-500">Type:</span> {task.type} Maintenance
                      </div>
                      <div>
                        <span className="text-gray-500">Date:</span> {new Date(task.date).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="text-gray-500">Assigned to:</span> {task.assignedTo}
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end space-x-2">
                      <button className="text-sm text-indigo-600 hover:text-indigo-800">
                        View Details
                      </button>
                      <button className="text-sm text-indigo-600 hover:text-indigo-800">
                        Edit
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No maintenance tasks found matching your criteria.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {view === 'calendar' && selectedDateTasks.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">
            Tasks for {format(selectedDate, 'MMMM d, yyyy')}
          </h2>
          <div className="space-y-4">
            {selectedDateTasks.map(task => (
              <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <div className="text-lg font-medium">{task.machineName}</div>
                  <div className="flex space-x-2 mt-2 sm:mt-0">
                    {getStatusBadge(task.status)}
                    {getPriorityBadge(task.priority)}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Department:</span> {task.department}
                  </div>
                  <div>
                    <span className="text-gray-500">Type:</span> {task.type} Maintenance
                  </div>
                  <div>
                    <span className="text-gray-500">Assigned to:</span> {task.assignedTo}
                  </div>
                </div>
                <div className="mt-3 flex justify-end space-x-2">
                  <Link to={`/tasks/${task.id}`} className="text-sm text-indigo-600 hover:text-indigo-800">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceCalendar;