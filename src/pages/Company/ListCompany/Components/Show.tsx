import * as React from 'react';
import { Formik, FormikConfig, FormikValues, Field } from 'formik'
import { Button, Container, IconButton, Modal, Paper, Typography, TextField } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { companySchema } from '../validator';
import MaskedInput from '../../../../components/MaskedInput';
import { find, update } from '../../../../store/modules/company/actions';
import DatePicker from '../../../../components/DatePicker';
import moment from 'moment'
import { useTranslation } from '../../../../hooks/use-translation';

const ShowModal = (props: any) => {
  const dispatch = useDispatch()
  const { itemEdit } = useSelector<any, any>(item => item.company)
  const [open, setOpen] = React.useState(false);
  const {translate} = useTranslation()

  React.useEffect(() => {
    if (open) {
      dispatch(find(props.id))
    }
  }, [open])

  const formikConfig: FormikConfig<FormikValues> = {
    enableReinitialize: true,
    initialValues: {
      cnpj: itemEdit?.cnpj,
      cnae: itemEdit?.cnae,
      company_name: itemEdit?.company_name,
      fantasy_name: itemEdit?.fantasy_name,
    },
    validationSchema: companySchema,
    onSubmit: () => {},
  }

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
            <Formik {...formikConfig}>
              {({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="cnpj"
                    label={translate('COMPANY:RESOURCES:CNPJ')}
                    margin="normal"
                    mask='99.999.999/9999-99'
                    fullWidth
                    component={MaskedInput}
                    value={values?.cnpj}
                    disabled
                  />

                  <Field
                    name="cnae"
                    label={translate('COMPANY:RESOURCES:CNAE')}
                    margin="normal"
                    fullWidth
                    component={TextField}
                    value={values?.cnae}
                    disabled
                  />
                  <Field
                    name="company_name"
                    label={translate('COMPANY:RESOURCES:COMPANY_NAME')}
                    margin="normal"
                    fullWidth
                    component={TextField}
                    value={values?.company_name}
                    disabled
                  />
                  <Field
                    name="fantasy_name"
                    label={translate('COMPANY:RESOURCES:FANTASY_NAME')}
                    margin="normal"
                    fullWidth
                    component={TextField}
                    value={values?.fantasy_name}
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