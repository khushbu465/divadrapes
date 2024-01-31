import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const CKEditorCompo = ({ onChange, data }) => {
    return (
        <>
            <CKEditor
                editor={ClassicEditor}
                data={data}
                onChange={(event, editor) => {
                    var content = editor.getData();
                    onChange(content);
                }}
            />
        </>
    )
}

export default CKEditorCompo
