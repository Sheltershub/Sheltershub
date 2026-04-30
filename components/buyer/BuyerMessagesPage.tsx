
import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';

interface BuyerMessagesPageProps {
  onNavigate: (page: string) => void;
  userRole?: string;
}

const BuyerMessagesPage: React.FC<BuyerMessagesPageProps> = ({ onNavigate, userRole = 'user' }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'archived'>('all');
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    { id: 1, name: 'Sarah Wilson', role: 'Real Estate Agent', lastMessage: 'The viewing for the East Legon villa is scheduled for tomorrow at 10 AM.', time: '10:45 AM', avatar: 'https://i.pravatar.cc/150?u=sarah', unread: 2 },
    { id: 2, name: 'David Mensah', role: 'Property Developer', lastMessage: 'Thank you for your inquiry about the new airport residential project.', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?u=david', unread: 0 },
    { id: 3, name: 'Grace Osei', role: 'Agency Manager', lastMessage: 'We have received your application. We will get back to you shortly.', time: '2 days ago', avatar: 'https://i.pravatar.cc/150?u=grace', unread: 0 },
  ];

  const messages = [
    { id: 1, sender: 'agent', text: 'Hello John! How are you doing today?', time: '09:00 AM' },
    { id: 2, sender: 'buyer', text: "I'm good Sarah, thank you. I wanted to ask about the Lakeside Estate property.", time: '09:15 AM' },
    { id: 3, sender: 'agent', text: "Of course! It's still available. Would you like to schedule a viewing?", time: '09:20 AM' },
    { id: 4, sender: 'buyer', text: 'Yes, that would be great. Is this weekend possible?', time: '09:45 AM' },
    { id: 5, sender: 'agent', text: 'The viewing for the East Legon villa is scheduled for tomorrow at 10 AM.', time: '10:45 AM' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    // In a real app, I would add to messages state
    setNewMessage('');
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300 flex flex-col">
      <Header onNavigate={onNavigate} activePage="buyer-profile" userRole={userRole} />

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages</h1>
            <div className="flex bg-white dark:bg-brand-blue-dark border border-gray-200 dark:border-gray-800 rounded-lg p-1">
                {(['all', 'unread', 'archived'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all capitalize ${activeTab === tab ? 'bg-brand-orange text-white' : 'text-gray-500 dark:text-gray-400 hover:text-brand-orange'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        <div className="flex-grow bg-white dark:bg-brand-blue-dark rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
            {/* Conversations List */}
            <div className="w-full md:w-80 lg:w-96 border-r border-gray-100 dark:border-gray-800 flex flex-col">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search messages..." 
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-900 border-none rounded-lg text-sm focus:ring-1 focus:ring-brand-orange outline-none dark:text-white"
                        />
                        <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto">
                    {conversations.map((conv) => (
                        <button 
                            key={conv.id}
                            onClick={() => setSelectedConversation(conv.id)}
                            className={`w-full p-4 flex gap-4 transition-colors text-left border-b border-gray-50 dark:border-gray-900/50 ${selectedConversation === conv.id ? 'bg-brand-orange/5 dark:bg-brand-orange/10' : 'hover:bg-gray-50 dark:hover:bg-gray-900/30'}`}
                        >
                            <div className="relative flex-shrink-0">
                                <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full object-cover" />
                                {conv.unread > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-orange text-white text-[10px] font-bold border-2 border-white dark:border-brand-blue-dark rounded-full flex items-center justify-center">
                                        {conv.unread}
                                    </span>
                                )}
                            </div>
                            <div className="flex-grow min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`text-sm font-bold truncate ${selectedConversation === conv.id ? 'text-brand-orange' : 'text-gray-900 dark:text-white'}`}>{conv.name}</h3>
                                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{conv.time}</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 truncate mb-0.5">{conv.role}</p>
                                <p className={`text-xs truncate ${conv.unread > 0 ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-400'}`}>{conv.lastMessage}</p>
                            </div>
                        </button>
                    ))}
                    {conversations.length === 0 && (
                        <div className="p-8 text-center">
                            <p className="text-sm text-gray-500">No conversations found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Active Chat */}
            {selectedConversation ? (
                <div className="flex-grow flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img 
                                src={conversations.find(c => c.id === selectedConversation)?.avatar} 
                                alt="Active Avatar" 
                                className="w-10 h-10 rounded-full object-cover" 
                            />
                            <div>
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white">{conversations.find(c => c.id === selectedConversation)?.name}</h2>
                                <p className="text-[10px] text-green-500 font-bold">Online</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                             <button className="p-2 text-gray-400 hover:text-brand-orange rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                             </button>
                             <button className="p-2 text-gray-400 hover:text-brand-orange rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                             </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-grow p-4 md:p-6 overflow-y-auto space-y-4 bg-gray-50/30 dark:bg-gray-900/10">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] rounded-2xl p-4 text-sm shadow-sm ${msg.sender === 'buyer' ? 'bg-[#0A2B4C] text-white' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700'}`}>
                                    <p className="mb-1 leading-relaxed">{msg.text}</p>
                                    <p className={`text-[10px] text-right ${msg.sender === 'buyer' ? 'text-blue-200' : 'text-gray-400'}`}>{msg.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                        <form onSubmit={handleSendMessage} className="flex gap-3">
                            <button type="button" className="p-2 text-gray-400 hover:text-brand-orange transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </button>
                            <input 
                                type="text" 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Write your message..." 
                                className="flex-grow px-4 py-2 bg-gray-100 dark:bg-gray-900 border-none rounded-xl text-sm focus:ring-1 focus:ring-brand-orange outline-none dark:text-white"
                            />
                            <button 
                                type="submit" 
                                className="bg-brand-orange text-white p-2 rounded-xl hover:bg-brand-orange/90 transition-all shadow-md"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="flex-grow flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your Conversations</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">Select a conversation from the list to view your chat history with agents and developers.</p>
                </div>
            )}
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default BuyerMessagesPage;
