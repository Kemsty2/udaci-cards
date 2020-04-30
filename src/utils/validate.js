export const validate = (values) => {
  const error = {};
  error.email = "";
  error.title = "";
  var ema = values.email;
  var nm = values.title;
  if (values.email === undefined) {
    ema = "";
  }
  if (values.title === undefined) {
    nm = "";
  }
  if (ema.length < 8 && ema !== "") {
    error.email = "too short";
  }
  if (!ema.includes("@") && ema !== "") {
    error.email = "@ not included";
  }
  if (nm.length < 3) {
    error.title = "Please 3 Characters !";
  }
  return error;
};

export const validateFormAddQuestion = (values) => {
  const error = {};
  error.question = "";
  error.answer = "";
  
  var {question, answer} = values;
  if(question === undefined){
    question = ""
  }
  if(answer === undefined){
    answer = ""
  }
  if(question.length < 3){
    error.question = "Please 3 Characters !"
  }
  if(answer.length < 3 ){
    error.answer = "Please 3 Characters !"
  }
  return error;  
}
