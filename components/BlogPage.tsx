
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Market Trends', 'Developer Insights', 'Agency News', 'Sheltershub Updates', 'Tips & Advice'];

  const featuredPost = {
    id: 1,
    title: "The Future of Real Estate in Ghana: 2025 Outlook",
    excerpt: "As we move further into the decade, the Ghanaian real estate market is poised for significant transformation. From sustainable building practices to the rise of smart homes, here is what to expect.",
    image: "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg",
    author: "Kwame Asante",
    date: "Oct 24, 2024",
    category: "Market Trends"
  };

  const blogPosts = [
    {
      id: 2,
      title: "Top 5 Neighborhoods for Families in Accra",
      excerpt: "Looking for the perfect place to raise a family? We explore the safest and most family-friendly communities in the capital.",
      image: "https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg",
      author: "Sarah Jenkins",
      date: "Oct 20, 2024",
      category: "Tips & Advice"
    },
    {
      id: 3,
      title: "Investing in Commercial Property: A Beginner's Guide",
      excerpt: "Commercial real estate can be a lucrative investment if approached correctly. Learn the basics of office and retail space investment.",
      image: "https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg",
      author: "David Mensah",
      date: "Oct 18, 2024",
      category: "Tips & Advice"
    },
    {
      id: 4,
      title: "Sheltershub Launches New Agent Dashboard",
      excerpt: "We are excited to announce a major update to our agent tools, designed to help you close deals faster and manage listings efficiently.",
      image: "https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg",
      author: "Sheltershub Team",
      date: "Oct 15, 2024",
      category: "Sheltershub Updates"
    },
    {
      id: 5,
      title: "Sustainable Architecture: Green Building in Ghana",
      excerpt: "How developers are adopting eco-friendly designs to reduce carbon footprints and energy costs for homeowners.",
      image: "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg",
      author: "Empire Builders",
      date: "Oct 12, 2024",
      category: "Developer Insights"
    },
    {
      id: 6,
      title: "Understanding Property Taxes and Regulations",
      excerpt: "Navigating the legal landscape of property ownership can be tricky. Here is a breakdown of essential taxes and laws.",
      image: "https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg",
      author: "Legal Team",
      date: "Oct 10, 2024",
      category: "Market Trends"
    },
    {
      id: 7,
      title: "Why Renting Might Be Better Than Buying in 2025",
      excerpt: "With interest rates fluctuating, we analyze the pros and cons of renting versus buying in the current economic climate.",
      image: "https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg",
      author: "Financial Expert",
      date: "Oct 05, 2024",
      category: "Tips & Advice"
    }
  ];

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="blog" />

      {/* Page Title Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-[#0A2B4C] mb-2">Blog &amp; News</h1>
            <p className="text-gray-500 text-lg">Stay updated with the latest real estate insights and Sheltershub announcements.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        
        {/* Featured Article */}
        <section className="mb-16">
            <h2 className="text-xl font-bold text-[#0A2B4C] mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-[#F9A826] rounded-full"></span>
                Featured Story
            </h2>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row group cursor-pointer hover:shadow-md transition-all" onClick={() => onNavigate('blog-detail')}>
                <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                    <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-blue-50 text-[#0A2B4C] text-xs font-bold rounded-full uppercase tracking-wide">
                            {featuredPost.category}
                        </span>
                        <span className="text-gray-400 text-xs">{featuredPost.date}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0A2B4C] mb-4 group-hover:text-[#F9A826] transition-colors">
                        {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                        {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{featuredPost.author}</span>
                        </div>
                        <button className="text-[#F9A826] font-bold text-sm hover:underline flex items-center gap-1">
                            Read Article <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* Categories Filter */}
        <section className="mb-10 overflow-x-auto">
            <div className="flex gap-2 min-w-max pb-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                            activeCategory === cat 
                                ? 'bg-[#0A2B4C] text-white border-[#0A2B4C]' 
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </section>

        {/* Blog Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow group flex flex-col h-full">
                    <div className="h-48 overflow-hidden relative">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute top-4 left-4">
                             <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-[#0A2B4C] text-xs font-bold rounded shadow-sm">
                                {post.category}
                            </span>
                        </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                        <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                            <span>{post.date}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{post.author}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#0A2B4C] mb-3 leading-snug group-hover:text-[#F9A826] transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                            {post.excerpt}
                        </p>
                        <div className="mt-auto pt-4 border-t border-gray-100">
                            <button 
                                onClick={() => onNavigate('blog-detail')}
                                className="text-[#0A2B4C] font-semibold text-sm hover:text-[#F9A826] flex items-center gap-1 transition-colors"
                            >
                                Read More <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </section>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
            <div className="flex gap-2">
                <button className="px-4 h-10 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold transition-colors disabled:opacity-50" disabled>Previous</button>
                <button className="w-10 h-10 flex items-center justify-center rounded bg-[#F9A826] text-white font-semibold shadow-sm">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold transition-colors">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold transition-colors">3</button>
                <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                <button className="px-4 h-10 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold transition-colors">Next</button>
            </div>
        </div>

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default BlogPage;
