// "use client";

// interface SummaryProps {
//   date?: string;
//   time?: string;
//   type?: string;
//   amount?: number;
//   healthConcern?: string;
// }

// const Summary = ({
//   date = "30/10/2025",
//   time = "2:00pm",
//   type = "Audio Call",
//   amount = 10000,
//   healthConcern = "I have been having pains in my lower abdomen for weeks now. I have taken medications prescribed by a pharmacist, but it has gotten worse. Whenever I try to urinate, I feel a sharp pain.",
// }: SummaryProps) => {
//   const data = [
//     {
//       text: "Date",
//       value: date,
//     },
//     {
//       text: "Time",
//       value: time,
//     },
//     {
//       text: "Type",
//       value: type,
//     },
//   ];

//   return (
//     <div className="mb-8">
//       <div className="rounded-lg border bg-white p-4">
//         <div className="space-y-2 border-b pb-4">
//           {data.map((item) => (
//             <div
//               key={item.text}
//               className="flex items-center justify-between"
//             >
//               <span className="text-sm text-gray-500">
//                 {item.text}
//               </span>

//               <span className="text-sm font-medium text-gray-900">
//                 {item.value}
//               </span>
//             </div>
//           ))}
//         </div>

//         <div className="flex items-center justify-between pt-4">
//           <span className="text-sm text-gray-500">
//             Total
//           </span>

//           <span className="text-sm font-semibold text-gray-900">
//             ₦{amount.toLocaleString()}
//           </span>
//         </div>
//       </div>

//       <div className="mt-6 rounded-lg border bg-white p-4">
//         <h3 className="text-sm font-semibold text-gray-900">
//           Health Concern
//         </h3>

//         <p className="mt-3 text-sm leading-6 text-gray-500">
//           {healthConcern}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Summary;