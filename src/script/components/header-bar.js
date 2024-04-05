class HeadBar extends HTMLElement {
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
                display: grid;
                width: 100%;
                
                color: black;
                background-color: #f7ede2;
                box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
            }

            .nav-bar {
                padding-block: 2px;
                padding-inline: 50px;
            }

            .heading-name {
                font-size: 38px;
                font-family: 'Edu NSW ACT Foundation', cursive;
                opacity: 0.7;
                text-decoration: underline;
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
            <div class="nav-bar">
                <h1 class="heading-name">Notes App</h1>
            </div>
        `
    }
}

customElements.define('header-bar', HeadBar)
