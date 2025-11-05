import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  Clock,
  CheckCircle,
  FileText,
  User,
  Wrench,
  DollarSign,
  Calendar,
  AlertTriangle,
  Upload,
  MessageSquare,
  Paperclip,
  Send,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const mockTask = {
  id: 3,
  machineId: 2,
  machineName: "CNC Machine CNC-305",
  department: "Manufacturing",
  type: "Off-site Service",
  status: "in-progress",
  dueDate: "2024-03-22",
  assignedTo: "External Vendor",
  priority: "high",
  location: "Off-site",
  vendor: "Precision Machines Inc.",
  description:
    "Send control unit for recalibration and firmware update. The machine has been showing inconsistent precision measurements over the past month. The vendor needs to perform a full diagnostic, recalibration, and update the firmware to the latest version to address known issues with the control system.",
  estimatedCost: 2800,
  checklist: [
    { id: 1, text: "Disconnect power and tag out machine", completed: true },
    { id: 2, text: "Remove control unit from housing", completed: true },
    {
      id: 3,
      text: "Pack for shipping with appropriate padding",
      completed: true,
    },
    { id: 4, text: "Complete shipping documentation", completed: true },
    { id: 5, text: "Send to vendor's service center", completed: true },
    { id: 6, text: "Vendor: Run diagnostic tests", completed: true },
    { id: 7, text: "Vendor: Update firmware to v4.2.1", completed: false },
    { id: 8, text: "Vendor: Recalibrate axis alignment", completed: false },
    { id: 9, text: "Vendor: Complete performance tests", completed: false },
    { id: 10, text: "Return shipping to factory", completed: false },
    { id: 11, text: "Reinstall and test operation", completed: false },
  ],
  history: [
    {
      id: 1,
      date: "2024-03-01",
      user: "John Smith",
      action: "Created maintenance task",
      notes: "Scheduled based on detection of precision issues",
    },
    {
      id: 2,
      date: "2024-03-05",
      user: "Sarah Johnson",
      action: "Updated task priority to High",
      notes: "Production schedule requires this to be fixed ASAP",
    },
    {
      id: 3,
      date: "2024-03-10",
      user: "Mike Anderson",
      action: "Prepared for shipping",
      notes: "Disconnected and packed the control unit for shipping",
    },
    {
      id: 4,
      date: "2024-03-12",
      user: "Mike Anderson",
      action: "Shipped to vendor",
      notes: "Tracking #: SHIP12345678",
    },
    {
      id: 5,
      date: "2024-03-15",
      user: "Vendor: Tech Support",
      action: "Received unit",
      notes: "Initial inspection shows no physical damage",
    },
    {
      id: 6,
      date: "2024-03-17",
      user: "Vendor: Tech Support",
      action: "Diagnostic complete",
      notes: "Found memory corruption and alignment drift issues",
    },
  ],
  comments: [
    {
      id: 1,
      user: "John Smith",
      timestamp: "2024-03-01T10:30:00",
      text: "Please make sure to document all firmware versions before and after the update.",
    },
    {
      id: 2,
      user: "Sarah Johnson",
      timestamp: "2024-03-02T14:15:00",
      text: "I've added this to the priority list. We need this back in operation by month end for the new production run.",
    },
    {
      id: 3,
      user: "Vendor: Tech Support",
      timestamp: "2024-03-17T09:45:00",
      text: "We've identified the issue. The control board has a corrupted memory sector and the Z-axis calibration is out of spec. We'll need to replace one chip and recalibrate all axes. This should be covered under your service agreement.",
    },
  ],
  documents: [
    {
      id: 1,
      name: "Service Request Form.pdf",
      type: "PDF",
      uploadedBy: "John Smith",
      date: "2024-03-01",
    },
    {
      id: 2,
      name: "Shipping Documentation.pdf",
      type: "PDF",
      uploadedBy: "Mike Anderson",
      date: "2024-03-12",
    },
    {
      id: 3,
      name: "Initial Diagnostic Report.pdf",
      type: "PDF",
      uploadedBy: "Vendor: Tech Support",
      date: "2024-03-17",
    },
  ],
};

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task] = useState(mockTask);
  const [documents, setDocuments] = useState(mockTask.documents);
  const [activeTab, setActiveTab] = useState("details");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadFileName, setUploadFileName] = useState("");
  const [updateStatus, setUpdateStatus] = useState(task.status);
  const [updateNotes, setUpdateNotes] = useState("");
  const [commentText, setCommentText] = useState("");
  const [checklist, setChecklist] = useState(task.checklist);

  // Calculate completion percentage
  const completedItems = checklist.filter((item) => item.completed).length;
  const completionPercentage = Math.round(
    (completedItems / checklist.length) * 100
  );

  const handleChecklistItemToggle = (itemId: number) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDocumentDownload = (documentId: number) => {
    const docItem = documents.find((doc) => doc.id === documentId);
    if (docItem) {
      // Generate formatted document content (TEXT REPORT, not PDF)
      const documentContent = `TASK MANAGEMENT SYSTEM - DOCUMENT REPORT

===============================================================================

DOCUMENT DETAILS:
Name: ${docItem.name}
Type: ${docItem.type}
ID: ${docItem.id}
Uploaded By: ${docItem.uploadedBy}
Upload Date: ${new Date(docItem.date).toLocaleDateString()}
Report Generated: ${new Date().toLocaleString()}

===============================================================================

ASSOCIATED TASK INFORMATION:
Task Type: ${task.type}
Machine: ${task.machineName}
Department: ${task.department}
Current Status: ${task.status.toUpperCase()}
Priority Level: ${task.priority.toUpperCase()}
Assigned To: ${task.assignedTo}
Due Date: ${new Date(task.dueDate).toLocaleDateString()}
Estimated Cost: $${task.estimatedCost.toLocaleString()}
${task.vendor ? `Vendor: ${task.vendor}` : ""}

===============================================================================

TASK DESCRIPTION:
${task.description}

===============================================================================

CHECKLIST PROGRESS:
${task.checklist
  .map(
    (item, index) =>
      `${index + 1}. [${item.completed ? "COMPLETED" : "PENDING"}] ${item.text}`
  )
  .join("\n")}

===============================================================================

RECENT ACTIVITY:
${task.history
  .map(
    (event, index) =>
      `${index + 1}. ${event.action} (${new Date(
        event.date
      ).toLocaleDateString()}) - ${event.user}${
        event.notes ? "\n   Details: " + event.notes : ""
      }`
  )
  .join("\n")}

===============================================================================

COMMENTS & NOTES:
${task.comments
  .map(
    (comment, index) =>
      `${index + 1}. ${comment.user} (${new Date(
        comment.timestamp
      ).toLocaleString()}):\n   ${comment.text}`
  )
  .join("\n")}

===============================================================================

REPORT METADATA:
- Generated by: Factory Management System v1.0
- Purpose: Record keeping and audit trail
- Confidentiality: Internal Use Only
- File Format: Formatted Text Report (.txt)

===============================================================================
END OF REPORT
===============================================================================
      `;

      // Create blob as text file (not PDF)
      const blob = new Blob([documentContent], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        docItem.name.replace(/\.[^/.]+$/, "") + "_task_report.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Downloaded ${docItem.name} as formatted task report`);
    }
  };

  const handleUploadClick = () => {
    setShowUploadForm(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      setUploadFileName(file.name);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadFile && uploadFileName) {
      const newDocument = {
        id: Date.now(),
        name: uploadFileName,
        type: uploadFile.type.includes("pdf")
          ? "PDF"
          : uploadFile.type.includes("image")
          ? "Image"
          : uploadFile.type.includes("document")
          ? "Document"
          : "File",
        uploadedBy: "Current User",
        date: new Date().toISOString().split("T")[0],
      };

      setDocuments((prev) => [...prev, newDocument]);
      toast.success(`Document "${uploadFileName}" uploaded successfully`);

      setShowUploadForm(false);
      setUploadFile(null);
      setUploadFileName("");
    }
  };

  const handleUploadCancel = () => {
    setShowUploadForm(false);
    setUploadFile(null);
    setUploadFileName("");
  };

  const handleDocumentDelete = (documentId: number) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
      toast.success("Document deleted successfully");
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      toast.success("Comment added successfully");
      setCommentText("");
      // In a real app, this would add the comment to the database
    }
  };

  const handleStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Status updated to ${updateStatus}`);
    setShowUpdateForm(false);
    // In a real app, this would update the task status in the database
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
            <CheckCircle size={16} className="mr-1" />
            Completed
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
            <Clock size={16} className="mr-1" />
            Pending
          </span>
        );
      case "in-progress":
        return (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-purple-800 bg-purple-100 rounded-full">
            <Clock size={16} className="mr-1" />
            In Progress
          </span>
        );
      case "overdue":
        return (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-red-800 bg-red-100 rounded-full">
            <AlertTriangle size={16} className="mr-1" />
            Overdue
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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-red-800 bg-red-100 rounded-full border border-red-300">
            Critical
          </span>
        );
      case "high":
        return (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-amber-800 bg-amber-100 rounded-full">
            High
          </span>
        );
      case "medium":
        return (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
            Medium
          </span>
        );
      case "low":
        return (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
            Low
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-full">
            Normal
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Link
          to="/tasks"
          className="flex items-center mr-4 text-indigo-600 hover:text-indigo-900"
        >
          <ChevronLeft size={20} />
          <span>Back to Tasks</span>
        </Link>
        <h1 className="flex-1 text-xl md:text-2xl font-bold text-gray-800">
          {task.type} - {task.machineName}
        </h1>
        <div className="hidden md:flex items-center space-x-2">
          {getStatusBadge(task.status)}
          {getPriorityBadge(task.priority)}
        </div>
      </div>

      {/* Task Header */}
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex flex-col justify-between mb-4 md:flex-row md:items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold">{task.machineName}</h2>
              <p className="text-gray-500">{task.department} Department</p>
            </div>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 text-white bg-indigo-600 rounded-md transition-colors hover:bg-indigo-700"
                onClick={() => setShowUpdateForm(true)}
              >
                Update Status
              </button>
            </div>
          </div>

          {/* Status Update Form */}
          {showUpdateForm && (
            <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
              <div className="p-6 w-full max-w-md bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Update Task Status</h3>
                  <button
                    onClick={() => setShowUpdateForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleStatusUpdate}>
                  <div className="mb-4">
                    <label
                      htmlFor="status"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      value={updateStatus}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                      className="p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="notes"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Update Notes
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      className="p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter notes about this status update..."
                    ></textarea>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowUpdateForm(false)}
                      className="px-4 py-2 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showUploadForm && (
            <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
              <div className="p-6 w-full max-w-md bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Upload Document</h3>
                  <button
                    onClick={handleUploadCancel}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleUploadSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="document-file"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Select File
                    </label>
                    <input
                      id="document-file"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  {uploadFileName && (
                    <div className="mb-4 text-sm text-gray-600">
                      Selected: {uploadFileName}
                    </div>
                  )}
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={handleUploadCancel}
                      className="px-4 py-2 text-sm text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!uploadFile}
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md border border-transparent shadow-sm hover:bg-indigo-700 disabled:bg-gray-400"
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">
                Assignment
              </h3>
              <div className="flex items-center">
                <User size={16} className="mr-2 text-gray-400" />
                <span>{task.assignedTo}</span>
              </div>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">
                Location
              </h3>
              <div className="flex items-center">
                <Wrench size={16} className="mr-2 text-gray-400" />
                <span>{task.location}</span>
                {task.vendor && (
                  <span className="ml-1 text-gray-500">({task.vendor})</span>
                )}
              </div>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">
                Due Date
              </h3>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-gray-400" />
                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">
                Estimated Cost
              </h3>
              <div className="flex items-center">
                <DollarSign size={16} className="mr-2 text-gray-400" />
                <span>${task.estimatedCost.toLocaleString()}</span>
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="mb-1 text-sm font-medium text-gray-500">
                Completion Progress
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-right text-gray-500">
                {completionPercentage}% Complete
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "details"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("details")}
            >
              <FileText size={16} className="inline mr-2" />
              Details
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "checklist"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("checklist")}
            >
              <CheckCircle size={16} className="inline mr-2" />
              Checklist
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "history"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("history")}
            >
              <Clock size={16} className="inline mr-2" />
              History
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "comments"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("comments")}
            >
              <MessageSquare size={16} className="inline mr-2" />
              Comments
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "documents"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("documents")}
            >
              <Paperclip size={16} className="inline mr-2" />
              Documents
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "details" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="mb-4 text-lg font-medium">Task Description</h3>
              <p className="text-gray-800 whitespace-pre-line">
                {task.description}
              </p>
            </div>
          )}

          {activeTab === "checklist" && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Task Checklist</h3>
                <div className="text-sm text-gray-500">
                  {completedItems} of {checklist.length} items completed (
                  {completionPercentage}%)
                </div>
              </div>
              <div className="space-y-2">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start p-3 border rounded-lg ${
                      item.completed
                        ? "bg-green-50 border-green-200"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleChecklistItemToggle(item.id)}
                      className="h-5 w-5 text-indigo-600 rounded mt-0.5 focus:ring-indigo-500"
                    />
                    <div className="flex-1 ml-3">
                      <div
                        className={`text-sm ${
                          item.completed
                            ? "line-through text-gray-500"
                            : "text-gray-900"
                        }`}
                      >
                        {item.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="mb-4 text-lg font-medium">Task History</h3>
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-3.5 w-0.5 bg-gray-200"></div>
                <ul className="space-y-6">
                  {task.history.map((event) => (
                    <li key={event.id} className="relative pl-10">
                      <div className="absolute left-0 top-1.5 h-7 w-7 rounded-full border-2 border-indigo-500 bg-white flex items-center justify-center">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div className="font-medium">{event.action}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          {event.user}
                        </div>
                        {event.notes && (
                          <div className="p-2 mt-2 text-sm bg-gray-50 rounded">
                            {event.notes}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "comments" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="mb-4 text-lg font-medium">Comments</h3>
              <div className="mb-6 space-y-4">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{comment.user}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(comment.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{comment.text}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleCommentSubmit} className="mt-4">
                <div className="mb-2">
                  <label
                    htmlFor="comment"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Add Comment
                  </label>
                  <textarea
                    id="comment"
                    rows={3}
                    className="p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Type your comment here..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md border border-transparent shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Send size={16} className="mr-2" />
                    Send Comment
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Documents</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    Downloads are formatted text reports
                  </span>
                  <button
                    onClick={handleUploadClick}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md border border-transparent shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Upload size={16} className="mr-2" />
                    Upload Document
                  </button>
                </div>
              </div>

              {/* Documents Table for Desktop */}
              <div className="hidden md:block overflow-hidden bg-white rounded-lg border border-gray-300">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Document Name
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Type
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Uploaded By
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-indigo-600 whitespace-nowrap">
                          {doc.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {doc.type}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {doc.uploadedBy}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {new Date(doc.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <button
                            onClick={() => handleDocumentDownload(doc.id)}
                            className="mr-3 text-indigo-600 hover:text-indigo-900"
                          >
                            Download
                          </button>
                          <button
                            onClick={() => handleDocumentDelete(doc.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Documents Cards for Mobile */}
              <div className="block md:hidden space-y-4">
                {documents.length === 0 ? (
                  <div className="py-8 text-center text-gray-500">
                    No documents attached to this task.
                  </div>
                ) : (
                  documents.map((doc) => (
                    <div key={doc.id} className="p-4 bg-white rounded-lg shadow border">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-indigo-600">
                            {doc.name}
                          </h4>
                          <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-500">Type:</span>
                              <p className="text-gray-900">{doc.type}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-500">Uploaded By:</span>
                              <p className="text-gray-900">{doc.uploadedBy}</p>
                            </div>
                            <div className="col-span-2">
                              <span className="font-medium text-gray-500">Date:</span>
                              <p className="text-gray-900">
                                {new Date(doc.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <button
                            onClick={() => handleDocumentDownload(doc.id)}
                            className="px-3 py-1 text-sm text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50"
                          >
                            Download
                          </button>
                          <button
                            onClick={() => handleDocumentDelete(doc.id)}
                            className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
