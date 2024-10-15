export class IndicatorAdapter {
    indicatorid: number;
    name: string;
    type: string;
    goal: number;
    minimum: number;
    maximum: number;
    description: string;

    constructor(indicator: any) {
        ({
            indicatorid: this.indicatorid,
            name: this.name,
            type: this.type,
            goal: this.goal,
            minimum: this.minimum,
            maximum: this.maximum,
            description: this.description,
        } = indicator);
    }
}
