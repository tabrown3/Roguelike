export default class Node<T> {

    private _data: T;
    private _parent: Node<T>;
    private _children: Node<T>[] = [];

    public get data(){

        return this._data;
    }

    public set data(inData: T) {

        this._data = inData;
    }

    public get parent() {

        return this._parent;
    }

    public set parent(inData: Node<T>) {

        this._parent = inData;
    }

    public get children() {

        return this._children;
    }
}