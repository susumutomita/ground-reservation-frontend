export interface FieldAvailability {
  id: string;
  date: string;
  time: string;
  field: string;
  available: boolean;
}

export interface Window {
  difyChatbotConfig?: {
    token: string;
  };
}

declare global {
  interface Window {
    difyChatbotConfig?: {
      token: string;
    };
  }
}
