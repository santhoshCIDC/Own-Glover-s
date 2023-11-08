import React from "react";
import TableContainer from "../../components/TableContainer";

const RecentEventsList = () => {
  const data = [
    {
      SNo: "01",
      EventType: "Game",
      Scrimmage: "No",
      PlayingTeam: "Super Mexico",
      OpponentTeam: "Tigers",
      Location:
        "Dallas Love Field Airport (DAL) (DAL), Herb Kelleher Way, Dallas, TX, USA",
      Progress: "Completed",
      Result: "END",
      GmaeDate: "10/08/23",
      Time: "07:25 AM",
    },
    {
      SNo: "02",
      EventType: "Game",
      Scrimmage: "No",
      PlayingTeam: "King",
      OpponentTeam: "Atlanda Braves",
      Location: "San Fansico, MO, USA",
      Progress: "Completed",
      Result: "END",
      GmaeDate: "15/08/23",
      Time: "10:25 AM",
    },
    {
      SNo: "03",
      EventType: "Game",
      Scrimmage: "No",
      PlayingTeam: "Tigers",
      OpponentTeam: "US",
      Location: "New York, NY, USA",
      Progress: "Completed",
      Result: "END",
      GmaeDate: "15/08/23",
      Time: "10:25 AM",
    },
  ];
  return (
    <div>
      {data.length === 0 ? (
        <h6
          style={{
            justifyContent: "center",
            display: "flex",
            marginBottom: "10px",
          }}
        >
          No recent events found
        </h6>
      ) : (
        <TableContainer data={data} />
      )}
    </div>
  );
};

export default RecentEventsList;
