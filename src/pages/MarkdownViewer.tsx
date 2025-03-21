import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import clsx from 'clsx';
import { AlertCircle, FileQuestion, Loader2, BookOpen, ChevronRight } from 'lucide-react';


export function MarkdownViewer() {
    const { page } = useParams<{ page: string }>();
    const [content, setContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [readingProgress, setReadingProgress] = useState<number>(0);

    useEffect(() => {
        if (page) {
            setIsLoading(true);
            setError(null);

            getMarkdownFile(page)
                .then((data) => {
                    setContent(data);
                    setIsLoading(false);
                })
                .catch(() => {
                    setError('Impossible de charger le contenu');
                    setIsLoading(false);
                });
        }
    }, [page]);

    // Track reading progress
    useEffect(() => {
        const updateReadingProgress = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setReadingProgress(Math.min(100, Math.max(0, progress)));
        };

        window.addEventListener('scroll', updateReadingProgress);
        return () => window.removeEventListener('scroll', updateReadingProgress);
    }, []);

    const getMarkdownFile = async (pageName: string): Promise<string> => {
        try {
            const response = await fetch(`/markdown/${pageName}.md`);
            if (!response.ok) {
                throw new Error('Fichier Markdown introuvable.');
            }
            return await response.text();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return '# Erreur\nFichier introuvable ou une autre erreur est survenue.';
        }
    };

    // Format page title
    const formatPageTitle = (pageTitle: string) => {
        return pageTitle.replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    if (isLoading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-white">
                <div className="flex flex-col items-center p-8 rounded-xl bg-neutral-50 shadow-sm border border-neutral-100">
                    <Loader2 className="h-10 w-10 text-primary-600 animate-spin" />
                    <p className="mt-4 text-neutral-700 font-medium">Chargement du document...</p>
                </div>
            </div>
        );
    }


    return (
        <main className="min-h-screen bg-white relative">
            {/* Reading progress bar */}
            <div
                className="fixed top-0 left-0 z-50 h-1 bg-primary-600 transition-all duration-300 ease-out"
                style={{ width: `${readingProgress}%` }}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Breadcrumb */}
                {page && (
                    <div className="flex items-center text-sm text-neutral-500 mb-6">
                        <BookOpen className="h-4 w-4 mr-2" />
                        <span>Documentation</span>
                        <ChevronRight className="h-3 w-3 mx-2" />
                        <span className="font-medium text-primary-600">
              {formatPageTitle(page)}
            </span>
                    </div>
                )}

                {/* Page header */}
                {page && (
                    <div className="mb-8 pb-4 border-b border-neutral-100">
                        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 capitalize">
                            {formatPageTitle(page)}
                        </h1>
                    </div>
                )}

                {/* Document content */}
                <div className="prose prose-slate max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        components={{
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            h1: ({ node, ...props }) => (
                                <h1
                                    className="text-2xl sm:text-3xl font-bold mt-10 mb-4 text-neutral-800 pb-2 border-b border-neutral-100"
                                    {...props}
                                />
                            ),
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            h2: ({ node, ...props }) => (
                                <h2
                                    className="text-xl sm:text-2xl font-bold mt-8 mb-4 text-neutral-800 group"
                                    {...props}
                                >
                                    <span className="mr-2 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">#</span>
                                    {props.children}
                                </h2>
                            ),
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            h3: ({ node, ...props }) => (
                                <h3
                                    className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-neutral-700"
                                    {...props}
                                />
                            ),
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            p: ({ node, ...props }) => (
                                <p
                                    className="text-neutral-700 leading-relaxed my-4 text-base"
                                    {...props}
                                />
                            ),
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            ul: ({ node, ...props }) => (
                                <ul
                                    className="my-4 pl-6 list-disc space-y-2 text-neutral-700"
                                    {...props}
                                />
                            ),
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            ol: ({ node, ...props }) => (
                                <ol
                                    className="my-4 pl-6 list-decimal space-y-2 text-neutral-700"
                                    {...props}
                                />
                            ),
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            li: ({ node, ...props }) => (
                                <li className="text-neutral-700 py-1" {...props} />
                            ),
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            a: ({ node, ...props }) => (
                                <a
                                    className="text-primary-600 hover:text-primary-800 font-medium transition-colors duration-200 underline decoration-primary-200 underline-offset-2 hover:decoration-primary-500"
                                    {...props}
                                    target={props.href?.startsWith('http') ? '_blank' : undefined}
                                    rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                />
                            ),
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            blockquote: ({ node, ...props }) => (
                                <blockquote
                                    className="border-l-4 border-primary-500 pl-4 py-2 my-6 text-neutral-600 bg-neutral-50 rounded-r"
                                    {...props}
                                />
                            ),
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            pre: ({ node, ...props }) => (
                                <pre
                                    className="bg-neutral-800 text-neutral-100 p-4 my-6 rounded-lg overflow-auto shadow-inner"
                                    {...props}
                                />
                            ),
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            code: ({ node, className, inline, ...props }) => {
                                const match = /language-(\w+)/.exec(className || '');
                                return inline ? (
                                    <code
                                        className="bg-neutral-100 text-primary-700 px-1.5 py-0.5 rounded font-mono text-sm"
                                        {...props}
                                    />
                                ) : (
                                    <code
                                        className={clsx(
                                            match ? `language-${match[1]}` : '',
                                            "text-sm"
                                        )}
                                        {...props}
                                    />
                                );
                            },
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            table: ({ node, ...props }) => (
                                <div className="overflow-x-auto my-8 rounded-lg border border-neutral-200 shadow-sm">
                                    <table
                                        className="min-w-full divide-y divide-neutral-200"
                                        {...props}
                                    />
                                </div>
                            ),
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            thead: ({ node, ...props }) => (
                                <thead className="bg-neutral-50" {...props} />
                            ),
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            th: ({ node, ...props }) => (
                                <th
                                    className="px-6 py-3.5 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider"
                                    {...props}
                                />
                            ),
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            tr: ({ node, ...props }) => (
                                <tr
                                    className="hover:bg-neutral-50 transition-colors duration-150"
                                    {...props}
                                />
                            ),
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            td: ({ node, ...props }) => (
                                <td
                                    className="px-6 py-4 text-sm text-neutral-700 border-t border-neutral-100"
                                    {...props}
                                />
                            ),
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            img: ({ node, ...props }) => (
                                <img
                                    className="max-w-full h-auto rounded-lg shadow-md my-8 border border-neutral-100"
                                    {...props}
                                    loading="lazy"
                                />
                            ),
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            hr: ({ node, ...props }) => (
                                <hr className="my-8 border-neutral-200" {...props} />
                            ),
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>

                {/* Error state */}
                {error && (
                    <div className="mt-8 bg-red-50 border-l-4 border-primary-600 p-5 rounded-md flex items-start gap-4">
                        <AlertCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-neutral-800">Erreur de chargement</h3>
                            <p className="text-neutral-600 mt-1">{error}</p>
                        </div>
                    </div>
                )}

                {/* Empty state */}
                {!content && !isLoading && !error && (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-neutral-50 rounded-xl shadow-inner my-8">
                        <FileQuestion className="h-20 w-20 text-neutral-300 mb-4" />
                        <h3 className="text-xl font-medium text-neutral-700">Aucun contenu disponible</h3>
                        <p className="text-neutral-500 mt-2 max-w-md px-6">
                            Le document demandé est vide ou n'a pas pu être chargé correctement.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}