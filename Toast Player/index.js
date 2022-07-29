class Toast {
    _defaultOptions = {
        duration: 500
    }
    constructor(options = {}) {
        this._configs = {...this._defaultOptions, ...options}
    }

    show(message, type = 'default') {
        const container = this._buildAndAppendContainer()
        const messageElm = this._buildMessage(message, type)
        container.appendChild(messageElm)
        this._destroyMessage(messageElm)
    }

    _buildMessage(message, type) {
        const messageElm = this._buildElement('toast-message')
        messageElm.classList.add(`toast--${type}`)
        messageElm.innerText = message

        return messageElm
    }

    _buildAndAppendContainer() {
        if (!this._container) {
            this._container = this._buildElement('toast-container')
            document.body.appendChild(this._container)
        }

        return this._container
    }

    _buildElement(className) {
        const elm = document.createElement('div')
        elm.classList.add(className)

        return elm
    }

    _destroyMessage(message) {
        setTimeout(() => {
            message.remove()
            if (!this._container.children.length) {
                this._container.children.remove()
            }
        }, this._configs.duration);
    }
 }