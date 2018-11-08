type State = number[];

interface Algorithm {
    edge: State;
    cornor: State;
    name: string;
}

const initialState = [0, 1, 2, 3];
const PLLOperations: Algorithm[] = [{
    edge: [0, 2, 3, 1],
    cornor: [0, 1, 2, 3],
    name: 'Ub',
}, {
    edge: [0, 3, 1, 2],
    cornor: [0, 1, 2, 3],
    name: 'Ua',
}, {
    edge: [1, 0, 3, 2],
    cornor: [0, 1, 2, 3],
    name: 'Z',
}, {
    edge: [2, 3, 0, 1],
    cornor: [0, 1, 2, 3],
    name: 'H'
}, {
    edge: [0, 1, 2, 3],
    cornor: [1, 2, 0, 3],
    name: 'Aa',
}, {
    edge: [0, 1, 2, 3],
    cornor: [2, 0, 1, 3],
    name: 'Ab',
}, {
    edge: [0, 1, 2, 3],
    cornor: [3, 2, 1, 0],
    name: 'E'
}, {
    edge: [0, 3, 2, 1],
    cornor: [0, 2, 1, 3],
    name: 'T',
}, {
    edge: [0, 3, 2, 1],
    cornor: [1, 0, 2 ,3],
    name: 'F',
}, {
    edge: [3, 1, 2, 0],
    cornor: [1, 0, 2, 3],
    name: 'Ja',
}, {
    edge: [0, 2, 1, 3],
    cornor: [0, 2, 1, 3],
    name: 'Jb',
}, {
    edge: [0, 1, 3, 2],
    cornor: [1, 0, 2, 3],
    name: 'Ra',
}, {
    edge: [0, 2, 1, 3],
    cornor: [1, 0, 2, 3],
    name: 'Rb',
}, {
    edge: [1, 0, 2, 3],
    cornor: [2, 1, 0, 3],
    name: 'V',
}, {
    edge: [3, 1, 2, 0],
    cornor: [2, 1, 0, 3],
    name: 'Y',
}, {
    edge: [2, 1, 0, 3],
    cornor: [2, 1, 0, 3],
    name: 'Na',
}, {
    edge: [2, 1, 0, 3],
    cornor: [0, 3, 2, 1],
    name: 'Nb',
}, {
    edge: [3, 0, 2, 1],
    cornor: [1, 3, 2, 0],
    name: 'Ga',
}, {
    edge: [1, 2, 0, 3],
    cornor: [2, 0, 1, 3],
    name: 'Gb',
}, {
    edge: [0, 2, 3, 1],
    cornor: [3, 1, 0, 2],
    name: 'Gc',
}, {
    edge: [3, 1, 0, 2],
    cornor: [1, 3, 2, 0],
    name: 'Gd',
}];

export const pllNames: string[] = PLLOperations.map(x => x.name);

export class TopState {
    private edge: State;
    private cornor: State;

    constructor() {
        this.edge = initialState.slice();
        this.cornor = initialState.slice();
    }

    public reset() {
        this.edge = initialState.slice();
        this.cornor = initialState.slice();
    }

    public getEdges(): number[] {
        return this.edge;
    }

    public getCornors(): number[] {
        return this.cornor;
    }

    public applyAlgorithm(operation: Algorithm): void {
        this.edge = this.changeState(this.edge, operation.edge);
        this.cornor = this.changeState(this.cornor, operation.cornor);
    }

    public setPLLState(pllNumber: number): void {
        this.reset();
        this.applyAlgorithm(PLLOperations[pllNumber]);
    }

    private changeState(state: State, op: State): State {
        const vis: boolean[] = [];
        const ret: State = [];
        for (let i = 0; i < 4; i++) {
            vis.push(false);
            ret.push(-1);
        }
        for (let i = 0; i < 4; i++) while (!vis[i]) {
            for (let x = i; !vis[x]; x = op[x]) {
                vis[x] = true;
                ret[op[x]] = state[x];
            }
        }
        return ret;
    }

    public test(): void {
        this.reset();
        this.logState();
        this.applyAlgorithm(PLLOperations[0]);
        this.logState();
    }

    private logState() {
        console.log('edge:', this.edge);
        console.log('cornor:', this.cornor);
    }
}