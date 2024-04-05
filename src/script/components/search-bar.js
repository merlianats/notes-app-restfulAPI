class SearchBar extends HTMLElement {
    _shadowRoot = null
    _style = null

    _submitEvent = 'submit'
    _searchEvent = 'search'

    constructor() {
        super()

        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._style = document.createElement('style')

        this.render()
    }

    _updateStyle() {
        this._style.textContent = `
        :host {
          display: inline;
        }

        .floating-form {
          position: sticky;
        }

        .search-form {
          display: flex;
          gap: 10px;
        }

        .search-form .form-group {
          flex-grow: 1;
          position: relative;
        }

        .search-form .form-group input {
          display: block;
          width: 100%;
          height: 65px;
          padding: 20px 10px 0 20px;
          font-size: 15px;
          font-family: "Pathway Extreme", sans-serif;
          border-radius: 4px;
          border: 2px solid gray;
          background-color: #FFF7F1;
          
        }

        .search-form .form-group input:focus-visible {
          outline: 0;
        }

        .search-form .form-group label {
          position: absolute;
          left: 20px;
          padding-top: 8px;
          user-select: none;
          pointer-events: none;
          text-transform: uppercase;
          font-family: "Pathway Extreme", sans-serif;
          font-weight: bold;
          font-size: 13px;
          opacity: 0.4;
          white-space: wrap;
        }

        .search-form .form-group input:focus-visible ~ label,
        .search-form .form-group input:valid ~ label {
          left: 10px;
          top: -16px;
          font-size: 0.8em;
        }


        .search-form button {
          background-color: black;
          border: none;
          opacity: 0.8;
          color: #f7ede2;
          border-radius: 5px;
          font-family: "Pathway Extreme", sans-serif;
          font-size: 15px;
          padding-inline: 12px;
        }

        .search-form button:hover {
          cursor: pointer;
          background-color: black;
          opacity: 0.9;
          transition: 100ms linear;
        }

      `
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = ''
    }

    connectedCallback() {
        this._shadowRoot
            .querySelector('form')
            .addEventListener('submit', (event) =>
                this._onFormSubmit(event, this)
            )
    }

    disconnectedCallback() {
        this._shadowRoot
            .querySelector('form')
            .removeEventListener('submit', (event) =>
                this._onFormSubmit(event, this)
            )
    }

    _onFormSubmit(event, searchBarInstance) {
        searchBarInstance.dispatchEvent(new CustomEvent('submit'))

        event.preventDefault()
    }

    _onSearchBarSubmit() {
        const query = this._shadowRoot.querySelector('input#name').value

        if (!query) return

        this.dispatchEvent(
            new CustomEvent(this._searchEvent, {
                detail: { query },
                bubbles: true,
            })
        )
    }

    render() {
        this._emptyContent()
        this._updateStyle()

        this._shadowRoot.appendChild(this._style)
        this._shadowRoot.innerHTML += `
        <div class="floating-form">
          <form id="searchForm" class="search-form form form-control">
            <div class="form-group">
              <label for="name">Search your note in here</label>
              <input id="name" name="name" type="search" required/>
            </div>
  
            <button>Search</button>
          </form>
        </div>
      `

        this.addEventListener(this._submitEvent, this._onSearchBarSubmit)
    }
}

customElements.define('search-bar', SearchBar)
