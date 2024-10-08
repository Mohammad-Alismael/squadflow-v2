import React from "react";
import Feature from "@/app/features/components/Feature";
export type Tfeature = {
  title: string;
  description: string;
  icon: string;
};
function FeatureList({
  title,
  features,
}: {
  title: string;
  features: Tfeature[];
}) {
  return (
    <div
      id={title}
      className="border-2 border-gray-200 rounded w-full space-y-2 p-4"
    >
      <h4 className="font-bold text-2xl capitalize pb-2">{title}</h4>
      <div className="grid grid-cols-2 gap-10 px-2">
        {features.map((feature) => (
          <Feature key={feature.title} data={feature} />
        ))}
      </div>
    </div>
  );
}

export default FeatureList;
