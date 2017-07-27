import ColorData from '../common/ColorData';

export default interface TerrainData {
    icon: string;
    colorFore: ColorData;
    colorBack: ColorData;
    navigable: boolean;
}