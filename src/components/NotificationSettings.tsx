import React from "react";
import axios from "axios";

interface NotificationSettingsProps {
  onSave: (type: "email" | "webhook", value: string) => Promise<void>;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  onSave,
}) => {
  const [email, setEmail] = React.useState("");
  const [webhookUrl, setWebhookUrl] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/save-notification-settings", {
        email,
        webhookUrl,
        date,
        time,
      });

      if (response.status === 200) {
        alert("Notification settings saved successfully!");
      }
    } catch (error) {
      console.error("Error saving notification settings:", error);
      alert("Failed to save notification settings.");
    }
  };

  const handleSave = () => {
    // 例として、onSave 関数を呼び出す
    onSave("email", email);
    onSave("webhook", webhookUrl);
  };

  return (
    <div>
      <h2>Notification Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Webhook URL:
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Save Settings</button>
      </form>
      <button onClick={handleSave}>保存</button>
    </div>
  );
};

export default NotificationSettings;
