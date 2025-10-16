"use client"; // Add this line
import React, { useState } from "react";
// import Image from "next/image";
import UserNodesChart from "./Charts/UserNodesChart";
import ProviderNodesChart from "./Charts/ProviderNodesChart";
import NodeGrowthChart from "./Charts/NodeGrowthChart";
import AccountsDIDChart from "./Charts/AccountsDIDChart";
import FilesDIDChart from "./Charts/FilesDIDChart";
import ActiveParticipantsChart from "./Charts/ActiveParticipantsChart";
import Icon from "./Charts/Icon";

export default function Home() {
  const [routerState, setRouterState] = useState<string>("User Nodes");
  const [timeframe, setTimeframe] = useState<"Day" | "Week" | "Month">("Day");
  const [number, setNumber] = useState<string>("403,207");

  const handleChnageRouter = (state: string, num: string) => {
    setRouterState(state);
    setNumber(num)
  };

  return (
    <div className="m-full h-full">
      <div className=" w-full flex justify-between items-center h-[104px] bg-[#051610] px-5 md:px-[100px]">
        <p className="font-normal text-[36px] leading-[43.57px] font-inter text-white">
          <a href="https://memolabs.org">memo-data info</a>
        </p>
        <div className="flex justify-between space-x-10 items-center">
          <div className="flex items-center justify-between">
            <div className="hidden lg:block md:ml-6">
              <div className="flex lg:space-x-14 md:space-x-5 text-white">
                <a href="#about" className=" font-[400] text-[18px] font-inter">
                  Overview
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 md:space-x-7 items-center">
          {/* <button className="items-ceter rounded-full bg-white text-black font-[500] text-[18px] p-2  px-3">LOG IN</button> */}
          {/* <button className="items-ceter rounded-full bg-[#00673C] text-white font-[500] text-[18px]  p-2 px-3">SIGN IN</button> */}
        </div>
      </div>
      <div className=" mx-auto h-full flex flex-col items-center justify-center px-5">
        <div className="flex items-center justify-center space-x-2 md:space-x-20 py-10">
          <div className="w-full flex flex-col justify-center ">
            <div className="text-white font-[700] text-center text-[30px] font-inter ">
              {routerState}
            </div>
            <div className="text-white font-[400] text-center text-[14px] font-inter">
              Monitor the growth of MEMO {routerState}
            </div>
          </div>
          <span className="flex border border-white h-[97px]"></span>
          <div className="flex flex-col space-y-3">
            <p className="text-white font-[400] text-[14px] font-inter leading-[21.78px]">
              {/* Check-Ins */}
            </p>
            <p className="text-white font-[600] text-[25px] md:text-[40px] font-inter leading-[48.41px]">
              {number}
            </p>
          </div>
        </div>
        <div className="flex items-center  justify-center space-x-2 ">
          <div className="grid grid-cols-6 xl:grid-cols-6 md:grid-cols-6 gap-4">
            <button
              className={`flex flex-col items-center justify-center rounded-lg nav-button ${routerState === "User Nodes" ? "active" : ""
                }`}
              onClick={() => handleChnageRouter("User Nodes", "403,207")}
            >
              <p className="font-[700] text-[14px] font-inter">403,207</p>
              <p className="font-[700] text-[14px] font-inter ">User Nodes</p>
            </button>
            <button
              className={`flex flex-col items-center justify-center rounded-lg nav-button ${routerState === "Provider Nodes" ? "active" : ""
                }`}
              onClick={() => handleChnageRouter("Provider Nodes", "47,975")}
            >
              <p className="font-[700] text-[14px] font-inter">47,975</p>
              <p className="font-[700] text-[14px] font-inter">
                Provider Nodes
              </p>
            </button>
            <button
              className={`flex flex-col items-center justify-center rounded-lg nav-button ${routerState === "Nodes Growth" ? "active" : ""
                }`}
              onClick={() => handleChnageRouter("Nodes Growth", "53,273")}
            >
              <p className="font-[700] text-[14px] font-inter">53,273</p>
              <p className="font-[700] text-[14px] font-inter">Nodes Growth</p>
            </button>
            <button
              className={`flex flex-col items-center justify-center rounded-lg nav-button ${routerState === "Accounts DID" ? "active" : ""
                }`}
              onClick={() => handleChnageRouter("Accounts DID", "605,273")}
            >
              <p className="font-[700] text-[14px] font-inter">605,273</p>
              <p className="font-[700] text-[14px] font-inter">Accounts DID</p>
            </button>
            <button
              className={`flex flex-col items-center justify-center rounded-lg nav-button ${routerState === "Files DID" ? "active" : ""
                }`}
              onClick={() => handleChnageRouter("Files DID", "2,124,795")}
            >
              <p className="font-[700] text-[14px] font-inter">2,124,795</p>
              <p className="font-[700] text-[14px] font-inter">Files DID</p>
            </button>
            <button
              className={`flex flex-col items-center justify-center rounded-lg nav-button ${routerState === "Active Participants" ? "active" : ""
                }`}
              onClick={() => handleChnageRouter("Active Participants", "12,567,903")}
            >
              <p className="font-[700] text-[14px] font-inter">12,567,903</p>
              <p className="font-[700] text-[14px] font-inter">
                Active Participants
              </p>
            </button>
          </div>
        </div>
        <div className="w-full flex flex-row md:flex-row justify-center gap-1">
          {/* graphs left */}
          <div className="flex flex-col w-full max-w-[780px]">
            {/* Timeframe Buttons */}
            <div className="flex justify-end space-x-3 w-full px-3 mt-5">
              {["Day", "Week", "Month"].map((period) => (
                <button
                  key={period}
                  className={`rounded-full p-2 px-5 ${timeframe === period
                    ? "bg-[#00673C] text-white"
                    : "bg-white text-[#00673C]"
                    }`}
                  onClick={() => setTimeframe(period as "Day" | "Week" | "Month")}
                >
                  {period}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center w-full">
              {routerState === "User Nodes" ? (
                <UserNodesChart timeframe={timeframe} />
              ) : routerState === "Provider Nodes" ? (
                <ProviderNodesChart timeframe={timeframe} />
              ) : routerState === "Nodes Growth" ? (
                <NodeGrowthChart timeframe={timeframe} />
              ) : routerState === "Accounts DID" ? (
                <AccountsDIDChart timeframe={timeframe} />
              ) : routerState === "Files DID" ? (
                <FilesDIDChart timeframe={timeframe} />
              ) : (
                <ActiveParticipantsChart timeframe={timeframe} />
              )}
            </div>
          </div>
          {/* graphs right */}

          <div className="flex flex-row  justify-center  md:flex-col gap-3">
            <button
              className={`flex relative flex-col p-1 md:p-1 w-[220px] lg:w-[220px]  rounded-lg  nav-button1  ${routerState === "User Nodes" ? "active" : ""
                }`}
              onClick={() => handleChnageRouter("User Nodes", "403,207")}
            >
              <p className="font-[700] text-[10px] md:text-[12px] lg:text-[14px] font-inter ">
                USER NODES
              </p>
              <p className="font-[700] text-[14px] md:text-[18px] lg:text-[26px]  font-inter">
                403,207
              </p>
              <Icon></Icon>
            </button>
            <button
              className={`flex relative flex-col p-1 md:p-1 w-[150px] lg:w-[220px]  rounded-lg  nav-button1 ${routerState === "Provider Nodes" ? "active" : ""
                }`}
              onClick={() => handleChnageRouter("Provider Nodes", "47,975")}
            >
              <p className="font-[700] text-[10px] md:text-[12px] lg:text-[14px] font-inter ">
                PROVIDER NODES
              </p>
              <p className="font-[700] text-[14px] md:text-[18px] lg:text-[26px]  font-inter">
                47,975
              </p>
              <Icon></Icon>
            </button>
            <button
              className={`flex relative flex-col p-1 md:p-1 w-[150px] lg:w-[220px]  rounded-lg  nav-button1 ${routerState === "Nodes Growth" ? "active" : ""
                }`}
              onClick={() => handleChnageRouter("Nodes Growth", "53,273")}
            >
              <p className="font-[700] text-[10px] md:text-[12px] lg:text-[14px] font-inter ">
                NODES GROWTH
              </p>
              <p className="font-[700] text-[14px] md:text-[18px] lg:text-[26px]  font-inter">
                53,273
              </p>
              <Icon></Icon>
            </button>
            <button
              className={`flex relative flex-col p-2 md:p-1 w-[150px] lg:w-[220px]  rounded-lg  nav-button1 ${routerState === "Accounts DID" ? "active" : ""
                }`}
              onClick={() => handleChnageRouter("Accounts DID", "605,273")}
            >
              <p className="font-[700] text-[10px] md:text-[12px] lg:text-[14px] font-inter ">
                ACCOUNTS DID
              </p>
              <p className="font-[700] text-[14px] md:text-[18px] lg:text-[26px]  font-inter">
                605,273
              </p>
              <Icon></Icon>
            </button>
            <button
              className={`flex relative flex-col p-2 md:p-1 w-[150px] lg:w-[220px]  rounded-lg  nav-button1 ${routerState === "Files DID" ? "active" : ""
                }`}
              onClick={() => handleChnageRouter("Files DID", "2,124,795")}
            >
              <p className="font-[700] text-[10px] md:text-[12px] lg:text-[14px] font-inter ">
                FILES DID
              </p>
              <p className="font-[700] text-[14px] md:text-[18px] lg:text-[26px]  font-inter">
                2,124,795
              </p>
              <Icon></Icon>
            </button>
            <button
              className={`flex relative flex-col p-2 md:p-1 w-[150px] lg:w-[220px]  rounded-lg  nav-button1 ${routerState === "Active Participants" ? "active" : ""
                }`}
              onClick={() => handleChnageRouter("Active Participants", "12,567,903")}
            >
              <p className="font-[700] text-[10px] md:text-[12px] lg:text-[14px] font-inter ">
                ACTIVE PARTICIPANTS
              </p>
              <p className="font-[700] text-[14px] md:text-[18px] lg:text-[26px]  font-inter">
                12,567,903
              </p>
              {/* <Icon></Icon> */}
            </button>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col justify-center w-full md:h-[183px] bg-[#051610] items-center mt-5 space-y-0 py-10"> */}
      {/* <div className="flex justify-center items-center space-x-0">
          <Image
            src="/assets/twiter.png"
            alt="Logo Icon"
            onClick={() => { window.open("https://x.com/MemoLabsOrg", "_blank") }}
            width={59} // Set the desired width
            height={58} // Set the desired height
            className="text-black" // You can still apply classes
          />
          <Image
            src="/assets/discord.png"
            alt="Logo Icon"
            onClick={() => { window.open("https://discord.com/invite/YG4Ydv2E7X", "_blank") }}
            width={59} // Set the desired width
            height={58} // Set the desired height
            className="text-black" // You can still apply classes
          />
          <Image
            src="/assets/telegram.png"
            alt="Logo Icon"
            onClick={() => { window.open("https://t.me/memolabsio", "_blank") }}
            width={59} // Set the desired width
            height={58} // Set the desired height
            className="text-black" // You can still apply classes
          />
        </div> */}
      {/* <div className="flex  justify-center items-center p-2 space-x-1 md:space-x-7 pb-[70px] md:pb-[10px]">
          <a
            href="#home"
            className=" font-[400] text-white text-[18px] font-inter text-center"
          >
            Privacy Policy
          </a>
          <a
            href="#home"
            className=" font-[400] text-white text-[18px] font-inter text-center "
          >
            Terms & Conditions
          </a>
          <a
            href="#home"
            className=" font-[400] text-white text-[18px] font-inter text-center "
          >
            Return & Rrfund
          </a>
        </div> */}
      {/* </div> */}
    </div>
  );
}
