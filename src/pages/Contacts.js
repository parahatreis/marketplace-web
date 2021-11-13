import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";
//

// Form Validation Schema
const SignupSchema = Yup.object().shape({
  user_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
	user_email: Yup.string()
		.email()
		.required("Required"),
	user_message: Yup.string()
		.min(2, "Too Short!")
		.max(500, "Too Long!")
		.required("Required"),
});

const Contacts = () => {
  const [localLoading, setLocalLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
	}, []);
	
	const beforeSubmit = async (values) => {
		setLocalLoading(true);
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const body = JSON.stringify(values);
		try {
			const res = await axios.post('/v1/contacts/send-email', body, config);
			if (res.data.status === 500) return toast.error('Nasazlyk yuze cykdy');
			toast.success('Hatynyz ustinlikli ugradyldy!');
      history.push('/')
		} catch (err) {
			toast.error('Nasazlyk yuze cykdy');
		} finally {
			setLocalLoading(false)
		}
	};

  return (
    <section className="auth-wrapper">
      <div className="auth-block">
        <div className="page-title">
						<h2>Habarlasmak</h2>
				</div>
        <div className="auth-box">
          <Formik
            initialValues={{
              user_name: "",
              user_email: "",
              user_message: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              const trimedValues = {};
              for (const property in values) {
                if (typeof values[property] === "string") {
                  trimedValues[property] = values[property].trim();
                } else {
                  trimedValues[property] = values[property];
                }
              }
              beforeSubmit(trimedValues);
            }}
          >
            <Form autoComplete="off">
              {/* <!-- input-block --> */}
              <div className="input-block">
                <label htmlFor="user_name">Doly Adynyz</label> <br />
                <Field type="text" name="user_name" autoComplete="off" />
                <div className="error-text">
                  <ErrorMessage name="user_name" />
                </div>
              </div>
              {/* <!-- input-block --> */}
              <div className="input-block">
                <label htmlFor="user_password">Mail</label> <br />
                <Field
                  type="text"
                  name="user_email"
                  autoComplete="off"
                />
                <div className="error-text">
                  <ErrorMessage name="user_email" />
                </div>
							</div>
							{/* <!-- input-block --> */}
              <div className="input-block">
                <label htmlFor="user_message">Hatynyz</label> <br />
                <Field
                  as="textarea"
                  name="user_message"
                  autoComplete="off"
                />
                <div className="error-text">
                  <ErrorMessage name="user_message" />
                </div>
              </div>
              {/* <!-- input-block --> */}
              <div className="input-block btn-block">
                <Field
                  type="submit"
                  value={localLoading ? "Yuklenyar" : "Ugrat"}
                  name="submit"
                  disabled={localLoading}
                  style={{ opacity: `${localLoading ? 0.5 : 1}` }}
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
