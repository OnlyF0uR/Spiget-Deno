export class Statistics {
    public resourceCount: number;
    public authorCount: number;
    public reviewCount: number;
    public categoryCount: number;
    public resourceUpdateCount: number;
    public resourceVersionCount: number;

    constructor(data: any) {
        this.resourceCount = data.stats.resources;
        this.authorCount = data.stats.authors;
        this.reviewCount = data.stats.reviews;
        this.categoryCount = data.stats.categories;
        this.resourceUpdateCount = data.stats.resource_updates;
        this.resourceVersionCount = data.stats.resource_versions;
    }

    // Might add some useful methods here in the future, that's why I made this class.

}