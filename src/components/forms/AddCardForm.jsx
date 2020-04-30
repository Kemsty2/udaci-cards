import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button } from "native-base";
import { validateFormAddQuestion } from "../../utils/validate";
import { Text } from "react-native";

function AddCardForm({ styles, text, renderInput, handleSubmit }) {
  return (
    <>
      <Field name="question" label="Question" component={renderInput} />
      <Field
        name="answer"
        label="Answer"
        component={renderInput}
        last={true}
      />
      <Button onPress={handleSubmit} rounded block style={styles.btnSubmit}>
        <Text style={styles.btnText}>{text}</Text>
      </Button>
    </>
  );
}

export default reduxForm({ form: "AddCardForm", validate: validateFormAddQuestion })(AddCardForm);
