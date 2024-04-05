import Utils from '../utils.js'
import NotesApi from '../data/remote/notes-api.js'

const home = () => {
    const searchFormElement = document.querySelector('search-bar')
    const noteListContainerElement =
        document.querySelector('#noteListContainer')
    const noteQueryWaitingElement =
        noteListContainerElement.querySelector('.query-waiting')
    const noteLoadingElement =
        noteListContainerElement.querySelector('.search-loading')
    const noteFormElement = document.querySelector('notes-form')
    const noteListElement = noteListContainerElement.querySelector('notes-list')

    // handler add note
    const onAddNoteHandler = (event) => {
        const { title, body } = event.detail

        const newNote = {
            title,
            body,
        }

        NotesApi.createNotes(newNote.title, newNote.body)
            .then((createdNotes) => {
                console.log('Note berhasil ditambahkan', createdNotes)
                showLoadNotes()
            })
            .catch((error) => {
                console.error(error)
            })
    }

    noteFormElement.addEventListener('submit', onAddNoteHandler)

    //show note
    const showLoadNotes = (query) => {
        showLoading()
        NotesApi.getNotes(query)
            .then((result) => {
                displayResult(result)
                showNoteList()
            })
            .catch((error) => {
                console.error(error)
            })
    }

    // handler delete note
    const onDeleteNoteHandler = (event) => {
        const noteId = event.detail.noteId

        NotesApi.deleteNotes(noteId)
            .then(() => {
                const notesItem = document.querySelector(
                    `notes-item[data-id="${noteId}"]`
                )
                const noteArchiveItem = document.querySelector(
                    `notes-archive-item[data-id="${noteId}"]`
                )

                if (notesItem) {
                    notesItem.remove()
                }

                if (noteArchiveItem) {
                    noteArchiveItem.remove()
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    noteFormElement.addEventListener('submit', onDeleteNoteHandler)

    const onSearchHandler = (event) => {
        event.preventDefault()
        const { query } = event.detail
        showLoadNote(query)
    }

    const displayResult = (notes) => {
        const noteItemElements = notes.map((note) => {
            const noteItemElement = document.createElement('notes-item')
            noteItemElement.note = note
            return noteItemElement
        })
        Utils.emptyElement(noteListElement)
        noteListElement.append(...noteItemElements)
    }

    const showNoteList = () => {
        Array.from(noteListContainerElement.children).forEach((element) => {
            Utils.hideElement(element)
        })
        Utils.showElement(noteListElement)
    }

    const showLoading = () => {
        Array.from(noteListContainerElement.children).forEach((element) => {
            Utils.hideElement(element)
        })
        Utils.showElement(noteLoadingElement)
    }

    const showQueryWaiting = () => {
        Array.from(noteListContainerElement.children).forEach((element) => {
            Utils.hideElement(element)
        })
        Utils.showElement(noteQueryWaitingElement)
    }

    searchFormElement.addEventListener('search', onSearchHandler)
    showQueryWaiting()
    showLoadNotes()
}

export default home
