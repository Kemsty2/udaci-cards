import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button } from "native-base";
import { validate } from "../../utils/validate";
import {Text} from "react-native";

function AddDeckForm({ styles, text, renderInput, reset, handleSubmit }) {
  return (
    <>
      <Field name="title" label="Title" component={renderInput} />
      <Button onPress={handleSubmit} rounded block style={styles.btnSubmit}>
        <Text style={styles.btnText}>{text}</Text>
      </Button>
    </>
  );
}

export default reduxForm({form: "AddDeckForm", validate})(AddDeckForm);