import { generate } from "otp-generator";

export default () => {
  return generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
};
