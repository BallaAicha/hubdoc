import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, ExternalLink } from 'lucide-react';

interface ServiceDatabaseSchemaProps {
    schemaUrl: string;
}

const ServiceDatabaseSchema: React.FC<ServiceDatabaseSchemaProps> = ({ schemaUrl }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandToggle = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded && !isLoading) {
            setIsLoading(true);
            // Simulate loading schema data
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
        >
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Database Schema</h2>
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                <div className="p-5">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <Database className="h-5 w-5 text-blue-500" />
                            <h3 className="text-lg font-medium text-neutral-700">Database Schema</h3>
                        </div>
                        <a
                            href={schemaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                        >
                            View Full Schema <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                    </div>

                    <button
                        onClick={handleExpandToggle}
                        className="mt-4 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-md text-sm font-medium transition-colors duration-150 flex items-center justify-center w-full"
                    >
                        {isExpanded ? "Hide Schema" : "Preview Schema"}
                    </button>

                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                            className="mt-4"
                        >
                            {isLoading ? (
                                <div className="py-8 flex justify-center items-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                </div>
                            ) : (
                                <div className="border rounded-md overflow-hidden bg-neutral-50 p-4">
                                    <div className="overflow-auto max-h-96">
                    <pre className="text-xs text-neutral-800 font-mono">
                      {`
-- This is a simplified preview of the database schema
-- For the complete schema, please view the full documentation

CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- More tables and relationships are defined in the full schema
                      `}
                    </pre>
                                    </div>
                                    <div className="mt-2 text-xs text-neutral-500 text-center">
                                        This is a simplified preview. For complete details, view the full schema.
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceDatabaseSchema;