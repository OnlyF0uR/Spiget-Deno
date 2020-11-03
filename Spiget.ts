import { Author } from './structures/Author.ts';
import { Category } from './types/Category.ts';
import { Resource } from './structures/Resource.ts';
import { Statistics } from './structures/Statistics.ts';
import { Review } from './structures/Review.ts';

export class Spiget {

    public getAuthor = async (id: number): Promise<Author | null> => {
        const res = await fetch(`https://api.spiget.org/v2/authors/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Spiget-Deno"
            }
        });
        if (res.status !== 200) {
            return null;
        }
        const json = await res.json();
        return new Author(json);
    }

    public getResource = async (id: number): Promise<Resource | null> => {
        const res = await fetch(`https://api.spiget.org/v2/resources/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Spiget-Deno"
            }
        });
        if (res.status !== 200) {
            return null;
        }
        const json = await res.json();
        return new Resource(json);
    }

    public getCategory = async (id: number): Promise<Category | null> => {
        const res = await fetch(`https://api.spiget.org/v2/categories/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Spiget-Deno"
            }
        });
        if (res.status !== 200) {
            return null;
        }
        return await res.json();
    }

    public getReview = async (id: number): Promise<Review | null> => {
        const res = await fetch(`https://api.spiget.org/v2/reviews/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Spiget-Deno"
            }
        });
        if (res.status !== 200) {
            return null;
        }
        const json = await res.json();
        return new Review(json);
    }

    public getStatistics = async (): Promise<Statistics | null> => {
        const res = await fetch('https://api.spiget.org/v2/status', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Spiget-Deno"
            }
        });
        if (res.status !== 200) {
            return null;
        }
        const json = await res.json();

        return new Statistics(json);
    }

}