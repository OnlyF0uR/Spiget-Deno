import { Author } from './Author.ts';
import { Resource } from './Resource.ts';
import { Spiget } from '../Spiget.ts';

export class Review {

    public id: number;
    public rating: number; // 1 - 5
    public date: Date;
    public version: string;
    public message: string;
    public responseMessage: string | null;

    private readonly authorID: number;
    private readonly resourceID: number | null;

    constructor(data: any) {
        this.id = data.id;
        this.rating = data.rating.average;
        this.date = new Date(data.date * 1000);
        this.version = data.version;
        this.message = atob(data.message);
        this.responseMessage = data.responseMessage == null ? null : atob(data.responseMessage);

        this.authorID = data.author.id;
        this.resourceID = data.resource;
    }

    /**
     * Get the author of a review
     */
    public getAuthor = async (): Promise<Author | null> => {
        return await new Spiget().getAuthor(this.authorID);
    }

    /**
     * Get the resource of the review
     */
    public getResource = async (): Promise<Resource | null> => {
        if (this.resourceID === null) {
            return null;
        }
        return await new Spiget().getResource(this.id);
    }

}