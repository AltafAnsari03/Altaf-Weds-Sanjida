// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, ZoomIn } from "lucide-react";
// import { WEDDING_CONFIG } from "@/config/wedding";

// interface GalleryImage {
//   src: string;
//   caption: string;
// }

// export default function Gallery() {
//   const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

//   // Disable main page scroll when lightbox modal is active
//   useEffect(() => {
//     if (activeImage) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [activeImage]);

//   return (
//     <section
//       id="gallery"
//       className="relative py-24 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden z-10"
//     >
//       {/* Background ambient gold glows */}
//       <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-gold-600/5 rounded-full blur-[90px] pointer-events-none" />
//       <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-gold-500/5 rounded-full blur-[90px] pointer-events-none" />

//       <div className="max-w-5xl w-full flex flex-col items-center gap-16 relative">
//         {/* Section Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="flex flex-col items-center text-center animate-fade-in"
//         >
//           <span className="text-gold-500 font-serif text-[11px] md:text-xs tracking-[0.25em] uppercase mb-2">
//             Captured Moments
//           </span>
//           <h3 className="font-cinzel text-2xl md:text-3xl font-semibold text-gold-100 uppercase tracking-widest">
//             Wedding Gallery
//           </h3>
//           <div className="h-[1px] w-20 bg-gold-500/40 mt-3" />
//         </motion.div>

//         {/* Gallery Image Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full px-2">
//           {WEDDING_CONFIG.gallery.map((image, index) => {
//             return (
//               <motion.div
//                 key={image.src}
//                 className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer group border border-gold-500/10 shadow-lg"
//                 initial={{ opacity: 0, y: 35 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-50px" }}
//                 transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
//                 onClick={() => setActiveImage(image)}
//               >
//                 {/* Main Image */}
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src={image.src}
//                   alt={image.caption}
//                   className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                   loading="lazy"
//                 />

//                 {/* Darken/Gold Glow Overlay on Hover */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/20 to-transparent opacity-60 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6" />

//                 {/* Hover Content */}
//                 <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-4 z-10 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                   <span className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30 flex items-center justify-center mb-3">
//                     <ZoomIn className="w-4 h-4" />
//                   </span>
//                   <p className="font-cinzel text-xs md:text-sm text-gold-200 tracking-wider">
//                     {image.caption}
//                   </p>
//                 </div>

//                 {/* Edge gold trim frame */}
//                 <div className="absolute inset-0 border border-transparent group-hover:border-gold-500/20 rounded-2xl transition-colors duration-500 pointer-events-none" />
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Lightbox Animated Overlay Modal */}
//       <AnimatePresence>
//         {activeImage && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-black/95 backdrop-blur-md p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             onClick={() => setActiveImage(null)}
//           >
//             {/* Close Button absolute */}
//             <button
//               onClick={() => setActiveImage(null)}
//               className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-full bg-luxury-gray/80 border border-gold-500/20 text-gold-400 cursor-pointer hover:text-gold-200 hover:border-gold-400 transition-colors"
//               aria-label="Close image popup"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             {/* Modal Image Wrapper */}
//             <motion.div
//               className="relative max-w-4xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               onClick={(e) => e.stopPropagation()} // Prevent closing when tapping image itself
//             >
//               {/* eslint-disable-next-line @next/next/no-img-element */}
//               <img
//                 src={activeImage.src}
//                 alt={activeImage.caption}
//                 className="max-w-full max-h-[80vh] object-contain rounded-xl border border-gold-500/30 shadow-2xl bg-luxury-dark"
//               />
              
//               {/* Image Caption below inside modal */}
//               <p className="mt-4 font-cinzel text-sm md:text-base text-gold-300 tracking-widest text-center select-all">
//                 {activeImage.caption}
//               </p>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }
