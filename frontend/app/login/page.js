"use client";
import { useEffect } from "react";
import React from "react";
import Form from "@/components/form";
import { getCookie, cookies } from "cookies-next";
import { redirect } from "next/navigation";
import { debounce } from "lodash";
function Page() {
  const debounceRedirect = debounce(() => {
    const USER = getCookie("USER");
    console.log("USER =>", typeof USER == "string");

    if (typeof USER == "string") {
      console.log("USER =>", typeof USER == "string");
      window.location.replace("/");
    }
  }, 1000);

  useEffect(() => {
    debounceRedirect();
  }, []);
  return (
    <div className="w-[100vw] h-screen flex justify-center items-center ">
      <Form />
    </div>
  );
}

export default Page;
