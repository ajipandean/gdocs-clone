import React, { useCallback, useEffect, useState } from 'react'
import Quill from 'quill'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'
import useConstants from '../../hooks/useConstants'
import 'quill/dist/quill.snow.css'
import './style.css'

export default function Editor () {
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()
  const { did: documentId } = useParams()
  const constants = useConstants()

  useEffect(() => {
    const s = io('http://localhost:3001')
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket == null || quill == null) return

    socket.once('load-document', doc => {
      quill.setContents(doc)
      quill.enable()
    })

    socket.emit('get-document', documentId)
  }, [socket, quill, documentId])

  useEffect(() => {
    if (socket == null || quill == null) return

    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents())
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta) => {
      quill.updateContents(delta)
    }
    socket.on('receive_changes', handler)

    return () => {
      socket.off('receive_changes', handler)
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return

    const handleTextChange = (delta, _, source) => {
      if (source !== 'user') return
      socket.emit('send_delta', delta)
      console.log(delta)
    }
    quill.on('text-change', handleTextChange)

    return () => {
      quill.off('text-change', handleTextChange)
    }
  }, [socket, quill])

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
    q.disable()
    q.setText('Loading contents...')
    setQuill(q)
  }, [])

  return (
    <div ref={editorRef} />
  )
}
