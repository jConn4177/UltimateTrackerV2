import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  Container,
  Row,
  Col,
  Alert,
  Form as BootstrapForm,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateTournamentMutation } from "../../services/apiSlice";
import "./CreateNewTournament.css";

const CreateNewTournament = () => {
  const navigate = useNavigate();
  const [createTournament, { isLoading }] = useCreateTournamentMutation();

  const handleSubmit = async (values, { setSubmitting }) => {
    const formattedStartDate =
      values.startDate instanceof Date
        ? values.startDate.toISOString()
        : new Date(values.startDate).toISOString();
    const formattedEndDate =
      values.endDate instanceof Date
        ? values.endDate.toISOString()
        : new Date(values.endDate).toISOString();

    try {
      const response = await createTournament({
        name: values.name,
        format: values.format,
        venue: values.venue,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }).unwrap();

      if (response?.id) {
        navigate(`/tournaments/${response.id}`);
      }
    } catch (error) {
      console.error("Failed to create tournament", error);
    }

    setSubmitting(false);
  };

  return (
    <Container className="custom-tournament">
      <Row className="justify-content-md-center">
        <Col className="tournament-form" md={6}>
          <h2>Create a Super Smash Bros Ultimate Tournament</h2>
          <Formik
            initialValues={{
              name: "",
              format: "1v1",
              venue: "",
              startDate: new Date(),
              endDate: new Date(),
            }}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => {
              const handleStartDateChange = (date) => {
                setFieldValue("startDate", date);
              };

              const handleEndDateChange = (date) => {
                setFieldValue("endDate", date);
              };

              return (
                <Form className="custom-form-tc">
                  {isLoading && <Alert variant="info">Loading...</Alert>}
                  <ErrorMessage
                    name="server"
                    render={(msg) => <Alert variant="danger">{msg}</Alert>}
                  />
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Tournament Name</BootstrapForm.Label>
                    <Field name="name" as={BootstrapForm.Control} />
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Format</BootstrapForm.Label>
                    <Field
                      name="format"
                      as={BootstrapForm.Select}
                      className="form-control-custom"
                    >
                      <option value="1v1">1v1</option>
                      <option value="2v2">2v2</option>
                    </Field>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Venue Address</BootstrapForm.Label>
                    <Field name="venue" as={BootstrapForm.Control} />
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Start Date</BootstrapForm.Label>
                    <div className="date-picker-wrapper">
                      <DatePicker
                        selected={values.startDate}
                        onChange={handleStartDateChange}
                      />
                    </div>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>End Date</BootstrapForm.Label>
                    <div className="date-picker-wrapper">
                      <DatePicker
                        selected={values.endDate}
                        onChange={handleEndDateChange}
                      />
                    </div>
                  </BootstrapForm.Group>

                  <Button className="create-tournament-button" type="submit">
                    Create Tournament
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateNewTournament;
