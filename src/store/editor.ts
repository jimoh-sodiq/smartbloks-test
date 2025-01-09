import { defineStore } from "pinia";

export const useEditorStore = defineStore('editor', {
    state() {
        return {
            title: localStorage.getItem('preview') || 'Hello' // prevents iframe to always pre-render with Hello text
        }
    }
})