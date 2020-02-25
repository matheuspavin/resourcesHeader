export class ReplaceTokenType {
    regex: RegExp;
    source: string;
    constructor(source: string, regex: string) {
        this.source = source;
        this.regex = new RegExp(regex, 'mig');
    }
}
