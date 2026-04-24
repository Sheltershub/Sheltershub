
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { getCurrencyConfig, saveCurrencyConfig, CurrencyConfig } from '../../utils/currency';

interface AdminSiteOptionsProps {
  category: string;
  onNavigate: (page: string) => void;
  userRole: string;
}

interface OptionItem {
  id: number;
  name: string;
  description: string;
  parentId?: number; // Optional parent ID for sub-items
  parentName?: string; // Derived for display
}

const AdminSiteOptions: React.FC<AdminSiteOptionsProps> = ({ category, onNavigate, userRole }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<OptionItem | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', parentId: '' });
  
  // Currency Settings State
  const [currencyConfig, setCurrencyConfig] = useState<CurrencyConfig>(getCurrencyConfig());

  // Format Category Name for display (e.g. "type" -> "Property Types")
  const categoryTitleMap: Record<string, string> = {
      currency: 'Currency Format',
      type: 'Property Types',
      status: 'Listing Statuses',
      features: 'Features & Amenities',
      labels: 'Property Labels',
      region: 'Regions',
      city: 'Cities',
      area: 'Areas / Neighborhoods',
      agencies: 'Agencies Hierarchy',
      agents: 'Agents & Sub-Agents',
      'prefix-suffix': 'Unit Prefix & Suffix',
  };

  const title = categoryTitleMap[category] || 'Site Options';

  // Mock Data Generators for different categories
  const getMockData = (cat: string): OptionItem[] => {
      switch(cat) {
          case 'type':
              return [
                  { id: 1, name: 'Residential', description: 'Properties for living.' },
                  { id: 2, name: 'Commercial', description: 'Properties for business use.' },
                  { id: 3, name: 'Apartment', description: 'Unit in a multi-unit building.', parentId: 1, parentName: 'Residential' },
                  { id: 4, name: 'House', description: 'Stand-alone residential unit.', parentId: 1, parentName: 'Residential' },
                  { id: 5, name: 'Office', description: 'Space for office work.', parentId: 2, parentName: 'Commercial' },
              ];
          case 'status':
              return [
                  { id: 1, name: 'For Sale', description: 'Currently available for purchase.' },
                  { id: 2, name: 'For Rent', description: 'Currently available for lease.' },
                  { id: 3, name: 'Sold', description: 'Property has been sold.', parentId: 1, parentName: 'For Sale' },
                  { id: 4, name: 'Pending', description: 'Offer accepted, waiting for closure.', parentId: 1, parentName: 'For Sale' },
              ];
          case 'features':
              return [
                  { id: 1, name: 'Indoor', description: 'Interior amenities.' },
                  { id: 2, name: 'Outdoor', description: 'Exterior amenities.' },
                  { id: 3, name: 'Air Conditioning', description: 'Cooling system available.', parentId: 1, parentName: 'Indoor' },
                  { id: 4, name: 'Swimming Pool', description: 'Private or shared pool.', parentId: 2, parentName: 'Outdoor' },
              ];
          case 'region':
              return [
                  { id: 1, name: 'Greater Accra', description: 'Capital region.' },
                  { id: 2, name: 'Ashanti', description: 'Central region known for Kumasi.' },
              ];
          case 'city':
              return [
                  { id: 1, name: 'Accra', description: 'Capital city.', parentId: 1, parentName: 'Greater Accra' },
                  { id: 2, name: 'Kumasi', description: 'Garden city.', parentId: 2, parentName: 'Ashanti' },
              ];
          case 'prefix-suffix':
              return [
                  { id: 1, name: 'Prefix', description: 'Values displayed before the amount.' },
                  { id: 2, name: 'Suffix', description: 'Values displayed after the amount.' },
                  { id: 3, name: 'From', description: 'Starting price indicator.', parentId: 1, parentName: 'Prefix' },
                  { id: 4, name: 'Per Month', description: 'Standard monthly rental.', parentId: 2, parentName: 'Suffix' },
                  { id: 5, name: 'Per Night', description: 'Short stay rental.', parentId: 2, parentName: 'Suffix' },
                  { id: 6, name: 'Per Year', description: 'Annual rental.', parentId: 2, parentName: 'Suffix' },
                  { id: 7, name: 'Per Sq Ft', description: 'Measurement unit.', parentId: 2, parentName: 'Suffix' },
              ];
          default:
              return [
                  { id: 1, name: 'Example Item 1', description: 'Description for item 1.' },
                  { id: 2, name: 'Example Item 2', description: 'Description for item 2.', parentId: 1, parentName: 'Example Item 1' },
              ];
      }
  };

  const [items, setItems] = useState<OptionItem[]>([]);

  useEffect(() => {
      setItems(getMockData(category));
      if (category === 'currency') {
          setCurrencyConfig(getCurrencyConfig());
      }
  }, [category]);

  // Currency Handlers
  const handleCurrencySave = (e: React.FormEvent) => {
      e.preventDefault();
      saveCurrencyConfig(currencyConfig);
      alert('Currency settings saved successfully!');
  };

  // Generic Item Handlers
  const handleOpenModal = (item?: OptionItem) => {
      if (item) {
          setEditingItem(item);
          setFormData({ 
              name: item.name, 
              description: item.description, 
              parentId: item.parentId ? item.parentId.toString() : '' 
          });
      } else {
          setEditingItem(null);
          setFormData({ name: '', description: '', parentId: '' });
      }
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
      setEditingItem(null);
  };

  const handleSave = (e: React.FormEvent) => {
      e.preventDefault();
      
      const parent = items.find(i => i.id === Number(formData.parentId));
      
      if (editingItem) {
          // Edit Logic
          setItems(items.map(i => i.id === editingItem.id ? {
              ...i,
              name: formData.name,
              description: formData.description,
              parentId: formData.parentId ? Number(formData.parentId) : undefined,
              parentName: parent ? parent.name : undefined
          } : i));
      } else {
          // Add Logic
          const newItem: OptionItem = {
              id: Date.now(),
              name: formData.name,
              description: formData.description,
              parentId: formData.parentId ? Number(formData.parentId) : undefined,
              parentName: parent ? parent.name : undefined
          };
          setItems([...items, newItem]);
      }
      handleCloseModal();
  };

  const handleDelete = (id: number) => {
      if(confirm('Are you sure you want to delete this option?')) {
          setItems(items.filter(i => i.id !== id));
      }
  };

  // Special Rendering for Currency Category
  if (category === 'currency') {
      return (
          <AdminLayout onNavigate={onNavigate} activePage={`admin-site-options-${category}`} title={`Manage ${title}`} userRole={userRole}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-2xl">
                  <div className="mb-6">
                      <h2 className="font-bold text-gray-800 text-lg">Currency Configuration</h2>
                      <p className="text-sm text-gray-500">Customize how currency values are displayed across the platform.</p>
                  </div>
                  
                  <form onSubmit={handleCurrencySave} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Currency Symbol</label>
                              <input 
                                  type="text" 
                                  value={currencyConfig.symbol}
                                  onChange={e => setCurrencyConfig({...currencyConfig, symbol: e.target.value})}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#F9A826]"
                                  placeholder="e.g. $, €, GH₵"
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Symbol Position</label>
                              <select 
                                  value={currencyConfig.position}
                                  onChange={e => setCurrencyConfig({...currencyConfig, position: e.target.value as any})}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-[#F9A826]"
                              >
                                  <option value="before">Before Amount ($100)</option>
                                  <option value="after">After Amount (100$)</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Thousand Separator</label>
                              <select 
                                  value={currencyConfig.thousandSeparator}
                                  onChange={e => setCurrencyConfig({...currencyConfig, thousandSeparator: e.target.value})}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-[#F9A826]"
                              >
                                  <option value=",">Comma (,)</option>
                                  <option value=".">Dot (.)</option>
                                  <option value=" ">Space ( )</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Decimal Separator</label>
                              <select 
                                  value={currencyConfig.decimalSeparator}
                                  onChange={e => setCurrencyConfig({...currencyConfig, decimalSeparator: e.target.value})}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-[#F9A826]"
                              >
                                  <option value=".">Dot (.)</option>
                                  <option value=",">Comma (,)</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Decimal Places</label>
                              <input 
                                  type="number" 
                                  min="0"
                                  max="4"
                                  value={currencyConfig.decimals}
                                  onChange={e => setCurrencyConfig({...currencyConfig, decimals: parseInt(e.target.value)})}
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#F9A826]"
                              />
                          </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Preview</span>
                          <span className="text-3xl font-bold text-[#0A2B4C]">
                              {(() => {
                                  // Live Preview Logic using the same formatting principles
                                  let num = (1234567.89).toFixed(currencyConfig.decimals);
                                  let [int, dec] = num.split('.');
                                  // Escape separator for regex if it's a dot
                                  const rgx = /(\d+)(\d{3})/;
                                  while (rgx.test(int)) {
                                      int = int.replace(rgx, '$1' + currencyConfig.thousandSeparator + '$2');
                                  }
                                  let res = int + (currencyConfig.decimals > 0 ? currencyConfig.decimalSeparator + dec : '');
                                  return currencyConfig.position === 'before' ? currencyConfig.symbol + res : res + ' ' + currencyConfig.symbol;
                              })()}
                          </span>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex justify-end">
                          <button type="submit" className="px-6 py-2.5 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15] shadow-sm transition-colors">
                              Save Configuration
                          </button>
                      </div>
                  </form>
              </div>
          </AdminLayout>
      );
  }

  // Filter items that can be parents (avoid self-reference or circular reference in a real app, keeping simple here)
  const potentialParents = items.filter(i => !editingItem || i.id !== editingItem.id);

  return (
    <AdminLayout onNavigate={onNavigate} activePage={`admin-site-options-${category}`} title={`Manage ${title}`} userRole={userRole}>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="font-bold text-gray-800 text-lg">Existing {title}</h2>
                    <p className="text-sm text-gray-500">Manage definitions and hierarchy for system-wide options.</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="px-4 py-2 bg-[#0A2B4C] text-white rounded-lg hover:bg-[#08223c] font-medium text-sm flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    Add New Option
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Description (Tooltip)</th>
                            <th className="px-6 py-3">Parent Category</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {items.length > 0 ? items.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    <div className="flex items-center gap-2">
                                        {item.parentId && <span className="text-gray-300 transform rotate-180 -scale-x-100">➥</span>} 
                                        {item.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="group relative flex items-center w-fit cursor-help">
                                        <span className="truncate max-w-xs">{item.description}</span>
                                        {item.description && (
                                            <svg className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        )}
                                        {/* Tooltip Preview */}
                                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                                            {item.description}
                                            <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-gray-800"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {item.parentName ? (
                                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
                                            {item.parentName}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 italic text-xs">Top Level</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button 
                                            onClick={() => handleOpenModal(item)}
                                            className="text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-600 hover:text-red-800 text-xs font-medium transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    No options found for this category. Click "Add New Option" to create one.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Add/Edit Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fadeIn">
                    <div className="bg-[#0A2B4C] px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                        <h3 className="text-white font-bold text-lg">{editingItem ? 'Edit Option' : 'Add New Option'}</h3>
                        <button onClick={handleCloseModal} className="text-gray-300 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    
                    <form onSubmit={handleSave} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                required 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F9A826]" 
                                placeholder="e.g. Apartment"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Description (Tooltip)</label>
                            <textarea 
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F9A826]" 
                                placeholder="Enter text that will appear as a help tooltip for users..."
                            ></textarea>
                            <p className="text-xs text-gray-400 mt-1">This description guides users when selecting this option.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Parent Category <span className="font-normal text-gray-400">(Optional)</span></label>
                            <select 
                                value={formData.parentId}
                                onChange={(e) => setFormData({...formData, parentId: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F9A826] bg-white"
                            >
                                <option value="">None (Top Level)</option>
                                {potentialParents.map(parent => (
                                    <option key={parent.id} value={parent.id}>{parent.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <button 
                                type="button" 
                                onClick={handleCloseModal}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="px-4 py-2 bg-[#F9A826] text-white rounded-lg hover:bg-[#d88d15] text-sm font-bold shadow-sm"
                            >
                                {editingItem ? 'Save Changes' : 'Create Option'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

    </AdminLayout>
  );
};

export default AdminSiteOptions;
