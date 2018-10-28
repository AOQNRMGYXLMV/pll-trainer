import * as React from 'react';

interface Props {
    canvasWidth: number;
    canvasHeight: number;
}

interface Point {
    x: number;
    y: number;
}

type Vectors = Point[];

export class RubicCanvas extends React.Component<Props, object> {
    private borderLength: number;
    private canvasRef: React.RefObject<HTMLCanvasElement>;
    private ctx: CanvasRenderingContext2D | null;

    constructor(props: Props) {
        super(props);
        this.canvasRef = React.createRef();
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

    }

    drawCubeBorder = (borderLength: number = 250): void => {
        this.borderLength = borderLength;
        if (this.ctx) {
            this.ctx.save();

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
            this.drawSurface(center, vectors, diamondWidth, diamondHeight);

            center.x -= borderLength * sqrt3 / 4;
            center.y += borderLength * 3 / 4;
            vectors = [{
                x: sqrt3 / 2,
                y: 1 / 2,
            }, {
                x: 0,
                y: 1,
            }]
            this.drawSurface(center, vectors, diamondWidth, diamondHeight, 60);

            center.x += borderLength * sqrt3 / 2;
            vectors = [{
                x: sqrt3 / 2,
                y: -1 / 2,
            }, {
                x: 0,
                y: 1
            }]
            this.drawSurface(center, vectors, diamondWidth, diamondHeight, -60);

            this.ctx.restore();
        }
    }

    drawSurface(center: Point, vectors: Vectors, width: number, height: number, rotateAngle: number = 0): void {
        const gridWidth = width / 3;
        const gridHeight = height / 3;
        const gridBorderLength = this.borderLength / 3;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const gridCenter: Point = {
                    x: center.x + vectors[0].x * i * gridBorderLength + vectors[1].x * j * gridBorderLength,
                    y: center.y + vectors[0].y * i * gridBorderLength + vectors[1].y * j * gridBorderLength,
                };
                this.drawDiamond(gridCenter, gridWidth, gridHeight, rotateAngle);
            }
        }        
    }

    drawDiamond = (center: Point, width: number, height: number, rotateAngle: number = 0): void => {
        if (this.ctx) {
            this.ctx.save();

            this.ctx.strokeStyle = '#000000';
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