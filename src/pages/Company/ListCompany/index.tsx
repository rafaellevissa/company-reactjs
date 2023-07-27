import React, { useEffect, useState } from "react";
import { Divider, Grid, Typography, Snackbar, Alert } from '@mui/material';
import { GridColDef, GridCellParams } from '@mui/x-data-grid';

import Show from './Components/Show';
import Edit from './Components/Edit';
import Add from './Components/Add';
import Delete from './Components/Delete';

import CustomDataGrid from '../../../components/DataGrid';
import Layout from '../../../layouts/dashboard';
import { useDispatch, useSelector } from "react-redux";
import { list } from "../../../store/modules/company/actions";
import { useTranslation } from "../../../hooks/use-translation";
import { Company, Page } from "../../../store/modules/company/types";

export const ListCompaniesPage = () => {
	const dispatch = useDispatch();
	const { translate } = useTranslation()
	const { item, error, loading } = useSelector<any, any>(item => item.company)
	const [page, setPage] = useState<Page>({
		currentPage: 0,
		perPage: 25
	});

	useEffect(() => {
		dispatch(list(page));
	}, [page]);



	const handlePageChange = (newPage: number) => {
		setPage({
			...page,
			currentPage: newPage
		})
	}

	const columns: GridColDef[] = [
		{ field: 'id', headerName: translate('COMPANY:RESOURCES:ID'), minWidth: 30, flex: 0.3 },
		{ field: 'cnpj', headerName: translate('COMPANY:RESOURCES:CNPJ'), minWidth: 200, flex: 1 },
		{ field: 'cnae', headerName: translate('COMPANY:RESOURCES:CNAE'), minWidth: 200, flex: 1 },
		{ field: 'company_name', headerName: translate('COMPANY:RESOURCES:COMPANY_NAME'), minWidth: 200, flex: 1 },
		{ field: 'fantasy_name', headerName: translate('COMPANY:RESOURCES:FANTASY_NAME'), minWidth: 200, flex: 1 },
		{ 
			field: 'actions', 
			headerName: translate('COMPANY:RESOURCES:ACTIONS'),
			minWidth: 50, 
			flex: 1,
			
			renderCell: (params: GridCellParams) =>
			{
				return (
					<div>
						<Show id={params.row.cnpj} />
						<Edit id={params.row.cnpj} />
						<Delete id={params.row.cnpj} />
					</div>
				);
			}
		},
	]

	return (
		<Layout>
			<Grid container sx={{ width: '100%' }}>
				<Grid item xs={12}>
					<Typography variant='h6' >{translate('COMPANY:TITLE')}</Typography>
					<Divider />
				</Grid>

				<Grid item xs={12}>
					<Add />
				</Grid>

				<Grid item xs={12}>
					{Array.isArray(item?.data) && (
						<CustomDataGrid 
							div={{ width: '100%', height: 500 }}
							dataGrid={{ 
								columns,
								rows: item.data.map((element: Company) => ({
									...element,
								})),
								total: item.meta.total,
								handlePageChange,
								perPage: page.perPage,
								page: page.currentPage,
								loading,
							}}
						/>
					)}
				</Grid>
			</Grid>

			<Snackbar open={error} autoHideDuration={300}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {translate('COMPANY:ERROR')}
        </Alert>
      </Snackbar>
		</Layout>
	);
}
