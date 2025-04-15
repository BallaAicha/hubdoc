import {useNavigate} from "react-router-dom";
import {ChevronRight, Code} from "lucide-react";

interface ServiceProps {
  id: string | number;
  name: string;
  trigramme: string;
  version?: string;
  description: string;
  criticality: string;
  java17Migrated?: boolean;
  sonarized?: boolean;
}

export function CardAbb({ service }: { service: ServiceProps }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/services/${service.id}`)}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-neutral-100"
        >
            <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                        <Code className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-neutral-800 group-hover:text-indigo-600 transition-colors">
                            {service.name}
                        </h3>
                        <p className="text-sm text-neutral-500 flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {service.trigramme}
              </span>
                            {service.version && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  v{service.version}
                </span>
                            )}
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-neutral-50 group-hover:bg-indigo-50 flex items-center justify-center transition-colors">
                        <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-indigo-600 transition-colors" />
                    </div>
                </div>
                <p className="text-neutral-600 line-clamp-2 mb-3">{service.description}</p>

                <div className="flex items-center gap-3 mt-3">
          <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-md font-medium inline-flex items-center">
            {service.criticality}
          </span>
                    {service.java17Migrated && (
                        <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-md font-medium">
              Java 17
            </span>
                    )}
                    {service.sonarized && (
                        <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md font-medium">
              Sonarized
            </span>
                    )}
                </div>
            </div>
        </div>
    );
}
