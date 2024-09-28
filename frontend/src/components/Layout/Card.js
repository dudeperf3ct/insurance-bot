import React from 'react';

function Card({ title, children }) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">{children}</div>
        </div>
    );
}

export default Card;
