class Tree {
    constructor (value) {
        this.value = value;
        this.children = [];
        // this.parent = parent;
    }

    addNode (board) {
        this.children.push(new Tree(board));
    }
}

class BoardTree extends Tree {
    constructor (value) {
        super(value);
        this.isSolution = false;
    }
    addNode (board) {
        this.children.push(new BoardTree(board))
    }
    
}