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
    if (this.head === null) {
      this.head = new _Node(word, null)
      return
    }

    let currNode = this.head

    while (currNode.next !== null) {
      currNode = currNode.next
    }

    currNode.next = new _Node(word, null)
  }

  shiftHead(shift) {
    const headWord = this.head.word

    let currNode = this.head
    let remShift = shift

    while (currNode.next !== null && remShift !== 0) {
      currNode = currNode.next
      remShift--
    }

    if(currNode.next === null) {
      headWord.next = null
    } else {
      headWord.next = currNode.next.word.id
    }

    currNode.next = new _Node(headWord, currNode.next)
    currNode.word.next = headWord.id

    this.head = this.head.next
  }
}

module.exports = LinkedList

// const words = [
//   {
//     id: 1,
//     original: 'original 1',
//     translation: 'translation 1',
//     language_id: 1,
//     next: 2
//   },
//   {
//     id: 2,
//     original: 'original 2',
//     translation: 'translation 2',
//     language_id: 1,
//     next: 3
//   },
//   {
//     id: 3,
//     original: 'original 3',
//     translation: 'translation 3',
//     language_id: 1,
//     next: 4
//   },
//   {
//     id: 4,
//     original: 'original 4',
//     translation: 'translation 4',
//     language_id: 1,
//     next: 5
//   },
//   {
//     id: 5,
//     original: 'original 5',
//     translation: 'translation 5',
//     language_id: 1,
//     next: null
//   }
// ]

// const LL = new LinkedList()

// words.forEach(word => LL.insert(word))

// LL.shiftHead(1)
// LL.shiftHead(2)
// LL.shiftHead(7)


// console.log(util.inspect(LL, true, null, true))
