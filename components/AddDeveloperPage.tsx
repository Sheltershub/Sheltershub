
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

interface AddDeveloperPageProps {
  onNavigate: (page: string) => void;
}

const AddDeveloperPage: React.FC<AddDeveloperPageProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setLogoPreview(url);
    }
  };

  // Mock handling for project images
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
       // Mock adding an image
       if (projectImages.length < 6) {
         setProjectImages([...projectImages, "https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg"]);
       }
    }
  };

  const addMockProjectImage = () => {
      if (projectImages.length < 6) {
        setProjectImages([...projectImages, "https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg"]);
      }
  };

  const removeProjectImage = (index: number) => {
    const newImages = [...projectImages];
    newImages.splice(index, 1);
    setProjectImages(newImages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 800);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="add-developer" />

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        
        {submitted ? (
          /* Confirmation Section */
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center py-16 max-w-2xl mx-auto">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#0A2B4C] mb-4">Registration Submitted!</h2>
            <p className="text-gray-600 text-lg mb-2">
                Your developer profile has been submitted for admin review.
            </p>
            <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
                Our team will verify your details within 24-48 hours. You will receive an email notification once your profile is live.
            </p>
            <div className="flex justify-center gap-4">
                 <button 
                    onClick={() => onNavigate('home')}
                    className="py-3 px-8 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                 >
                    Back to Home
                 </button>
                 <button 
                    onClick={() => onNavigate('developers')}
                    className="py-3 px-8 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] shadow-md transition-colors"
                 >
                    View Developers
                 </button>
            </div>
          </div>
        ) : (
          /* Registration Form & Guidance Section */
          <>
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-[#0A2B4C] mb-3">Register as a Developer</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Showcase your development projects and attract investors and homebuyers on Sheltershub.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Form Column */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-[#0A2B4C] px-6 py-4 border-b border-[#08223c]">
                        <h2 className="text-white font-semibold text-lg">Developer Details</h2>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                        
                        {/* Basic Info */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Developer / Company Name <span className="text-red-500">*</span></label>
                                <input type="text" required placeholder="e.g. Empire Builders" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Logo / Photo</label>
                                <div className="flex items-center gap-6">
                                    <div className="h-24 w-24 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center overflow-hidden">
                                        {logoPreview ? (
                                            <img src={logoPreview} alt="Preview" className="h-full w-full object-cover" />
                                        ) : (
                                            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={handleLogoChange}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0A2B4C] hover:file:bg-blue-100 cursor-pointer" 
                                        />
                                        <p className="text-xs text-gray-500 mt-2">Recommended size: 500x500px. Max file size: 2MB.</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Location <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] appearance-none bg-white">
                                        <option>Select City / Region</option>
                                        <option>Greater Accra</option>
                                        <option>Kumasi</option>
                                        <option>Takoradi</option>
                                        <option>International</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6"></div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg font-bold text-[#0A2B4C] mb-4">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                                    <input type="email" required placeholder="contact@empirebuilders.com" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                                    <input type="tel" required placeholder="+233 00 000 0000" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                                    <input type="url" placeholder="https://www.empirebuilders.com" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6"></div>

                        {/* Profile & Portfolio */}
                        <div>
                             <h3 className="text-lg font-bold text-[#0A2B4C] mb-4">Professional Profile</h3>
                             <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description / About Developer <span className="text-red-500">*</span></label>
                                    <textarea required rows={5} placeholder="Describe your company, vision, and major achievements..." className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience</label>
                                    <input type="number" min="0" placeholder="e.g. 10" className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Portfolio / Projects Summary</label>
                                    <textarea rows={4} placeholder="List key projects, developments, or areas of specialization..." className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]"></textarea>
                                </div>
                             </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6"></div>

                        {/* Project Images Upload */}
                        <div>
                             <h3 className="text-lg font-bold text-[#0A2B4C] mb-4">Project Gallery</h3>
                             <p className="text-sm text-gray-500 mb-4">Upload images of your past or current projects (Optional).</p>
                             
                             <div 
                                className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${dragActive ? 'border-[#F9A826] bg-orange-50' : 'border-gray-300 hover:border-gray-400'}`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <div className="flex flex-col items-center justify-center space-y-2">
                                     <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                     <div className="text-sm text-gray-600">
                                         <span className="font-semibold text-[#F9A826] cursor-pointer hover:underline" onClick={addMockProjectImage}>Click to upload</span> or drag and drop
                                     </div>
                                </div>
                            </div>

                            {projectImages.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                                    {projectImages.map((img, idx) => (
                                        <div key={idx} className="relative group rounded-lg overflow-hidden h-24 shadow-sm border border-gray-200">
                                            <img src={img} alt="Project preview" className="w-full h-full object-cover" />
                                            <button 
                                                type="button"
                                                onClick={() => removeProjectImage(idx)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4">
                            <button 
                                type="button" 
                                onClick={() => onNavigate('home')}
                                className="py-3 px-8 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="py-3 px-8 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15] shadow-md transition-all hover:shadow-lg"
                            >
                                Submit for Review
                            </button>
                        </div>
                    </form>
                </div>

                {/* Guidance / Tips Sidebar */}
                <aside className="lg:col-span-1 space-y-6">
                    <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 p-6 sticky top-24">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-[#E0F2FE] p-2 rounded-full">
                                <svg className="w-5 h-5 text-[#0284c7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="font-bold text-[#0A2B4C]">Helpful Tips</h3>
                        </div>
                        
                        <ul className="space-y-4 text-sm text-gray-600">
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                <span>
                                    <strong className="block text-gray-800">Upload a Clear Logo</strong>
                                    Use a high-resolution logo (PNG or JPG) to represent your brand professionally.
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                <span>
                                    <strong className="block text-gray-800">Complete Contact Details</strong>
                                    Ensure your email and phone number are accurate so clients can reach you easily.
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                <span>
                                    <strong className="block text-gray-800">Describe Your Work</strong>
                                    Provide a concise description of your company's vision and past achievements.
                                </span>
                            </li>
                             <li className="flex gap-3">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                <span>
                                    <strong className="block text-gray-800">Showcase Projects</strong>
                                    Upload images of your best projects to build trust with potential investors.
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[#FFF8E6] rounded-xl border border-[#FDE68A] p-6">
                        <h4 className="font-bold text-[#92400E] mb-2 text-sm">Need Assistance?</h4>
                        <p className="text-xs text-[#92400E] mb-3">
                            If you are facing issues registering your developer profile, our support team is here to help.
                        </p>
                        <a href="#" className="text-xs font-bold text-[#F9A826] hover:underline">Contact Support &rarr;</a>
                    </div>
                </aside>
            </div>
          </>
        )}

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default AddDeveloperPage;
