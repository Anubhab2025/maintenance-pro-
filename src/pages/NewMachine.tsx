import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Upload, CalendarPlus, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

const NewMachine: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Machine successfully added to inventory');
    // In a real application, we would handle form submission here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Link to="/machines" className="text-indigo-600 hover:text-indigo-900 mr-4 flex items-center">
          <ChevronLeft size={20} />
          <span>Back to Machines</span>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Add New Machine</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h2 className="font-medium text-lg text-gray-900 border-b pb-2">Machine Information</h2>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Machine Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                    placeholder="e.g., Hydraulic Press HP-102"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
                    Serial Number*
                  </label>
                  <input
                    type="text"
                    id="serialNumber"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                    placeholder="e.g., HP102-2021-XYZ"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                    Model
                  </label>
                  <input
                    type="text"
                    id="model"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                    placeholder="e.g., HP-2000 Series"
                  />
                </div>
                
                <div>
                  <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700">
                    Manufacturer
                  </label>
                  <input
                    type="text"
                    id="manufacturer"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                    placeholder="e.g., Industrial Dynamics Ltd."
                  />
                </div>
                
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Department*
                  </label>
                  <select
                    id="department"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Packaging">Packaging</option>
                    <option value="Production">Production</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Quality Control">Quality Control</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                    placeholder="e.g., Building A, Floor 2, Section 3"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="font-medium text-lg text-gray-900 border-b pb-2">Purchase & Maintenance Details</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700">
                      Purchase Date*
                    </label>
                    <input
                      type="date"
                      id="purchaseDate"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">
                      Purchase Price*
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        id="purchasePrice"
                        className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="vendor" className="block text-sm font-medium text-gray-700">
                    Vendor
                  </label>
                  <input
                    type="text"
                    id="vendor"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                    placeholder="e.g., Industrial Suppliers Inc."
                  />
                </div>
                
                <div>
                  <label htmlFor="warrantyExpiration" className="block text-sm font-medium text-gray-700">
                    Warranty Expiration
                  </label>
                  <input
                    type="date"
                    id="warrantyExpiration"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maintenance Schedule
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="monthly" 
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
                      />
                      <label htmlFor="monthly" className="ml-2 block text-sm text-gray-700">Monthly</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="quarterly" 
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
                        defaultChecked
                      />
                      <label htmlFor="quarterly" className="ml-2 block text-sm text-gray-700">Quarterly</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="biannual" 
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
                      />
                      <label htmlFor="biannual" className="ml-2 block text-sm text-gray-700">Bi-annual</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="annual" 
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
                        defaultChecked
                      />
                      <label htmlFor="annual" className="ml-2 block text-sm text-gray-700">Annual</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="initialSchedule" className="block text-sm font-medium text-gray-700">
                    Initial Maintenance Date*
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="date"
                      id="initialSchedule"
                      className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                      required
                    />
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-r-md hover:bg-gray-100"
                    >
                      <CalendarPlus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h2 className="font-medium text-lg text-gray-900 mb-4">Documentation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Manual
                  </label>
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specifications Sheet
                  </label>
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="specs-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input id="specs-upload" name="specs-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, XLS up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h2 className="font-medium text-lg text-gray-900 mb-4">Additional Specifications</h2>
              <div className="space-y-4" id="specifications-container">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Specification Name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Value"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                    />
                  </div>
                  <button 
                    type="button"
                    className="p-2 rounded-full hover:bg-red-50 text-red-500"
                  >
                    <Minus size={20} />
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus size={16} className="mr-2" />
                Add Specification
              </button>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h2 className="font-medium text-lg text-gray-900 mb-4">Notes</h2>
              <textarea
                rows={4}
                className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md p-2"
                placeholder="Add any additional notes about this machine..."
              ></textarea>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <Link
                to="/machines"
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Machine
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewMachine;