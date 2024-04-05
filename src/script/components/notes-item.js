import NotesApi from '../data/remote/notes-api'
import Swal from 'sweetalert2'

class NoteItem extends HTMLElement {
    _shadowRoot = null
    _style = null
    _note = {
        id: null,
        title: null,
        body: null,
        createdAt: null,
        archived: false,
    }

    constructor() {
        super()

        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._style = document.createElement('style')
    }

    _updateStyle() {
        this._style.textContent = `
        :host {
          display: grid;
          grid-template-column: auto 1fr;
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
          border-radius: 5px;
          overflow: hidden;
        }

        .card {
          height: 100%;
          padding: 0 20px;
          background-color: #FFF7F1;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
        }
    
        .title-note h3 {
          font-family: 'Edu NSW ACT Foundation', cursive;
          font-size: 23px;
          text-decoration: underline;
          opacity: 0.8;
        }

        .body-note {
          font-family: "Pathway Extreme", sans-serif;
          font-size: 14px;
        }

        hr {
          opacity: 0.6;
          margin-top: 30px;
        }

        .date-note {
          margin-top: 12px;
          font-family: "Pathway Extreme", sans-serif;
          font-size: 13px;
        }

        .delete-button {
          background-color: #9B4444;
          color: #f7ede2;
          border-radius: 4px;
          font-family: 'Edu NSW ACT Foundation', cursive;
          font-size: 13px;
          padding: 7px 10px;
          margin-bottom: 10px;
          opacity: 0.8;
          letter-spacing: 1px;
        }

        .delete-button:hover {
          cursor: pointer;
          background-color: #BF3131;
          opacity: 0.9;
        }

      `
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = ''
    }

    set note(value) {
        this._note = value

        // Render ulang
        this.render()
    }

    get note() {
        return this._note
    }

    _deleteButton() {
        const addDeleteButton = document.createElement('button')
        addDeleteButton.classList.add('delete-button')
        addDeleteButton.innerText = 'Delete Note'
        addDeleteButton.addEventListener('click', () =>
            this._deleteButtonOnClicked()
        )
        this._shadowRoot.querySelector('.card').appendChild(addDeleteButton)
    }

    _deleteButtonOnClicked() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                NotesApi.deleteNotes(this._note.id)
                    .then(() => {
                        this.remove()
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success',
                })
            }
        })
    }

    render() {
        this._emptyContent()
        this._updateStyle()

        const date = new Date(this._note.createdAt)
        const formattedDate = `${date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        })} ${date.toLocaleTimeString('id-ID', {
            hour: 'numeric',
            minute: 'numeric',
        })}`

        this._shadowRoot.appendChild(this._style)
        this._shadowRoot.innerHTML += `
        <div class="card">
          <div class="title-note">
              <h3>${this._note.title}</h3>
          </div>
          <div class="body-note">
              <p>${this._note.body}</p>
          </div>
          <hr>
          <div class="date-note">
              <p>CreatedAt : <b> ${formattedDate} </b> </p>
              <p>Archived : <b> ${this._note.archived} </b> </p>
          </div>
        </div>
      `
        this._deleteButton()
    }
}

customElements.define('notes-item', NoteItem)
