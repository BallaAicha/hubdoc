import clsx from "clsx";
import { Document , Folder } from "../../types";
interface ItemListProps {
    items: (Document | Folder)[];
    handleItemClick: (item: Document | Folder) => void;
    getFileTypeIcon: (item: Document | Folder) => JSX.Element;
    getFileTypeColor: (item: Document | Folder) => string;
}

export default function ItemList({items, handleItemClick, getFileTypeIcon, getFileTypeColor}: ItemListProps) {
    return (
        <div className="divide-y bg-white border rounded-lg shadow">
            {items.map(item => (
                <div key={item.id} className="flex items-center py-3 px-4 hover:bg-gray-50 cursor-pointer"
                     onClick={() => handleItemClick(item)}>
                    <div className="mr-4">{getFileTypeIcon(item)}</div>
                    <div className="flex-1">
                        <h3>{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.description || 'Aucune description'}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">{new Date(item.updatedAt).toLocaleDateString('fr-FR')}</p>
                        <div className={clsx("inline-flex px-2.5 py-0.5 rounded-full text-xs", getFileTypeColor(item))}>
                            {'subFolderIds' in item ? 'Dossier' : 'Document'}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}