/*
1. Draw a BST
Given the data 3,1,4,6,9,2,5,7, if you were to insert this into an empty binary search tree, what would the tree look like? (Draw the tree, no coding needed here.)
Draw the BST with the keys - E A S Y Q U E S T I O N


               3
             /    \
            1       4
              \       \  
                2       6
                      /   \
                     5     9
                          /
                         7
                        


                    E
              /             \
            A                 S
                          /       \  
                        Q           Y
                      /            /   
                    I             U      
                      \         /        
                        O     T       
                      /          
                    N                           
*/

/*
2. Remove the root
Show how the above trees would look like if you deleted the root of each tree. (Draw the trees, no coding needed here.)


                            4
                        /       \
                        1          6
                        \      /    \  
                        2   5      9  
                                    /
                                    7


                               I
                        /             \
                        A                 S
                                    /       \  
                                Q           Y
                                /            /   
                            O             U      
                            /             /        
                        N             T       
*/

/*
3. Create a BST class
Walk through the binary search tree code in the curriculum and understand it well. Then write a BinarySearchTree class with its core functions (insert(), remove(), find()) from scratch.

Create a binary search tree called BST and insert 3,1,4,6,9,2,5,7 into your tree. Compare your result with the result from the 1st exercise.
Create a binary search tree called BST and insert E A S Y Q U E S T I O N into your tree. Compare your result with the result from the 1st exercise.
*/


class BinarySearchTree{
    constructor(key=null,value=null,parent=null){
        this.key = key
        this.value = value
        this.parent = parent
        this.left = null
        this.right = null
    }

    insert(key,value){
        //if the first node in the tree
        if (this.key == null){
            this.key = key
            this.value = value
        } else if (key < this.key){
            if (this.left == null){
                this.left = new BinarySearchTree(key,value,this)
            } else {
                this.left.insert(key,value)
            }
        } else {
            if (this.right == null){
                this.right = new BinarySearchTree(key,value,this)
            } else {
                this.right.insert(key,value)
            }
        }
    }

    find(key){
        if (this.key == key){
            return this.value
        } else if (key < this.key && this.left){
            return this.left.find(key)
        } else if (key > this.key && this.right){
            return this.right.find(key)
        } else {
            throw new Error('Key Error')
        }
    }

    remove(key){
        if (this.key == key){
            //the node has two children
            if (this.left && this.right){
                let successor = this.right._findMin()
                this.key = successor.key
                this.value = successor.value
                successor.remove(successor.key)
            } else if (this.left){
                this._replaceWith(this.left)
            } else if (this.right){
                this._replaceWith(this.right)
            } else {
                this._replaceWith(null)
            }
        } else if (key < this.key && this.left){
            this.left.remove(key)
        } else if (key > this.key && this.right){
            this.right.remove(key)
        } else {
            throw new Error('Key Error')
        }
    }

    _replaceWith(node){
        if (this.parent){
            if (this == this.parent.left){
                this.parent.left = node
            } else if (this == this.parent.right){
                this.parent.right = node
            }

            if (node) {
                node.parent = this.parent
            }
        } else {
            if (node) {
            this.key = node.key
            this.value = node.value
            this.left = node.left
            this.right = node.right
            } else {
                this.key = null
                this.value = null
                this.left = null
                this.right = null
            }
        }
    }

    _findMin(){
        if (!this.left){
            return this
        }

        return this.left._findMin()
    }
}

/*
4. What does this program do?
Without running this code in your code editor, explain what the following program does. Show with an example the result of executing this program. What is the runtime of this algorithm?
*/

function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}

//Sum up all the value in the binary search tree

/*
5. Height of a BST
Write an algorithm to find the height of a binary search tree. What is the time complexity of your algorithm?
*/

function height(tree){

    if (!tree){
      return 0
    } 
  
    return Math.max(height(tree.left),height(tree.right)) + 1
  
  }

/*
6. Is it a BST?
Write an algorithm to check whether an arbitrary binary tree is a binary search tree, assuming the tree does not contain duplicates.
*/

function ifBst(tree){
    let ans = true

    if (tree.left){
      if (tree.left.value > tree.value){
        return false
      } else ans = true
      ifBst(tree.left)
    } 
  
    if (tree.right){
      if (tree.right.value < tree.value){
        return false
      } else ans = true
      ifBst(tree.right)
    }
  
    return ans
  }