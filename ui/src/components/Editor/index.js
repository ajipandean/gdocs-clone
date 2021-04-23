import React, { useCallback, useEffect, useState } from 'react'
import Quill from 'quill'
import useConstants from '../../hooks/useConstants'
import 'quill/dist/quill.snow.css'
import './style.css'

export default function Editor () {
  const [quill, setQuill] = useState()
  const constants = useConstants()

  useEffect(() => {
    if (quill == null) return

    const handleTextChange = (delta, _, source) => {
      if (source !== 'user') return
      console.log(delta)
    }
    quill.on('text-change', handleTextChange)

    return () => {
      quill.off('text-change', handleTextChange)
    }
  }, [quill])

  const editorRef = useCallback(wrapper => {
    if (wrapper == null) return
    const el = document.createElement('div')
    wrapper.innerHTML = null
    wrapper.append(el)
    const q = new Quill(el, {
      theme: 'snow',
      modules: {
        toolbar: constants.TOOLBAR_OPTIONS
      }
    })
    setQuill(q)
  }, [])

  return (
    <div ref={editorRef} />
  )
}
