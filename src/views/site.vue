<template>
   <div class="flex h-screen">
      <div class="w-1/5 bg-gray-50 border-r shadow">
         <Sidebar />
      </div>
      <div class="w-4/5 p-3">
         <div class="border h-full flex flex-col  rounded">
            <div class="h-16 px-3 flex items-center border-b">
               <div class="border px-2 py-1 bg-gray-100 flex item-center justify-center rounded">
                  <i class="ri-global-line text-gray-500"></i>
                  <small class="text-xs text-gray-600 leading-0 mt-1 ml-1">https://testsite.smartbloks.site</small>
               </div>
            </div>
            <iframe class="w-full flex-1" src="/preview" ref="iframeRef"></iframe>
         </div>
      </div>
   </div>
</template>

<script lang='ts' setup>
import {ref, watch} from "vue"
import Sidebar from '../components/Sidebar.vue'
import { useEditorStore } from "../store/editor"
import {ParentToIframeMessage} from "../types.ts";

const editorStore = useEditorStore()

const iframeRef = ref<HTMLIFrameElement | null>(null)

function sendMessage(msg: ParentToIframeMessage){
  if (iframeRef.value && iframeRef.value.contentWindow){
    iframeRef.value.contentWindow.postMessage(msg, "*")
  }
}

watch(() => editorStore.title, (newVal) => {
   localStorage.setItem('preview', editorStore.title || "")
   sendMessage({title: newVal})
}, {immediate: true})

</script>

<style lang='postcss' scoped></style>