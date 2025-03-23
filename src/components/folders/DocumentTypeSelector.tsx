
import { CheckCircle2, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import {DOCUMENT_TYPES} from "../../constants/documentTypes.ts";


interface DocumentTypeSelectorProps {
    selectedType: string;
    onTypeSelect: (typeId: string) => void;
    isOpen: boolean;
    onToggle: () => void;
}

export function DocumentTypeSelector({
                                         selectedType,
                                         onTypeSelect,
                                         isOpen,
                                         onToggle
                                     }: DocumentTypeSelectorProps) {
    const selectedTypeInfo = DOCUMENT_TYPES.find(type => type.id === selectedType);
    const TypeIcon = selectedTypeInfo?.icon;

    return (
        <div className="relative">
            <button
                type="button"
                onClick={onToggle}
                className={clsx(
                    "w-full flex items-center justify-between px-4 py-3.5 border border-slate-300 rounded-lg shadow-sm text-left text-base",
                    "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
                    "transition-all duration-200 bg-white hover:bg-slate-50"
                )}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div className="flex items-center">
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-100 text-indigo-600 mr-3">
            {TypeIcon && <TypeIcon className="h-6 w-6" />}
          </span>
                    <div>
                        <span className="block font-medium">{selectedTypeInfo?.name}</span>
                        <span className="block text-sm text-slate-500 mt-0.5">{selectedTypeInfo?.description}</span>
                    </div>
                </div>
                <ChevronDown
                    className={clsx(
                        "h-5 w-5 text-slate-400 transition-transform duration-200",
                        isOpen ? "transform rotate-180" : ""
                    )}
                />
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden transform opacity-0 scale-95 animate-dropdown origin-top">
                    <ul className="py-1 max-h-60 overflow-auto" role="listbox">
                        {DOCUMENT_TYPES.map(type => (
                            <li
                                key={type.id}
                                onClick={() => onTypeSelect(type.id)}
                                className={clsx(
                                    "px-3 py-2.5 flex items-center cursor-pointer hover:bg-slate-50",
                                    selectedType === type.id ? "bg-indigo-50" : ""
                                )}
                                role="option"
                                aria-selected={selectedType === type.id}
                            >
                <span className={clsx(
                    "inline-flex items-center justify-center h-10 w-10 rounded-md mr-3",
                    selectedType === type.id ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-600"
                )}>
                  <type.icon className="h-6 w-6" />
                </span>
                                <div>
                  <span className={clsx(
                      "block font-medium",
                      selectedType === type.id ? "text-indigo-700" : "text-slate-700"
                  )}>
                    {type.name}
                  </span>
                                    <span className="block text-sm text-slate-500 mt-0.5">
                    {type.description}
                  </span>
                                </div>
                                {selectedType === type.id && (
                                    <CheckCircle2 className="ml-auto h-5 w-5 text-indigo-600" />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}