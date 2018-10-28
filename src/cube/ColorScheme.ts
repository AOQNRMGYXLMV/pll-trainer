enum Color {
    YELLOW = '#FFFF00',
    BLUE = '#0000FF',
    WHITE = '#FFFFFF',
    GREEN = '#008000',
    ORANGE = '#FFA500',
    RED = '#FF0000',
};

interface Colorcheme {
    u: Color;
    l: Color;
    f: Color;
    r: Color;
    b: Color;
    d: Color;
}

const Colorchemes: Colorcheme[] = [{
    u: Color.YELLOW,
    l: Color.BLUE,
    f: Color.RED,
    r: Color.GREEN,
    b: Color.ORANGE,
    d: Color.WHITE,
}]