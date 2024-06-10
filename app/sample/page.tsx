import { Suspense } from "react";
import Data from "./Data";

export default async function Sample() {
  await new Promise((resolve) => {
    resolve(null);
  });

  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
        <Data />
      </Suspense>
    </div>
  );
}
