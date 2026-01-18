import { useEffect, useState } from "react"
import { generatePrompt } from "../utils/generatePrompt"

export default function ResultStep({ appState }) {
  const [prompt, setPrompt] = useState("")
  const [acknowledged, setAcknowledged] = useState(false)

  useEffect(() => {
    setPrompt(generatePrompt(appState))
  }, [appState])

  function copyToClipboard() {
    navigator.clipboard.writeText(prompt)
    alert("Prompt copied to clipboard")
  }

  return (
    <div className="rounded-xl border border-gray-200 p-6 bg-white overflow-y-auto">
      <h2 className="text-xl font-semibold">
        Generated Prompt
      </h2>

      {/* Disclaimer */}
      <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
        ⚠️ This generates a sample diet prompt only.  
        Not medical advice. Do not blindly follow outputs.
      </div>

      {/* Prompt */}
      <textarea
        className="
          mt-6 w-full min-h-[60vh]
          rounded-lg border border-gray-300 bg-gray-50
          p-4 text-sm leading-relaxed font-mono text-gray-800
          focus:outline-none focus:ring-2 focus:ring-black/10
        "
        value={prompt}
        readOnly
      />

      {/* Acknowledgement */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={e => setAcknowledged(e.target.checked)}
        />
        <span className="text-sm">
          I understand this is only a sample and not medical advice
        </span>
      </div>

      {/* Copy button */}
      <button
        onClick={copyToClipboard}
        disabled={!acknowledged}
        className="
          mt-4 w-full sm:w-auto
          px-4 py-2 bg-black text-white rounded
          disabled:opacity-50
        "
      >
        Copy Prompt
      </button>
    </div>
  )
}
