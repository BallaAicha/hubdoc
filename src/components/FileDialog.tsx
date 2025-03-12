import { Dialog, Transition } from '@headlessui/react';
import { Download, ExternalLink, X } from 'lucide-react';
import React, { Fragment, useState } from 'react';
import { FileItem } from '../types';

interface FileDialogProps {
  file: FileItem;
  isOpen: boolean;
  onClose: () => void;
}

export function FileDialog({ file, isOpen, onClose }: FileDialogProps) {
  const [selectedVersion, setSelectedVersion] = useState<Version | undefined>(
      file.versions?.[0]
  );

  const handleAction = (action: 'download' | 'open') => {
    if (!selectedVersion) return;

    if (action === 'download') {
      window.location.href = selectedVersion.url;
    } else {
      window.open(selectedVersion.url, '_blank');
    }
  };

  return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="div" className="flex items-center justify-between">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      {file.name}
                    </h3>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={onClose}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Title>

                  <div className="mt-4">
                    <label
                        htmlFor="version"
                        className="block text-sm font-medium text-gray-700"
                    >
                      Select Version
                    </label>
                    <select
                        id="version"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        value={selectedVersion?.version}
                        onChange={(e) => {
                          const version = file.versions?.find(
                              (v) => v.version === e.target.value
                          );
                          setSelectedVersion(version);
                        }}
                    >
                      {file.versions?.map((version) => (
                          <option key={version.version} value={version.version}>
                            Version {version.version} ({version.date})
                          </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => handleAction('download')}
                        className="inline-flex items-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </button>
                    <button
                        type="button"
                        onClick={() => handleAction('open')}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open in Browser
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  );
}