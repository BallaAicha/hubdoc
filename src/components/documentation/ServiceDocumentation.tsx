

import { Check, X } from 'lucide-react';
import {APIService} from "../../types/api.ts";

interface ServiceDocumentationProps {
  service: APIService;
}

export function ServiceDocumentation({ service }: ServiceDocumentationProps) {
  return (
    <div className="space-y-8">
      {/* Service Header */}
      <div className="border-b border-neutral-200 pb-6">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">{service.name}</h1>
        <p className="text-neutral-600">{service.description}</p>
      </div>

      {/* Infrastructure Section */}
      <div>
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">Infrastructure</h2>
        <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Environment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">URL</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {Object.entries(service.infrastructure).map(([env, url]) => (
                <tr key={env}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                    {env.replace('url_', '').toUpperCase()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                    <code className="bg-neutral-100 px-2 py-1 rounded">{url}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Consumers Section */}
      <div>
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">Client Consumers</h2>
        <div className="flex flex-wrap gap-2">
          {service.clientConsumers.map((client) => (
            <span key={client} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              {client}
            </span>
          ))}
        </div>
      </div>

      {/* Data Sources Section */}
      <div>
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">Data Sources</h2>
        <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {Object.entries(service.dataSources).map(([source, isUsed]) => (
                <tr key={source}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                    {source.replace(/([A-Z])/g, ' $1').trim()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isUsed ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Service Dependencies Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Consumes</h2>
          <ul className="space-y-2">
            {service.consumes.map((dependency) => (
              <li key={dependency} className="flex items-center space-x-2 text-neutral-700">
                <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                <span>{dependency}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Consumed By</h2>
          <ul className="space-y-2">
            {service.consumedBy.map((consumer) => (
              <li key={consumer} className="flex items-center space-x-2 text-neutral-700">
                <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                <span>{consumer}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Endpoints Section */}
      <div>
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">Endpoints</h2>
        <div className="space-y-6">
          {service.endpoints.map((endpoint, index) => (
            <div key={index} className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono">{endpoint.path}</code>
                </div>
              </div>
              <div className="px-6 py-4">
                <p className="text-neutral-600 mb-4">{endpoint.description}</p>
                <div className="bg-neutral-900 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-neutral-400">Example Request</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(endpoint.curl)}
                      className="text-xs text-neutral-400 hover:text-neutral-300"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="text-neutral-100 text-sm font-mono overflow-x-auto">
                    {endpoint.curl}
                  </pre>
                </div>
                <div className="mt-4 bg-neutral-900 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-neutral-400">Expected Response</span>
                  </div>
                  <pre className="text-neutral-100 text-sm font-mono overflow-x-auto">
                    {endpoint.expectedResponse}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Database Schema Section */}
      {service.databaseSchema && (
        <div>
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Database Schema</h2>
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <img
              src={service.databaseSchema}
              alt="Database Schema"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}