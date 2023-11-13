// import './candybox2_uncompressed'
// import type {Game} from './candybox2_uncompressed'
import {Game as IGame} from './types'

type Hack = (game: IGame, ...args) => any
type HackMap = Record<keyof any, Hack>

class ClickGUI {
    isOpen: boolean = false
    hacks: HackMap = Object.create(null)
    protected element: HTMLDivElement

    constructor(protected game: IGame) {
        document.addEventListener("keydown", (key) => {
            if (key.key == "Shift") {
                this.toggle()
            }
        })
    }

    addHack(name: string, hack: Hack) {
        this.hacks[name] = hack
    }

    toggle() {
        this.isOpen = !this.isOpen
        this.update()
    }

    create(hacks: HackMap) {
        let e = document.createElement("div")

        for (let key of Object.keys(this.hacks)) {
            let btn = document.createElement("button")
            btn.innerText = String(key)
            btn.addEventListener("click", (e) => {
                hacks[key](this.game, e)
            })
        }

        e.style.display = 'flex'
        e.style.flexDirection = 'column'
        e.style.zIndex = '100'
        e.style.position = "absolute"


        return e
    }

    update(renew: boolean = false) {
        if (!this.element || renew) this.element = this.create(this.hacks)

        if (this.isOpen) document.body.append(this.element)
        else this.element.remove()
    }
}

function hookMethod<T extends { prototype: any }, K extends keyof T['prototype'], V extends T['prototype'][K]>(cls: T, prop: K, newVal: V): V {
    const origin = cls.prototype[prop]
    cls.prototype[prop] = newVal
    return origin
}

function hookFunction<T extends any, K extends keyof T>(cls: T, prop: K, newVal: T[K]): T[K] {
    const origin = cls[prop]
    cls[prop] = newVal
    return origin
}

interface Inject {
    clickGUI: ClickGUI
}

function onHook(this: IGame & Inject) {
    globalThis.gameInst = this
    // this.goToTheComputer()
    this.getCandies().setCurrent(114514)
    this.clickGUI = new ClickGUI(this)
}

const originQuestMethod = hookMethod(
    // @ts-ignore
    Game, 'questMethod',
    function () {
        setTimeout(onHook.bind(this))
        hookFunction(this, 'questMethod', originQuestMethod)
        originQuestMethod.apply(this)
    }
)



