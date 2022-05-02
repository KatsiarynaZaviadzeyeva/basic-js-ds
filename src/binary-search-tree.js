const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
    constructor() {
        this.tree = null;
    }
    root() {
        if (this.tree === null) {
            return null;
        }
        return this.tree;
    }

    add(value) {
        this.tree = addNode(this.tree, value);

        function addNode(node, value) {
            if (!node) {
                return new Node(value);
            }
            if (node.data === value) {
                return node;
            }
            if (value < node.data) {
                node.left = addNode(node.left, value);
            } else {
                node.right = addNode(node.right, value);
            }
            return node;
        }
    }

    has(value) {
        return searchNode(this.tree, value);

        function searchNode(node, value) {
            if (!node) {
                return false;
            }
            if (node.data === value) {
                return true;
            }
            return value < node.data ?
                searchNode(node.left, value) :
                searchNode(node.right, value);
        }
    }

    find(element) {
        return findNode(this.tree, element);

        function findNode(node, value) {
            if (!node) {
                return null;
            }
            if (node.data === value) {
                return node;
            }
            return value < node.data ?
                findNode(node.left, value) :
                findNode(node.right, value);
        }
    }

    remove(value) {
        this.tree = removeNode(this.tree, value);

        function removeNode(node, value) {
            if (!node) {
                return null;
            }
            if (value < node.data) {
                node.left = removeNode(node.left, value);
                return node;
            } else if (node.data < value) {
                node.right = removeNode(node.right, value);
                return node;
            } else {
                if (!node.left && !node.right) {
                    return null;
                }
                if (!node.left) {
                    node = node.right;
                    return node;
                }
                if (!node.right) {
                    node = node.left;
                    return node;
                }
                let minFromRight = node.right;
                while (minFromRight.left) {
                    minFromRight = minFromRight.left;
                }
                node.data = minFromRight.data;
                node.right = removeNode(node.right, minFromRight.data);
                return node;
            }
        }
    }

    min() {
        if (!this.tree) {
            return;
        }
        let node = this.tree;
        while (node.left) {
            node = node.left;
        }
        return node.data;
    }

    max() {
        if (!this.tree) {
            return;
        }
        let node = this.tree;
        while (node.right) {
            node = node.right;
        }
        return node.data;
    }
}

const tree = new BinarySearchTree();
tree.add(2);
tree.add(3);
tree.add(4);
tree.add(5);
tree.add(6);
console.log(tree);
console.log(tree.remove(3));
console.log(tree);
module.exports = {
    BinarySearchTree
};