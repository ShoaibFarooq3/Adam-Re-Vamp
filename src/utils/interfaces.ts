import { ReactNode } from "react";
import { State, StatePersister } from "../state/app-state";

export interface AppProps {
  initialState: State;
  statePersister: StatePersister;
  fs: FS;
}
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
  showFilter: boolean;
  setShowFilter: (value: boolean) => void;
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
  className?: string;
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
  showFilter: boolean;
  setShowFilter: (value: boolean) => void;
  setShowStartPage: (value: boolean) => void;
  showStartPage: boolean;
}

export interface StartPageProps {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setShowFilter: (value: boolean) => void;
  showFilter: boolean;
  className?: string;
  setShowStartPage: (value: boolean) => void;
  showStartPage: boolean;
}

export interface PromptPanelProps {
  showFilter: boolean;
  setShowFilter: (value: boolean) => void;
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
  showFilter: boolean;
  setShowFilter: (value: boolean) => void;
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setShowStartPage: (value: boolean) => void;
  showStartPage: boolean;
}
export interface SuggestionsProps {
  Number: number;
  item: string;
  handleSuggestions: (value: string) => void; 
}

export interface FilterPanelProps {
  showFilter: boolean;
  setShowFilter: (value: boolean) => void;
}

export interface LoginPageProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export type LoaderProps = {
  isLoading: boolean;
};

export interface Parameter {
  name: string;
  value: number;
  defaultValue: number;
}

export type LoadingProps = {
  isLoading: boolean;
};

export interface PromptbarProps {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

export interface MessageData {
  userMessage: string;
  aiMessage: string;
  suggestions: Array<string>;
  adjust: boolean;
}
