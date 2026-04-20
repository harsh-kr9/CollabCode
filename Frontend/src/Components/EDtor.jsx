import React, { useState, useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'

const EDtor = ({ socket, roomId }) => {
    const [code, setCode] = useState('// Start coding here...')
    const [language, setLanguage] = useState('javascript')
    const editorRef = useRef(null)

    const handleEditorChange = (value) => {
        setCode(value)
        if (socket) {
            socket.emit('code-change', { roomId, code: value })
        }
    }

    useEffect(() => {
        if (socket) {
            socket.on('code-update', (data) => {
                if (data.code !== code) {
                    setCode(data.code)
                }
            })
        }
    }, [socket])

    return (
        <div className="h-full w-full">
            <Editor
                height="100%"
                language={language}
                value={code}
                onChange={handleEditorChange}
                theme="vs-dark"
            />
        </div>
    )
}

export default EDtor
