export default function IntroStep({ onReset }) {
  return (
    <div className="rounded-xl border border-gray-200 p-6 bg-white">
      <h2 className="text-xl font-semibold">Welcome</h2>
      <p className="mt-2 text-gray-600">
        This tool helps you generate a detailed diet prompt for AI models.
      </p>
      <button onClick={onReset} className="text-sm underline mt-4">
        Reset
      </button>
    </div>
  )
}
