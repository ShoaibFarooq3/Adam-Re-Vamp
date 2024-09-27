import { Conversation } from "./interfaces";

export const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

export const categorizeConversations = (promptHistory: Conversation[]) => {
  const todayConversations: typeof promptHistory = [];
  const yesterdayConversations: typeof promptHistory = [];
  const previous30DaysConversations: typeof promptHistory = [];
  const olderConversations: typeof promptHistory = [];

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1); // Start of yesterday

  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // 30 days ago

  promptHistory?.forEach((conversation) => {
    const promptDate = new Date(conversation.createdAt); // Using createdAt for categorization

    if (promptDate >= today) {
      todayConversations.push(conversation);
    } else if (promptDate >= yesterday) {
      yesterdayConversations.push(conversation);
    } else if (promptDate >= thirtyDaysAgo) {
      previous30DaysConversations.push(conversation);
    } else {
      olderConversations.push(conversation);
    }
  });

  return {
    today: todayConversations,
    yesterday: yesterdayConversations,
    previous30Days: previous30DaysConversations,
    older: olderConversations,
  };
};

export const cleanCode = (text: string): string => {
  if (text.toLowerCase().includes("sorry")) {
    return "404";
  }
  text = text.replace(/```openscad/g, "");
  text = text.replace(/```/g, "");
  text = text.replace(/<\$>.*?<\/\$>/gs, "");
  return text;
};

export const extractSuggestions = (text: string): string[] => {
  const regex = /<\$>(.*?)<\/\$>/gs;
  const suggestions: string[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    suggestions.push(match[1].trim());
  }

  return suggestions;
};

export function formatTime(time: string) {
  const now = new Date(time);
  return now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export const getColors = (index: Number) => {
  if (index === 0) {
    return "#554418";
  } else if (index === 1) {
    return "#174712";
  } else {
    return "#620372";
  }
};
