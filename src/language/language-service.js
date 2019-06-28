const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score'
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count'
      )
      .where({ language_id })
  },

  updateLanguageWords(db, list) {
    return db.transaction(async trx => {
      let currNode = list.head

      while(currNode !== null) {
        await trx
          .from('word')
          .where('id', currNode.word.id)
          .update({
            correct_count: currNode.word.correct_count,
            incorrect_count: currNode.word.incorrect_count,
            next: currNode.word.next
          })

        currNode = currNode.next
      }
    })

  },

  getLanguageHead(db, id) {
    // select word.original, word.correct_count, word.incorrect_count, language.total_score
    // from word join language
    // on language.head = word.id;
    return db
      .from('language')
      .where('language.id', id)
      .join('word', 'language.head', '=', 'word.id')
      .select(
        'word.original',
        'word.translation',
        'word.correct_count',
        'word.incorrect_count',
        'language.total_score'
      )
      .first()
  },

  updateLanguageHead(db, langId, newHeadId, updatedTotalScore) {
    return db
      .from('language')
      .where('id', langId)
      .update({
        head: newHeadId,
        total_score: updatedTotalScore
      })
      // .returning('*')
      // .then(([ language ]) => language)
  },

  setLinkedList(words, list) {
    words.forEach(word => {
      list.insert(word)
    })
  },

  updateLinkedList(list, correct) {
    const { word } = list.head
    if (correct) {
      word.correct_count += 1
      word.memory_value *= 2
    } else {
      word.incorrect_count += 1
      word.memory_value = 1
    }

    list.shiftHead(word.memory_value)

    return {
      wordCorrectCount: word.correct_count,
      wordIncorrectCount: word.incorrect_count,
      answer: word.translation
    }
  }
}

module.exports = LanguageService
