import React, { useCallback } from 'react'
import Quill from 'quill'
import useConstants from '../../hooks/useConstants'
import 'quill/dist/quill.snow.css'
import './style.css'

export default function Editor () {
  const constants = useConstants()

  const editorRef = useCallback(wrapper => {
    if (wrapper == null) return
    const el = document.createElement('div')
    wrapper.innerHTML = null
    wrapper.append(el)
    new Quill(el, {
      theme: 'snow',
      modules: {
        toolbar: constants.TOOLBAR_OPTIONS
      }
    })
  }, [])

  return (
    <div ref={editorRef} />
  )
}
