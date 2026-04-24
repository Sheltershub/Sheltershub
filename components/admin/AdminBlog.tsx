
import React from 'react';
import AdminLayout from './AdminLayout';

interface AdminBlogProps {
  onNavigate: (page: string) => void;
  userRole: string;
}

const AdminBlog: React.FC<AdminBlogProps> = ({ onNavigate, userRole }) => {
  return (
    <AdminLayout onNavigate={onNavigate} activePage="admin-blog" title="Manage Blog Posts" userRole={userRole}>
       <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-bold text-gray-700">All Posts</h2>
            <button 
              onClick={() => onNavigate('admin-add-blog')}
              className="px-4 py-2 bg-[#0A2B4C] text-white rounded-lg hover:bg-[#08223c] font-medium text-sm"
            >
              Write New Post
            </button>
        </div>
        <div className="p-8 text-center text-gray-500">
            <p>Blog post management table placeholder.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlog;
