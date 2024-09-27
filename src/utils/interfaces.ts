import { ReactNode } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
  imageUrl: string;
}

export interface AvatarProps {
  image: string;
}

export interface DropDownPageProps {
  handleLogout: () => void;
}

export interface LayoutProps {
  children: ReactNode;
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
  setShowStartPage: (value: boolean) => void;
  showStartPage: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isLoggedIn: boolean;
}

export interface Message {
  _id: string;
  userMessage: string;
  aiMessage: string;
  suggestions: string[];
  timestamp: string;
  __v: number;
}

// Slider interface
export interface SpanData {
  color: string;
  name: string;
}

export interface Item {
  imageUrl: string;
  title: string;
  spanData: SpanData[];
}

export interface Data {
  data: Item[];
}

export interface HeaderIconProps {
  className: string;
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}

export interface StartPageProps {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}

export interface PromptPanelProps {
  setShowSidebar: (value: boolean) => void;
  showSidebar: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isLoggedIn: boolean;
  setShowStartPage: (value: boolean) => void;
  showStartPage: boolean;
}

export interface ConversationHistoryProps {
  setShowStartPage: (value: boolean) => void;
  showStartPage: boolean;
}

export interface HomePageProps {
  isAuthenticated: boolean;
  // promptHistory: ConversationHistoryItem[];
  // setPromptHistory: (newPromptHistory: ConversationHistoryItem[]) => void;
}

export interface CheckUserResponse {
  exists: boolean; // adjust based on the actual API response
}

export interface UserData {
  email: string;
  password: string;
}

export interface LoginUserData {
  email: string;
  imageUrl: string;
  name: string;
  token: string;
  _id: string;
}

export interface AuthState {
  user: LoginUserData | null;
  isAuthenticated: boolean;
}

export interface Conversation {
  _id: string;
  title: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
  error: string | null;
}

export interface Message {
  _id: string;
  userMessage: string;
  aiMessage: string;
  suggestions: string[];
  timestamp: string;
  __v: number;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  imageUrl: string;
}

export interface ViewerPanelProps {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}

export interface Suggestions {
  Number: number;
  item: string;
}
