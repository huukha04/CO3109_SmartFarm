"use client";

import React, { useEffect } from "react";
import SidebarLayout from "./layout";
import { LocationSelect } from "@/components/button/locationSelect";
import { SectionCard } from "@/app/sectionCard";
import { TimeSelect } from "@/components/button/timeSelect";
import { LiveChart } from "../liveChart";
import { useBreadcrumb } from "@/context/breadcrumbContext"
import { SensorType } from "@/types/sensor";

export default function Page() {
  const { setBreadcrumb } = useBreadcrumb();
  
    useEffect(() => {
      setBreadcrumb([
        { title: "Quản lí khu vực", href: "/location" },
      ])
    }, [setBreadcrumb]);
  
  const [locationId, setLocationId] = React.useState<string>("");
  const [time, setTime] = React.useState<string>("");

  return (
     <>
     
      {/* Header: Chọn khu vực */}
      <div className="flex flex-row justify-between px-4">
        <div className="text-2xl font-bold">Thông số môi trường</div>
        <div className="p-3 rounded-lg border border-blue-400 dark:border-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Chọn khu vực</label>
            <LocationSelect locationId={locationId} onChange={setLocationId} />
          </div>
        </div>
      </div>

      {/* SectionCard */}
      <div className="flex flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCard locationId={locationId} onLocationChange={setLocationId} />
          </div>
        </div>
      </div>

      <hr className="my-6 border-t border-gray-300 dark:border-gray-700" />

      {/* Header: Chọn thời gian */}
      <div className="flex flex-row justify-between px-4">
        <div className="text-2xl font-bold">Biểu đồ</div>
        <div className="p-3 rounded-lg border border-blue-400 dark:border-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Chọn thời gian</label>
            <TimeSelect time={time} onChange={setTime} />
          </div>
        </div>
      </div>

      {/* LiveChart */}
      <div className="flex flex-col">
        <div className="@container/main flex-1">
          <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 md:gap-6 md:py-6 lg:px-6">
            <LiveChart locationId={locationId} time={time} sensorType={SensorType.LIGHT} />
            <LiveChart locationId={locationId} time={time} sensorType={SensorType.TEMPERATURE} />
            <LiveChart locationId={locationId} time={time} sensorType={SensorType.HUMIDITY} />
            <LiveChart locationId={locationId} time={time} sensorType={SensorType.SOIL_MOISTURE} />
          </div>
        </div>
      </div>
     </>
  );
}
