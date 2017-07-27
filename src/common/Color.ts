import ColorData from './ColorData';

export default class Color {

    constructor(public r: string, public g: string, public b: string) {
        
    }
    
    public getFull = () => {
        return "#"+this.r+this.g+this.b;
    }

    public static get black(): Color {
        return new Color("0", "0", "0")
    }

    public toColorData = (): ColorData => {
        return {
            r: this.r,
            g: this.g,
            b: this.b
        }
    }

    public static fromColorData = (data: ColorData): Color => {
        return new Color(data.r, data.g, data.b);
    }
}