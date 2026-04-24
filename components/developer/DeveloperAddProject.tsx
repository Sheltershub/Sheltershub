
import React, { useState } from 'react';
import DeveloperLayout from './DeveloperLayout';

interface DeveloperAddProjectProps {
  onNavigate: (page: string) => void;
}

const DeveloperAddProject: React.FC<DeveloperAddProjectProps> = ({ onNavigate }) => {
  const [images, setImages] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (images.length < 5) {
        setImages([...images, "https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg"]);
      }
    }
  };

  const addMockImage = () => {
    if (images.length < 5) {
      setImages([...images, "https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg"]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle submission logic here
      alert("Project created successfully!");
      onNavigate('developer-dashboard');
  };

  return (
    <DeveloperLayout onNavigate={onNavigate} activePage="developer-add-project" title="Create New Project">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-[#0A2B4C] mb-6">Project Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* General Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Project Name <span className="text-red-500">*</span></label>
                        <input type="text" required placeholder="e.g. Sunrise Apartments" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Location <span className="text-red-500">*</span></label>
                        <input type="text" required placeholder="City, Region" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Project Type</label>
                        <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]">
                            <option>Residential Complex</option>
                            <option>Commercial Building</option>
                            <option>Mixed Use</option>
                            <option>Gated Community</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Total Budget (Est.)</label>
                        <input type="text" placeholder="$0.00" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Completion Date</label>
                        <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Project Description</label>
                    <textarea rows={5} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" placeholder="Describe the vision, amenities, and key features..."></textarea>
                </div>

                {/* Media Upload */}
                <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Project Media (Images, Floor Plans)</label>
                     <div 
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragActive ? 'border-[#F9A826] bg-orange-50' : 'border-gray-300 hover:border-gray-400'}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <div className="flex flex-col items-center justify-center space-y-3">
                             <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                             <div className="text-sm text-gray-600">
                                 <span className="font-semibold text-[#F9A826] cursor-pointer hover:underline" onClick={addMockImage}>Click to upload</span> or drag and drop
                             </div>
                        </div>
                    </div>
                    {images.length > 0 && (
                        <div className="grid grid-cols-4 gap-4 mt-4">
                            {images.map((img, idx) => (
                                <img key={idx} src={img} alt="Preview" className="h-20 w-full object-cover rounded-lg" />
                            ))}
                        </div>
                    )}
                </div>

                {/* Assignment */}
                <div>
                    <h3 className="text-lg font-bold text-[#0A2B4C] mb-4">Assign Agents/Agencies</h3>
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-4 mb-2">
                             <input type="text" placeholder="Search for agents or agencies..." className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm" />
                             <button type="button" className="bg-[#0A2B4C] text-white px-4 py-2 rounded text-sm hover:bg-[#08223c]">Add</button>
                        </div>
                        <p className="text-xs text-gray-500">Selected: None</p>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                    <button type="button" onClick={() => onNavigate('developer-dashboard')} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15]">Create Project</button>
                </div>
            </form>
        </div>
    </DeveloperLayout>
  );
};

export default DeveloperAddProject;
