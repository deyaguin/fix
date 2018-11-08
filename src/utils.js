const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const emailValidator = value => EMAIL_REGEX.test(value.toLowerCase());