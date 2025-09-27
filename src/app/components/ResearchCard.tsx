// src/app/components/ResearchCard.tsx
"use client";

import React from "react";

type ResearchProps = {
  id: number;
  title: string;
  author: string;
  org: string;
  year: number;
  views: number;
  image: string;
};

export default function ResearchCard({ id, title, author, org, year, views, image }: ResearchProps) {
  return (
    <div className="flex items-center bg-white rounded-xl shadow-md overflow-hidden border mb-4">
      {/* ซ้าย: รูปภาพ */}
      <div className="w-48 h-32 flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* ขวา: รายละเอียด */}
      <div className="flex-1 p-4">
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{author}</p>
        <div className="flex items-center gap-6 text-sm text-gray-500 mt-2">
          <div className="flex items-center gap-1">
            <span className="material-icons text-base text-blue-500">apartment</span>
            {org}
          </div>
          <div className="flex items-center gap-1">
            <span className="material-icons text-base text-blue-500">event</span>
            {year}
          </div>
          <div className="flex items-center gap-1">
            <span className="material-icons text-base text-blue-500">visibility</span>
            {views}
          </div>
        </div>
      </div>
    </div>
  );
}
