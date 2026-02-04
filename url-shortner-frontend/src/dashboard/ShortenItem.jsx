import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import { MdTouchApp, MdAnalytics } from "react-icons/md";
import CopyToClipboard from "react-copy-to-clipboard";
import { LiaCheckSolid } from "react-icons/lia";
import { IoCopy } from "react-icons/io5";
import api from "../api/api";
import { useStoreContext } from "../contextApi/ContextApi";
import { Hourglass } from "react-loader-spinner";
import Graph from "./Graph";

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const { token } = useStoreContext();

  const subDomain = import.meta.env.VITE_REACT_SUBDOMAIN.replace(
    /^https?:\/\//,
    ""
  );

  const [isCopied, setIsCopied] = useState(false);
  const [analyticsToggle, setAnalyticsToggle] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([]);

  /* ===================== ONLY LOGIC CHANGE START ===================== */
  const analyticsHandler = (shortUrl) => {
    if (analyticsToggle && selectedUrl === shortUrl) {
      setAnalyticsToggle(false);
      return;
    }
    setSelectedUrl(shortUrl);
    setAnalyticsToggle(true);
  };
  /* ===================== ONLY LOGIC CHANGE END ===================== */

  const fetchMyShortUrl = async () => {
    if (!selectedUrl) return;
    setLoader(true);
    try {
      const startDate = dayjs().subtract(30, "day").format("MM-DD-YYYY");
      const endDate = dayjs().format("MM-DD-YYYY");

      const { data } = await api.get(
        `/api/urls/analytics/${selectedUrl}`,
        {
          params: { startDate, endDate },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const formattedData = Object.entries(data).map(
        ([clickDate, count]) => ({
          clickDate,
          count,
        })
      );

      setAnalyticsData(formattedData);
    } catch (error) {
      console.error(
        "Analytics error:",
        error.response?.data || error.message
      );
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (analyticsToggle && selectedUrl) {
      fetchMyShortUrl();
    }
  }, [analyticsToggle, selectedUrl]);

  /* ===================== IMPORTANT CONDITIONS ===================== */
  const hasRealClicks = analyticsData.some(item => item.count > 0);
  const noClicksAtAll = analyticsData.every(item => item.count === 0);

  return (
    <div className="bg-slate-100 shadow-lg border border-dotted border-slate-500 px-6 sm:py-2">
      <div className="flex sm:flex-row flex-col sm:justify-between w-full gap-5 py-5">
        <div className="flex-1 max-w-full overflow-x-auto">
          <div className="flex items-center gap-2">
            <a
              href={`${import.meta.env.VITE_REACT_SUBDOMAIN}/${shortUrl}`}
              target="_blank"
              className="text-[17px] font-[600] text-linkColor"
            >
              {subDomain}/{shortUrl}
            </a>
            <FaExternalLinkAlt />
          </div>

          <p className="text-slate-700 text-[16px]">{originalUrl}</p>

          <div className="flex items-center gap-2 pt-4 text-green-800 font-semibold">
            <MdTouchApp className="text-[22px]" />
            <span>{clickCount}</span>
            <span>{clickCount <= 1 ? "Click" : "Clicks"}</span>
          </div>

          <div className="flex items-center gap-2 pt-2 font-semibold text-slate-800">
            <FaRegCalendarAlt />
            <span className="text-[17px]">
              {dayjs(createdDate).format("DD MMM, YYYY")}
            </span>
          </div>
        </div>

        <div className="flex sm:justify-end items-center gap-3">
          <CopyToClipboard
            text={`${import.meta.env.VITE_REACT_SUBDOMAIN}/${shortUrl}`}
            onCopy={() => {
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 1500);
            }}
          >
            <button className="flex gap-1 items-center bg-btnColor py-2 px-6 rounded-md text-white font-semibold shadow-md">
              {isCopied ? "Copied" : "Copy"}
              {isCopied ? <LiaCheckSolid /> : <IoCopy />}
            </button>
          </CopyToClipboard>

          <button
            onClick={() => analyticsHandler(shortUrl)}
            className="flex gap-1 items-center bg-rose-600 py-2 px-4 font-semibold shadow-md text-white rounded-md"
          >
            Analytics
            <MdAnalytics />
          </button>
        </div>
      </div>

      <div
        className={`${
          analyticsToggle ? "block" : "hidden"
        } max-h-96 sm:mt-0 mt-5 min-h-96 relative border-t-2 w-[100%] overflow-hidden`}
      >
        {loader ? (
          <div className="min-h-[calc(450px-140px)] flex justify-center items-center w-full">
            <div className="flex flex-col items-center gap-1">
              <Hourglass
                visible={true}
                height="50"
                width="50"
                ariaLabel="hourglass-loading"
                color={["#306cce", "#306cce"]}
              />
              <p className="text-slate-700 text-[16px]">Please wait...</p>
            </div>
          </div>
        ) : (
          <>
            {noClicksAtAll && (
              <div className="absolute flex flex-col justify-center sm:items-center items-end w-full left-0 top-0 bottom-0">
                <h1 className="text-slate-800 font-serif sm:text-2xl text-[15px] font-bold mb-1">
                  No Data For This Time Period
                </h1>
                <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-[12px] text-slate-600">
                  Share your short link to view where your engagements are coming
                  from
                </h3>
              </div>
            )}

            {hasRealClicks && <Graph graphData={analyticsData} />}
          </>
        )}
      </div>
    </div>
  );
};

export default ShortenItem;
