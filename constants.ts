
import { Property, PropertyStatus } from './types';

export const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'All Properties', href: '#' },
  { name: 'For Rent', href: '#' },
  { name: 'For Sale', href: '#' },
  { name: 'Agencies', href: '#' },
  { name: 'Agents', href: '#' },
  { name: 'Developers', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'Contact', href: '#' },
];

export const heroImages = [
  'https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg',
  'https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg',
  'https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg',
];

export const adSliderImages = [
    'https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg',
    'https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg',
    'https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg',
];

export const wideAdSliderImages = [
    'https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg',
    'https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg',
    'https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg',
];


const generateProperties = (startId: number, count: number): Property[] => {
    const properties: Property[] = [];
    const newImageUrl = 'https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg';
    const propertyTypes = ['House', 'Apartment', 'Condo', 'Townhouse', 'Commercial', 'Land'];

    for (let i = 0; i < count; i++) {
        // Randomize status including Sold
        const rand = Math.random();
        let status = PropertyStatus.ForSale;
        if (rand > 0.6) status = PropertyStatus.ForRent;
        if (rand > 0.9) status = PropertyStatus.Sold;

        // Randomize Type
        const typeIndex = Math.floor(Math.random() * propertyTypes.length);
        const selectedType = propertyTypes[typeIndex];

        properties.push({
            id: startId + i,
            images: [newImageUrl],
            status: status,
            daysAgo: Math.floor(Math.random() * 30) + 1,
            isPremium: Math.random() > 0.7,
            propertyType: selectedType,
            name: i === 0 && startId === 10 ? 'Lakeside Estate' : (selectedType === 'Commercial' ? 'Modern Office Space' : 'Modern Family Home'),
            beds: selectedType === 'Land' || selectedType === 'Commercial' ? 0 : (i === 0 && startId === 10 ? 3 : Math.floor(Math.random() * 3) + 2),
            baths: selectedType === 'Land' || selectedType === 'Commercial' ? 0 : (i === 0 && startId === 10 ? 4 : Math.floor(Math.random() * 3) + 2),
            garage: selectedType === 'Land' ? 0 : (i === 0 && startId === 10 ? 2 : Math.floor(Math.random() * 2) + 1),
            areaSqm: i === 0 && startId === 10 ? 350 : Math.floor(Math.random() * 300) + 100,
            priceGHS: i === 0 && startId === 10 ? 1830055 : Math.floor(Math.random() * 2000000) + 500000,
            priceUSD: i === 0 && startId === 10 ? 150000 : Math.floor(Math.random() * 150000) + 40000,
        });
    }
    // Ensure the first property matches the design reference exactly
    if (startId === 10) {
        properties[0] = {
            id: 10,
            images: [newImageUrl],
            status: PropertyStatus.ForSale,
            daysAgo: 15,
            isPremium: true,
            propertyType: 'House',
            name: 'Lakeside Estate',
            beds: 3,
            baths: 4,
            garage: 2,
            areaSqm: 350,
            priceGHS: 1830055,
            priceUSD: 150000,
        };
    }
    return properties;
}


export const featuredProperties: Property[] = generateProperties(10, 6).map((p, index) => {
    // Explicitly set the 2nd property (Index 1) to SOLD for demonstration
    if (index === 1) {
        return { ...p, isPremium: true, status: PropertyStatus.Sold };
    }
    return { ...p, isPremium: true };
});

export const latestProperties: Property[] = generateProperties(16, 6).map((p, index) => {
    // Explicitly set the 4th property (Index 3) to SOLD for demonstration
    if (index === 3) {
        return { ...p, status: PropertyStatus.Sold };
    }
    return p;
});

export const allPropertiesList: Property[] = generateProperties(22, 12); // Generate 12 properties for the listing page

// Redesigned Footer Data Structure
export const footerData = {
    propertyCategories: [
        {
            title: 'Residential',
            subtitle: '(Living / accommodation)',
            links: [
                'Houses for Sale', 'Houses for Rent', 'Apartments / Flats for Sale',
                'Apartments / Flats for Rent', 'Townhouses', 'Duplexes',
                'Compound Houses', 'Hostels (Student & Workers)',
                'Serviced Apartments', 'Short-Let', 'Airbnb Homes'
            ]
        },
        {
            title: 'Commercial',
            subtitle: '(Business)',
            links: [
                'Offices for Rent', 'Offices for Sale', 'Shops & Retail Spaces',
                'Shopping Malls', 'Hotels', 'Guest Houses', 'Commercial Buildings'
            ]
        },
        {
            title: 'Land',
            subtitle: '(For Development)',
            links: [
                'Residential Land for Sale', 'Commercial Land for Sale',
                'Industrial Land for Sale', 'Agricultural / Farmland', 'Mixed-Use Land'
            ]
        },
        {
            title: 'Industrial',
            subtitle: '(Manufacturing, storage & logistics)',
            links: [
                'Warehouses', 'Factories', 'Workshops',
                'Industrial Yards', 'Logistics Depots'
            ]
        },
        {
            title: 'Mixed-Use',
            subtitle: '(Combination of uses)',
            links: [
                'Residential + Commercial Buildings', 'Shop + Apartment Properties',
                'Office + Retail Developments'
            ]
        },
        {
            title: 'Special Purpose',
            subtitle: '(Institutional & social use)',
            links: [
                'Schools', 'Hospitals & Clinics',
                'Open Venues/Event Centres', 'Government / Public Buildings'
            ]
        },
        {
            title: 'Development',
            subtitle: '(Property condition & stage)',
            links: [
                'Off-Plan Properties', 'Newly Built Properties',
                'Uncompleted Buildings', 'Renovated Properties', 'Old Buildings'
            ]
        }
    ],
    infoCategories: [
        {
            title: 'About Us',
            links: [
                { name: 'About Sheltershub', page: 'about' },
                { name: 'Terms of Use', page: 'terms' },
                { name: 'Privacy Policy', href: '#' },
                { name: 'Cookie Policy', href: '#' },
            ]
        },
        {
            title: 'Support',
            links: [
                { name: 'Safety Tips', href: '#' },
                { name: 'Contact Us', page: 'contact' },
                { name: 'FAQ', page: 'faq' },
                { name: 'Sitemap', page: 'sitemap' },
                { name: 'Report Fraud', page: 'report-fraud' },
            ]
        },
        {
            title: 'Our Socials',
            links: [
                { name: 'Facebook', href: '#' },
                { name: 'Instagram', href: '#' },
                { name: 'YouTube', href: '#' },
                { name: 'X (Twitter)', href: '#' },
            ]
        }
    ]
};

// Legacy support for other components until full migration (optional, keeping minimal for type safety if needed elsewhere)
export const footerLinks = {};
