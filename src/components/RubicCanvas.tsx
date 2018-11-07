import * as React from 'react';
import { TopState } from 'src/cube/State';
import { colorSchemes, ColorScheme, Color } from 'src/cube/ColorScheme';
import { randomInt } from 'src/utils/math';

interface IProps {
    cubeLength: number;
    pllIndex: number;
}

interface IState {
    pllIndex: number;
}

interface Point {
    x: number;
    y: number;
}

type Vectors = Point[];

const sideFace = ['l', 'b', 'r', 'f', 'l', 'b', 'r', 'f'];

const getRandSide = (): string[] => {
    const start = randomInt(0, 4);
    return sideFace.slice(start, start + 4);
}

export class RubicCanvas extends React.Component<IProps, IState> {
    private canvasRef: React.RefObject<HTMLCanvasElement>;
    private ctx: CanvasRenderingContext2D | null;
    private cubeState: TopState;
    private colorScheme: ColorScheme;
    private canvasWidth: number;
    private canvasHeight: number;
    private topSideFace: string[];
    private bottomSideFace: string[];

    constructor(props: IProps) {
        super(props);
        this.canvasRef = React.createRef();
        this.cubeState = new TopState();
        this.colorScheme = colorSchemes[0];
        this.canvasHeight = props.cubeLength * 2 + 20;
        this.canvasWidth = props.cubeLength * Math.sqrt(3) + 20;
        this.topSideFace = sideFace.slice(0, 4);
        this.bottomSideFace = sideFace.slice(0, 4);
        this.state = {
            pllIndex: 0
        };
    }

    componentDidMount() {
        if (this.canvasRef.current) {
            this.ctx = this.canvasRef.current.getContext('2d');
            if (this.ctx) {
                this.cubeState.setPLLState(this.props.pllIndex);
                this.drawCube();
            }
        }
    }

    componentDidUpdate() {
        if (this.ctx) {
            this.cubeState.setPLLState(this.props.pllIndex);
            this.drawCube();
        }
    }

    drawCube = (): void => {
        
        if (this.ctx) {
            this.ctx.save();
            const { cubeState } = this;
            const { cubeLength } = this.props;
            this.colorScheme = colorSchemes[randomInt(0, 6)];
            this.topSideFace = getRandSide();
            this.bottomSideFace = getRandSide();
            let colorMatrix = [];
            const { colorScheme } = this;
            const edges = cubeState.getEdges();
            const cornors = cubeState.getCornors();
            const sqrt3 = Math.sqrt(3);
            const center: Point = {
                x: this.canvasWidth / 2,
                y: this.canvasHeight / 4
            };
            const diamondWidth = cubeLength * sqrt3;
            const diamondHeight = cubeLength;
            let vectors: Vectors = [{
                x: sqrt3 / 2,
                y: -1 / 2,
            }, {
                x: sqrt3 / 2,
                y: 1 / 2,
            }];
            for (let i = 0; i < 3; i++) {
                colorMatrix.push([colorScheme.u, colorScheme.u, colorScheme.u]);
            }
            this.drawSurface(center, vectors, diamondWidth, diamondHeight, colorMatrix);

            center.x -= cubeLength * sqrt3 / 4;
            center.y += cubeLength * 3 / 4;
            vectors = [{
                x: sqrt3 / 2,
                y: 1 / 2,
            }, {
                x: 0,
                y: 1,
            }];
            colorMatrix = [];
            const frontColor = colorScheme[this.bottomSideFace[1]];
            const rightColor = colorScheme[this.bottomSideFace[0]];
            colorMatrix.push([this.getCornorColor(cornors[3], 0), frontColor, frontColor]);
            colorMatrix.push([this.getEdgeColor(edges[2]), frontColor, frontColor]);
            colorMatrix.push([this.getCornorColor(cornors[2], 1), frontColor, frontColor]);
            this.drawSurface(center, vectors, diamondWidth, diamondHeight, colorMatrix, 60);

            center.x += cubeLength * sqrt3 / 2;
            vectors = [{
                x: sqrt3 / 2,
                y: -1 / 2,
            }, {
                x: 0,
                y: 1
            }];
            colorMatrix = [];
            colorMatrix.push([this.getCornorColor(cornors[2], 0), rightColor, rightColor]);
            colorMatrix.push([this.getEdgeColor(edges[1]), rightColor, rightColor]);
            colorMatrix.push([this.getCornorColor(cornors[1], 1), rightColor, rightColor]);
            this.drawSurface(center, vectors, diamondWidth, diamondHeight, colorMatrix, -60);

            this.ctx.restore();
        }
    }

    getCornorColor = (cornor: number, orientation: number): Color => {
        return this.colorScheme[this.topSideFace[(cornor + orientation) % 4]];
    }

    getEdgeColor = (edge: number): Color => {
        return this.colorScheme[this.topSideFace[(edge + 1) % 4]];
    }
    
    drawSurface = (center: Point, vectors: Vectors, width: number, height: number, colorMatrix: string[][], rotateAngle: number = 0): void => {
        const gridWidth = width / 3;
        const gridHeight = height / 3;
        const gridcubeLength = this.props.cubeLength / 3;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const gridCenter: Point = {
                    x: center.x + vectors[0].x * i * gridcubeLength + vectors[1].x * j * gridcubeLength,
                    y: center.y + vectors[0].y * i * gridcubeLength + vectors[1].y * j * gridcubeLength,
                };
                this.drawDiamond(gridCenter, gridWidth, gridHeight, colorMatrix[i+1][j+1], rotateAngle);
            }
        }        
    }
 
    drawDiamond = (center: Point, width: number, height: number, color: string, rotateAngle: number = 0): void => {
        if (this.ctx) {
            this.ctx.save();

            this.ctx.strokeStyle = '#000000';
            this.ctx.fillStyle = color;
            this.ctx.lineWidth = 6;
            this.ctx.lineJoin = 'round';
            this.ctx.translate(center.x, center.y);
            this.ctx.rotate(rotateAngle * Math.PI / 180);

            this.ctx.beginPath();
            this.ctx.moveTo(-width / 2, 0);
            this.ctx.lineTo(0, -height / 2);
            this.ctx.lineTo(width / 2, 0);
            this.ctx.lineTo(0, height / 2);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();

            this.ctx.restore();
        }
    }

    render() {
        return (
            <canvas ref={this.canvasRef} width={this.canvasWidth} height={this.canvasHeight} />
        );
    }
}