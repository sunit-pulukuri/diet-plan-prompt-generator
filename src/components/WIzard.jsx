export default function Wizard({ steps, currentStep, setCurrentStep, appState, setAppState, onReset }) {
  const StepComponent = steps[currentStep];

  return (
    <div className="mt-8">
      <StepComponent appState={appState} setAppState={setAppState} onReset={onReset} />

      <div className="flex justify-between items-center mt-10">
        <button
          className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm hover:border-black transition disabled:opacity-40"
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={currentStep === 0}
        >
          Back
        </button>

        <div>
          ~ by {" "}
          <a className="font-semibold underline underline-offset-4" href="https://instagram.com/sunit_pulz" target="_blank">
            @sunit_pulz
          </a>
        </div>

        <button
          className="px-5 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-40"
          onClick={() => setCurrentStep((s) => s + 1)}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
