import { connect } from 'preact-redux'
import { h } from 'preact' // eslint-disable-line

import CustomButton, { blueButton, orangeButton } from '../CustomButton'
import Note from '../Note'

const Notes = noteEntries => {
  return noteEntries.map(note => <Note text={note.title} color={note.color} />)
}

const App = props => {
  return (
    <div>
      <div>
        <CustomButton
          title='Add a latin note'
          onClickHandler={props.addNoteAsync}
          colors={blueButton}
        />
        <CustomButton
          title='Add counter'
          onClickHandler={props.addCounterNoteAsync}
          colors={orangeButton}
        />
      </div>
      {Notes(props.notes)}
    </div>
  )
}

const mapState = state => ({
  notes: state.exampleModel.notes
})

const mapDispatch = ({
  exampleModel: { addNoteAsync, addCounterNoteAsync }
}) => ({
  addNoteAsync,
  addCounterNoteAsync
})

export default connect(mapState, mapDispatch)(App)
