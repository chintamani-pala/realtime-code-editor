import { useEffect, useRef, useState, useCallback } from "react";
import Editors from "@monaco-editor/react";
import { languages } from "../utils/constants";
import ACTIONS from "../Actions";
import getDefaultContent from "../utils/getDefaultContent";
import saveWithconfirm, { toastMsgSweetAlert } from "../utils/saveWithConfirm";
import debounce from "lodash/debounce";

// eslint-disable-next-line react/prop-types
const Editor = ({ socketRef, roomId }) => {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState("TypeScript");
  const [value, setValue] = useState(getDefaultContent(language));
  const [editorValue, setEditorValue] = useState(value);

  useEffect(() => {
    setValue(getDefaultContent(language));
    setEditorValue(getDefaultContent(language)); // sync editor and state on language change
  }, [language]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // Debounced socket emit to prevent high-frequency events
  const emitCodeChange = useCallback(
    debounce((code, lang) => {
      socketRef.current.emit(ACTIONS.CODE_CHANGED, {
        roomId,
        code,
        lang,
      });
    }, 300),
    [socketRef, roomId]
  );

  useEffect(() => {
    emitCodeChange(value, language);
  }, [language, value, emitCodeChange]);

  const handleEditorChange = (newValue) => {
    setEditorValue(newValue); // Only update editor value, not state
    emitCodeChange(newValue, language); // Send socket update after debounce
  };

  const handleSave = () => {
    setValue(editorValue); // Commit editor value to state on save
    saveWithconfirm(language, editorValue); // Save logic
  };

  useEffect(() => {
    const handleResize = () => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    };

    window.addEventListener("resize", handleResize);

    socketRef.current.on(ACTIONS.CODE_CHANGED, ({ code, lang }) => {
      if (lang !== undefined) {
        setLanguage(lang);
      }
      if (code !== null) {
        setEditorValue(code); // Update editor content, not state
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      socketRef.current.off(ACTIONS.CODE_CHANGED); // Clean up listener
    };
  }, [socketRef]);

  return (
    <>
      <div className="buttonContainer">
        <button
          className="btn runBtn"
          onClick={() =>
            toastMsgSweetAlert("error", "This Feature is not Enabled")
          }
        >
          Run
        </button>
        <button className="btn saveBtn" onClick={handleSave}>
          Save
        </button>
        <select
          name="language"
          id="language"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <br />
      <Editors
        width="100%"
        height="90vh"
        theme="vs-dark"
        language={language.toLowerCase()}
        value={editorValue}
        onMount={onMount}
        onChange={handleEditorChange}
        options={{
          lineNumbers: "on",
          autoIndent: true,
          copyWithSyntaxHighlighting: true,
          automaticLayout: true,
          detectIndentation: true,
          minimap: { enabled: true },
          acceptSuggestionOnEnter: "on",
          autoClosingBrackets: "always",
          cursorBlinking: "smooth",
          cursorStyle: "line",
          folding: true,
          fontSize: 18,
          hideCursorInOverviewRuler: true,
          guides: { indentation: true, highlightActiveIndentGuide: true },
          scrollBeyondLastLine: false,
          tabSize: 4,
          wordWrap: "on",
          formatOnType: true,
          formatOnPaste: true,
          bracketPairColorization: {
            enabled: true,
            independentColorPoolPerBracketType: true,
          },
          wrappingIndent: "deepIndent",
          hover: { delay: 200, hidingDelay: 2000 },
          suggest: {
            showWords: true,
            showItems: true,
            showMethods: true,
            showFunctions: true,
            showSnippets: true,
            showColors: true,
            showFiles: true,
            showReferences: true,
            showFolders: true,
            showTypes: true,
            showEvents: true,
            showOperators: true,
            showProperties: true,
            showEnum: true,
            showConstant: true,
            showStructs: true,
            showInterfaces: true,
            showVariables: true,
            showText: true,
            showValues: true,
            showUnits: true,
            showClasses: true,
          },
        }}
      />
    </>
  );
};

export default Editor;
