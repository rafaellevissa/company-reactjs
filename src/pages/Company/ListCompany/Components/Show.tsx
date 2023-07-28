import * as React from 'react';
import { Formik, FormikConfig, FormikValues, Field } from 'formik'
import {  Container, IconButton, Modal, Paper, Typography, TextField, FormLabel } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { companySchema } from '../validator';
import MaskedInput from '../../../../components/MaskedInput';
import { find } from '../../../../store/modules/company/actions';
import { useTranslation } from '../../../../hooks/use-translation';

const ShowModal = (props: any) => {
  const dispatch = useDispatch()
  const { itemEdit } = useSelector<any, any>(item => item.company)
  const [open, setOpen] = React.useState(false);
  const { translate } = useTranslation()

  React.useEffect(() => {
    if (open) {
      dispatch(find(props.id))
    }
  }, [open])

  const formikConfig: FormikConfig<FormikValues> = {
    enableReinitialize: true,
    initialValues: {
      cnpj: itemEdit?.cnpj || '',
      cnae: itemEdit?.cnae || '',
      company_name: itemEdit?.company_name || '',
      fantasy_name: itemEdit?.fantasy_name || '',
    },
    validationSchema: companySchema,
    onSubmit: () => { },
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton aria-label="edit" onClick={handleOpen}>
        <VisibilityIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Container component='main' maxWidth="xs" sx={{ position: 'absolute', top: '20%', left: '35%' }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} >
            <Typography component="h1" variant="h5">
              {translate('COMPANY:SHOW_TITLE')}
            </Typography>
            <Typography>
              {translate('COMPANY:SHOW_SUBTITLE')}
            </Typography>
            <Formik  {...formikConfig}>
              {({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <FormLabel>{translate('COMPANY:RESOURCES:CNPJ')}</FormLabel>
                  <Field
                    sx={{ marginTop: 0 }}
                    name="cnpj"
                    margin="normal"
                    mask='99.999.999/9999-99'
                    fullWidth
                    component={MaskedInput}
                    value={values?.cnpj}
                    disabled
                  />
                  <FormLabel>{translate('COMPANY:RESOURCES:CNAE')}</FormLabel>
                  <Field
                    sx={{ marginTop: 0 }}
                    name="cnae"
                    margin="normal"
                    fullWidth
                    component={TextField}
                    inputProps={{
                      maxLength: 7,
                      minLength: 7,
                    }}
                    disabled
                    value={values?.cnae}
                  />

                  <FormLabel>{translate('COMPANY:RESOURCES:COMPANY_NAME')}</FormLabel>
                  <Field
                    sx={{ marginTop: 0 }}
                    name="company_name"
                    margin="normal"
                    fullWidth
                    value={values?.company_name}
                    component={TextField}
                    disabled
                  />
                  <FormLabel>{translate('COMPANY:RESOURCES:FANTASY_NAME')}</FormLabel>
                  <Field
                    sx={{ marginTop: 0 }}
                    name="fantasy_name"
                    margin="normal"
                    fullWidth
                    value={values?.fantasy_name}
                    component={TextField}
                    disabled
                  />
                </form>
              )}
            </Formik>
          </Paper>
        </Container>
      </Modal>
    </>
  )
}

export default ShowModal;