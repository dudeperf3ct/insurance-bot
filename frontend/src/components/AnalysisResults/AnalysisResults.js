import React from 'react';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

function AnalysisResults({ what_is_good, what_is_bad, what_is_okay }) {
    const renderList = (items) => {
        return items.split('- ').filter(item => item.trim()).map((item, index) => (
            <li key={index} className="mb-2">{item.trim()}</li>
        ));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="What is Good" icon={<CheckCircleIcon className="h-8 w-8 text-green-500" />} bgColor="bg-green-50" textColor="text-green-700">
                <ul className="list-disc pl-5 space-y-2">
                    {renderList(what_is_good)}
                </ul>
            </Card>
            <Card title="What is Bad" icon={<XCircleIcon className="h-8 w-8 text-red-500" />} bgColor="bg-red-50" textColor="text-red-700">
                <ul className="list-disc pl-5 space-y-2">
                    {renderList(what_is_bad)}
                </ul>
            </Card>
            <Card title="What is Okay" icon={<ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />} bgColor="bg-yellow-50" textColor="text-yellow-700">
                <ul className="list-disc pl-5 space-y-2">
                    {renderList(what_is_okay)}
                </ul>
            </Card>
        </div>
    );
}

function Card({ title, icon, children, bgColor, textColor }) {
    return (
        <div className={`rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${bgColor}`}>
            <div className="px-6 py-4">
                <div className="flex items-center mb-4">
                    {icon}
                    <h3 className={`ml-2 text-xl font-semibold ${textColor}`}>{title}</h3>
                </div>
                <div className={`${textColor}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AnalysisResults;
