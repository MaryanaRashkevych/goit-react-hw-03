import css from  './ContactForm.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import *  as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone } from '@fortawesome/free-solid-svg-icons'

const UserSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'The name is too short!')
      .max(50, 'The name is too long!')
      .required('This field is required!'),
    number: Yup.string()  
      .min(5, 'Is it a number?') 
      .required('This field is required!'),
});

export default function ContactForm({onAdd}) {
    const id = nanoid();
    const handleSubmit = (values, actions) => {
        onAdd({ ...values, id });
        actions.resetForm();
    };

    const initialValues ={
        name: "",
        number: "",
    };

    return(
        <Formik initialValues={initialValues} validationSchema={UserSchema} onSubmit={handleSubmit}>
           <Form className={css.form}>
  <div className={css.field}>
    <FontAwesomeIcon icon={faUser} className={css.icon} />
    <Field type="text" name="name" placeholder="Name" className={css.input} />
  
  <ErrorMessage name="name" component="span" className={css.error} /></div>

  <div className={css.field}>
    <FontAwesomeIcon icon={faPhone} className={css.icon} />
    <Field type="text" name="number" placeholder="Number" className={css.input}/>
 
  <ErrorMessage name="number" component="span" className={css.error} />
  </div>
  <button className={css.btn} type="submit">
    Add contact
  </button>
</Form>
        </Formik>  
    );
}