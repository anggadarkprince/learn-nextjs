import sql from "better-sqlite3";
import {DUMMY_NEWS} from '@/dummy-news';
import {News} from "@/types";

const db = sql('data.db');

export async function getAllNews() {
    const news = db.prepare<unknown[], News>('SELECT * FROM news').all();
    await new Promise(resolve => setTimeout(resolve, 2000));
    return news;
}

export function getLatestNews() {
    return DUMMY_NEWS.slice(0, 3);
}

export function getAvailableNewsYears() {
    return DUMMY_NEWS.reduce((years: number[], news) => {
        const year = new Date(news.date).getFullYear();
        if (!years.includes(year)) {
            years.push(year);
        }
        return years;
    }, []).sort((a, b) => b - a);
}

export function getAvailableNewsMonths(year: number) {
    return DUMMY_NEWS.reduce((months: number[], news) => {
        const newsYear = new Date(news.date).getFullYear();
        if (newsYear === +year) {
            const month = new Date(news.date).getMonth();
            if (!months.includes(month)) {
                months.push(month + 1);
            }
        }
        return months;
    }, []).sort((a, b) => b - a);
}

export function getNewsForYear(year: number) {
    return DUMMY_NEWS.filter(
        (news) => new Date(news.date).getFullYear() === +year
    );
}

export function getNewsForYearAndMonth(year: number, month: number) {
    return DUMMY_NEWS.filter((news) => {
        const newsYear = new Date(news.date).getFullYear();
        const newsMonth = new Date(news.date).getMonth() + 1;
        return newsYear === +year && newsMonth === +month;
    });
}