class FooterBar extends HTMLElement {
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
                display: block;
                background-color: #f7ede2;
                box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
            }

            .footer-bar {
                padding: 55px 20px 20px 35px;
                text-align: center;
                font-family: 'Edu NSW ACT Foundation', cursive;
                font-size: 15px;
                font-weight: bold;
                letter-spacing: 2px;
                opacity: 0.8;
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
            <div class="footer-bar">
                Notes App &copy 2024 by Merlin
            </div>
        `
    }
}

customElements.define('footer-app', FooterBar)
