import { Search, Filter, Calendar, Clock, ArrowUpDown, Grid, List, X } from "lucide-react";
import clsx from "clsx";

interface SearchFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    showFilters: boolean;
    setShowFilters: (value: boolean) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
    sortOrder: 'asc' | 'desc';
    setSortOrder: (order: 'asc' | 'desc') => void;
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
}

export default function SearchFilters(props: SearchFiltersProps) {
    return (
        <div className="mb-6">
            <div className="flex items-center">
                <div className="relative flex-1 mr-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={props.searchQuery} onChange={(e) => props.setSearchQuery(e.target.value)} className="pl-10 ..." placeholder="Rechercher..." />
                </div>
                <button className={clsx("p-2 rounded-md", props.showFilters ? "bg-blue-100" : "bg-gray-200")} onClick={() => props.setShowFilters(!props.showFilters)}>
                    <Filter className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-md bg-gray-200 ml-2" onClick={() => props.setSortBy(props.sortBy === 'name' ? 'date' : 'name')}>
                    {props.sortBy === 'name' ? <Calendar /> : <Clock />}
                </button>
                <button className="p-2 rounded-md bg-gray-200 ml-2" onClick={() => props.setSortOrder(props.sortOrder === 'asc' ? 'desc' : 'asc')}>
                    <ArrowUpDown />
                </button>
                <div className="ml-2 flex">
                    <button onClick={() => props.setViewMode('grid')} className={clsx("p-2 rounded-l-md", props.viewMode === 'grid' ? "bg-blue-100" : "bg-gray-200")}><Grid /></button>
                    <button onClick={() => props.setViewMode('list')} className={clsx("p-2 rounded-r-md", props.viewMode === 'list' ? "bg-blue-100" : "bg-gray-200")}><List /></button>
                </div>
            </div>
            {props.showFilters && (<div className="mt-4 p-4 bg-white border rounded-md"><X /></div>)}
        </div>
    );
}