import { useState } from 'react';
import { generateProject } from '../services/projectService';
import { ProjectRequest } from '../types/project';

export const useProjectGeneration = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateAndDownload = async (data: ProjectRequest) => {
        try {
            setIsGenerating(true);
            setError(null);

            console.log('Sending project generation request:', data);
            const blob = await generateProject(data);

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${data.projectName}.zip`;

            // Trigger download
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate project');
            return false;
        } finally {
            setIsGenerating(false);
        }
    };

    return {
        generateAndDownload,
        isGenerating,
        error
    };
};