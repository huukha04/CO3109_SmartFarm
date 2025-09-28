"use client";

import React, { useEffect } from "react";
import { LocationSelect } from "@/components/button/locationSelect";
import { SectionCard } from "@/app/sectionCard";
import { TimeSelect } from "@/components/button/timeSelect";
import { LiveChart } from "../liveChart";
import { useBreadcrumb } from "@/context/breadcrumbContext"
import { SensorType } from "@/types/sensor";
import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  const { setBreadcrumb } = useBreadcrumb();
  
    useEffect(() => {
      setBreadcrumb([
        { title: "Trang chủ", href: "/" },
      ])
    }, [setBreadcrumb]);
  
  const [locationId, setLocationId] = React.useState<string>("");
  const [time, setTime] = React.useState<string>("");

  return (
     <>
     
      {/* Header: Chọn khu vực */}
      <Card>
        <CardHeader>
          <div className="text-xl font-bold">Thông số môi trường</div>
          <Separator className="my-2"/>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Chọn khu vực</label>
              <LocationSelect locationId={locationId} onChange={setLocationId} />
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="p-0">
        <CardContent>
          <div className="flex flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCard locationId={locationId} onLocationChange={setLocationId} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      
      {/* SectionCard */}
      

      <hr className="my-6 mx-6 border-t border-gray-300 dark:border-gray-700" />

      {/* Header: Chọn thời gian */}
       <Card>
        <CardHeader>
          <div className="text-xl font-bold">Biểu đồ</div>
          <Separator className="my-2"/>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Chọn thời gian</label>
            <TimeSelect time={time} onChange={setTime} />
          </div>
        </CardHeader>
      </Card>

      {/* LiveChart */}
      <Card className="p-0">
        <CardContent>
          <div className="flex flex-col">
            <div className="@container/main flex-1">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:gap-6 my-6">
                <LiveChart locationId={locationId} time={time} sensorType={SensorType.LIGHT} />
                <LiveChart locationId={locationId} time={time} sensorType={SensorType.TEMPERATURE} />
                <LiveChart locationId={locationId} time={time} sensorType={SensorType.HUMIDITY} />
                <LiveChart locationId={locationId} time={time} sensorType={SensorType.SOIL_MOISTURE} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
     </>
  );
}
