// import clsx from "clsx";
//
// import { Document , Folder } from "../../types";
// interface ItemGridProps {
//     items: (Document | Folder)[];
//     handleItemClick: (item: Document | Folder) => void;
//     getFileTypeIcon: (item: Document | Folder) => JSX.Element;
//     getFileTypeColor: (item: Document | Folder) => string;
// }
//
// export default function ItemGrid({items, handleItemClick, getFileTypeIcon, getFileTypeColor}: ItemGridProps) {
//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {items.map(item => (
//                 <div key={item.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer"
//                      onClick={() => handleItemClick(item)}>
//                     <div className="flex justify-center mb-4">{getFileTypeIcon(item)}</div>
//                     <h3 className="font-medium text-gray-900 truncate text-center">{item.name}</h3>
//                     <p className="text-center text-sm text-gray-500 my-2">{new Date(item.updatedAt).toLocaleDateString('fr-FR')}</p>
//                     <span className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs", getFileTypeColor(item))}>
//                         {'subFolderIds' in item ? "Dossier" : "Document"}
//                     </span>
//                 </div>
//             ))}
//         </div>
//     )
// }
import clsx from "clsx";
import { Document, Folder } from "../../types";

interface ItemGridProps {
    items: (Document | Folder)[];
    handleItemClick: (item: Document | Folder) => void;
    getFileTypeIcon: (item: Document | Folder) => JSX.Element;
    getFileTypeColor: (item: Document | Folder) => string;
}

export default function ItemGrid({items, handleItemClick, getFileTypeIcon, getFileTypeColor}: ItemGridProps) {
    // Filtrer les items pour n'afficher que les documents principaux (sans parentDocumentId)
    // ou les dossiers
    const filteredItems = items.filter(item => {
        // Si c'est un dossier, on le garde
        if ('subFolderIds' in item) {
            return true;
        }

        // Si c'est un document sans parentDocumentId ou avec la version la plus récente, on le garde
        return !item.parentDocumentId;
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer"
                     onClick={() => handleItemClick(item)}>
                    <div className="flex justify-center mb-4">{getFileTypeIcon(item)}</div>
                    <h3 className="font-medium text-gray-900 truncate text-center">{item.name}</h3>
                    <p className="text-center text-sm text-gray-500 my-2">{new Date(item.updatedAt).toLocaleDateString('fr-FR')}</p>
                    <span className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs", getFileTypeColor(item))}>
                        {'subFolderIds' in item ? "Dossier" : "Document"}
                    </span>
                    {/* Indicateur optionnel si le document a des versions */}
                    {!('subFolderIds' in item) && item.hasVersions && (
                        <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                            {item.versionsCount || ''}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}