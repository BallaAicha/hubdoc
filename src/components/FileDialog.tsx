import { Dialog, Transition } from '@headlessui/react';
import {
  Download,
  ExternalLink,
  X,
  Clock,
  FileText,
  ChevronDown,
  Info,
  History,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  File,
} from 'lucide-react';
import  { Fragment, useState } from 'react';
import { FileItem } from '../test.ts';
import clsx from 'clsx';

interface FileDialogProps {
  file: FileItem;
  isOpen: boolean;
  onClose: () => void;
}

interface Version {
  version: string;
  date: string;
  url: string;
}

export function FileDialog({ file, isOpen, onClose }: FileDialogProps) {
  const [selectedVersion, setSelectedVersion] = useState<Version | undefined>(
      file.versions?.[0]
  );
  const [showVersions, setShowVersions] = useState(false);

  const handleAction = (action: 'download' | 'open') => {
    if (!selectedVersion) return;

    if (action === 'download') {
      window.location.href = selectedVersion.url;
    } else {
      window.open(selectedVersion.url, '_blank');
    }
  };

  // Fonction pour obtenir l'icône basée sur le type de fichier
  const getFileIcon = (type: string) => {
    switch(type) {
      case 'doc':
      case 'docx': return <FileText className="h-7 w-7" />;
      case 'xls':
      case 'xlsx': return <FileSpreadsheet className="h-7 w-7" />;
      case 'ppt':
      case 'jpg':
      case 'jpeg':
      case 'png': return <FileImage className="h-7 w-7" />;
      case 'zip':
      case 'rar': return <FileArchive className="h-7 w-7" />;
      default: return <File className="h-7 w-7" />;
    }
  };

  // Fonction pour obtenir une couleur basée sur le type de fichier
  const getFileTypeColor = (type: string) => {
    switch(type) {
      case 'pdf': return 'bg-[#ffe4e4] text-[#b91c1c]';
      case 'doc':
      case 'docx': return 'bg-[#e0eaff] text-[#3b82f6]';
      case 'xls':
      case 'xlsx': return 'bg-[#dcfce7] text-[#10b981]';
      case 'ppt':
      case 'pptx': return 'bg-[#fff1e6] text-[#f97316]';
      case 'jpg':
      case 'jpeg':
      case 'png': return 'bg-[#f3e8ff] text-[#8b5cf6]';
      case 'zip':
      case 'rar': return 'bg-[#f3f4f6] text-[#6b7280]';
      default: return 'bg-[#f3f4f6] text-[#6b7280]';
    }
  };

  // Format de date plus lisible
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={onClose}>
          <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 md:p-6 text-center">
              <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md md:max-w-lg transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-2xl transition-all">
                  {/* En-tête */}
                  <div className="relative overflow-hidden">
                    {/* Background pattern for header */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f9fafb] to-[#f3f4f6] opacity-50"></div>

                    <div className="relative px-6 py-5 border-b border-[#e5e7eb]">
                      <Dialog.Title as="div" className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={clsx('p-3 rounded-xl', getFileTypeColor(file.type))}>
                            {getFileIcon(file.type)}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-[#111827] line-clamp-1">
                              {file.name}
                            </h3>
                            <p className="text-sm text-[#6b7280] flex items-center gap-2 mt-0.5">
                              <span className="uppercase font-medium">{file.type}</span>
                              <span className="inline-block h-1 w-1 rounded-full bg-[#d1d5db]"></span>

                                <span>{file.size}</span>
                            </p>
                          </div>
                        </div>
                        <button
                            type="button"
                            className="text-[#6b7280] hover:text-[#111827] rounded-full p-1.5 hover:bg-[#f3f4f6] transition-colors"
                            onClick={onClose}
                            aria-label="Fermer"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </Dialog.Title>
                    </div>
                  </div>

                  {/* Contenu principal */}
                  <div className="p-6">
                    {/* Section information */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 text-[#111827] font-medium mb-3">
                        <Info className="h-4 w-4" />
                        <span>Informations</span>
                      </div>
                      <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-lg p-4">
                        <p className="text-sm text-[#4b5563] leading-relaxed">
                          {file.description || "Aucune description disponible pour ce document."}
                        </p>

                        {/* Métadonnées additionnelles */}
                        <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-[#e5e7eb]">
                          <div>
                            <p className="text-xs text-[#6b7280] mb-1">Créé le</p>
                            <p className="text-sm font-medium text-[#111827]">{formatDate(file.createdAt)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#6b7280] mb-1">Modifié le</p>
                            <p className="text-sm font-medium text-[#111827]">{formatDate(file.updatedAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section versions */}
                    <div>
                      <div className="flex items-center gap-2 justify-between mb-3">
                        <div className="flex items-center gap-2 text-[#111827] font-medium">
                          <History className="h-4 w-4" />
                          <span>Historique des versions</span>
                        </div>
                        {file.versions && file.versions.length > 1 && (
                            <button
                                onClick={() => setShowVersions(!showVersions)}
                                className="text-sm text-[#3b82f6] hover:text-[#1d4ed8] flex items-center transition-colors"
                            >
                              {showVersions ? "Masquer" : "Voir tout"}
                              <ChevronDown className={clsx(
                                  "ml-1 h-4 w-4 transition-transform",
                                  showVersions && "transform rotate-180"
                              )} />
                            </button>
                        )}
                      </div>

                      <div className="rounded-lg border border-[#e5e7eb] overflow-hidden shadow-sm">
                        <div
                            className="p-4 flex justify-between items-center cursor-pointer bg-white hover:bg-[#f9fafb] transition-colors"
                            onClick={() => setSelectedVersion(file.versions?.[0])}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={clsx(
                                "h-3.5 w-3.5 rounded-full flex-shrink-0 border-2",
                                selectedVersion?.version === file.versions?.[0]?.version
                                    ? "bg-[#10b981] border-[#10b981]"
                                    : "bg-white border-[#d1d5db]"
                            )}></div>
                            <div>
                              <div className="text-sm font-medium text-[#111827]">
                                Version {file.versions?.[0]?.version || "N/A"}
                                <span className="ml-2 text-xs font-medium text-[#10b981] uppercase bg-[#dcfce7] px-2 py-0.5 rounded-full">Actuelle</span>
                              </div>
                              <div className="text-xs text-[#6b7280] flex items-center mt-0.5">
                                <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                                {file.versions?.[0]?.date ? formatDate(file.versions?.[0]?.date) : "N/A"}
                              </div>
                            </div>
                          </div>
                        </div>

                        {showVersions && file.versions && file.versions.slice(1).map((version) => (
                            <div
                                key={version.version}
                                className={clsx(
                                    "p-4 flex justify-between items-center cursor-pointer bg-white hover:bg-[#f9fafb] border-t border-[#e5e7eb] transition-colors"
                                )}
                                onClick={() => setSelectedVersion(version)}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={clsx(
                                    "h-3.5 w-3.5 rounded-full flex-shrink-0 border-2",
                                    selectedVersion?.version === version.version
                                        ? "bg-[#10b981] border-[#10b981]"
                                        : "bg-white border-[#d1d5db]"
                                )}></div>
                                <div>
                                  <div className="text-sm font-medium text-[#111827]">
                                    Version {version.version}
                                  </div>
                                  <div className="text-xs text-[#6b7280] flex items-center mt-0.5">
                                    <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                                    {formatDate(version.date)}
                                  </div>
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer avec boutons d'action */}
                  <div className="bg-[#f9fafb] px-6 py-4 border-t border-[#e5e7eb] flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => handleAction('open')}
                        className="inline-flex items-center justify-center rounded-lg border border-[#d1d5db] bg-white px-4 py-2.5 text-sm font-medium text-[#4b5563] hover:bg-[#f9fafb] hover:text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2 transition-colors shadow-sm"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ouvrir
                    </button>
                    <button
                        type="button"
                        onClick={() => handleAction('download')}
                        className="inline-flex items-center justify-center rounded-lg border border-transparent bg-[#b91c1c] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#991b1b] focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:ring-offset-2 transition-colors shadow-sm"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger
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