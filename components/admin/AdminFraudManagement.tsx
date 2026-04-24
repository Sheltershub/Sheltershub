
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';

interface AdminFraudManagementProps {
  onNavigate: (page: string) => void;
  userRole: string;
}

interface FraudReport {
  id: number;
  reporter: string;
  target: string;
  reason: string;
  description: string;
  status: 'Pending' | 'Investigating' | 'Resolved' | 'Dismissed';
  date: string;
  severity: 'Low' | 'Medium' | 'High';
}

interface AuditLog {
  id: number;
  user: string;
  role: string;
  action: string;
  details: string;
  timestamp: string;
  ip: string;
}

const AdminFraudManagement: React.FC<AdminFraudManagementProps> = ({ onNavigate, userRole }) => {
  const [activeTab, setActiveTab] = useState<'reports' | 'logs'>('reports');
  const [reports, setReports] = useState<FraudReport[]>([
    {
        id: 104,
        reporter: 'John Doe',
        target: 'Property ID: SH-010',
        reason: 'Fake Listing',
        description: 'The property images are from a hotel website in Dubai.',
        status: 'Pending',
        date: '2023-10-25 14:30',
        severity: 'High'
    },
    {
        id: 103,
        reporter: 'Sarah Jenkins',
        target: 'Agent: Michael Scott',
        reason: 'Unprofessional behavior',
        description: 'Agent was rude and demanded upfront payment for viewing.',
        status: 'Investigating',
        date: '2023-10-24 09:15',
        severity: 'Medium'
    },
    {
        id: 102,
        reporter: 'Anonymous',
        target: 'Agency: Fast Homes',
        reason: 'Scam',
        description: 'They do not have an office at the listed address.',
        status: 'Resolved',
        date: '2023-10-20 11:00',
        severity: 'High'
    }
  ]);

  // Mock Audit Logs - In a real app, these would come from the backend API
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
      { id: 1, user: 'Admin User', role: 'Admin', action: 'Login', details: 'Successful login', timestamp: '2023-10-26 08:00:00', ip: '192.168.1.1' },
      { id: 2, user: 'Sarah Jenkins', role: 'Agent', action: 'Create Listing', details: 'Added property ID 105', timestamp: '2023-10-26 09:30:00', ip: '10.0.0.5' },
      { id: 3, user: 'Admin User', role: 'Admin', action: 'Update Settings', details: 'Changed currency to GHS', timestamp: '2023-10-26 10:15:00', ip: '192.168.1.1' },
      { id: 4, user: 'John Doe', role: 'User', action: 'Report Fraud', details: 'Reported Property ID SH-010', timestamp: '2023-10-25 14:30:00', ip: '172.16.0.23' },
  ]);

  // Handle status change
  const handleStatusChange = (id: number, newStatus: FraudReport['status']) => {
      setReports(reports.map(r => r.id === id ? { ...r, status: newStatus } : r));
      
      // Log this action
      const newLog: AuditLog = {
          id: Date.now(),
          user: 'Admin User', // Mock current user
          role: 'Admin',
          action: 'Update Fraud Report',
          details: `Changed status of report #${id} to ${newStatus}`,
          timestamp: new Date().toLocaleString(),
          ip: '192.168.1.1'
      };
      setAuditLogs([newLog, ...auditLogs]);
  };

  const getSeverityColor = (severity: string) => {
      switch(severity) {
          case 'High': return 'bg-red-100 text-red-700';
          case 'Medium': return 'bg-yellow-100 text-yellow-700';
          case 'Low': return 'bg-blue-100 text-blue-700';
          default: return 'bg-gray-100 text-gray-700';
      }
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
          case 'Investigating': return 'bg-blue-50 text-blue-700 border-blue-200';
          case 'Resolved': return 'bg-green-50 text-green-700 border-green-200';
          case 'Dismissed': return 'bg-gray-50 text-gray-700 border-gray-200';
          default: return 'bg-white text-gray-700';
      }
  };

  return (
    <AdminLayout onNavigate={onNavigate} activePage="admin-fraud" title="Fraud Management & Security" userRole={userRole}>
        
        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-200 mb-6">
            <button 
                onClick={() => setActiveTab('reports')}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'reports' ? 'border-[#0A2B4C] text-[#0A2B4C]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                Fraud Reports
                <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">{reports.filter(r => r.status === 'Pending').length}</span>
            </button>
            <button 
                onClick={() => setActiveTab('logs')}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'logs' ? 'border-[#0A2B4C] text-[#0A2B4C]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                Security Audit Logs
            </button>
        </div>

        {activeTab === 'reports' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3">Report ID</th>
                                <th className="px-6 py-3">Target</th>
                                <th className="px-6 py-3">Reason</th>
                                <th className="px-6 py-3">Severity</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {reports.map(report => (
                                <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-gray-500">#{report.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{report.target}</td>
                                    <td className="px-6 py-4">
                                        <div className="max-w-xs truncate" title={report.description}>
                                            <span className="block font-medium text-gray-800">{report.reason}</span>
                                            <span className="text-xs text-gray-500">{report.description}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${getSeverityColor(report.severity)}`}>
                                            {report.severity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs">{report.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <select 
                                            value={report.status}
                                            onChange={(e) => handleStatusChange(report.id, e.target.value as any)}
                                            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#F9A826]"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Investigating">Investigate</option>
                                            <option value="Resolved">Resolve</option>
                                            <option value="Dismissed">Dismiss</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {activeTab === 'logs' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-700 text-sm">System Audit Trail</h3>
                    <button className="text-xs text-[#0A2B4C] hover:underline font-medium">Export Logs</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3">Timestamp</th>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Action</th>
                                <th className="px-6 py-3">Details</th>
                                <th className="px-6 py-3">IP Address</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {auditLogs.map(log => (
                                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-xs font-mono text-gray-500">{log.timestamp}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{log.user}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs border border-gray-200">{log.role}</span>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-[#0A2B4C]">{log.action}</td>
                                    <td className="px-6 py-4 text-gray-500">{log.details}</td>
                                    <td className="px-6 py-4 text-xs font-mono text-gray-400">{log.ip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

    </AdminLayout>
  );
};

export default AdminFraudManagement;
