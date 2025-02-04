"use client";

import Image from "next/image";
import Button from "../Button";
import styles from "./style.module.scss";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import GenericInput from "../GenericInput/index";
import { loginFields, signupFields } from "@/lib/FormFields";
import { getAllFallen } from "@/server/actions/fallen.action";
// import { signInByEmail } from "@/server/actions/user.action";
// import { signInByGoogle, signUp } from '@/server/actions/user.action';

export default function AuthPopup({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (key) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    if (isLogin) {
      // await handleEmailSignin();
      // const response = await signIn("credentials", {
      //   redirect: false,
      //   email: formData.email,
      //   password: formData.password,
      // });
      const response=signInByEmail(formData);
      if (response?.error) {
        setErrorMessage("התחברות נכשלה. בדוק את הפרטים ונסה שוב.");
        setLoading(false);
      } else {
        setTimeout(() => {
          onClose();
        }, 2000);
      };
    }
    else {
      // await signUp(formData);
    }
  };
  // const handleEmailSignin = async () => {
  //   const response = await signIn("credentials", {
  //     redirect: false,
  //     email: formData.email,
  //     password: formData.password,
  //   });

  //   if (response?.error) {
  //     setErrorMessage("התחברות נכשלה. בדוק את הפרטים ונסה שוב.");
  //     setLoading(false);
  //   } else {
  //     setTimeout(() => {
  //       onClose();
  //     }, 2000);
  //   };
  // }

  // Close popup on escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const currentFields = isLogin ? loginFields : signupFields;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <h2 className={styles.title}>{isLogin ? "התחברות" : "הרשמה"}</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          {currentFields.map(({ type, placeholder, stateKey }) => (
            <GenericInput
              key={stateKey}
              type={type}
              name={type}
              placeholder={placeholder}
              value={formData[stateKey]}
              required={true}
              onChange={handleChange(stateKey)}
            />
          ))}
          <Button
            type="submit"
            className={styles.submitButton}
            disabled={loading}>
            {loading ? <div className={styles.loader}></div> : (isLogin ? "התחברות" : "הרשמה")}
          </Button>

          <Button
            // onClick={signInByGoogle}
            onClick={()=>{signIn("google")}}
            className={styles.googleButton}
          >
            <Image
              src="/google-icon.svg"
              width={16}
              height={16}
              alt="google icon"
              unoptimized
            />

            <p className={styles.googleText}>כניסה עם גוגל</p>
          </Button>

          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

          <div className={styles.toggleButton} onClick={toggleForm}>
            <small>
              {isLogin
                ? "אין לך חשבון? לחץ כאן להרשמה"
                : "נרשמת בעבר? לחץ כאן להתחברות"}
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
// "use client";

// import Image from "next/image";
// import Button from "../Button";
// import styles from "./style.module.scss";
// import { signIn } from "next-auth/react";
// import { useEffect, useState } from "react";
// import GenericInput from "../GenericInput/index";
// import { loginFields, signupFields } from "@/lib/FormFields";

// export default function AuthPopup({ onClose }) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     firstName: "",
//     lastName: "",
//     phone: "",
//   });

//   const handleChange = (key) => (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [key]: e.target.value,
//     }));
//   };

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//     setErrorMessage("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage("");
//     if (isLogin) {
//       await handleEmailSignin();
//     }
//   };
//   const handleEmailSignin = async () => {
//     const response = await signIn("credentials", {
//       redirect: false,
//       email: formData.email,
//       password: formData.password,
//     });

//     if (response?.error) {
//       setErrorMessage("התחברות נכשלה. בדוק את הפרטים ונסה שוב.");
//       setLoading(false);
//     } else {
//       setTimeout(() => {
//         onClose();
//       }, 2000);
//     };
//   }

//   // Close popup on escape key press
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [onClose]);

//   const currentFields = isLogin ? loginFields : signupFields;

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.popup}>
//         <button className={styles.closeButton} onClick={onClose}>
//           ✖
//         </button>
//         <h2 className={styles.title}>{isLogin ? "התחברות" : "הרשמה"}</h2>
//         <form className={styles.form} onSubmit={handleSubmit}>
//           {currentFields.map(({ type, placeholder, stateKey }) => (
//             <GenericInput
//               key={stateKey}
//               type={type}
//               name={type}
//               placeholder={placeholder}
//               value={formData[stateKey]}
//               required={true}
//               onChange={handleChange(stateKey)}
//             />
//           ))}
//           <Button
//             type="submit"
//             className={styles.submitButton}
//             disabled={loading}>
//             {loading ? <div className={styles.loader}></div> : (isLogin ? "התחברות" : "הרשמה")}
//           </Button>

//           <Button
//             onClick={() => {
//               signIn("google");
//             }}
//             className={styles.googleButton}
//           >
//             <Image
//               src="/google-icon.svg"
//               width={16}
//               height={16}
//               alt="google icon"
//               unoptimized
//             />

//             <p className={styles.googleText}>כניסה עם גוגל</p>
//           </Button>

//           {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

//           <div className={styles.toggleButton} onClick={toggleForm}>
//             <small>
//               {isLogin
//                 ? "אין לך חשבון? לחץ כאן להרשמה"
//                 : "נרשמת בעבר? לחץ כאן להתחברות"}
//             </small>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }