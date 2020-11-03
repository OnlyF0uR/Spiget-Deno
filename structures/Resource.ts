import { Spiget } from '../Spiget.ts';
import { Author } from './Author.ts';
import { Category } from '../types/Category.ts';
import { Review } from './Review.ts';

import { ResourcePrice } from '../types/ResourcePrice.ts';
import { ResourceFile } from '../types/ResourceFile.ts';

export class Resource {
    public name: string;
    public tag: string;
    public description: string;
    public likes: number;
    public testedVersions: string[];
    public rating: number;
    public releaseDate: Date;
    public updateDate: Date;
    public downloads: number;
    public price: ResourcePrice;
    public contributors: string;
    public supportedLanguages: string;
    public iconURL: string;
    public donationLink: string | null;
    public sourceCodeLink: string | null;
    public fileData: ResourceFile;

    private readonly reviews: [{ id: number; }]
    private readonly authorID: number;
    private readonly categoryID: number;

    constructor(data: any) {
        this.name = data.name;
        this.tag = data.tag;
        this.description = atob(data.description);
        this.likes = data.likes;
        this.testedVersions = data.testedVersions;
        this.rating = data.rating.average;
        this.releaseDate = new Date(data.releaseDate * 1000);
        this.updateDate = new Date(data.updateDate * 1000);
        this.downloads = data.downloads;
        this.price = {
            amount: data.price,
            currency: data.currency == null ? 'USD' : data.currency
        };
        this.contributors = data.contributors;
        this.supportedLanguages = data.supportedLanguages == null ? 'English' : 'English, ' + data.supportedLanguages;
        this.iconURL = `https://www.spigotmc.org/${data.icon.url}`;
        this.donationLink = data.donationLink; // Can be null
        this.sourceCodeLink = data.sourceCodeLink; // Can be null
        this.fileData = {
            type: data.file.type,
            size: data.file.size,
            sizeUnit: data.file.sizeUnit,
            url: `https://www.spigotmc.org/${data.file.url}`
        }

        this.reviews = data.reviews;
        this.authorID = data.author.id;
        this.categoryID = data.category.id;
    }

    /**
     * Get the other of the resource
     */
    public getAuthor = async (): Promise<Author | null> => {
        return await new Spiget().getAuthor(this.authorID);
    }

    /**
     * Get the category the resource is in
     */
    public getCategory = async (): Promise<Category | null> => {
        return await new Spiget().getCategory(this.categoryID);
    }

    /**
     * Get all reviews of the resource
     */
    public getReviews = async (): Promise<Review[]> => {
        const reviews = [];
        for (const review of this.reviews) {
            const fetchedReview = await new Spiget().getReview(review.id);
            if (fetchedReview === null) { // Security check
                continue;
            }
            reviews.push(fetchedReview);
        }
        return reviews;
    }

}