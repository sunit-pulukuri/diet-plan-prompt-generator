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

  // --- Height helpers ---
  const MIN_CM = 50
  const MAX_CM = 275

  function toCm(value, unit) {
    if (unit === "cm") return value
    if (unit === "m") return value * 100
    if (unit === "in") return value * 2.54
    return value
  }

  function fromCm(cm, unit) {
    if (unit === "cm") return cm
    if (unit === "m") return +(cm / 100).toFixed(2)
    if (unit === "in") return Math.round(cm / 2.54)
    return cm
  }

  function getHeightOptions(unit) {
    const options = []
    for (let cm = MIN_CM; cm <= MAX_CM; cm++) {
      const displayValue = fromCm(cm, unit)
      options.push({
        cm,
        displayValue,
      })
    }
    return options
  }

  const heightUnit = profile.heightUnit || "cm"
  const heightOptions = getHeightOptions(heightUnit)

  return (
    <div className="rounded-xl border border-gray-200 p-6 bg-white">
      <h2 className="text-xl font-semibold">Basic Profile</h2>

      <div className="mt-6 space-y-5">

        {/* Age */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Age
          </label>
          <select
            value={profile.age}
            onChange={e => updateProfile("age", e.target.value)}
            className={inputClass}
          >
            <option value="">Select age</option>
            {Array.from({ length: 71 }, (_, i) => (
              <option key={i + 10} value={i + 10}>
                {i + 10}
              </option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Gender
          </label>
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
        {/* Height */}
<div>
  <label className="block text-sm text-gray-600 mb-1">
    Height
  </label>

  {/* Unit radios */}
  <div className="flex gap-4 mb-2">
    {["cm", "m", "in"].map(unit => (
      <label
        key={unit}
        className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer"
      >
        <input
          type="radio"
          name="heightUnit"
          value={unit}
          checked={heightUnit === unit}
          onChange={() => updateProfile("heightUnit", unit)}
        />
        {unit === "in" ? "inches" : unit}
      </label>
    ))}
  </div>

  {/* Height selector */}
  <select
    value={profile.height || ""}
    onChange={e => updateProfile("height", Number(e.target.value))}
    className={inputClass}
  >
    <option value="">Select height</option>
    {heightOptions.map(opt => (
      <option key={opt.cm} value={opt.cm}>
        {opt.displayValue} {heightUnit}
      </option>
    ))}
  </select>

  <p className="mt-1 text-xs text-gray-500">
    Valid range: 50 cm – 275 cm (auto-adjusts by unit)
  </p>
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
            <option value="Light">Light (gym 2–3x/week)</option>
            <option value="Moderate">Moderate (gym 4–5x/week)</option>
            <option value="High">High (physically active)</option>
          </select>
        </div>

        {/* Meals per day */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Meals per day
          </label>
          <select
            value={profile.mealsPerDay}
            onChange={e =>
              updateProfile("mealsPerDay", e.target.value)
            }
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
