const loginFields = [
    {
      type: "email",
      placeholder: "אימייל",
      stateKey: "email",
    },
    {
      type: "password",
      placeholder: "סיסמה",
      stateKey: "password",
    },
  ];
  
  const signupFields = [
    {
      type: "text",
      placeholder: "שם פרטי",
      stateKey: "firstName",
    },
    {
      type: "text",
      placeholder: "שם משפחה",
      stateKey: "lastName",
    },
    {
      type: "phone",
      placeholder: "טלפון",
      stateKey: "phone",
    },
    ...loginFields, 
  ];
  
  export { loginFields, signupFields };
  