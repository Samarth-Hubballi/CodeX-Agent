import CodeEditor from '../CodeEditor'

export default function CodeEditorExample() {
  const initialCode = `// Welcome to the AI Code Editor
function greet(name) {
  return \`Hello, \${name}! Ready to code?\`;
}

console.log(greet('Developer'));`;

  return (
    <div className="p-8 bg-background">
      <CodeEditor 
        initialCode={initialCode}
        initialLanguage="javascript"
      />
    </div>
  )
}