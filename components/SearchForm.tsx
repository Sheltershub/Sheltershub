
import React, { useState } from 'react';

const SearchPill: React.FC<{ text: string; active: boolean; onClick: () => void }> = ({ text, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 text-sm font-semibold rounded-t-lg transition-colors focus:outline-none text-white ${
      active ? 'bg-[#082956]' : 'bg-[#ff8d2a] hover:bg-[#236da8]'
    }`}
  >
    {text}
  </button>
);

const CustomSelect: React.FC<{ placeholder: string }> = ({ placeholder }) => (
    <div className="relative w-full bg-gray-100 dark:bg-brand-blue-dark/50 rounded">
        <select className="w-full py-1.5 px-3 bg-transparent text-gray-500 dark:text-gray-300 appearance-none focus:outline-none">
            <option className="dark:bg-brand-blue-dark">{placeholder}</option>
            <option className="dark:bg-brand-blue-dark">Option 1</option>
            <option className="dark:bg-brand-blue-dark">Option 2</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
    </div>
);

const NumericInput: React.FC<{ placeholder: string }> = ({ placeholder }) => {
  const [value, setValue] = useState<number | ''>('');

  const handleIncrement = () => {
    setValue(prev => (typeof prev === 'number' ? prev + 1 : 1));
  };

  const handleDecrement = () => {
    setValue(prev => (typeof prev === 'number' && prev > 0 ? prev - 1 : 0));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setValue('');
    } else {
      const num = parseInt(val, 10);
      if (!isNaN(num)) {
        setValue(num >= 0 ? num : 0);
      }
    }
  };

  return (
    <div className="relative w-full bg-gray-100 dark:bg-brand-blue-dark/50 rounded">
      <input
        type="number"
        min="0"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full py-1.5 px-3 bg-transparent text-gray-500 dark:text-gray-300 appearance-none focus:outline-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pr-8"
        aria-label={placeholder}
      />
      <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center px-2 text-gray-700 dark:text-gray-400">
        <button 
          onClick={handleIncrement} 
          className="h-1/2 w-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" 
          aria-label={`Increment ${placeholder}`}
        >
          <svg className="fill-current h-4 w-4" viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" /></svg>
        </button>
        <button 
          onClick={handleDecrement} 
          className="h-1/2 w-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" 
          aria-label={`Decrement ${placeholder}`}
        >
          <svg className="fill-current h-4 w-4" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" /></svg>
        </button>
      </div>
    </div>
  );
};

interface SearchFormProps {
    onSearch?: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState('For Rent');

  const handleSearchClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onSearch) {
          onSearch();
      }
  };

  return (
    <div className="w-full">
      <div className="flex gap-[0.4px]">
        <SearchPill text="FOR RENT" active={activeTab === 'For Rent'} onClick={() => setActiveTab('For Rent')} />
        <SearchPill text="FOR SALE" active={activeTab === 'For Sale'} onClick={() => setActiveTab('For Sale')} />
        <SearchPill text="LAND" active={activeTab === 'Land'} onClick={() => setActiveTab('Land')} />
      </div>
      <div className="bg-[#082956] dark:bg-brand-blue-dark p-6 rounded-b-lg rounded-r-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <CustomSelect placeholder="Property Type" />
            <CustomSelect placeholder="Region" />
            <CustomSelect placeholder="City" />
            <NumericInput placeholder="No. of Bathrooms" />
            <NumericInput placeholder="Max. Price" />
            <NumericInput placeholder="Min. Price" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <NumericInput placeholder="No. of Bedrooms" />
            <NumericInput placeholder="Area Size" />
            <button 
                onClick={handleSearchClick}
                className="w-full bg-brand-blue dark:bg-brand-orange dark:text-brand-blue text-white font-bold py-1.5 px-4 rounded hover:bg-brand-blue-dark dark:hover:bg-brand-orange/90 transition-colors md:col-span-2 lg:col-span-1 shadow-lg"
            >
                Search
            </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
