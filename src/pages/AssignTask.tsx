import React from "react";

function AssignTask() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Assign Task</h1>
      <div className="p-6 bg-white rounded-lg shadow">
        <form className="space-y-4">
          <div>
            <label
              htmlFor="machine"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Machine
            </label>
            <select
              id="machine"
              className="px-4 py-2 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a machine</option>
              <option value="1">Hydraulic Press HP-102</option>
              <option value="2">CNC Machine CNC-305</option>
              <option value="3">Conveyor Belt CB-201</option>
              <option value="4">Injection Molder IM-405</option>
              <option value="5">Industrial Oven IO-103</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="taskType"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Task Type
            </label>
            <select
              id="taskType"
              className="px-4 py-2 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select task type</option>
              <option value="maintenance">Maintenance</option>
              <option value="repair">Repair</option>
              <option value="inspection">Inspection</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="px-4 py-2 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter task description..."
            />
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className="px-4 py-2 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              id="priority"
              className="px-4 py-2 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="px-4 py-2 w-full text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Assign Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignTask;
