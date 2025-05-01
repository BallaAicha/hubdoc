import React from "react";

interface LoadingOverlayProps {
    message: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="loader mb-4"></div>
                <p className="text-gray-700">{message}</p>
            </div>
        </div>
    );
};

export default LoadingOverlay;