import * as React from 'react';
import { Formik, FormikConfig, FormikValues, Field } from 'formik'

import { Button, Container, Modal, Paper, Typography, TextField, FormLabel } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { companySchema } from '../validator';
import MaskedInput from '../../../../components/MaskedInput';
import { add } from '../../../../store/modules/company/actions';
import { useTranslation } from '../../../../hooks/use-translation';

const AddModal = () => {
  const dispatch = useDispatch()
  const { translate } = useTranslation()

  const [open, setOpen] = React.useState(false);

  const handleSubmit = (payload: FormikValues) => {
    dispatch(add(payload))
  }

  const formikConfig: FormikConfig<FormikValues> = {
    initialValues: {
      cnpj: '',
      cnae: '',
      company_name: '',
      fantasy_name: '',
    },
    validationSchema: companySchema,
    onSubmit: handleSubmit,
    enableReinitialize: true
  }


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button size='medium' startIcon={<AddIcon />} color='primary' variant='contained' sx={{ mt: 3, mb: 3 }} onClick={handleOpen} >
        {translate('COMPANY:TITLE')}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Container component='main' maxWidth="xs" sx={{ position: 'absolute', top: '20%', left: '35%' }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} >
            <Typography component="h1" variant="h5">
              {translate('COMPANY:TITLE')}
            </Typography>
            <Typography>
              {translate('COMPANY:ADD_SUBTITLE')}
            </Typography>
            <Formik {...formikConfig}>
              {({ handleSubmit, errors, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <FormLabel>{translate('COMPANY:RESOURCES:CNPJ')}</FormLabel>
                  <Field
                    sx={{ marginTop: 0 }}
                    name="cnpj"
                    margin="normal"
                    mask='99.999.999/9999-99'
                    required
                    fullWidth
                    component={MaskedInput}
                    helperText={translate(errors.cnpj as string)}
                    error={errors?.cnpj}
                    onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue('cnpj', target.value)
                    }
                  />

                  <FormLabel>{translate('COMPANY:RESOURCES:CNAE')}</FormLabel>
                  <Field
                    sx={{ marginTop: 0 }}
                    name="cnae"
                    margin="normal"
                    required
                    fullWidth
                    component={TextField}
                    inputProps={{
                      maxLength: 7,
                      minLength: 7,
                    }}
                    helperText={translate(errors.cnae as string)}
                    error={errors?.cnae}
                    onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue('cnae', target.value)
                    }
                  />

                  <FormLabel>{translate('COMPANY:RESOURCES:COMPANY_NAME')}</FormLabel>
                  <Field
                    sx={{ marginTop: 0 }}
                    name="company_name"
                    margin="normal"
                    required
                    fullWidth
                    component={TextField}
                    helperText={translate(errors.company_name as string)}
                    error={errors?.company_name}
                    onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue('company_name', target.value)
                    }
                  />
                  <FormLabel>{translate('COMPANY:RESOURCES:FANTASY_NAME')}</FormLabel>
                  <Field
                    sx={{ marginTop: 0 }}
                    name="fantasy_name"
                    margin="normal"
                    required
                    fullWidth
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
                    startIcon={<AddIcon />}
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
    </div>
  )
}

export default AddModal;