import axios from 'axios'
import produce from 'immer'

const addNoteToArray = (draft, title, color) => {
  draft.notes.unshift({ title, color })
}

const getRandomColor = () => {
  const color = Math.floor(Math.random() * 100) + 140

  switch (Math.floor(Math.random() * 3)) {
    case 0:
      return { r: color, g: color, b: color - 50 }
    case 1:
      return { r: color, g: color - 50, b: color }
    case 2:
      return { r: color - 50, g: color, b: color }
  }
}

export const exampleModel = {
  state: {
    counter: 0,
    notes: []
  },
  reducers: {
    addNote (state, payload) {
      return produce(state, draft => {
        addNoteToArray(draft, payload.title, payload.color)
      })
    },

    addCounterNote (state, payload) {
      return produce(state, draft => {
        addNoteToArray(draft, 'Counter: ' + state.counter, payload.color)
      })
    },

    addBy (state, payload) {
      return produce(state, draft => {
        draft.counter += payload
      })
    }
  },
  effects: {
    async addCounterNoteAsync (payload, state) {
      this.addBy(1)
      const color = getRandomColor()
      this.addCounterNote({ color })
    },

    async addNoteAsync (payload, state) {
      try {
        const commentNumber = Math.floor(Math.random() * 500) + 1 // randomize comment number (1..500)
        console.log('*** We are in addNoteAsync ***')
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/comments/${commentNumber}`
        )
        console.log('response received!')
        console.log(response.data.name)
        this.addNote({
          title: response.data.name,
          color: getRandomColor()
        })
      } catch (error) {
        console.log('*** Error ***')
        this.addNote({
          title: 'Error fetching note from web',
          color: { r: 250, g: 0, b: 0 }
        })
      }
    }
  }
}
