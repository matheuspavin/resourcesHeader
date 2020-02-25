import {ResourceType} from "./types/Resource.type";

export class CrawlerApp {
    constructor() {
    }

    /**
     * fetches the partner resource
     */
    crawl() {
        const resource = new ResourceType('https://www.lexpress.fr/', '<header[\\s\\S]+?</header>', []);
        resource.getPage()
            .then(resource.extractResource.bind(resource))
            .then(resource.extractStyle.bind(resource))
            .then((result) => {
                console.log('Resource:', resource);
            }).catch((err) => {
                console.error('Error:', err);
            });

    }
}

new CrawlerApp().crawl();
