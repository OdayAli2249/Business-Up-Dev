export class Failure {
    object: string[];
    action: string;
    description: string[];
    status: number;
    private linesCounter: number = 1;

    constructor(options: { object: string[], action: string, description: string[], status: number }) {
        this.object = options.object;
        this.action = options.action;
        this.description = options.description;
        this.status = options.status;
    }

    addDescriptionLine(line: string) {
        this.description.push(this.linesCounter++ + "- " + line);
    }

    toString(): string {
        return 'TO DO';
    }

    static buildDefault(): Failure {
        return new Failure({ object: [], action: '', description: [], status: 0 });
    }
}