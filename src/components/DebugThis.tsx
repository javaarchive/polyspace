import {Editor} from '@monaco-editor/react';
import { useMemo } from 'react';

interface Props {
    object: any;
}

export default function DebugThis(props: Props) {

    let stringified = useMemo(() => {
        return JSON.stringify(props.object, null, 2);
    }, [props.object]);

    return (
        <>
            <Editor
                height="90vh"
                defaultLanguage="json"
                defaultValue={stringified}
            />
            <pre>
                <code>
                    {stringified}
                </code>
            </pre>
        </>
    );
}

export {DebugThis};