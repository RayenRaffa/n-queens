class BoardTree  {
    constructor (board, isSolution = false) {
        this.board = board;
        this.children = [];
        this.isSolution = isSolution;
    }
    addNode (node) {
        this.children.push(node);
    }
}