import { useCallback, useMemo, useState } from "react";
import Wizard from "./components/WIzard";
import ProgressBar from "./components/Progressbar";

import { initialState } from "./state/initialState";
import { useLocalStorage } from "./hooks/useLocalStorage";

import IntroStep from "./steps/Introstep";
import ProfileStep from "./steps/Profilestep";
import GoalStep from "./steps/Goalstep";
import FoodStep from "./steps/Foodstep";
import HabitsStep from "./steps/Habitsstep";
import ResultStep from "./steps/Resultsstep";

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [appState, setAppState] = useLocalStorage(
    "dietPromptState",
    initialState,
  );

  const handleReset = useCallback(() => {
    localStorage.removeItem("dietPromptState");
    setAppState(initialState);
    setCurrentStep(0);
    window.location.reload();
  }, [setAppState]);

  const steps = useMemo(
    () => [
      () => <IntroStep onReset={handleReset} />,
      () => <ProfileStep appState={appState} setAppState={setAppState} />,
      () => <GoalStep appState={appState} setAppState={setAppState} />,
      () => <FoodStep appState={appState} setAppState={setAppState} />,
      () => <HabitsStep appState={appState} setAppState={setAppState} />,
      () => (
        <ResultStep
          appState={appState}
          setAppState={setAppState}
          onReset={handleReset}
        />
      ),
    ],
    [appState, setAppState, handleReset],
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          Diet Prompt Generator
        </h1>
        <p className="mt-2 text-gray-500">
          Generate a clear, detailed diet prompt you can paste into any AI.
        </p>

        <div className="mt-8">
          <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
        </div>

        <div className="mt-8 animate-fade">
          <Wizard
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
      </div>
    </div>
  );
}
