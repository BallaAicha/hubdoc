import React, { useRef } from 'react';
import { Tag, X, PlusCircle } from 'lucide-react';
import clsx from 'clsx';
import { FormData } from '../../types';

interface TagsSectionProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    currentTag: string;
    setCurrentTag: React.Dispatch<React.SetStateAction<string>>;
}

export function TagsSection({ formData, setFormData, currentTag, setCurrentTag }: TagsSectionProps) {
    const tagInputRef = useRef<HTMLInputElement>(null);

    const addTag = () => {
        if (currentTag.trim()) {
            if (!formData.tags.includes(currentTag.trim())) {
                setFormData((prev) => ({ ...prev, tags: [...prev.tags, currentTag.trim()] }));
            }
            setCurrentTag('');
            tagInputRef.current?.focus();
        }
    };

    const handleTagKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const removeTag = (index: number) => {
        const newTags = formData.tags.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, tags: newTags }));
    };

    return (
        <div className="space-y-1.5">
            <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                <Tag className="w-4 h-4 mr-1.5 text-slate-500" />
                Tags
            </label>
            <div className={clsx(
                "min-h-20 rounded-lg border border-slate-300 p-3 bg-white",
                formData.tags.length > 0 && "pb-2"
            )}>
                <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                        <div
                            key={index}
                            className="inline-flex items-center bg-slate-100 text-slate-700 text-sm rounded-full py-1 pl-3 pr-1.5 border border-slate-200"
                        >
                            <span>{tag}</span>
                            <button
                                type="button"
                                onClick={() => removeTag(index)}
                                className="ml-1 p-0.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex mt-3">
                    <input
                        ref={tagInputRef}
                        type="text"
                        className="flex-1 px-3 py-1.5 bg-white rounded-l-md border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all"
                        placeholder="Ajouter un tag"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                    />
                    <button
                        type="button"
                        onClick={addTag}
                        className="px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-r-md border border-l-0 border-slate-300 transition-colors flex items-center"
                        disabled={!currentTag.trim()}
                    >
                        <PlusCircle className="w-4 h-4" />
                    </button>
                </div>
                {formData.tags.length === 0 && (
                    <p className="text-xs text-slate-500 mt-2">
                        Ajoutez des tags pour faciliter la recherche et le classement
                    </p>
                )}
            </div>
        </div>
    );
}