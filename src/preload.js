import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => {
        ipcRenderer.send(channel, data)
    },
    receive: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args))
    },
    removeAllListeners: (channel) => {
        ipcRenderer.removeAllListeners(channel)
    }
})