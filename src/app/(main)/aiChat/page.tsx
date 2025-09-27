"use client";
import  { ChatContainer } from './chatContainer';

import { useEffect } from 'react';
import { useBreadcrumb } from '@/context/breadcrumbContext';
export default function Page() {
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([
      { title: "AI Chat", href: "/aiChat" },
    ])
  }, [setBreadcrumb]);
  
  return (
    <div className="h-full w-full">
      <ChatContainer />
    </div>
  );
}
