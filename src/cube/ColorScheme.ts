export enum Color {
    YELLOW = '#FFFF00',
    BLUE = '#0000FF',
    WHITE = '#FFFFFF',
    GREEN = '#008000',
    ORANGE = '#FFA500',
    RED = '#FF0000',
};

export interface ColorScheme {
    u: Color;
    l: Color;
    f: Color;
    r: Color;
    b: Color;
    d: Color;
}

export const colorSchemes: ColorScheme[] = [{
    u: Color.YELLOW,
    l: Color.BLUE,
    f: Color.RED,
    r: Color.GREEN,
    b: Color.ORANGE,
    d: Color.WHITE,
}, {
    u: Color.WHITE,
    l: Color.ORANGE,
    f: Color.GREEN,
    r: Color.RED,
    b: Color.BLUE,
    d: Color.YELLOW,
}, {
    u: Color.RED,
    l: Color.WHITE,
    f: Color.GREEN,
    r: Color.YELLOW,
    b: Color.BLUE,
    d: Color.ORANGE,
}, {
    u: Color.ORANGE,
    l: Color.WHITE,
    f: Color.BLUE,
    r: Color.YELLOW,
    b: Color.GREEN,
    d: Color.RED
}, {
    u: Color.BLUE,
    l: Color.WHITE,
    f: Color.RED,
    r: Color.YELLOW,
    b: Color.ORANGE,
    d: Color.GREEN
}, {
    u: Color.GREEN,
    l: Color.WHITE,
    f: Color.ORANGE,
    r: Color.YELLOW,
    b: Color.RED,
    d: Color.BLUE
}];