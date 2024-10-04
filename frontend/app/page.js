"use client";
import { useState, useEffect } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { getDrones, getDrone } from "@/hooks/drone";
import VideoPlayer from "@/components/VideoPlayer";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Drawer from "@mui/material/Drawer";
import copy from "clipboard-copy";
import { debounce } from "lodash";
export default function Home() {
  const [droneData, setDroneData] = useState([]);
  const [route, setRoute] = useState(0);
  const [droneUrl, setDroneUrl] = useState({});
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleCopyClick = async (text) => {
    try {
      await copy(text);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };
  const toggleDrawer = (newState) => () => {
    setOpen(newState);
  };

  const debounceLogout = debounce(() => {
    const user = getCookie("USER");

    if (!user) {
      router.push("/login");
    }
  }, 1000);

  useEffect(() => {
    getDrones()
      .then((res) => {
        setDroneData(res.data);
      })
      .catch((err) => {
        console.log(err?.rndom);
        if (err.response.status == 401) {
          deleteCookie("USER");
          router.push("/login");
        }
      });
    console.log("logout");
    const logout = () => {
      console.log("logout");
      const USER = getCookie("USER");

      if (!USER) {
        redirect("/login");
      }
    };
    debounceLogout();
  }, []);

  return (
    <main className="flex flex-col  ">
      <div
        style={{
          boxShadow: "0px 4px 48px 0px rgba(3, 32, 32, 0.20)",
          backdropFilter: "blur(35px)",
        }}
        className="px-3 mobile:px-6 tablet:px-12 navbar w-full h-[8vh] bg-[#1C1C1C] flex items-center justify-between flex-row-reverse tablet:flex-row "
      >
        <img className="w-9" src="/imgs/logo.png" />
        <img className=" w-0 tablet:w-36" src="/imgs/white_ops.png" />
        <div
          onClick={toggleDrawer(true)}
          className="flex flex-col gap-1 items-center justify-center w-12 h-12 rounded-full cursor-pointer tablet:h-[0px]"
        >
          <div className="bg-[#fff] h-1 w-6 rounded "></div>
          <div className="bg-[#fff] h-1 w-6 rounded "></div>
          <div className="bg-[#fff] h-1 w-6 rounded "></div>
        </div>
      </div>

      <Drawer
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#1c1c1c",

            padding: "5px",
            boxShadow: "0px 4px 48px 0px rgba(3, 32, 32, 0.20)",
            backdropFilter: "blur(35px)",
          },
        }}
        open={open}
        onClose={toggleDrawer(false)}
      >
        <div
          style={{}}
          className="flex flex-col h-full min-w-52 w-[40vw]  items-center justify-betwen"
        >
          <div className="flex flex-col w-full items-center">
            <div
              onClick={() => {
                setOpen(false);
                if (droneUrl != "") {
                  setRoute(1);
                }
              }}
              style={{
                boxShadow: "0px 4px 48px 0px rgba(3, 32, 32, 0.20)",
                backdropFilter: "blur(35px)",
              }}
              className="bg-[#E4E4E4] flex items-center justify-between w-[90%] mt-8 px-4 py-1 rounded-lg cursor-pointer"
            >
              <div>Live Operations</div>{" "}
              <img className="w-[25%] max-w-12" src="/imgs/camera.png" />
            </div>
            <div
              style={{
                boxShadow: "0px 4px 48px 0px rgba(3, 32, 32, 0.20)",
                backdropFilter: "blur(35px)",
              }}
              onClick={() => {
                setOpen(false);
                setRoute(0);
              }}
              className="bg-[#E4E4E4] flex items-center justify-between w-[90%] mt-4 px-4 py-1 cursor-pointer rounded-lg"
            >
              <div>Your Devices</div>{" "}
              <img className="w-[25%] max-w-12" src="/imgs/Drone.png" />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center w-full justify-end">
            <div
              style={{
                boxShadow: "0px 4px 48px 0px rgba(3, 32, 32, 0.20)",
                backdropFilter: "blur(35px)",
              }}
              onClick={() => {
                setOpen(false);
                window.open("tel:8800652481");
              }}
              className="bg-[#E4E4E4] flex  items-center justify-between w-[90%] mt-4 px-4 py-2 cursor-pointer rounded-lg"
            >
              <div>Support</div>{" "}
              <img className="w-[25%] max-w-8 h-8" src="support.svg" />
            </div>
            <div className="text-white mt-2 text-sm font-semibold">
              {" "}
              by GAMMA ROTORS INDIA{" "}
            </div>
            <div
              onClick={() => {
                deleteCookie("USER");
                router.push("/login");
              }}
              style={{
                boxShadow: "0px 4px 48px 0px rgba(3, 32, 32, 0.20)",
                backdropFilter: "blur(35px)",
              }}
              className="bg-[#E4E4E4] justify-center flex items-center w-[100%] mt-8 px-4 py-1  cursor-pointer"
            >
              <div>Logout</div>
            </div>{" "}
          </div>
        </div>
      </Drawer>
      <div className="h-[92vh] flex justify-between bg-[#BFBFBF]">
        <div
          style={{
            boxShadow: "0px 4px 48px 0px rgba(3, 32, 32, 0.20)",
            backdropFilter: "blur(35px)",
          }}
          className="flex flex-col h-full invisible tablet:visible w-0 tablet:w-[20vw] bg-[#424242] items-center justify-betwen"
        >
          <div className="flex flex-col w-full items-center">
            <div
              onClick={() => {
                if (droneUrl != "") {
                  setRoute(1);
                }
              }}
              style={{
                boxShadow: "0px 4px 48px 0px rgba(3, 32, 32, 0.20)",
                backdropFilter: "blur(35px)",
              }}
              className="bg-[#E4E4E4] flex items-center justify-between w-[80%] mt-8 px-4 py-1 rounded-lg cursor-pointer"
            >
              <div>Live Operations</div>{" "}
              <img className="w-12" src="/imgs/camera.png" />
            </div>
            <div
              style={{
                boxShadow: "0px 4px 48px 0px rgba(3, 32, 32, 0.20)",
                backdropFilter: "blur(35px)",
              }}
              onClick={() => {
                setRoute(0);
              }}
              className="bg-[#E4E4E4] flex items-center justify-between w-[80%] mt-4 px-4 py-1 cursor-pointer rounded-lg"
            >
              <div>Your Devices</div>{" "}
              <img className="w-12" src="/imgs/Drone.png" />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center w-full justify-end">
            <div
              style={{
                boxShadow: "0px 4px 48px 0px rgba(3, 32, 32, 0.20)",
                backdropFilter: "blur(35px)",
              }}
              onClick={() => {
                setOpen(false);
                window.open("tel:8800652481");
              }}
              className="bg-[#E4E4E4] flex  items-center justify-between w-[90%] mt-4 px-4 py-2 cursor-pointer rounded-lg"
            >
              <div>Support</div>{" "}
              <img className="w-[25%] max-w-8 h-8" src="support.svg" />
            </div>
            <div className="text-white mt-2 text-sm font-semibold">
              {" "}
              by GAMMA ROTORS INDIA{" "}
            </div>
            <div
              onClick={() => {
                deleteCookie("USER");
                router.push("/login");
              }}
              style={{
                boxShadow: "0px 4px 48px 0px rgba(3, 32, 32, 0.20)",
                backdropFilter: "blur(35px)",
              }}
              className="bg-[#E4E4E4] justify-center flex items-center w-[100%] mt-8 px-4 py-1  cursor-pointer"
            >
              <div>Logout</div>
            </div>{" "}
          </div>
        </div>
        <div className="flex h-full flex-row w-[100vw] tablet:w-[80vw]  ">
          {route == 0 ? (
            <>
              {droneData.length > 0 ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    gap: "1px",
                    flexWrap: "wrap",
                    justifyContent: "start",
                    alignItems: "space-evenly",
                    alignContent: "flex-start",
                    padding: "4px",
                    // background:"red",
                    marginLeft: "2%",
                    marginTop: "2%",
                    height: "90vh",
                    gap: "3%",
                  }}
                >
                  {droneData.map((drone) => {
                    return (
                      <div className="flex flex-col gap-1 w-56 tablet:w-[20vw] bg-[#E3E3E3] rounded-xl mt-0">
                        <div
                          onClick={() => {
                            getDrone(drone.id)
                              .then((res) => {
                                setDroneUrl(res.data);

                                setRoute(1);
                              })
                              .catch((err) => {
                                console.log(err?.rmessage);
                              });
                          }}
                          className="flex gap-2 flex-col px-1 py-1  w-full"
                        >
                          <div className="rounded-xl flex justify-center w-full">
                            <img
                              className="rounded-xl w-fit h-22"
                              src={`${drone.image}`}
                            />
                          </div>
                        </div>
                        <div className="flex  flex-row justify-between px-5 items-center -mt-2 mb-2 ">
                          <div className="text-[#000000] text-lg font-bold">
                            {drone.name}
                          </div>
                          <div
                            className="text-center text-white underline cursor-pointer mt-2"
                            onClick={() => {
                              handleCopyClick(
                                `rtmp://ec2-13-234-67-50.ap-south-1.compute.amazonaws.com/live/${drone?.joinning_url}`,
                              );
                            }}
                          >
                            <img className="w-18 h-8" src="copy.svg" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
            </>
          ) : route == 1 ? (
            <div className="w-full h-full">
              <VideoPlayer room={droneUrl?.id} url={droneUrl?.url} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  );
}
