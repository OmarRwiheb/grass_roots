"use client";

import { useEffect, useRef, useState } from 'react';

const VideoModal = ({ isOpen, onClose, videoSrc }) => {
  const videoRef = useRef(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Load video only when modal opens
      setShouldLoadVideo(true);
    } else {
      document.body.style.overflow = 'unset';
      // Reset video when modal closes to prevent it from continuing to load
      setShouldLoadVideo(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay - can be styled separately */}
      <div
        className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-transparent bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
          aria-label="Close video"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

      {/* Video container - separate from background */}
      <div
        className="relative w-fit h-full max-w-6xl max-h-[90vh] p-4 flex items-center justify-center z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={shouldLoadVideo ? videoSrc : undefined}
          controls
          autoPlay
          preload="none"
          className="max-w-full max-h-full rounded-lg shadow-2xl"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoModal;
