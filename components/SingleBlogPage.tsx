
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface SingleBlogPageProps {
  onNavigate: (page: string) => void;
}

const SingleBlogPage: React.FC<SingleBlogPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const article = {
    title: "The Future of Real Estate in Ghana: 2025 Outlook",
    image: "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg",
    author: "Kwame Asante",
    date: "Oct 24, 2024",
    category: "Market Trends",
    content: `
      <p class="mb-4">The Ghanaian real estate sector has been on a trajectory of significant growth over the past decade. As we approach 2025, the market is poised for a transformative shift driven by technological advancements, sustainable development practices, and changing consumer preferences.</p>
      
      <h3 class="text-xl font-bold text-[#0A2B4C] mt-6 mb-3">Sustainable Development Taking Center Stage</h3>
      <p class="mb-4">One of the most prominent trends we expect to see is a surge in green building. Developers are increasingly recognizing the long-term value of eco-friendly designs. From solar-powered homes to water recycling systems, sustainability is moving from a niche selling point to a standard expectation among buyers.</p>
      
      <h3 class="text-xl font-bold text-[#0A2B4C] mt-6 mb-3">The Rise of Smart Homes</h3>
      <p class="mb-4">Automation is no longer just for the ultra-wealthy. We are seeing a rise in affordable smart home solutions integrated into new developments. Features like remote security monitoring, smart lighting, and energy management systems are becoming key differentiators for residential properties in Accra and Kumasi.</p>
      
      <h3 class="text-xl font-bold text-[#0A2B4C] mt-6 mb-3">Regulatory Reforms</h3>
      <p class="mb-4">With the implementation of the Real Estate Agency Act, the industry is becoming more regulated and transparent. This is great news for investors, as it reduces the risk of land litigation and ensures that agents and developers operate within a standardized legal framework.</p>
      
      <p class="mt-6">In conclusion, 2025 promises to be an exciting year for real estate in Ghana. Whether you are an investor, a homeowner, or a tenant, staying informed about these trends will be crucial to making the right decisions in this evolving market.</p>
    `
  };

  const relatedArticles = [
    {
      id: 2,
      title: "Top 5 Neighborhoods for Families in Accra",
      image: "https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg",
      date: "Oct 20, 2024",
    },
    {
      id: 3,
      title: "Investing in Commercial Property: A Beginner's Guide",
      image: "https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg",
      date: "Oct 18, 2024",
    },
    {
      id: 5,
      title: "Sustainable Architecture: Green Building in Ghana",
      image: "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg",
      date: "Oct 12, 2024",
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="blog" />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center text-sm text-gray-500">
                <button onClick={() => onNavigate('home')} className="hover:text-[#F9A826] transition-colors">Home</button>
                <span className="mx-2">/</span>
                <button onClick={() => onNavigate('blog')} className="hover:text-[#F9A826] transition-colors">Blog</button>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium truncate max-w-xs">{article.title}</span>
            </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10 max-w-5xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Article Column */}
            <div className="lg:col-span-8">
                
                {/* Article Header */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
                    <div className="h-64 md:h-96 overflow-hidden relative">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                        <div className="absolute top-4 left-4">
                             <span className="px-3 py-1 bg-[#F9A826] text-white text-xs font-bold rounded shadow-sm uppercase tracking-wide">
                                {article.category}
                            </span>
                        </div>
                    </div>
                    <div className="p-6 md:p-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#0A2B4C] mb-4 leading-tight">{article.title}</h1>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-6 mb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                    <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                </div>
                                <span className="font-medium text-gray-900">{article.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <span>{article.date}</span>
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }}></div>
                        
                        {/* Share Section */}
                        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <span className="font-bold text-[#0A2B4C]">Share this article:</span>
                            <div className="flex gap-2">
                                <button className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></button>
                                <button className="p-2 bg-sky-50 text-sky-500 rounded-full hover:bg-sky-100 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></button>
                                <button className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comment Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
                    <h3 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b border-gray-100 pb-2">Leave a Comment</h3>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Your Name" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                            <input type="email" placeholder="Your Email" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                        </div>
                        <textarea rows={4} placeholder="Write your comment here..." className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]"></textarea>
                        <button type="submit" className="bg-[#0A2B4C] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#08223c] transition-colors">
                            Post Comment
                        </button>
                    </form>
                </div>

            </div>

            {/* Sidebar / Related Articles */}
            <div className="lg:col-span-4 space-y-8">
                
                {/* Related Articles Widget */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-[#0A2B4C] mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-[#F9A826] rounded-full"></span>
                        You May Also Like
                    </h3>
                    <div className="space-y-6">
                        {relatedArticles.map(post => (
                            <div key={post.id} className="flex gap-4 group cursor-pointer" onClick={() => onNavigate('blog-detail')}>
                                <div className="w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800 leading-snug mb-1 group-hover:text-[#F9A826] transition-colors line-clamp-2">{post.title}</h4>
                                    <span className="text-xs text-gray-400">{post.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Newsletter Widget */}
                <div className="bg-[#0A2B4C] rounded-xl shadow-sm p-8 text-center text-white">
                    <h3 className="text-xl font-bold mb-2">Subscribe to Newsletter</h3>
                    <p className="text-blue-200 text-sm mb-6">Get the latest real estate news and updates delivered to your inbox.</p>
                    <input type="email" placeholder="Your email address" className="w-full rounded-lg px-4 py-3 text-sm text-gray-900 mb-3 focus:outline-none" />
                    <button className="w-full bg-[#F9A826] font-bold py-3 rounded-lg hover:bg-[#d88d15] transition-colors text-white">Subscribe</button>
                </div>

            </div>
        </div>

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default SingleBlogPage;
