import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm'; // Pour la prise en charge des tableaux, etc.
import rehypeHighlight from 'rehype-highlight'; // Plugin pour l'affichage des blocs de code avec coloration syntaxique
import 'highlight.js/styles/github.css'; // Thème CSS pour la coloration syntaxique (vous pouvez en choisir un autre)

export function MarkdownViewer() {
    const { page } = useParams<{ page: string }>(); // Récupération du nom de la page dynamique

    const getMarkdownFile = async (pageName: string): Promise<string> => {
        try {
            const response = await fetch(`/markdown/${pageName}.md`);
            if (!response.ok) {
                throw new Error('Fichier Markdown introuvable.');
            }
            return await response.text();
        } catch (error) {
            return '# Erreur :\nFichier introuvable ou une autre erreur est survenue.';
        }
    };

    const [content, setContent] = React.useState<string>('');

    React.useEffect(() => {
        if (page) {
            getMarkdownFile(page).then((data) => setContent(data));
        }
    }, [page]);

    return (
        <main className="container mx-auto px-6 py-12">
            <ReactMarkdown
                children={content}
                remarkPlugins={[remarkGfm]} // Tableaux, liens, syntaxe étendue
                rehypePlugins={[rehypeHighlight]} // Ajout de la coloration syntaxique
                components={{
                    h1: ({ children }) => <h1 className="text-3xl font-bold mt-4 mb-2">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-2xl font-semibold mt-4 mb-2">{children}</h2>,
                    p: ({ children }) => <p className="text-gray-800 leading-relaxed my-2">{children}</p>,
                    pre: ({ children }) => <pre className="bg-gray-100 rounded-lg p-4 overflow-auto">{children}</pre>,
                    code: ({ children, className }) => {
                        const language = className?.replace('language-', '') || '';
                        return (
                            <code className={`language-${language} bg-gray-200 p-1 rounded`}>
                                {children}
                            </code>
                        );
                    },
                }}
            />
        </main>
    );
}