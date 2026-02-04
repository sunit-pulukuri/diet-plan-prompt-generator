const foodCategories = [
  {
    title: "Meat & Eggs",
    items: ["Chicken", "Mutton", "Fish", "Eggs"],
  },
  {
    title: "Dairy",
    items: ["Milk", "Curd", "Paneer"],
  },
  {
    title: "Plant Protein",
    items: ["Dal", "Chana", "Soy"],
  },
  {
    title: "Carbohydrates",
    items: ["Rice", "Roti", "Oats"],
  },
  {
    title: "Fats",
    items: ["Ghee", "Butter", "Nuts", "Seeds"],
  },
  {
    title: "Supplements",
    items: ["Whey Protein", "Creatine", "Multi Vitamins"],
  },
]

export default function FoodStep({ appState, setAppState }) {
  const preferences = appState.foodPreferences || {}

  function setPreference(food, value) {
    setAppState({
      ...appState,
      foodPreferences: {
        ...preferences,
        [food]: value,
      },
    })
  }

  function getButtonClass(current, value) {
    if (current === value) {
      if (value === "preferred") return "bg-black text-white"
      if (value === "acceptable") return "bg-gray-300"
      if (value === "avoid") return "bg-red-200"
    }
    return "border border-gray-300"
  }

  return (
    <div className="rounded-xl border border-gray-200 p-6 bg-white">
      <h2 className="text-xl font-semibold">Food Preferences</h2>
      <p className="mt-2 text-gray-600">
        Mark foods as preferred, acceptable, or to be avoided.
      </p>

      <div className="mt-6 space-y-6">
        {foodCategories.map(category => (
          <div key={category.title}>
            <h3 className="font-medium">{category.title}</h3>

            <div className="mt-3 space-y-3">
              {category.items.map(item => {
                const current = preferences[item] || ""

                return (
                  <div
                    key={item}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  >
                    {/* Food name */}
                    <span className="text-sm">{item}</span>

                    {/* MOBILE: dropdown */}
                    <select
                      value={current}
                      onChange={e =>
                        setPreference(item, e.target.value)
                      }
                      className="
                        sm:hidden
                        w-full rounded-lg border border-gray-300
                        px-3 py-2 text-sm
                        focus:outline-none focus:ring-2 focus:ring-black/10
                      "
                    >
                      <option value="">Select preference</option>
                      <option value="preferred">Preferred</option>
                      <option value="acceptable">Acceptable</option>
                      <option value="avoid">Avoid</option>
                    </select>

                    {/* DESKTOP: buttons */}
                    <div className="hidden sm:flex gap-2">
                      <button
                        onClick={() =>
                          setPreference(item, "preferred")
                        }
                        className={`px-3 py-1 rounded text-sm ${getButtonClass(
                          current,
                          "preferred"
                        )}`}
                      >
                        Preferred
                      </button>

                      <button
                        onClick={() =>
                          setPreference(item, "acceptable")
                        }
                        className={`px-3 py-1 rounded text-sm ${getButtonClass(
                          current,
                          "acceptable"
                        )}`}
                      >
                        Acceptable
                      </button>

                      <button
                        onClick={() =>
                          setPreference(item, "avoid")
                        }
                        className={`px-3 py-1 rounded text-sm ${getButtonClass(
                          current,
                          "avoid"
                        )}`}
                      >
                        Avoid
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
