<template>
    <div class="flex p-10 h-full">
        <h4 class="text-4xl">{{ title }}</h4>
    </div>
</template>

<script lang='ts' setup>
import { onMounted, onBeforeUnmount } from "vue";
import { useEditorStore } from '../store/editor';
import { storeToRefs } from 'pinia'
import { ParentToIframeMessage } from "../types"

const editorStore = useEditorStore()

const { title } = storeToRefs(editorStore)

const updateContent = (event: MessageEvent<ParentToIframeMessage>) => {
  const storageTitle = localStorage.getItem('preview')
  title.value = storageTitle ? storageTitle : event.data.title;
};

onMounted(() => {
    window.addEventListener("message", updateContent)
})

onBeforeUnmount(()=> {
    window.removeEventListener("message", updateContent)
})

</script>

<style lang='postcss' scoped></style>