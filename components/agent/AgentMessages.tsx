
import React from 'react';
import AgentLayout from './AgentLayout';

interface AgentMessagesProps {
  onNavigate: (page: string) => void;
}

const AgentMessages: React.FC<AgentMessagesProps> = ({ onNavigate }) => {
  const messages = [
    { id: 1, sender: "John Doe (Buyer)", subject: "Viewing Request", time: "10:30 AM", preview: "I would like to schedule a viewing for the Modern Family Home..." },
    { id: 2, sender: "Prime Real Estate", subject: "Commission Update", time: "Yesterday", preview: "Attached is the breakdown for last month's sales..." },
    { id: 3, sender: "Empire Builders", subject: "New Project Opportunity", time: "Oct 24", preview: "We are launching a new estate in Aburi and looking for agents..." },
  ];

  return (
    <AgentLayout onNavigate={onNavigate} activePage="agent-messages" title="Inbox">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-140px)] flex overflow-hidden">
            
            {/* List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <input type="text" placeholder="Search messages..." className="w-full bg-gray-100 border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-[#F9A826]" />
                </div>
                <div className="flex-1 overflow-y-auto">
                    {messages.map(msg => (
                        <div key={msg.id} className="p-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors">
                            <div className="flex justify-between mb-1">
                                <span className="font-bold text-gray-800 text-sm">{msg.sender}</span>
                                <span className="text-xs text-gray-400">{msg.time}</span>
                            </div>
                            <p className="text-sm text-[#0A2B4C] font-medium mb-1 truncate">{msg.subject}</p>
                            <p className="text-xs text-gray-500 truncate">{msg.preview}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* View */}
            <div className="w-2/3 flex flex-col bg-gray-50">
                 <div className="p-6 bg-white border-b border-gray-200">
                     <div className="flex justify-between items-start">
                         <div>
                             <h3 className="font-bold text-lg text-[#0A2B4C]">Viewing Request</h3>
                             <p className="text-sm text-gray-500">From: <span className="font-medium text-gray-800">John Doe</span> &lt;john@example.com&gt;</p>
                         </div>
                         <div className="flex gap-2">
                             <button className="p-2 hover:bg-gray-100 rounded text-gray-500" title="Archive">
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                             </button>
                             <button className="p-2 hover:bg-gray-100 rounded text-gray-500" title="Reply">
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                             </button>
                         </div>
                     </div>
                 </div>
                 
                 <div className="flex-1 p-6 overflow-y-auto">
                     <p className="text-sm text-gray-700 leading-relaxed">
                         Hello,<br/><br/>
                         I would like to schedule a viewing for the <strong>Modern Family Home</strong> in Cantonments. <br/>
                         I am available this Saturday afternoon. Is the property still available?<br/><br/>
                         Best regards,<br/>
                         John Doe<br/>
                         +233 55 123 4567
                     </p>
                 </div>

                 <div className="p-4 bg-white border-t border-gray-200">
                     <textarea rows={3} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#F9A826]" placeholder="Type your reply..."></textarea>
                     <div className="flex justify-end mt-2">
                         <button className="px-4 py-2 bg-[#0A2B4C] text-white font-medium rounded-lg hover:bg-[#08223c]">Send Reply</button>
                     </div>
                 </div>
            </div>
        </div>
    </AgentLayout>
  );
};

export default AgentMessages;
