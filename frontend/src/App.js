import React, { useState } from 'react';
import FileUpload from './components/FileUpload/FileUpload';
import AnalysisResults from './components/AnalysisResults/AnalysisResults';
import YouTubeVideo from './components/AnalysisResults/YouTubeVideo';
import Chat from './components/Chat/Chat';
import Spinner from './components/Layout/Spinner';
import useAnalysisStatus from './hooks/useAnalysisStatus';
import logo from './logo/insurance_bot.png'


function App() {
  const [taskId, setTaskId] = useState(null);
  const { status, result } = useAnalysisStatus(taskId);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadSuccess = (newTaskId) => {
    setTaskId(newTaskId);
    setIsUploading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-4xl sm:mx-auto w-full px-4 sm:px-0">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-white shadow-lg sm:rounded-3xl sm:p-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <img src={logo} alt="Insurance Bot Logo" className="h-16 w-16 mr-4" />
              <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
                Insurance <span className="text-cyan-600">Bot</span>
              </h1>
            </div>
            {!taskId && !isUploading && (
              <FileUpload
                onUploadSuccess={handleUploadSuccess}
                onUploadStart={() => setIsUploading(true)}
              />
            )}
            {(isUploading || (taskId && status === 'pending')) && (
              <div className="text-center">
                <Spinner />
                <p className="mt-4">Analyzing your policy...</p>
              </div>
            )}
            {status === 'completed' && result && (
              <div className="space-y-6">
                {result.is_insurance_doc ? (
                  <>
                    <AnalysisResults
                      what_is_good={result.what_is_good}
                      what_is_bad={result.what_is_bad}
                      what_is_okay={result.what_is_okay}
                    />
                    <YouTubeVideo videoUrl={result.youtube_video_rec} />
                  </>
                ) : (
                  <p className="text-center text-red-600">This document is not an insurance document.</p>
                )}
              </div>
            )}
            {status === 'failed' && (
              <p className="text-center text-red-600">Analysis failed. Please try again.</p>
            )}
          </div>
        </div>
      </div>

      {status === 'completed' && result && result.is_insurance_doc && (
        <div className="mt-8 sm:max-w-4xl sm:mx-auto w-full px-4 sm:px-0">
          <div className="bg-white shadow-lg sm:rounded-3xl sm:p-6 border-4 border-cyan-500">
            <h2 className="text-xl font-semibold mb-4 text-cyan-700">Chat with Insurance Policy</h2>
            <div className="h-96">
              <Chat taskId={taskId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default App;
