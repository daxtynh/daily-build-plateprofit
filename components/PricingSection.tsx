"use client";

interface Props {
  onSubscribe: () => void;
  isLoading: boolean;
}

export default function PricingSection({ onSubscribe, isLoading }: Props) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-xl border border-green-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Unlock Full Access
        </h2>
        <p className="text-gray-600">
          Save hours on food costing and maximize your profit margins
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-sm">
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold text-gray-900">$19</span>
            <span className="text-gray-500">/month</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            or $149/year (save 35%)
          </p>
        </div>

        <ul className="space-y-3 mb-6">
          {[
            "Unlimited ingredients",
            "Unlimited recipes",
            "Profit margin dashboard",
            "Export to CSV",
            "Multi-location support",
            "Priority support",
          ].map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-gray-700">
              <svg
                className="w-5 h-5 text-green-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <button
          onClick={onSubscribe}
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Start Free Trial"}
        </button>

        <p className="text-xs text-gray-500 text-center mt-3">
          7-day free trial. Cancel anytime.
        </p>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Trusted by 500+ restaurants, food trucks, and bakeries
        </p>
      </div>
    </div>
  );
}
