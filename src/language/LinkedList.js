const util = require('util')

class _Node {
  constructor(word, next) {
    this.word = word
    this.next = next
  }
}

class LinkedList {
  constructor() {
    this.head = null
  }

  insert(word) {
    if(this.head === null) {
      this.head = new _Node(word, null)
      return
    }

    let currNode = this.head

    while(currNode.next !== null) {
      currNode = currNode.next
    }

    currNode.next = new _Node(word, null)
  }

  shiftHead(shift) {
    const headWord = this.head.word

    let currNode = this.head
    let remShift = shift

    while(currNode.next !== null && remShift !== 0) {
      currNode = currNode.next
      remShift--
    }

    headWord.next = currNode.next.word.id
    currNode.next = new _Node(headWord, currNode.next)
    currNode.word.next = headWord.id

    this.head = this.head.next
  }
}

module.exports = LinkedList

// const ll = new LinkedList()
// ll.insertFirst(1)
// ll.insertLast(2)
// ll.insertLast(3)
// ll.insertLast(4)
// ll.insertLast(5)
// console.log(util.inspect(ll, true, null, true))
// ll.shiftHead(2)
// console.log(util.inspect(ll, true, null, true)) 
// ll.shiftHead(10)
// console.log(util.inspect(ll, true, null, true)) 
