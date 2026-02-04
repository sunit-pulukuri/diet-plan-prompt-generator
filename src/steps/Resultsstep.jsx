import { useMemo, useState } from "react";
import { generatePrompt } from "../utils/generatePrompt";

export default function ResultStep({ appState, setAppState, onReset }) {
  const prompt = useMemo(() => generatePrompt(appState), [appState]);
  const [acknowledged, setAcknowledged] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(prompt);
    alert("Prompt copied to clipboard");
  }

  function openInChatGPT() {
    const encodedPrompt = encodeURIComponent(prompt);
    window.open(`https://chatgpt.com?prompt=${encodedPrompt}`, "_blank");
  }

  // function openInGrok() {
  //   const encodedPrompt = encodeURIComponent(prompt);
  //   window.open(`https://grok.com?q=${encodedPrompt}`, "_blank");
  // }

  return (
    <div className="rounded-xl border border-gray-200 p-4 bg-white">
      <h2 className="text-xl font-semibold">Generated Prompt</h2>

      {/* Disclaimer */}
      <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
        ⚠️ This generates a sample diet prompt only. This is NOT medical advice.
        Do not blindly follow it.
      </div>

      {/* PROMPT DISPLAY — ANDROID SAFE */}
      <div
        className="
          mt-4 max-h-[30vh] overflow-y-auto
          rounded-lg border border-gray-300 bg-gray-50
          p-4 text-sm text-gray-800
          font-mono whitespace-pre-wrap
        "
      >
        {prompt || "Generating prompt..."}
      </div>

      {/* Acknowledgement */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(e) => setAcknowledged(e.target.checked)}
        />
        <span className="text-sm">
          I understand that this is only a sample and not medical advice
        </span>
      </div>

      {/* Copy */}
      <div className="mt-4 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={copyToClipboard}
            disabled={!acknowledged}
            className="
            w-full sm:w-auto
            px-4 py-2 bg-black text-white rounded font-semibold
            disabled:opacity-50
            flex items-center justify-center gap-2
          "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              className="size-4"
            >
              <g
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              >
                <rect width={14} height={14} x={8} y={8} rx={2} ry={2}></rect>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
              </g>
            </svg>
            Copy Prompt
          </button>
          <button
            onClick={openInChatGPT}
            disabled={!acknowledged}
            className="
            w-full sm:w-auto
            px-4 py-2 bg-[#00A67E] text-white rounded font-semibold
            disabled:opacity-50
            flex items-center justify-center gap-2
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={48}
              height={48}
              viewBox="0 0 48 48"
              className="size-5"
            >
              <path
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                d="M18.38 27.94v-14.4l11.19-6.46c6.2-3.58 17.3 5.25 12.64 13.33"
                strokeWidth={2}
              ></path>
              <path
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                d="m18.38 20.94l12.47-7.2l11.19 6.46c6.2 3.58 4.1 17.61-5.23 17.61"
                strokeWidth={2}
              ></path>
              <path
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                d="m24.44 17.44l12.47 7.2v12.93c0 7.16-13.2 12.36-17.86 4.28"
                strokeWidth={2}
              ></path>
              <path
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                d="M30.5 21.2v14.14L19.31 41.8c-6.2 3.58-17.3-5.25-12.64-13.33"
                strokeWidth={2}
              ></path>
              <path
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                d="m30.5 27.94l-12.47 7.2l-11.19-6.46c-6.21-3.59-4.11-17.61 5.22-17.61"
                strokeWidth={2}
              ></path>
              <path
                fill="none"
                stroke="#fff"
                strokeLinejoin="round"
                d="m24.44 31.44l-12.47-7.2V11.31c0-7.16 13.2-12.36 17.86-4.28"
                strokeWidth={2}
              ></path>
            </svg>
            Open in ChatGPT
          </button>
          {/* <button
            onClick={openInGrok}
            disabled={!acknowledged}
            className="
          w-full sm:w-auto
            px-4 py-2 bg-neutral-300 text-black rounded font-semibold
            disabled:opacity-50
            flex items-center justify-center gap-2
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fill="#000"
                d="M4.94 4.96a9.97 9.97 0 0 1 10.835-2.182a8.7 8.7 0 0 1 2.033 1.11l-3.006 1.39C12.003 4.101 8.797 4.9 6.84 6.86c-2.564 2.565-3.146 6.954-.36 9.922l.278.284L.124 23c1.875-1.973 3.771-4.427 2.636-7.19c-1.52-3.698-.635-8.03 2.18-10.85M23.9.1c-2.264 3.174-3.184 5.389-2.197 9.64l-.007-.007c.753 3.201-.052 6.75-2.653 9.355c-3.279 3.285-8.526 4.016-12.847 1.06L9.21 18.75c2.758 1.084 5.775.607 7.943-1.564c2.169-2.17 2.655-5.332 1.566-7.963c-.207-.5-.828-.625-1.263-.304L8.59 15.472l12.7-12.77v.01z"
              ></path>
            </svg>
            Open in Grok
          </button> */}
        </div>
        <button
          onClick={onReset}
          className="
            w-full sm:w-auto
            px-4 py-2 bg-neutral-800 text-white rounded
          "
        >
          Reset
        </button>
      </div>
    </div>
  );
}
