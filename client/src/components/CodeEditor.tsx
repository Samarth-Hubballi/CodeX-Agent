import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Copy, Sparkles, RotateCcw, Zap, Bug, HelpCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

interface CodeEditorProps {
  initialCode?: string;
  initialLanguage?: string;
}

interface CodeGenerationResponse {
  id: string;
  generatedCode: string;
  language: string;
  prompt: string;
}

export default function CodeEditor({
  initialCode = '',
  initialLanguage = 'javascript'
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState(initialLanguage);
  const [output, setOutput] = useState('');

  const languages = [
    'javascript', 'typescript', 'python', 'java', 'cpp', 'csharp',
    'go', 'rust', 'php', 'ruby', 'swift', 'kotlin', 'scala', 'r',
    'sql', 'html', 'css', 'bash', 'powershell', 'dart', 'lua',"c","c++"
  ];

  // Real AI code generation mutation
  const generateCodeMutation = useMutation({
    mutationFn: async ({ prompt, language }: { prompt: string, language: string }) => {
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, language })
      });

      if (!response.ok) {
        let errorMessage = 'Failed to generate code';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      return response.json() as Promise<CodeGenerationResponse>;
    },
    onSuccess: (data) => {
      setCode(data.generatedCode);
      setOutput(`✨ Code generated successfully in ${data.language}!`);
      setPrompt('');
    },
    onError: (error) => {
      setOutput(`❌ Error: ${error.message}`);
    }
  });

  // Code optimization mutation
  const optimizeCodeMutation = useMutation({
    mutationFn: async ({ code, language }: { code: string, language: string }) => {
      const response = await fetch('/api/optimize-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language })
      });

      if (!response.ok) {
        let errorMessage = 'Failed to optimize code';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      return response.json();
    },
    onSuccess: (data) => {
      setCode(data.optimizedCode);
      setOutput('⚡ Code optimized successfully!');
    },
    onError: (error) => {
      setOutput(`❌ Optimization error: ${error.message}`);
    }
  });

  // Code explanation mutation
  const explainCodeMutation = useMutation({
    mutationFn: async ({ code, language }: { code: string, language: string }) => {
      const response = await fetch('/api/explain-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language })
      });

      if (!response.ok) {
        let errorMessage = 'Failed to explain code';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      return response.json();
    },
    onSuccess: (data) => {
      setOutput(`📚 Code Explanation:\n\n${data.explanation}`);
    },
    onError: (error) => {
      setOutput(`❌ Explanation error: ${error.message}`);
    }
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    generateCodeMutation.mutate({ prompt, language });
  };

  const handleOptimize = () => {
    if (!code.trim()) return;
    optimizeCodeMutation.mutate({ code, language });
  };

  const handleExplain = () => {
    if (!code.trim()) return;
    explainCodeMutation.mutate({ code, language });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setOutput('Code copied to clipboard! 📋');
    console.log('Code copied to clipboard');
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
    setPrompt('');
    console.log('Code editor reset');
  };

  const isLoading = generateCodeMutation.isPending || optimizeCodeMutation.isPending || explainCodeMutation.isPending;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Code Editor - Multi-Language Support
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Language Selection & AI Prompt Input */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger data-testid="select-language">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <input
            type="text"
            placeholder="Describe what code you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="md:col-span-2 px-3 py-2 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            data-testid="input-ai-prompt"
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && prompt.trim() && handleGenerate()}
          />

          <Button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="bg-gradient-to-r from-primary to-accent"
            data-testid="button-generate-code"
          >
            {generateCodeMutation.isPending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {generateCodeMutation.isPending ? 'Generating...' : 'Generate'}
          </Button>
        </div>

        {/* AI Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleOptimize}
            disabled={isLoading || !code.trim()}
            data-testid="button-optimize-code"
          >
            {optimizeCodeMutation.isPending ? (
              <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Zap className="h-3 w-3 mr-2" />
            )}
            Optimize
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExplain}
            disabled={isLoading || !code.trim()}
            data-testid="button-explain-code"
          >
            {explainCodeMutation.isPending ? (
              <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <HelpCircle className="h-3 w-3 mr-2" />
            )}
            Explain
          </Button>

          <Button variant="outline" size="sm" onClick={handleCopy} data-testid="button-copy-code">
            <Copy className="h-3 w-3 mr-2" />
            Copy
          </Button>

          <Button variant="outline" size="sm" onClick={handleReset} data-testid="button-reset-code">
            <RotateCcw className="h-3 w-3 mr-2" />
            Reset
          </Button>
        </div>

        {/* Code Editor */}
        <div className="relative">

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-80 p-4 bg-card border border-border rounded-md font-mono text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={`Start typing your ${language} code or use AI generation...`}
            data-testid="textarea-code-editor"
          />
        </div>

        {/* Output */}
        {output && (
          <div className="p-4 bg-muted rounded-md border">
            <pre className="text-sm text-foreground whitespace-pre-wrap overflow-auto max-h-40" data-testid="text-code-output">
              {output}
            </pre>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Language: <span className="text-primary font-mono">{language}</span></span>
            <span>Lines: {code.split('\n').length}</span>
            <span>Characters: {code.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
            <span>{isLoading ? 'AI Processing...' : 'Ready'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
