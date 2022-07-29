class Player {
    constructor(container, sources) {
        this._sources = sources
       

        this._container = container
        this._player = container.querySelector('audio')
        this._playBtn = container.querySelector('[data-action="play"]')
        this._progressBar = container.querySelector('.progress .played')
        this._seekbar = container.querySelector('.progress')
        this._songContainer = container.querySelector('.music')

        container.addEventListener('click', (e) => {
            const {
                target
            } = e

            const action = target.dataset.action

            if (action && `_${action}` in this) {
                this[`_${action}`]()
            }
        })

        this._player.addEventListener('play', this._onPlay.bind(this))
        this._player.addEventListener('pause', this._onPause.bind(this))
        this._player.addEventListener('ended', this._onEnded.bind(this))
        this._player.addEventListener('timeupdate', this._onTimeUpdate.bind(this))
        this._seekbar.addEventListener('click', this._seek.bind(this))
        this._container.addEventListener('sourcechanged', this._syncPlayingIcon.bind(this))
        this._container.addEventListener('sourcechanged', this._syncInfo.bind(this))
        
        this._currentSrcIndex = 0
        this._appendPlaylist()
        this._changeSrc(0)

    }

    _play() {
        this._player.play()
    }

    _pause() {
        this._player.pause()
    }

    _onPlay() {
        this._playBtn.dataset.action = 'pause'
        this._playBtn.innerText = 'pause'

    }

    _onPause() {
        this._playBtn.dataset.action = 'play'
        this._playBtn.innerText = 'play_arrow'
    }

    _onEnded() {

    }

    _onTimeUpdate() {
        const {
            currentTime,
            duration
        } = this._player
        this._progressBar.style.width = `${(currentTime / duration) * 100}%`
    }

    _seek(e) {
        if (!this._player.paused) {
            const {
                currentTarget: seekbar,
                pageX
            } = e
            const xPositionClicked = pageX - seekbar.getBoundingClientRect().left
            this._player.currentTime = (xPositionClicked * this._player.duration) / seekbar.offsetWidth
        }
    }

    _previous() {
        const lastIndex = this._sources.length - 1
        const currentIndex = this._currentSrcIndex - 1 < 0 ? lastIndex :  this._currentSrcIndex - 1
        this._changeSrc(currentIndex)
        this._play()
    }

    _next() {
        const lastIndex = this._sources.length - 1
        const currentIndex = this._currentSrcIndex + 1 > lastIndex ? 0 :  this._currentSrcIndex + 1
        this._changeSrc(currentIndex)
        this._play()
    }

    _changeSrc(index) {
        this._currentSrcIndex = index
        this._player.src = this._sources[index].src
        this._container.dispatchEvent(new Event('sourcechanged'))
    }

    _syncPlayingIcon() {
        const pastPalying = document.querySelector('.playing')
        pastPalying.classList.remove('playing')
        pastPalying.firstElementChild.innerText = 'play_arrow'

        const currentPlaying = document.querySelector(`[data-index="${this._currentSrcIndex}"]`)
        const icon = currentPlaying.querySelector('[data-action="changesource"]')
        icon.innerText = 'equalizer'
        icon.parentElement.classList.add('playing')
    }

    _syncInfo() {
        const source = this._sources[this._currentSrcIndex];
        this._container.querySelector('.cover').style.backgroundImage= `url(${source.cover})`
        this._container.querySelector('[data-title]').innerText = source.title
        this._container.querySelector('[data-singer]').innerText = source.singer
    }


    _appendPlaylist() {
        const template = document.getElementById('song')

        this._sources.forEach((source, index) => {
            const song = template.content.cloneNode(true).firstElementChild
            song.dataset.index = index

            song.innerHTML = song.innerHTML.replace(/{{\s*(.*?)\s*}}/g, (_, key) => {
                if (key in source) {
                    return source[key]
                }

                if (this._currentSrcIndex === index) {
                    if (key === 'icon') {
                        return 'equalizer'
                    }

                    if (key === 'playing') {
                        return 'playing'
                    }
                } else {
                    if (key === 'icon') {
                        return 'play_arrow'
                    }

                    if (key === 'playing') {
                        return ''
                    }
                }

             
            })

            song.querySelector('[data-action="changesource"]').addEventListener('click', (e) => {
                this._changeSrc(index)
                this._play()
            })

            song.querySelector('.img').style.backgroundImage = `url(${source.cover})`
           
            this._songContainer.appendChild(song)
        });
    }
    
}
