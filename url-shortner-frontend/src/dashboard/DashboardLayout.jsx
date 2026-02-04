import Graph from "./Graph";
import { useFetchMyShortUrls, useFetchTotalClicks } from "../hooks/useQuery";
import { useStoreContext } from "../contextApi/ContextApi";
import { useState } from "react";
import ShortenPopUp from "./ShortenPopUp";
import { FaLink } from "react-icons/fa";
import ShortenUrlList from "./ShortenUrlList";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const DashboardLayout = () => {
  const { token } = useStoreContext();
  const [shortenPopUp, setShortenPopUp] = useState(false);
  const navigate = useNavigate();

  function onError() {
    navigate("/error");
  }

  // Fetch URLs
  const {
    isLoading: dataLoading,
    data: myShortenUrls = [],
    refetch,
  } = useFetchMyShortUrls(token, onError);

  const startDate = dayjs().subtract(30, "day").format("MM-DD-YYYY");
  const endDate = dayjs().format("MM-DD-YYYY");

  const {
    data: totalClicks = [],
    isLoading: loader,
  } = useFetchTotalClicks(token, startDate, endDate, { onError });

  return (
    <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)]">
      {loader ? (
        <Loader/>
      ) : (
        <div className="lg:w-[90%] w-full mx-auto py-16">
          {/* Chart Card */}
          <div className="h-96 relative border rounded-lg bg-white overflow-hidden">
            {/* No Data Overlay */}
            {totalClicks.length === 0 && (
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-center bg-white/60 backdrop-blur-[1px]">
                <h1 className="text-slate-800 font-serif sm:text-2xl text-[18px] font-bold">
                  No Data Available
                </h1>
                <h3 className="sm:w-96 w-[90%] text-center sm:text-lg text-sm text-slate-600 mt-2">
                  Share your short urls to view where your engagements are coming from
                </h3>
              </div>
            )}

            {/* Graph */}
            <div
              className={`h-full transition-opacity duration-300 ${
                totalClicks.length === 0
                  ? "opacity-30 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <Graph graphData={totalClicks} />
            </div>
          </div>

          {/* Button */}
          <div className="py-5 sm:text-end text-center">
            <button
              onClick={() => setShortenPopUp(true)}
              className="bg-custom-gradient px-5 py-2 rounded-md text-white font-medium"
            >
              Create a New Short Url
            </button>
          </div>

          {/* URL List */}
          {!dataLoading && myShortenUrls.length === 0 ? (
            <div className="flex justify-center pt-16">
              <div className="flex gap-2 items-center py-6 sm:px-8 px-5">
                <h1 className="text-slate-800 sm:text-[18px] text-[14px]">
                  You haven't created any short Link yet
                </h1>
                <FaLink className="text-blue-500 sm:text-xl text-sm" />
              </div>
            </div>
          ) : (
            <ShortenUrlList data={myShortenUrls} />
          )}
        </div>
      )}

      <ShortenPopUp
        open={shortenPopUp}
        setOpen={setShortenPopUp}
        refetch={refetch}
      />
    </div>
  );
};

export default DashboardLayout;
