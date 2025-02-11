import React from "react";
import HobbyBubble from "./HobbyBubble";
import HobbyDataBubble from "./HobbyDataBubble";
import "./style.module.scss";

export default function FallenPage() {
  return (
    <div className="page-layout">
      {/* עמודה שמאלית */}
      <div className="left-column">
        <div className="hobby-list">
          <HobbyDataBubble hobby="טניס" count={136} />
          <HobbyDataBubble hobby="שחייה" count={136} />
          <HobbyDataBubble hobby="אופניים" count={136} />
        </div>
        <div className="title-divider">סה״כ</div>
        <HobbyDataBubble hobby="סה״כ" count={611} />
        <button className="share-button">שיתוף</button>
      </div>

      {/* עמודה אמצעית */}
      <div className="middle-column">
        <h1 className="main-title">
          תמשיכו לבנות לגו. זה החלום והתחביב הכי גדול שלי
        </h1>
        <div className="title-divider">אודות</div>
        <p className="text-content">
          הוא פשוט טקסט גולמי של תעשיית הדפוס וההקלדה. לורם איפסום הוא פשוט
          טקסט גולמי של תעשיית הדפוס.
        </p>
        <div className="title-divider">קצת עליי</div>
        <p className="text-content">
          הוא פשוט טקסט גולמי של תעשיית הדפוס. טקסט לדוגמה.
        </p>
      </div>

      {/* עמודה ימנית */}
      <div className="right-column">
        <div className="profile-card">כרטיס פרופיל</div>
        <div className="title-divider">התחביבים שלי</div>
        <div className="hobbies">
          <HobbyBubble hobby="טניס" />
          <HobbyBubble hobby="שחייה" />
          <HobbyBubble hobby="אופניים" />
          <HobbyBubble hobby="ריצה" />
        </div>
      </div>
    </div>
  );
}
