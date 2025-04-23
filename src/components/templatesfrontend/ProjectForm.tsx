import React from 'react';
import { ProjectConfig } from '../types';

interface ProjectFormProps {
  projectConfig: ProjectConfig;
  onConfigChange: (config: ProjectConfig) => void;
  onNext: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ projectConfig, onConfigChange, onNext }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onConfigChange({
      ...projectConfig,
      [name]: value
    });
  };

  const handleFeatureToggle = (feature: keyof ProjectConfig['features']) => {
    onConfigChange({
      ...projectConfig,
      features: {
        ...projectConfig.features,
        [feature]: !projectConfig.features[feature]
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isFormValid = projectConfig.projectName.trim() !== '';

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Project Configuration</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={projectConfig.projectName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="my-react-app"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={projectConfig.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="A brief description of your project"
              />
            </div>
            
            <div>
              <label htmlFor="version" className="block text-sm font-medium text-gray-700 mb-1">
                Version
              </label>
              <input
                type="text"
                id="version"
                name="version"
                value={projectConfig.version}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="0.1.0"
              />
            </div>
            
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                id="language"
                name="language"
                value={projectConfig.language}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-3">Features</p>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="routing"
                    checked={projectConfig.features.routing}
                    onChange={() => handleFeatureToggle('routing')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="routing" className="ml-2 block text-sm text-gray-700">
                    Routing (React Router)
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="i18n"
                    checked={projectConfig.features.i18n}
                    onChange={() => handleFeatureToggle('i18n')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="i18n" className="ml-2 block text-sm text-gray-700">
                    Internationalization (i18n)
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="apiClient"
                    checked={projectConfig.features.apiClient}
                    onChange={() => handleFeatureToggle('apiClient')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="apiClient" className="ml-2 block text-sm text-gray-700">
                    API Client
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="tenantConfig"
                    checked={projectConfig.features.tenantConfig}
                    onChange={() => handleFeatureToggle('tenantConfig')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="tenantConfig" className="ml-2 block text-sm text-gray-700">
                    Tenant Configuration
                  </label>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <h3 className="text-sm font-medium text-blue-800 mb-2">About the Project Structure</h3>
              <p className="text-xs text-blue-700">
                This generator will create a React project with Vite and a standardized folder structure including:
              </p>
              <ul className="text-xs text-blue-700 list-disc pl-4 mt-1 space-y-1">
                <li>Config (environment, languages)</li>
                <li>API clients</li>
                <li>Components and Pages</li>
                <li>Features with modular structure</li>
                <li>Routes and Utilities</li>
                <li>Assets organization</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${isFormValid ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;