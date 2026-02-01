export default function Wizard({ steps, currentStep, setCurrentStep }) {
  const StepComponent = steps[currentStep];

  return (
    <div className="mt-8">
      <StepComponent />

      <div className="flex justify-between mt-10">
        <button
          className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm hover:border-black transition disabled:opacity-40"
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={currentStep === 0}
        >
          Back
        </button>

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
