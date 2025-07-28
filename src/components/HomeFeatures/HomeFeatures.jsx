import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faUndo,
  faShieldAlt,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

export default function HomeFeatures() {
  const features = [
    {
      icon: faTruck,
      title: "Free Delivery",
      subtitle: "Orders $50 or more",
    },
    {
      icon: faUndo,
      title: "30 Days Return",
      subtitle: "Satisfaction guaranteed",
    },
    {
      icon: faShieldAlt,
      title: "Secure Payment",
      subtitle: "100% protected checkout",
    },
    {
      icon: faHeadset,
      title: "24/7 Support",
      subtitle: "Ready to help anytime",
    },
  ];

  return (
    <div className="bg-gray-50 py-8"> {/* Full background */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-md shadow-sm text-sm"
            >
              <div className="bg-green-100 rounded-full p-2">
                <FontAwesomeIcon icon={feature.icon} className="text-green-600 text-base" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 text-xs">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
