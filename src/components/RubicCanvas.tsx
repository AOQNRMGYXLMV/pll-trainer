import * as React from 'react';
import { TopState } from 'src/cube/State';
import { colorSchemes, ColorScheme, Color } from 'src/cube/ColorScheme';
import { randomInt } from '../utils/math';

interface IProps {
    canvasWidth: number;
    canvasHeight: number;
}

interface IState {
    pllIndex: number;
}

interface Point {
    x: number;
    y: number;
}

type Vectors = Point[];

const sideFace = ['l', 'b', 'r', 'f'];

export class RubicCanvas extends React.Component<IProps, IState> {
    private borderLength: number;
    private canvasRef: React.RefObject<HTMLCanvasElement>;
    private ctx: CanvasRenderingContext2D | null;
    private cubeState: TopState;
    private colorScheme: ColorScheme;

    constructor(props: IProps) {
        super(props);
        this.canvasRef = React.createRef();
        this.cubeState = new TopState();
        this.colorScheme = colorSchemes[0];
        this.state = {
            pllIndex: 0
        };
    }

    componentDidMount() {
        if (this.canvasRef.current) {
            this.ctx = this.canvasRef.current.getContext('2d');
            if (this.ctx) {
                this.ctx.fillStyle = '#EEEEEE';
                this.ctx.fillRect(0, 0, this.props.canvasWidth, this.props.canvasHeight);
            }
            this.drawCubeBorder();
        }
        this.randomState();

    }

    componentDidUpdate() {
        if (this.ctx) {
            this.ctx.fillStyle = '#EEEEEE';
            this.ctx.fillRect(0, 0, this.props.canvasWidth, this.props.canvasHeight);
        }
        this.drawCubeBorder();
    }

    randomState = (): void => {
        const pllIndex = randomInt(0, 21);
        this.setState({ pllIndex });
        this.cubeState.setPLLState(pllIndex);
    }

    drawCubeBorder = (borderLength: number = 250): void => {
        this.borderLength = borderLength;
        if (this.ctx) {
            this.ctx.save();

            let colorMatrix = [];
            const { colorScheme, cubeState } = this;
            const edges = cubeState.getEdges();
            const cornors = cubeState.getCornors();
            const sqrt3 = Math.sqrt(3);
            const center: Point = {
                x: 250,
                y: 200
            };
            const diamondWidth = borderLength * sqrt3;
            const diamondHeight = borderLength;
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

            center.x -= borderLength * sqrt3 / 4;
            center.y += borderLength * 3 / 4;
            vectors = [{
                x: sqrt3 / 2,
                y: 1 / 2,
            }, {
                x: 0,
                y: 1,
            }];
            colorMatrix = [];
            colorMatrix.push([this.getCornorColor(cornors[3], 0), colorScheme.f, colorScheme.f]);
            colorMatrix.push([this.getEdgeColor(edges[2]), colorScheme.f, colorScheme.f]);
            colorMatrix.push([this.getCornorColor(cornors[2], 1), colorScheme.f, colorScheme.f]);
            this.drawSurface(center, vectors, diamondWidth, diamondHeight, colorMatrix, 60);

            center.x += borderLength * sqrt3 / 2;
            vectors = [{
                x: sqrt3 / 2,
                y: -1 / 2,
            }, {
                x: 0,
                y: 1
            }];
            colorMatrix = [];
            colorMatrix.push([this.getCornorColor(cornors[2], 0), colorScheme.r, colorScheme.r]);
            colorMatrix.push([this.getEdgeColor(edges[1]), colorScheme.r, colorScheme.r]);
            colorMatrix.push([this.getCornorColor(cornors[1], 1), colorScheme.r, colorScheme.r]);
            this.drawSurface(center, vectors, diamondWidth, diamondHeight, colorMatrix, -60);

            this.ctx.restore();
        }
    }

    getCornorColor = (cornor: number, orientation: number): Color => {
        return this.colorScheme[sideFace[(cornor + orientation) % 4]];
    }

    getEdgeColor = (edge: number): Color => {
        return this.colorScheme[sideFace[(edge + 1) % 4]];
    }
    
    drawSurface = (center: Point, vectors: Vectors, width: number, height: number, colorMatrix: string[][], rotateAngle: number = 0): void => {
        const gridWidth = width / 3;
        const gridHeight = height / 3;
        const gridBorderLength = this.borderLength / 3;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const gridCenter: Point = {
                    x: center.x + vectors[0].x * i * gridBorderLength + vectors[1].x * j * gridBorderLength,
                    y: center.y + vectors[0].y * i * gridBorderLength + vectors[1].y * j * gridBorderLength,
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
            this.ctx.lineWidth = 4;
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
        const { canvasWidth, canvasHeight } = this.props;
        return (
            <canvas ref={this.canvasRef} width={canvasWidth} height={canvasHeight} />
        );
    }
}