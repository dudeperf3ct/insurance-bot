import React, { useState, useCallback } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { uploadFile } from '../../services/api';

function FileUpload({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        setFile(acceptedFiles[0]);
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile.type === 'application/pdf') {
            setFile(droppedFile);
        }
    };

    const handleSubmit = async () => {
        if (!file) return;

        try {
            const taskId = await uploadFile(file);
            onUploadSuccess(taskId);
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Upload your PDF
                    </h2>
                </div>
                <div
                    className={`mt-8 space-y-6 ${isDragging ? 'bg-blue-50' : 'bg-white'
                        } p-8 border-2 border-dashed rounded-lg`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center">
                        <CloudArrowUpIcon className="h-12 w-12 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-600">
                            Drag and drop your PDF here, or click to select
                        </p>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Select PDF
                        </label>
                    </div>
                </div>
                {file && (
                    <div className="flex justify-between items-center bg-white p-4 rounded-lg">
                        <span className="text-sm text-gray-500">{file.name}</span>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Upload
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FileUpload;
