"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

export type BreadcrumbItemType = { title: string; href?: string };

interface BreadcrumbContextType {
  breadcrumb: BreadcrumbItemType[];
  setBreadcrumb: (items: BreadcrumbItemType[]) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItemType[]>([]);
  return (
    <BreadcrumbContext.Provider value={{ breadcrumb, setBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) throw new Error("useBreadcrumb must be used within BreadcrumbProvider");
  return context;
};
