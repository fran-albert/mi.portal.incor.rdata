import React from "react";
import { auth } from "@/auth";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    return <div>loading...</div>;
  }

  return <div>{JSON.stringify(session, null, 2)}</div>;
}
