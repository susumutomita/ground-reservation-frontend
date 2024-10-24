import { useSession } from "next-auth/react";

export const useNotificationSettings = () => {
  const { data: session } = useSession();

  const saveNotificationSettings = async (
    type: "email" | "webhook",
    value: string
  ) => {
    if (session?.user) {
      try {
        const response = await fetch("/api/save-notification-settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: session.user.email, type, value }),
        });
        if (response.ok) {
          alert("通知設定が保存されました");
        } else {
          throw new Error("Failed to save notification settings");
        }
      } catch (error) {
        console.error("Error saving notification settings:", error);
        alert("通知設定の保存に失敗しました");
      }
    } else {
      console.error("セッションまたはユーザー情報が未定義です。");
      alert("ユーザー情報が取得できませんでした。再度ログインしてください。");
    }
  };

  return { saveNotificationSettings };
};
