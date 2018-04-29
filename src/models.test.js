import { init, dispatch } from '@rematch/core'
import { exampleModel } from './models'

describe('exampleModel model', () => {
  it('reducer: addNote should add new note to notes array beginning', () => {
    const store = init({
      models: { exampleModel }
    })

    const note = { title: 'some title', color: { r: 12, g: 24, b: 42 } }
    dispatch.exampleModel.addNote(note)

    let myModelData = store.getState().exampleModel
    expect(myModelData).toEqual({
      counter: 0,
      notes: [note]
    })

    const note2 = {
      title: 'this is a second note',
      color: { r: 123, g: 42, b: 7 }
    }
    dispatch.exampleModel.addNote(note2)
    myModelData = store.getState().exampleModel
    expect(myModelData).toEqual({
      counter: 0,
      notes: [note2, note]
    })
  })

  it('reducer: addBy should increment counter by given amount', () => {
    const store = init({
      models: { exampleModel }
    })

    dispatch.exampleModel.addBy(2)
    let myModelData = store.getState().exampleModel
    expect(myModelData).toEqual({
      counter: 2,
      notes: []
    })

    dispatch.exampleModel.addBy(40)
    myModelData = store.getState().exampleModel
    expect(myModelData).toEqual({
      counter: 42,
      notes: []
    })
  })

  it('effect: addCounterNoteAsync should increment counter and initialize note', async () => {
    const store = init({
      models: { exampleModel }
    })

    await dispatch.exampleModel.addCounterNoteAsync()
    let myModelData = store.getState().exampleModel
    expect(myModelData.counter).toEqual(1)
    expect(myModelData.notes.length).toEqual(1)
    expect(myModelData.notes[0].title).toEqual('Counter: 1')
    expect(myModelData.notes[0].color.r).toBeLessThanOrEqual(240)
    expect(myModelData.notes[0].color.r).toBeGreaterThanOrEqual(90)
    expect(myModelData.notes[0].color.g).toBeLessThanOrEqual(240)
    expect(myModelData.notes[0].color.g).toBeGreaterThanOrEqual(90)
    expect(myModelData.notes[0].color.b).toBeLessThanOrEqual(240)
    expect(myModelData.notes[0].color.b).toBeGreaterThanOrEqual(90)
  })
})

describe('problematic test', () => {
  it('should work with effect which contains await', async () => {
    const store = init({
      models: { exampleModel }
    })
    await dispatch.exampleModel.addNoteAsync()
    const myModelData = store.getState().exampleModel
    expect(myModelData.counter).toEqual(0)
    expect(myModelData.notes.length).toEqual(1)
  })
})
