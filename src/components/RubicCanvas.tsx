import * as React from 'react';

interface Props {
    canvasWidth: number;
    canvasHeight: number;
}

interface Point {
    x: number;
    y: number;
}

export class RubicCanvas extends React.Component<Props, object> {
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

    drawCubeBorder = (borderLength: number = 200): void => {
        if (this.ctx) {
            this.ctx.save();

            const sqrt3 = Math.sqrt(3);
            const center: Point = {
                x: 200,
                y: 200
            };
            const diamondWidth = borderLength * sqrt3;
            const diamondHeight = borderLength;
            this.drawDiamond(center, diamondWidth, diamondHeight);

            center.x -= borderLength * sqrt3 / 4;
            center.y += borderLength * 3 / 4;
            this.drawDiamond(center, diamondWidth, diamondHeight, 60);

            center.x += borderLength * sqrt3 / 2;
            this.drawDiamond(center, diamondWidth, diamondHeight, -60);

            this.ctx.restore();
        }
    }

    drawDiamond = (center: Point, width: number, height: number, rotateAngle: number = 0): void => {
        if (this.ctx) {
            this.ctx.save();

            this.ctx.strokeStyle = '#000000';
            this.ctx.lineWidth = 5;
            this.ctx.lineJoin = 'round';
            this.ctx.translate(center.x, center.y);
            this.ctx.rotate(rotateAngle * Math.PI / 180);
            this.ctx.beginPath();
            // this.ctx.fillStyle = '#FF0000';
            // this.ctx.fillRect(0, 0, 10, 10);
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