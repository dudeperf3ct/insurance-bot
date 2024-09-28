import React from 'react';
import { PlayIcon } from '@heroicons/react/solid';

function YouTubeVideo({ videoUrl }) {
    if (!videoUrl) return null;

    const videoId = extractVideoId(videoUrl);

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-8">
            <h3 className="text-2xl font-bold p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">Learn More</h3>
            <div className="p-6">
                {videoId ? (
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                ) : (
                    <div className="bg-gray-100 rounded-lg p-6 text-center">
                        <p className="text-gray-600 mb-4">We couldn't embed the video, but you can watch it on YouTube:</p>
                        <a
                            href={videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out"
                        >
                            <PlayIcon className="h-5 w-5 mr-2" />
                            Watch on YouTube
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

export default YouTubeVideo;
