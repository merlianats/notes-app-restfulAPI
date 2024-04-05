class TitleNoteList extends HTMLElement {
    _shadowRoot = null
    _style = null

    constructor() {
        super()

        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._style = document.createElement('style')
    }

    _updateStyle() {
        this._style.textContent = `
            :host {
                display: inline;
                color: black;
                opacity: 0.7;
                font-size: 13px;
                font-family: "Prompt", sans-serif;
                text-align: center;
                letter-spacing: 3px;
            }
        `
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = ''
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this._emptyContent()
        this._updateStyle()

        this._shadowRoot.appendChild(this._style)
        this._shadowRoot.innerHTML += `
            <div>
                <h2>Notes List View</h2>
            </div>
        `
    }
}

customElements.define('title-note-list', TitleNoteList)
