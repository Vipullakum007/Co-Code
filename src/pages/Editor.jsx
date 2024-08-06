import CodeMirror, {
    Extension,
    ViewUpdate,
    scrollPastEnd,
} from "@uiw/react-codemirror"

import React from 'react'

function Editor() {
    // const [extensions, setExtensions] = useState<Extension[]>([]);
    return (

        // <div>Editor</div>
        <CodeMirror
            // theme={editorThemes[theme]}
            // onChange={onCodeChange}
            // value={activeFile?.content}
            // extensions={extensions}
            minHeight="100%"
            maxWidth="100vw"
            style={{
                fontSize: 14 + "px",
                height: 85 + "vh",
                position: "relative",
            }}
        />
    )
}

export default Editor