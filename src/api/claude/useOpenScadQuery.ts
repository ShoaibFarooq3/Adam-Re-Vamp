// // useOpenScadQuery.ts
// import { useQuery } from "react-query";
// import { fetchOpenScadCode } from "./openScadApi";

// export const useOpenScadQuery = (data: any) => {
//   console.log("useOpenScadQuery", data);
//   return useQuery(["openScadCode", data], () => fetchOpenScadCode(data), {
//     enabled: !!data,
//   });
// };

// fetchCode.ts

import { useQuery } from "react-query";

const useOpenScadQuery = (messages: string | any[]) => {
  //   console.log("messages ", messages);
  return useQuery(
    ["openScadCode", messages],
    async () => {
      //   if (!messages || messages.length === 0) return; // Don't make the call if there are no messages

      const response = await fetch("http://localhost:5000/fetchCode/claude", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ MESSAGES: messages }),
      });
      console.log("response in api call ", response);
      if (!response.ok) {
        throw new Error("Server error!");
      }

      return response.json();
    },
    {
      enabled: !!messages && messages.length > 0, // Only run the query if messages are provided
    }
  );
};

export default useOpenScadQuery;
