import { useEffect, useState } from "react"
import { generatePrompt } from "../utils/generatePrompt"

export default function ResultStep({ appState }) {
  const [prompt, setPrompt] = useState("")
  const [acknowledged, setAcknowledged] = useState(false)

  useEffect(() => {
    const generated = generatePrompt(appState)
    setPrompt(generated)
  }, [appState])

  function copyToClipboard() {
    navigator.clipboard.writeText(prompt)
    alert("Prompt copied to clipboard")
  }

  return (
  <div style={{ padding: 20, background: "yellow", color: "black" }}>
    RESULT PAGE MOUNTED
  </div>
)

}

//   return (
//     <div className="rounded-xl border border-gray-200 p-4 bg-white">
//       <h2 className="text-xl font-semibold">
//         Generated Prompt
//       </h2>

//       {/* Disclaimer */}
//       <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
//         ⚠️ This generates a sample diet prompt only.  
//         This is NOT medical advice. Do not blindly follow it.
//       </div>

//       {/* PROMPT DISPLAY — ANDROID SAFE */}
//       <div
//         className="
//           mt-4 max-h-[70vh] overflow-y-auto
//           rounded-lg border border-gray-300 bg-gray-50
//           p-4 text-sm text-gray-800
//           font-mono whitespace-pre-wrap
//         "
//       >
//         {prompt || "Generating prompt..."}
//       </div>

//       {/* Acknowledgement */}
//       <div className="mt-4 flex items-start gap-2">
//         <input
//           type="checkbox"
//           checked={acknowledged}
//           onChange={e => setAcknowledged(e.target.checked)}
//         />
//         <span className="text-sm">
//           I understand this is only a sample and not medical advice
//         </span>
//       </div>

//       {/* Copy */}
//       <button
//         onClick={copyToClipboard}
//         disabled={!acknowledged}
//         className="
//           mt-4 w-full sm:w-auto
//           px-4 py-2 bg-black text-white rounded
//           disabled:opacity-50
//         "
//       >
//         Copy Prompt
//       </button>
//     </div>
//   )
// }
