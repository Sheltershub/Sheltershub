
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';

interface AdminAddBlogProps {
  onNavigate: (page: string) => void;
  userRole: string;
}

const AdminAddBlog: React.FC<AdminAddBlogProps> = ({ onNavigate, userRole }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('Admin User');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [view, setView] = useState<'form' | 'preview' | 'success'>('form');
  const [isDraft, setIsDraft] = useState(false);

  const categories = ['Market Trends', 'Developer Insights', 'Agency News', 'Sheltershub Updates', 'Tips & Advice'];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImagePreview(url);
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDraft(false);
    setView('success');
    window.scrollTo(0, 0);
  };

  const handleSaveDraft = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraft(true);
    setView('success');
    window.scrollTo(0, 0);
  };

  const togglePreview = () => {
    setView(view === 'form' ? 'preview' : 'form');
    window.scrollTo(0, 0);
  };

  // Rich Text Toolbar Mock
  const Toolbar = () => (
    <div className="flex items-center gap-1 border-b border-gray-200 p-2 bg-gray-50 rounded-t-lg">
      {['Bold', 'Italic', 'Underline'].map((tool) => (
        <button key={tool} type="button" className="p-1.5 text-gray-500 hover:bg-gray-200 rounded text-xs font-medium">
          {tool}
        </button>
      ))}
      <div className="h-4 w-px bg-gray-300 mx-1"></div>
      {['H1', 'H2', 'List', 'Quote'].map((tool) => (
        <button key={tool} type="button" className="p-1.5 text-gray-500 hover:bg-gray-200 rounded text-xs font-medium">
          {tool}
        </button>
      ))}
      <div className="h-4 w-px bg-gray-300 mx-1"></div>
      <button type="button" className="p-1.5 text-gray-500 hover:bg-gray-200 rounded text-xs font-medium flex items-center gap-1">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        Image
      </button>
      <button type="button" className="p-1.5 text-gray-500 hover:bg-gray-200 rounded text-xs font-medium flex items-center gap-1">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        Link
      </button>
    </div>
  );

  if (view === 'success') {
    return (
      <AdminLayout onNavigate={onNavigate} activePage="admin-blog" title="Blog Management" userRole={userRole}>
        <div className="flex items-center justify-center h-[calc(100vh-150px)]">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center max-w-lg w-full">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
              <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#0A2B4C] mb-3">
              {isDraft ? 'Draft Saved!' : 'Article Published!'}
            </h2>
            <p className="text-gray-600 mb-8">
              {isDraft 
                ? 'Your article has been saved as a draft. You can edit it later.' 
                : 'Your article has been published successfully and is now live.'}
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => { setView('form'); setTitle(''); setContent(''); setImagePreview(null); }}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Write Another
              </button>
              <button 
                onClick={() => onNavigate('admin-blog')}
                className="px-6 py-2 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] shadow-md transition-colors"
              >
                Go to Blog List
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (view === 'preview') {
    return (
      <AdminLayout onNavigate={onNavigate} activePage="admin-blog" title="Preview Article" userRole={userRole}>
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
            <h3 className="font-bold text-gray-700">Preview Mode</h3>
            <button onClick={togglePreview} className="text-[#F9A826] hover:underline font-semibold text-sm">
              Close Preview & Edit
            </button>
          </div>
          
          <div className="p-8 md:p-12">
             {imagePreview && (
               <div className="h-64 md:h-96 w-full rounded-xl overflow-hidden mb-8">
                 <img src={imagePreview} alt="Cover" className="w-full h-full object-cover" />
               </div>
             )}
             
             <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-[#F9A826] text-white text-xs font-bold rounded mb-4 uppercase tracking-wide">
                  {category || 'Uncategorized'}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-[#0A2B4C] mb-4 leading-tight">{title || 'Untitled Article'}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                   <span>By <span className="font-semibold text-gray-900">{author}</span></span>
                   <span>•</span>
                   <span>{publishDate}</span>
                </div>
             </div>

             <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
               {content || 'No content added yet...'}
             </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onNavigate={onNavigate} activePage="admin-blog" title="Add New Article" userRole={userRole}>
      <div className="max-w-5xl mx-auto">
        
        <form onSubmit={handlePublish} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Article Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a catchy title..." 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Article Content</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <Toolbar />
                  <textarea 
                    rows={15} 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-4 text-sm focus:outline-none resize-y" 
                    placeholder="Write your article here..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Right Column: Meta & Settings */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Featured Image <span className="text-red-500">*</span></label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-white transition-colors relative bg-white">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    />
                    {imagePreview ? (
                      <div className="relative h-32 w-full rounded overflow-hidden">
                        <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div className="py-8">
                        <svg className="w-10 h-10 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="text-xs text-gray-500">Upload Cover Image</span>
                      </div>
                    )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F9A826]"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
                <input 
                  type="text" 
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. real estate, ghana, investment (comma separated)" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F9A826]" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
                  <input 
                    type="text" 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F9A826]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Publish Date</label>
                  <input 
                    type="date" 
                    value={publishDate} 
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F9A826]" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
             <button 
                type="button" 
                onClick={togglePreview}
                className="text-[#0A2B4C] font-semibold hover:underline flex items-center gap-2"
             >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                Preview Article
             </button>

             <div className="flex gap-4">
               <button 
                  type="button" 
                  onClick={() => onNavigate('admin-blog')}
                  className="px-6 py-2.5 text-gray-600 font-medium hover:text-gray-900"
               >
                  Cancel
               </button>
               <button 
                  type="button" 
                  onClick={handleSaveDraft}
                  className="px-6 py-2.5 border border-[#0A2B4C] text-[#0A2B4C] font-bold rounded-lg hover:bg-gray-50 transition-colors"
               >
                  Save Draft
               </button>
               <button 
                  type="submit" 
                  className="px-8 py-2.5 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15] shadow-md transition-all hover:shadow-lg"
               >
                  Publish Article
               </button>
             </div>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminAddBlog;
