import * as React from "react";

import { Button } from "@/components/ui/button";

export default function WhySubheading() {
  return (
    <div className="space-y-12 p-8 max-w-4xl mx-auto">
      {/* Third Subheading */}
      <Button className="text-2xl md:text-3xl font-semibold bg-[#68B0AB] hover:bg-[#4A7C59] text-white w-full justify-start px-4 py-6 h-auto">
        Why should you go?
        <div className="flex items-center ml-4">
          <span className="h-[6px] w-[6px] rounded-full bg-white mr-2"></span>
          <span className="h-[6px] w-[6px] rounded-full bg-white mr-2"></span>
          <span className="h-[6px] w-[6px] rounded-full bg-white"></span>
        </div>
      </Button>
    </div>
  );
}
