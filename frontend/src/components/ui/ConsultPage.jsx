// "use client";
// import React from "react";
// import dynamic from "next/dynamic";

// const World = dynamic(() => import("./globe").then((m) => m.World), {
//   ssr: false,
// });

// export function ConsultPage() {
//   const globeConfig = {
//     globeColor: "#062056",
//     emissive: "#062056",
//   };

//   return (
//     <div className="w-full h-screen flex items-center justify-center bg-black">
//       <World globeConfig={globeConfig} arcs={[]} />
//     </div>
//   );
// }
