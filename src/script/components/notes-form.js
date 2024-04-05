const Swal = require('sweetalert2')

class NotesForm extends HTMLElement {
    _shadowRoot = null
    _style = null
    _elementForm = null // inisialisasi seperti dua di atas, variabel _elementForm untuk bagian DisconnecTedCallback

    constructor() {
        super()

        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._style = document.createElement('style')
    }

    _updateStyle() {
        this._style.textContent = `
            :host {
                display: block;
                padding: 8px;
            }

            form {
                display: grid;
                grid-template-columns: 1fr;
                padding: 0 35px 30px 35px;
                
            }

            .header-bar-note {
                font-size: 22px;
                font-family: 'Edu NSW ACT Foundation', cursive;
                text-decoration: underline;
                opacity: 0.8;
            }

            .form-group {
                display: grid;
                grid-template-columns: 1fr;
                margin: 20px 0;
            }

            label {
                font-family: "Pathway Extreme", sans-serif;
                font-size: 18px;
                font-weight: light;
                margin-bottom: 6px;
                letter-spacing: 1px;
            }

            input[type=text], textarea {
                border-radius: 4px;
                border: 2px solid gray;
                padding: 10px;
                font-size: 17px;
                font-family: "Pathway Extreme", sans-serif;
                opacity: 0.9;
                background-color: #FFF7F1;
            }

            button {
                background-color: black;
                color: #f7ede2;
                border-radius: 4px;
                font-family: 'Edu NSW ACT Foundation', cursive;
                font-size: 21px;
                padding: 10px 0;
                opacity: 0.8;
                letter-spacing: 1px;
            }

            button:hover {
                cursor: pointer;
                background-color: black;
                opacity: 0.9;
            }
        `
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = ''
    }

    connectedCallback() {
        this.render()
    }

    disconnectedCallback() {
        if (this._elementForm) {
            this._elementForm.removeEventListener(
                'submit',
                this.onSubmit.bind(this)
            )
        }
    }

    render() {
        this._emptyContent()
        this._updateStyle()

        this._shadowRoot.appendChild(this._style)
        this._shadowRoot.innerHTML += `
            <form id="noteForm" class="notes-form">
                <div class="header-bar-note">
                    <h3>Create your note in here</h3>
                </div>

                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" required>
                </div>

                <div class="form-group">
                    <label for="desBodyNote">Description</label>
                    <textarea id="body" name="body" rows="5" required></textarea>
                </div>
                
                <button type="submit">Add Note</button>
            </form>
        `

        this._elementForm = this._shadowRoot.querySelector('#noteForm')
        this._elementForm.addEventListener('submit', this.onSubmit.bind(this))
    }

    onSubmit(event) {
        event.preventDefault()

        const title = this._shadowRoot.querySelector('#title')
        const bodyNote = this._shadowRoot.querySelector('#body')

        const confirmResult = Swal.fire({
            title: 'Are you sure you want to submit this note?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, submit',
            cancelButtonText: 'Cancel',
        })

        if (confirmResult) {
            const noteData = {
                title: title.value,
                body: bodyNote.value,
            }

            this.dispatchEvent(new CustomEvent('submit', { detail: noteData }))

            title.value = ''
            bodyNote.value = ''

            Swal.fire({
                title: 'Note submitted successfully!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
            })
        }
    }
}

customElements.define('notes-form', NotesForm)
