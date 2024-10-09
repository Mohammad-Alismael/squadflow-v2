import AuthForm from "@/components/AuthForm";
import React from "react";
import Link from "next/link";
import FeatureList from "@/app/features/components/FeatureList";
import features from "./features.json";
import SectionNavigator from "@/app/features/components/SectionNavigator";

export default async function Page({
  params,
  searchParams,
}: {
  params: { workspaceId: string };
  searchParams?: { [key: string]: string };
}) {
  return (
    <div className="flex justify-between sm:space-x-4 p-4">
      <SectionNavigator />
      <div className="rounded-lg shadow-lg p-4 transition-shadow duration-200 ease-in-out bg-white space-y-4">
        {features["features"].map((feature: any) => {
          const title = Object.keys(feature)[0];
          return (
            <FeatureList key={title} title={title} features={feature[title]} />
          );
        })}
      </div>
    </div>
  );
}
