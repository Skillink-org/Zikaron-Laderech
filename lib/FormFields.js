const loginFields = [
  {
    type: "email",
    placeholder: "אימייל",
    stateKey: "email",
    autoComplete: "email",  
  },
  {
    type: "password",
    placeholder: "בחר סיסמא",
    stateKey: "password",
    autoComplete: "current-password",  
  },
];

const signupFields = [
  {
    type: "text",
    placeholder: "שם פרטי",
    stateKey: "firstName",
    autoComplete: "given-name",  
  },
  {
    type: "text",
    placeholder: "שם משפחה",
    stateKey: "lastName",
    autoComplete: "family-name",  
  },
  ...loginFields,  
];

export { loginFields, signupFields };
