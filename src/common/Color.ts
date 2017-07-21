export default class Color {

    constructor(public r: string, public g: string, public b: string) {
        
    }
    
    public getFull = () => {
        return "#"+this.r+this.g+this.b;
    }
}