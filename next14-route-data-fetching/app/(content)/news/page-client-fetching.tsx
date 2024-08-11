"use client"

import NewsList from "@/components/news-list";
import {useEffect, useState} from "react";
import {News} from "@/types";

export default function NewsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);
    const [news, setNews] = useState<News[]>([]);

    useEffect(() => {
        setIsLoading(true);
        async function fetchNews() {
            const response = await fetch('http://localhost:8080/news');
            if (!response.ok) {
                setError('Failed to fetch news');
                setIsLoading(false);
            }
            const news = await response.json();
            setNews(news);
            setIsLoading(false);
        }
        fetchNews();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <>
            <h1>News Page</h1>
            <NewsList news={news} />
        </>
    )
}
