import * as React from 'react';
import { Formik, FormikConfig, FormikValues, Field } from 'formik'
import { Button, Container, IconButton, Modal, Paper, Typography, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { companySchema } from '../validator';
import { find, update } from '../../../../store/modules/company/actions';
import moment from 'moment'
import { useTranslation } from '../../../../hooks/use-translation';

const EditModal = (props: any) => {
  const dispatch = useDispatch()
  const { itemEdit } = useSelector<any, any>(item => item.company)
  const [open, setOpen] = React.useState(false);
  const { translate } = useTranslation()

  React.useEffect(() => {
    if (open) {
      dispatch(find(props.id))
    }
  }, [open])

  const handleSubmit = (payload: FormikValues) => {
    const data = {
      ...payload,
      id: props.id
    }

    dispatch(update(data))
  }

  const formikConfig: FormikConfig<FormikValues> = {
    enableReinitialize: true,
    initialValues: {
      cnae: itemEdit?.cnae,
      fantasy_name: itemEdit?.fantasy_name,
    },
    validationSchema: companySchema,
    onSubmit: handleSubmit,
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton aria-label="edit" onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Container component='main' maxWidth="xs" sx={{ position: 'absolute', top: '20%', left: '35%' }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} >
            <Typography component="h1" variant="h5">
              {translate('COMPANY:EDIT_TITLE')}
            </Typography>
            <Typography>
              {translate('COMPANY:EDIT_SUBTITLE')}
            </Typography>
            <Formik {...formikConfig}>
              {({ handleSubmit, errors, setFieldValue, values }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="cnae"
                    label={translate('COMPANY:RESOURCES:CNAE')}
                    margin="normal"
                    required
                    fullWidth
                    value={values?.cnae}
                    component={TextField}
                    helperText={translate(errors.cnae as string)}
                    error={errors?.cnae}
                    onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue('cnae', target.value)
                    }
                  />

                  <Field
                    name="fantasy_name"
                    label={translate('COMPANY:RESOURCES:FANTASY_NAME')}
                    margin="normal"
                    required
                    fullWidth
                    value={values?.fantasy_name}
                    component={TextField}
                    helperText={translate(errors.fantasy_name as string)}
                    error={errors?.fantasy_name}
                    onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue('fantasy_name', target.value)
                    }
                  />

                  <Button
                    type='submit'
                    variant="contained"
                    color="success"
                    fullWidth
                    startIcon={<EditIcon />}
                    sx={{ mt: 2 }}
                  >
                    {translate('COMPANY:SUBMIT')}
                  </Button>
                </form>
              )}
            </Formik>
          </Paper>
        </Container>
      </Modal>
    </>
  )
}

export default EditModal;