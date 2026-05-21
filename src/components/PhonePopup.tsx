import { useState } from "react";
import "./PhonePopup.css";

type PhonePopupProps = {
  onSubmit: (phone: string) => void;
  onClose?: () => void;
  title?: string;
  description?: string;
};

export default function PhonePopup({
  onSubmit,
  onClose,
  title = "Enter Phone Number",
  description = "Use the phone number you entered while placing your order.",
}: PhonePopupProps) {
  const [phone, setPhone] = useState<string>("");

  const handleSubmit = (): void => {
    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      alert("Enter a valid 10 digit phone number");
      return;
    }

    localStorage.setItem("phone", cleanPhone);
    onSubmit(cleanPhone);
  };

  return (
    <div className="phone-popup-backdrop" role="presentation">
      <section
        className="phone-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="phone-popup-title"
      >
        {onClose && (
          <button
            className="phone-popup-close"
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        )}

        <p className="phone-popup-kicker">YESSIX</p>

        <h2 id="phone-popup-title">{title}</h2>
        <p>{description}</p>

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="9876543210"
          inputMode="numeric"
          maxLength={10}
        />

        <button type="button" onClick={handleSubmit}>
          Continue
        </button>
      </section>
    </div>
  );
}