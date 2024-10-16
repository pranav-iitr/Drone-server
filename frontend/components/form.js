"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { setCookie } from "cookies-next";
import { generateOTPrequest, verifyOTPRequest } from "@/hooks/auth";
import { useRouter } from "next/navigation";

function Form() {
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [otpStatus, setOtpStatus] = useState(false);
  const [gol, setGol] = useState(false);
  const [vol, setVol] = useState(false);

  const router = useRouter();
  const emailValidation = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const otpValidation = (otp) => {
    return otp.length == 4;
  };
  return (
    <div
      style={{
        backdropFilter: "blur(35px)",
        boxShadow: "0px 4px 48px 0px rgba(3, 32, 32, 0.20)",
      }}
      className="flex bg-[#FFF] justify-evenly flex-col tablet:flex-row tablet:justify-normal tablet h-full w-full tablet:w-[90%]  laptop:w-[80vw] tablet:h-fit  "
    >
      <Toaster />
      <div className=" w-0 tablet:w-[50%]  ">
        <img
          className="h-0 max-h-[100vh] h-screen-ios min-h-screen-ios  tablet:h-full"
          src="/imgs/bg.png"
        />{" "}
      </div>
      <div className="flex max-w-[100vw] w-full tablet:w-[50%]  flex-col grow items-center">
        <div className="pt-8 ">
          <img src="/imgs/Live_Ops.webp" className="w-36 h-12" />
        </div>
        <div
          style={{
            backdropFilter: "blur(35px)",
            boxShadow: "0px 4px 48px 0px rgba(3, 32, 32, 0.20)",
          }}
          className="w-[80%]  flex items-center flex-col rounded-xl mt-6 laptop:mt-8 px-4 laptop:px-16 py-5 bg-[#F0F0F0]"
        >
          <h1 className={`  font-medium text-3xl px-3 py-1 text-[#535353]`}>
            {" "}
            Log In{" "}
          </h1>
          <input
            className=" mt-12 laptop:mt-16 w-full bg-[#FFF] backdrop-blur-lg rounded-md text-xl pl-8 py-4 laptop:py-6 rounded-m"
            placeholder="Organization Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className=" w-full flex justify-end mt-4 ">
            {!otpStatus ? (
              <div
                onClick={() => {
                  if (emailValidation(email) && gol == false) {
                    setGol(true);

                    generateOTPrequest(email)
                      .then((res) => {
                        toast.success("OTP Sent");
                        setOtpStatus(true);
                        setGol(false);
                      })
                      .catch((err) => {
                        console.log(err?.rmessage);
                        toast.error("Invalid Email");
                        setGol(false);
                      });
                  } else {
                    toast.error("Invalid Email");
                  }
                }}
                className="bg-[#181818] text-[#fff] px-4 py-2 rounded-2xl cursor-pointer "
              >
                {gol ? "Generating Otp" : "Request OTP"}
              </div>
            ) : (
              <></>
            )}
          </div>
          <input
            className="mt-4 w-full bg-[#FFF] backdrop-blur-lg rounded-md text-xl pl-8 py-4 laptop:py-6 rounded-m"
            placeholder="Send Otp"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
          />
          <div
            onClick={() => {
              if (otpValidation(OTP) && otpStatus && vol == false) {
                setVol(true);
                verifyOTPRequest({ email: email, email_otp: OTP })
                  .then((res) => {
                    toast.success("OTP Verified");

                    setCookie("token", res.data.access_token, {
                      maxAge: 30 * 24 * 60 * 60,
                    });
                    setVol(false);
                    setCookie("USER", res.data.user, {
                      maxAge: 30 * 24 * 60 * 60,
                    });
                    router.push("/");
                  })
                  .catch((err) => {
                    setVol(false);
                    toast.error("Invalid OTP");
                  });
              } else {
                toast.error("Genrate OTP");
              }
            }}
            className="bg-[#181818] w-full flex mt-8  justify-center items-center text-[#fff] px-4 py-4 laptop:py-6 rounded-2xl cursor-pointer "
          >
            {vol ? "veryfing" : "Submit"}
          </div>
        </div>
        <img
          className="h-20 m-8 tablet:h-0 tablet:h-0"
          src="/imgs/mobileLogo.webp"
        />
      </div>
    </div>
  );
}

export default Form;
