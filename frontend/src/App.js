import React, { useState } from 'react';
import FileUpload from './components/FileUpload/FileUpload';
import AnalysisResults from './components/AnalysisResults/AnalysisResults';
import YouTubeVideo from './components/AnalysisResults/YouTubeVideo';
import Chat from './components/Chat/Chat';
import Spinner from './components/Layout/Spinner';
import useAnalysisStatus from './hooks/useAnalysisStatus';

function App() {
  const [taskId, setTaskId] = useState('498906921500d860d74552df2c913dbf'); // useState(null);
  const { status, result } = useAnalysisStatus(taskId);

  const handleUploadSuccess = (newTaskId) => {
    setTaskId(newTaskId);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-4xl sm:mx-auto w-full px-4 sm:px-0">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-white shadow-lg sm:rounded-3xl sm:p-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Insurance Policy Analyzer</h1>
            {!taskId && <FileUpload onUploadSuccess={handleUploadSuccess} />}
            {taskId && status === 'pending' && (
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
