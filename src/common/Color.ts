export default class Color {

    constructor(public r: string, public g: string, public b: string) {
        
    }
    
    public getFull = () => {
        return "#"+this.r+this.g+this.b;
    }

    public static get black(): Color {
        return new Color("0", "0", "0")
    }
}