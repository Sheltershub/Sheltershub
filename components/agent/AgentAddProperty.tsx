
import React, { useState } from 'react';
import AgentLayout from './AgentLayout';

interface AgentAddPropertyProps {
  onNavigate: (page: string) => void;
}

const AgentAddProperty: React.FC<AgentAddPropertyProps> = ({ onNavigate }) => {
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
      alert("Property listed successfully!");
      onNavigate('agent-properties');
  };

  return (
    <AgentLayout onNavigate={onNavigate} activePage="agent-add-property" title="Add New Property">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-[#0A2B4C] mb-6">Property Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* General Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Property Title <span className="text-red-500">*</span></label>
                        <input type="text" required placeholder="e.g. Modern Apartment in City Center" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Location <span className="text-red-500">*</span></label>
                        <input type="text" required placeholder="Address, City" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
                        <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]">
                            <option>House</option>
                            <option>Apartment</option>
                            <option>Commercial</option>
                            <option>Land</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                        <input type="text" placeholder="e.g. 150000" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                        <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]">
                            <option>For Sale</option>
                            <option>For Rent</option>
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea rows={5} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" placeholder="Describe the property features, conditions..."></textarea>
                </div>

                {/* Media Upload */}
                <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Media Gallery (Images, Videos, Docs)</label>
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
                             <p className="text-xs text-gray-500">Supported: JPG, PNG, MP4, PDF</p>
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
                    <h3 className="text-lg font-bold text-[#0A2B4C] mb-4">Ownership / Assignment</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                             <label className="block text-sm font-semibold text-gray-700 mb-2">Assign to Agency (Optional)</label>
                             <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]">
                                <option>None (Individual)</option>
                                <option>Prime Real Estate</option>
                                <option>Urban Spaces</option>
                            </select>
                        </div>
                        <div>
                             <label className="block text-sm font-semibold text-gray-700 mb-2">Link to Developer Project (Optional)</label>
                             <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]">
                                <option>None</option>
                                <option>The Royal Gardens</option>
                                <option>Atlantic View Heights</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                    <button type="button" onClick={() => onNavigate('agent-properties')} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15]">List Property</button>
                </div>
            </form>
        </div>
    </AgentLayout>
  );
};

export default AgentAddProperty;
