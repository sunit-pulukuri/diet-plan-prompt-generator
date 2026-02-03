export default function ProfileStep({ appState, setAppState }) {
  const profile = appState.profile

  function updateProfile(key, value) {
    setAppState({
      ...appState,
      profile: {
        ...profile,
        [key]: value,
      },
    })
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10 transition"

  /* ---------------- HEIGHT ---------------- */
  const MIN_HEIGHT_CM = 50
  const MAX_HEIGHT_CM = 275
  const heightUnit = profile.heightUnit || "cm"

  function heightFromCm(cm, unit) {
    if (unit === "cm") return cm
    if (unit === "m") return +(cm / 100).toFixed(2)
    if (unit === "in") return Math.round(cm / 2.54)
    return cm
  }

  function heightToCm(value, unit) {
    if (unit === "cm") return value
    if (unit === "m") return Math.round(value * 100)
    if (unit === "in") return Math.round(value * 2.54)
    return value
  }

  function getHeightMinMax(unit) {
    if (unit === "cm") return { min: 50, max: 275 }
    if (unit === "m") return { min: 0.5, max: 2.75 }
    if (unit === "in") return { min: 20, max: 108 }
    return { min: 50, max: 275 }
  }

  const heightMinMax = getHeightMinMax(heightUnit)

  /* ---------------- WEIGHT ---------------- */
  const MIN_WEIGHT_KG = 30
  const MAX_WEIGHT_KG = 250
  const weightUnit = profile.weightUnit || "kg"

  function weightFromKg(kg, unit) {
    if (unit === "kg") return kg
    if (unit === "lb") return Math.round(kg * 2.20462)
    return kg
  }

  function weightToKg(value, unit) {
    if (unit === "kg") return value
    if (unit === "lb") return Math.round(value / 2.20462)
    return value
  }

  function getWeightMinMax(unit) {
    if (unit === "kg") return { min: 30, max: 250 }
    if (unit === "lb") return { min: 66, max: 551 }
    return { min: 30, max: 250 }
  }

  const weightMinMax = getWeightMinMax(weightUnit)

  return (
    <div className="rounded-xl border border-gray-200 p-6 bg-white">
      <h2 className="text-xl font-semibold">Basic Profile</h2>

      <div className="mt-6 space-y-5">

        {/* Age */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Age (years)</label>
          <input
            type="number"
            min={10}
            max={80}
            value={profile.age ?? ""}
            onChange={e => updateProfile("age", e.target.value === "" ? null : Number(e.target.value))}
            className={inputClass}
            placeholder="Enter age (10-80)"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Gender</label>
          <select
            value={profile.gender}
            onChange={e => updateProfile("gender", e.target.value)}
            className={inputClass}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        {/* Height */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Height</label>

          <div className="flex gap-4 mb-2">
            {["cm", "m", "in"].map(unit => (
              <label key={unit} className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="heightUnit"
                  checked={heightUnit === unit}
                  onChange={() => updateProfile("heightUnit", unit)}
                />
                {unit === "in" ? "inches" : unit}
              </label>
            ))}
          </div>

          <input
            type="number"
            min={heightMinMax.min}
            max={heightMinMax.max}
            step={heightUnit === "m" ? 0.01 : 1}
            value={profile.height != null ? heightFromCm(profile.height, heightUnit) : ""}
            onChange={e => {
              const val = e.target.value
              updateProfile("height", val === "" ? null : heightToCm(Number(val), heightUnit))
            }}
            className={inputClass}
            placeholder={`Enter height (${heightMinMax.min}-${heightMinMax.max} ${heightUnit})`}
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Current Body Weight
          </label>

          <div className="flex gap-4 mb-2">
            {["kg", "lb"].map(unit => (
              <label key={unit} className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="weightUnit"
                  checked={weightUnit === unit}
                  onChange={() => updateProfile("weightUnit", unit)}
                />
                {unit}
              </label>
            ))}
          </div>

          <input
            type="number"
            min={weightMinMax.min}
            max={weightMinMax.max}
            value={profile.weight != null ? weightFromKg(profile.weight, weightUnit) : ""}
            onChange={e => {
              const val = e.target.value
              updateProfile("weight", val === "" ? null : weightToKg(Number(val), weightUnit))
            }}
            className={inputClass}
            placeholder={`Enter weight (${weightMinMax.min}-${weightMinMax.max} ${weightUnit})`}
          />
        </div>

        {/* Training Type */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Primary Training Type
          </label>
          <select
            value={profile.trainingType}
            onChange={e => updateProfile("trainingType", e.target.value)}
            className={inputClass}
          >
            <option value="">Select training type</option>
            <option value="Strength training">
              Strength training (weights / resistance)
            </option>
            <option value="Cardio focused">
              Cardio focused (running, cycling, sports)
            </option>
            <option value="Mixed">
              Mixed (weights + cardio)
            </option>
            <option value="Not training">
              Not training currently
            </option>
          </select>
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Activity Level
          </label>
          <select
            value={profile.activityLevel}
            onChange={e =>
              updateProfile("activityLevel", e.target.value)
            }
            className={inputClass}
          >
            <option value="">Select activity level</option>
            <option value="Sedentary">Sedentary</option>
            <option value="Light">Light</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Meals */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Meals per day
          </label>
          <select
            value={profile.mealsPerDay}
            onChange={e => updateProfile("mealsPerDay", e.target.value)}
            className={inputClass}
          >
            <option value="">Select meals per day</option>
            {Array.from({ length: 9 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Daily Food Budget
          </label>
          <select
            value={profile.budget}
            onChange={e => updateProfile("budget", e.target.value)}
            className={inputClass}
          >
            <option value="">Select budget</option>
            <option value="₹100–150">₹100–150</option>
            <option value="₹150–250">₹150–250</option>
            <option value="₹250–400">₹250–400</option>
            <option value="₹400+">₹400+</option>
          </select>
        </div>

      </div>
    </div>
  )
}
