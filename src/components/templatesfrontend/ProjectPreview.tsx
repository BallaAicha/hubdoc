

import React, { useMemo } from 'react';

import FolderTreeView from './FolderTreeView';
import {FolderStructure, ProjectConfig} from "../../types/types.ts";

interface ProjectPreviewProps {
  projectConfig: ProjectConfig;
  onBack: () => void;
  onNext: () => void;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ projectConfig, onBack, onNext }) => {
  const projectStructure = useMemo(() => {
    return generateProjectStructure(projectConfig);
  }, [projectConfig]);

  return (
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Project Preview</h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-3">Project Structure</h3>
              <div className="border border-gray-200 rounded-md p-4 h-96 overflow-auto bg-gray-50">
                <FolderTreeView structure={projectStructure} />
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium text-gray-700 mb-3">Configuration Summary</h3>
              <div className="border border-gray-200 rounded-md p-4 bg-white">
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Project Name</dt>
                    <dd className="text-sm text-gray-900">{projectConfig.projectName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                    <dd className="text-sm text-gray-900">{projectConfig.description || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Version</dt>
                    <dd className="text-sm text-gray-900">{projectConfig.version}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Language</dt>
                    <dd className="text-sm text-gray-900 capitalize">{projectConfig.language}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Features</dt>
                    <dd className="text-sm text-gray-900">
                      <ul className="list-disc pl-5 space-y-1">
                        {projectConfig.features.routing && <li>Routing</li>}
                        {projectConfig.features.i18n && <li>Internationalization</li>}
                        {projectConfig.features.apiClient && <li>API Client</li>}
                        {projectConfig.features.tenantConfig && <li>Tenant Configuration</li>}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-md font-medium text-gray-700 mb-2">Installation Commands</h3>
            <div className="bg-gray-900 rounded-md p-3 text-white font-mono text-sm overflow-x-auto">
              <p className="mb-1">npx create-vite {projectConfig.projectName} --template {projectConfig.language === 'typescript' ? 'react-ts' : 'react'}</p>
              <p className="mb-1">cd {projectConfig.projectName}</p>
              <p>npm install</p>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Back
            </button>
            <button
                type="button"
                onClick={onNext}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Generate Project
            </button>
          </div>
        </div>
      </div>
  );
};

// 🔁 Mise à jour de la génération de structure
const generateProjectStructure = (config: ProjectConfig): FolderStructure => {
  const ext = config.language === 'typescript' ? 'tsx' : 'jsx';

  const structure: FolderStructure = {
    name: config.projectName,
    type: 'folder',
    children: [
      {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'assets',
            type: 'folder',
            children: [
              { name: 'images', type: 'folder' },
              { name: 'css', type: 'folder' }
            ]
          },
          {
            name: 'pages',
            type: 'folder',
            children: [
              {
                name: 'components',
                type: 'folder',
                children: [
                  { name: `button.${ext}`, type: 'file' },
                  { name: `layout.${ext}`, type: 'file' }
                ]
              }
            ]
          },
          {
            name: 'config',
            type: 'folder',
            children: [
              {
                name: 'environment',
                type: 'folder',
                children: [
                  { name: 'env.tsx', type: 'file' }
                ]
              }
            ]
          },
          {
            name: 'routes',
            type: 'folder',
            children: [
              { name: `navigation.${ext}`, type: 'file' },
              { name: `routes.${ext}`, type: 'file' }
            ]
          },
          {
            name: 'packages',
            type: 'folder',
            children: [
              {
                name: 'core',
                type: 'folder',
                children: [
                  {
                    name: 'feat-login',
                    type: 'folder',
                    children: [
                      { name: 'components', type: 'folder' },
                      { name: 'core', type: 'folder' },
                      { name: 'web', type: 'folder' }
                    ]
                  }
                ]
              }
            ]
          },
          { name: 'utils.ts', type: 'file' }
        ]
      },
      { name: 'index.html', type: 'file' },
      { name: 'package.json', type: 'file' },
      { name: 'README.md', type: 'file' },
      { name: config.language === 'typescript' ? 'tsconfig.json' : 'jsconfig.json', type: 'file' },
      { name: `vite.config.${config.language === 'typescript' ? 'ts' : 'js'}`, type: 'file' }
    ]
  };

  if (config.features.apiClient) {
    structure.children![0].children!.push({
      name: 'apisClient',
      type: 'folder',
      children: [
        { name: `index.${config.language === 'typescript' ? 'ts' : 'js'}`, type: 'file' }
      ]
    });
  }

  if (config.features.i18n) {
    const configFolder = structure.children![0].children!.find(child => child.name === 'config');
    configFolder?.children!.push({
      name: 'languages',
      type: 'folder',
      children: [
        { name: 'en.json', type: 'file' },
        { name: 'fr.json', type: 'file' }
      ]
    });
  }

  if (config.features.tenantConfig) {
    const configFolder = structure.children![0].children!.find(child => child.name === 'config');
    configFolder?.children!.push({
      name: 'tenantConfig',
      type: 'folder',
      children: [
        { name: `tenantConfig.${ext}`, type: 'file' }
      ]
    });
  }

  return structure;
};

export default ProjectPreview;
