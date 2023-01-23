export const changePasswordInputType = (ref) => {
    let type = ref.current.type;
    type === "password" ? ref.current.type = "text" : ref.current.type = "password";
  }