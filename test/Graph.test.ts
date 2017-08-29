import Graph from './../src/common/Graph';

describe('Graph class', function() {

    describe('Graph construction', function() {

        it('should new up a Graph w/ root node w/ correct data', function() {

            let testGraph = new Graph(12, Symbol());

            expect(testGraph.currentData).toBe(12);
            expect(testGraph.currentHasParent()).toBeFalsy();
            expect(testGraph.currentChildrenCount).toBe(0);
        });
    });

    describe('Append and movement methods', function() {

        let testGraph: Graph<string>;
        let testGraphRootSymbol: symbol;

        beforeEach(function() {

            testGraphRootSymbol = Symbol('test graph root symbol');
            testGraph = new Graph('root data', testGraphRootSymbol);
        });

        it('should create and append a child node with data provided', function() {

            expect(testGraph.currentHasChildren()).toBeFalsy();
            expect(testGraph.currentHasChild(0)).toBeFalsy();

            let childIndex = testGraph.appendChild('child 1 data', Symbol());

            expect(childIndex).toBe(0);

            expect(testGraph.currentHasChildren()).toBeTruthy();
            expect(testGraph.currentHasChild(0)).toBeTruthy();

            expect(testGraph.peekChildData(0)).toBe('child 1 data');
            expect(testGraph.peekParentData()).toBe(undefined);
        });

        it('should throw if appending with index that already exists in Graph', function () {

            expect(function() {

                testGraph.appendChild('child 1 data', testGraphRootSymbol);

            }).toThrowError(`Indexer symbol ${testGraphRootSymbol.toString()} already exists in this Graph`);
        });

        it('should move to indicated node, then back to parent', function() {

            let childIndex = testGraph.appendChild('child 1 data', Symbol());

            let childMoveString = testGraph.moveToChild(childIndex);

            expect(childMoveString).toBe('child 1 data');
            expect(testGraph.currentData).toBe('child 1 data');
            expect(testGraph.peekParentData()).toBe('root data');

            let parentMoveString = testGraph.moveToParent();

            expect(parentMoveString).toBe('root data');
            expect(testGraph.currentData).toBe('root data');
            expect(testGraph.peekParentData()).toBe(undefined);
        });

        it('should add two layers of children, move down to bottom, and return to root', function () {

            let child1Index = testGraph.appendChild('child 1 data', Symbol());

            let child1MoveString = testGraph.moveToChild(child1Index);

            expect(child1MoveString).toBe('child 1 data');
            expect(testGraph.currentData).toBe('child 1 data');
            expect(testGraph.peekParentData()).toBe('root data');

            let child2Index = testGraph.appendChild('child 2 data', Symbol());

            let child2MoveString = testGraph.moveToChild(child2Index);

            expect(child2MoveString).toBe('child 2 data');
            expect(testGraph.currentData).toBe('child 2 data');
            expect(testGraph.peekParentData()).toBe('child 1 data');

            let rootMoveString = testGraph.moveToRoot();

            expect(rootMoveString).toBe('root data');
            expect(testGraph.currentData).toBe('root data');
            expect(testGraph.peekParentData()).toBe(undefined);
        });

        it('should append one graph to another', function() {

            let testGraph2 = new Graph('root to append', Symbol());
            testGraph2.appendChild('graph 2 child', Symbol());

            let firstChildIndex = testGraph.appendChild('graph 1 child', Symbol());

            let appendedIndex = testGraph.appendGraph(testGraph2);

            expect(firstChildIndex).toBe(0);
            expect(appendedIndex).toBe(1);
            expect(testGraph.currentChildrenCount).toBe(2);

            expect(testGraph.peekChildData(0)).toBe('graph 1 child');
            expect(testGraph.peekChildData(1)).toBe('root to append');

            let appendedRootData = testGraph.moveToChild(1);

            expect(appendedRootData).toBe('root to append');
            expect(testGraph.currentData).toBe('root to append');
            expect(testGraph.currentChildrenCount).toBe(1);
            expect(testGraph.peekChildData(0)).toBe('graph 2 child');
        });

        it('should throw exception if appending two graphs with same root symbol indexers', function () {

            let testGraph2 = new Graph('root to append', testGraphRootSymbol);

            expect(function() {
                testGraph.appendGraph(testGraph2);
            }).toThrowError(`Cannot append Graph: Indexer ${testGraphRootSymbol.toString()} already exists in target Graph`);
        });

        it('should throw exception if appending two graphs w/ child nodes w/ identical symbol indexers', function () {

            let sharedChildSymbol = Symbol('shared child symbol');

            let testGraph2 = new Graph('root to append', Symbol());
            testGraph2.appendChild('graph 2 child', sharedChildSymbol);

            testGraph.appendChild('graph 1 child', sharedChildSymbol);

            expect(function () {
                testGraph.appendGraph(testGraph2);
            }).toThrowError(`Cannot append Graph: Indexer ${sharedChildSymbol.toString()} already exists in target Graph`);
        });

        it('should move to nodes by index and peek the data by index of the Node corresponding to the indexer argument', function() {

            let child1Symbol = Symbol('child 1 symbol');
            let child1Index = testGraph.appendChild('child 1 data', child1Symbol);

            let child1MoveString = testGraph.moveByIndex(child1Symbol);

            expect(child1MoveString).toBe('child 1 data');
            expect(testGraph.currentData).toBe('child 1 data');
            expect(testGraph.peekByIndex(testGraphRootSymbol)).toBe('root data');

            let child2Symbol = Symbol('child 2 symbol');
            let child2Index = testGraph.appendChild('child 2 data', child2Symbol);

            let child2MoveString = testGraph.moveByIndex(child2Symbol);

            expect(child2MoveString).toBe('child 2 data');
            expect(testGraph.currentData).toBe('child 2 data');
            expect(testGraph.peekByIndex(child1Symbol)).toBe('child 1 data');

            let rootMoveString = testGraph.moveByIndex(testGraphRootSymbol);

            expect(rootMoveString).toBe('root data');
            expect(testGraph.currentData).toBe('root data');
            expect(testGraph.peekParentData()).toBe(undefined);
        });

        it('should return true if index exists, else false', function() {

            expect(testGraph.indexExists(testGraphRootSymbol)).toBeTruthy();
            expect(testGraph.indexExists(Symbol())).toBeFalsy();
        });
    });
});