import { Spiget } from '../Spiget.ts';
import { Review } from './Review.ts';
import { Resource } from './Resource.ts';

export class Author {
    public username: string;
    public id: number;
    public avatarURL: string;

    constructor(data: any) {
        this.username = data.name;
        this.id = data.id;
        this.avatarURL = `https://www.spigotmc.org/${data.icon.url}`;
    }

    /**
     * Get all resources the user owns
     */
    public getResources = async (): Promise<Resource[]> => {
        const res = await fetch(`https://api.spiget.org/v2/authors/${this.id}/resources`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (res.status !== 200) {
            return [];
        }
        const resources = [];
        for (const resource of await res.json()) {
            // The reason we're doing this is because Author --> Resource doesn't give the same data as Resources --> Resource
            const fetchedResource = await new Spiget().getResource(resource.id);
            if (fetchedResource === null) { // Security check
                continue;
            }
            resources.push(fetchedResource);
        }
        return resources;
    }

    /**
     * Get all reviews the user posted
     */
    public getReviews = async (): Promise<Review[]> => {
        const res = await fetch(`https://api.spiget.org/v2/authors/${this.id}/reviews`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (res.status !== 200) {
            return [];
        }
        const reviews = [];
        for (const review of await res.json()) {
            const fetchedReview = await new Spiget().getReview(review.id);
            if (fetchedReview === null) { // Security check
                continue;
            }
            reviews.push(fetchedReview);
        }
        return reviews;
    }

}