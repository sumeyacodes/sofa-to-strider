import * as React from "react";

//import { Button } from "@/components/ui/button";
import Motivator from "../Motivator"

export default function WhySubheading() {

// const motivations : string[] = [
//   "Boost your mood for up to 12 hours! A brisk walk can release endorphins that keep you feeling good.",
//   "Improve your sleep tonight! A daytime walk helps regulate your sleep-wake cycle.",
//   "Sharpen your focus! Walking increases blood flow to the brain, enhancing cognitive function.",
//   "Strengthen your heart! Regular walking reduces your risk of heart disease.",
//   "Lower your stress levels! A walk in nature reduces cortisol, the stress hormone.",
//   "Increase your energy levels! Walking improves circulation and oxygen flow, fighting fatigue.",
//   "Burn extra calories! An hour's walk contributes to weight management.",
//   "Improve your balance! Walking strengthens muscles and improves stability.",
//   "Enhance your creativity! A walk can spark new ideas and break through mental blocks.",
//   "Strengthen your bones! Walking is a weight-bearing exercise that helps prevent osteoporosis.",
//   "Reduce joint pain! Walking can lubricate joints and improve mobility.",
//   "Lower blood pressure! Regular walks contribute to healthy blood pressure levels.",
//   "Improve digestion! Walking helps stimulate your digestive system.",
//   "Boost your immune system! Moderate exercise like walking can strengthen your body's defenses.",
//   "Increase your vitamin D! Walking outdoors exposes you to sunlight, essential for vitamin D production.",
//   "Improve your self-esteem! Achieving your walking goals boosts confidence.",
//   "Reduce risk of type 2 diabetes! Walking helps regulate blood sugar levels.",
//   "Improve lung capacity! Walking deepens breathing and strengthens respiratory muscles.",
//   "Increase your lifespan! Regular physical activity like walking is linked to longevity.",
//   "Enhance your social connection! Walking with friends or family strengthens relationships.",
//   "Reduce symptoms of depression and anxiety! Walking has been shown to be effective in improving mental health."
// ]
    
   
    


  return (

    <div className="max-w-4xl mx-auto">
      {/* Third Subheading */}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#4A7C59]">
          WHY TO GO
        </h2>
        <div className="flex items-center justify-start mt-3">
          <div className="h-[3px] w-12 bg-[#C8D5B9] mr-2"></div>
          <div className="h-[3px] w-24 bg-[#8FC0A9] mr-2"></div>
          <div className="h-[3px] w-12 bg-[#68B0AB]"></div>
        </div>
      
        <Motivator />
        </div>
    </div>
  );
}








//     <div className="space-y-12 p-8 max-w-4xl mx-auto">
//       {/* Third Subheading */}
//       <Button className="text-2xl md:text-3xl font-semibold bg-[#68B0AB] hover:bg-[#4A7C59] text-white w-full justify-start px-4 py-6 h-auto">WHY TO GO
        
//         <div className="flex items-center ml-4">
//           <span className="h-[6px] w-[6px] rounded-full bg-white mr-2"></span>
//           <span className="h-[6px] w-[6px] rounded-full bg-white mr-2"></span>
//           <span className="h-[6px] w-[6px] rounded-full bg-white"></span>
//         </div>
//       </Button>
//       <div>
//         <Motivator />
       
//       </div>
//       </div>
//   );
// }
