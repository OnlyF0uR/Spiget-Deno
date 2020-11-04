# Spiget-Deno
Simple Spiget API wrapper for Deno

### Example
```ts
import { Spiget } from 'https://deno.land/x/spiget_deno@v1.0.0/mod.ts';

const example_user_id = 12345; // Change this

const spiget = new Spiget();
const author = await spiget.getAuthor(example_user_id);

if (author == null) {
    console.log('Couldn\'t find an author with that id.');
} else {
    console.log(`Username: ${author.username}`);
    // etc.

    const resources = await author.getResources();
    if (!resources.length) {
        console.log('This user doesn\'t have any resources.');
    } else {
        const resource = resources[0];

        console.log(`Resource Name: ${resource.name}`);
        console.log(`Tag: ${resource.tag}`);
        console.log(`Likes: ${resource.likes}`);
        console.log(`Downloads: ${resource.downloads}`);
        // etc.

        const reviews = await resource.getReviews();
        if (!reviews.length) {
            console.log('This resource doesn\'t have any reviews.');
        } else {
            const review = reviews[0];

            console.log(`Rating: ${resource.downloads}/5`);
            console.log(`Date: ${review.date.toLocaleString()}`);
            // etc.
        }
    }
}
```