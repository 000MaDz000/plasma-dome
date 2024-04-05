// Import the necessary dependencies
import React from 'react';
import Image from 'next/image';

// Define the SurviceCard component props interface
interface SurviceCardProps {
    icon: string;
    title: string;
    content: string;
}

// Define the SurviceCard component
const SurviceCard: React.FC<SurviceCardProps> = ({ icon, title, content }) => {
    // Add code here to render the "Survive" card
    // using React, Next.js, and Tailwind CSS
    return (
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center mb-4">
                <Image src={icon} alt="Branch Icon" width={40} height={40} className="object-cover rounded-md mr-4 shadow-sm bg-gradient-to-r from-slate-200 to-gray-200 via-gray-300" />
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            <p>{content}</p>
        </div>
    );
};

// Export the SurviceCard component
export default SurviceCard;