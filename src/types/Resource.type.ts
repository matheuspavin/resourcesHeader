import * as request from 'request';
import {ReplaceTokenType} from "./ReplaceToken.type";


export class ResourceType {
    clientUrl: string;
    resourceRegex: RegExp;
    replaceTokens: ReplaceTokenType[];
    sourceData: string;
    resourceHtml: string;
    resourceStyle: string;

    constructor(url: string, regex: string, tokens: any[]) {
        this.clientUrl = url;
        this.resourceRegex = new RegExp(regex);
        console.log('Resource regex:', this.resourceRegex);
        this.replaceTokens = tokens.map(token => new ReplaceTokenType(token.string, token.regex));
    }

    getPage(): Promise<any> {
        return new Promise((resolve, reject) => {
            const reqObject = {
                method: 'get',
                uri: this.clientUrl
            };
            request(reqObject, (error, response, body) => {
                if (error) {
                    console.log('Error fetching the partner resource:', error);
                    return reject(error);
                }
                if (response.statusCode >= 400) {
                    return reject('Status code not 200 or 300');
                }
                if (!body || body === '') {
                    return reject('Empty response');
                }
                this.sourceData = body;
                resolve(body);
            });
        });
    }
    extractResource(html): Promise<any> {
        const resource = this.resourceRegex.exec(html);
        if (!resource || !Array.isArray(resource) || resource.length < 1) {
            return Promise.reject('No resource data found with the current regex:' + this.resourceRegex);
        }
        this.resourceHtml = resource[0];
        return Promise.resolve(resource[0]);
    }
    _getAllStyleUrls(html): Promise<any> {
        //<link href="https://static.lexpress.fr/min/css/common+6c17b10b31409bbce5a2b0451ef0e6578728d6ffa6a1faf2fcbc5fc7422e8e34.css" rel="stylesheet" type="text/css">
        const stylesheetElements = html.match(/<link.*?rel="stylesheet".*?>/ig);
        const urls = stylesheetElements.map((el) => {
            return el.match(/href=\".+?\"/)[0].replace(/^href=\"(.+?)\"/, '$1');
        });
        return Promise.resolve(urls);
    }
    _getAllStyles(urls) {
        const promises = urls.map((url: string) => {
           return new Promise((resolve, reject) => {
               request(url, (error, response, body) => {
                   if (error) {
                       return reject(error);
                   }
                   if (response.statusCode !== 200) {
                       return reject ('Wrong status code');
                   }
                   resolve(body);
               })
           })
        });
        return Promise.all(promises);
    }
    _extractAllClasses () {
        const clsElements = this.resourceHtml.match(/class=\"(?<classList>[\S]+?)\"/g);
        const classes = clsElements.map((el) => {
            return el.replace(/class=\"(.+?)\"/, '$1').split(' ')
        })
        console.log('classes:', classes);
    }
    extractStyle(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._getAllStyleUrls(this.sourceData)
                .then(this._getAllStyles)
                .then(this._extractAllClasses.bind(this))

        });
    }
}
