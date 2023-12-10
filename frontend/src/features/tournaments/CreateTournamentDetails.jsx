import React from "react";
import { Formik, Form, Field } from "formik";

function CreateTournamentDetails({ onSubmit }) {
  return (
    <Formik
      initialValues={{
        rules: "",
        player_cap: "",
        entry_cost: "",
        start_time: "",
      }}
      onSubmit={onSubmit}
    >
      <Form>
        {/* Add fields for rules, player_cap, entry_cost, and start_time */}
        {/* Add a submit button */}
      </Form>
    </Formik>
  );
}

export default CreateTournamentDetails;
