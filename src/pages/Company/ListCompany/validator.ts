import * as Yup from 'yup';

export const compnayUpdateSchema = Yup.object().shape({
  cnae: Yup.string().required('ERROR:VALIDATION:REQUIRED'),
  fantasy_name: Yup.string().required('ERROR:VALIDATION:REQUIRED'),
});

export const companySchema = Yup.object().shape({
  cnpj: Yup.string().required('ERROR:VALIDATION:REQUIRED'),
  cnae: Yup.string().required('ERROR:VALIDATION:REQUIRED'),
  company_name: Yup.string().required('ERROR:VALIDATION:REQUIRED'),
  fantasy_name: Yup.string().required('ERROR:VALIDATION:REQUIRED'),
});
