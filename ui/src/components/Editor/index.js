import React, { useCallback } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default function Editor () {
  const editorRef = useCallback(wrapper => {
    if (wrapper == null) return
    const el = document.createElement('div')
    wrapper.innerHTML = null
    wrapper.append(el)
    new Quill(el, { theme: 'snow' })
  }, [])

  return (
    <div ref={editorRef} />
  )
}
