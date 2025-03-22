import React from 'react';
import {ChevronRight, ArrowLeft} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Breadcrumb {
    id: number | string;
    name: string;
}

interface BreadcrumbsProps {
    breadcrumbs: Breadcrumb[];
    navigateBack: () => void;
}

export default function Breadcrumbs({ breadcrumbs, navigateBack }: BreadcrumbsProps) {
    const navigate = useNavigate();

    return (
        <div className="mb-4 flex items-center">
            {breadcrumbs.length > 1 && (
                <button onClick={navigateBack} className="mr-2 p-1 rounded-full hover:bg-gray-200">
                    <ArrowLeft className="h-5 w-5"/>
                </button>
            )}
            <div className="flex items-center text-sm">
                {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.id}>
                        <button onClick={() => navigate(crumb.id === 'root' ? '/documents' : `/documents/${crumb.id}`)}
                                className="hover:text-blue-600">
                            {crumb.name}
                        </button>
                        {index < breadcrumbs.length - 1 && (<ChevronRight className="h-4 w-4 mx-1"/>)}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}