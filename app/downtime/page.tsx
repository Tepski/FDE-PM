import { Suspense } from "react";
import DowntimeClient from "./downtimeClient";

export default async function page() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DowntimeClient />
    </Suspense>
  )
}
