import * as React from 'react';
import { Formik, FormikConfig, FormikValues, Field } from 'formik'
import { Button, Container, IconButton, Modal, Paper, Typography, TextField, FormLabel } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { compnayUpdateSchema } from '../validator';
import { find, update } from '../../../../store/modules/company/actions';
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
    validationSchema: compnayUpdateSchema,
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
                  <FormLabel>{translate('COMPANY:RESOURCES:CNAE')}</FormLabel>
                  <Field
                    sx={{ marginTop: 0 }}
                    name="cnae"
                    margin="normal"
                    required
                    fullWidth
                    inputProps={{
                      maxLength: 7,
                      minLength: 7,
                    }}
                    value={values?.cnae}
                    component={TextField}
                    helperText={translate(errors.cnae as string)}
                    error={errors?.cnae}
                    onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue('cnae', target.value)
                    }
                  />

                  <FormLabel>{translate('COMPANY:RESOURCES:FANTASY_NAME')}</FormLabel>
                  <Field
                    sx={{ marginTop: 0 }}
                    name="fantasy_name"
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