import Node from './Node';

export default class Graph<T> {

    private readonly _root: Node<T>;
    private _current: Node<T>;

    private nodeDictionary: any = {}; // has to be any because {[key:symbol]: Node<T>} is not allowed as of TS 2.4.2

    constructor(rootData: T, indexer: symbol) {

            this._root = new Node<T>();
            this._root.data = rootData;
            this._current = this._root;

            this.addNodeToDictionary(this._root, indexer);
    }

    public get currentData(): T {

        return this._current.data;
    }
    
    public get currentChildrenCount(): number {

        return this._current.children.length;
    }

    public currentHasParent = (): boolean => {

        return !!this._current.parent;
    }

    public peekParentData = (): T => {

        if(this.currentHasParent()) {

            return this._current.parent.data;
        }
    }

    public moveToParent = (): T => {

        if(this.currentHasParent()) {
            this._current = this._current.parent;
            return this.currentData;
        }
    }

    public currentHasChildren = (): boolean => {

        return this.currentChildrenCount > 0;
    }

    public currentHasChild = (index: number) => {

        return !!this._current.children[index];
    }

    public peekChildData = (index: number): T => {

        if(this.currentHasChild(index)) {

            return this._current.children[index].data;
        }
    }

    public moveToChild = (index: number): T => {

        if(this.currentHasChild(index)) {
            this._current = this._current.children[index];
            return this.currentData;
        }
    }

    public moveToRoot = (): T => {

        this._current = this._root;
        return this.currentData;
    }

    public appendChild = (childData: T, indexer: symbol): number => {

        let newChild = new Node<T>();
        newChild.data = childData;

        this.addNodeToDictionary(newChild, indexer);
        
        let numericIndex = this.appendChildNode(newChild);
        return numericIndex;
    }

    public appendGraph = (inGraph: Graph<T>): number => {

        // if the Graph being appended to already contains a key that's in the source Graph, throw exception
        let sharedKey = Reflect.ownKeys(inGraph.nodeDictionary).find(key => {
            
            return (typeof key === 'symbol') && !!this.nodeDictionary[key];
        });

        if(sharedKey) {
            throw new TypeError(`Cannot append Graph: Indexer ${sharedKey.toString()} already exists in target Graph`);
        }

        // copy over nodeDictionary keys/values
        Object.assign(this.nodeDictionary, inGraph.nodeDictionary);

        let numericIndex = this.appendChildNode(inGraph._root);
        return numericIndex;
    }

    public peekByIndex = (indexer: symbol): T => {

        let indexedNode: Node<T> = this.nodeDictionary[indexer];

        if(indexedNode) {
            return indexedNode.data;
        }
        else {
            throw new TypeError(`No Node with indexer ${indexer.toString()} has been indexed in Graph`);
        }
    }

    public moveByIndex = (indexer: symbol): T => {

        let indexedNode: Node<T> = this.nodeDictionary[indexer];
        
        if(indexedNode) {
            this._current = indexedNode;
            return this._current.data;
        }
        else {
            throw new TypeError(`No Node with indexer ${indexer.toString()} has been indexed in Graph`);
        }
    }

    public indexExists = (indexer: symbol): boolean => {

        return !!this.nodeDictionary[indexer];
    };

    // returns index node was added at for use with moveToChild or peekChild
    private appendChildNode = (inNode: Node<T>): number => {

        inNode.parent = this._current;
        this._current.children.push(inNode);
        return this.currentChildrenCount - 1; // it was added at length minus 1
    }

    private addNodeToDictionary = (inNode: Node<T>, indexer: symbol) => {

        if (this.nodeDictionary[indexer]) {
            throw new TypeError(`Indexer symbol ${indexer.toString()} already exists in this Graph`);
        }
        else {
            this.nodeDictionary[indexer] = inNode;
        }
    }
}