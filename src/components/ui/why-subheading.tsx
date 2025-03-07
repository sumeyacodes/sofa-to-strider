"use client"


import * as React from "react";
import { useState } from "react";
import Motivator from "../Motivator"
import ChatMotivator from "../ChatMotivator"

export default function WhySubheading() {
  const [doingChat, setDoingChat] = useState(false);
  return (
    <div className="max-w-4xl mx-auto">
      {/* Third Subheading */}
      <div>

        <h2 className="text-2xl md:text-3xl font-semibold text-[#4A7C59] text-center">
          WHY TO WALK
        </h2>
        <div className="flex items-center justify-start mt-3">
          <div className="h-[3px] w-12 bg-[#C8D5B9] mr-2"></div>
          <div className="h-[3px] w-24 bg-[#8FC0A9] mr-2"></div>
          <div className="h-[3px] w-12 bg-[#68B0AB]"></div>
        </div>

        <Motivator setDoingChat={setDoingChat} />
        {doingChat ? ( <ChatMotivator />) : (<></>)}

      </div>
    </div>
  );
}
