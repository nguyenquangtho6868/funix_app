import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AddUserDialog from '../Modals/AddUserDialog';
import { getUsers, addUser, deleteUser } from '../Services/LoginService';
import '../css/users.css'

function UsersComponent() {
  
  const [listUser, setListUser] = useState([]);
  const [isDialog, setIsDialog] = useState(false);

  const handleOpenDialog = () => {
    setIsDialog(true);
  }

  const handleCloseDialog = () => {
    setIsDialog(false);
  }

  const handleDeleteUser = (data) => {
    deleteUser((res) => {
      if(res.statusCode === 200) {
        getUsers((res) => {setListUser(res.data);})
      }  
    }, data.id)
  }

  const handleGetUser = () => {
    getUsers((res) => {
      setListUser(res.data);
    })
  }

  useEffect(() => {
    handleGetUser();
  }, [])

  const columns = [
    {
      field: 'username',
      headerName: 'User Name',
      width: 350,
      editable: true,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 100,
      editable: true,
    },
    {
      field: 'courses',
      headerName: 'Courses',
      width: 200,
      editable: true,
    },
    {
      field: 'id',
      headerName: 'Handle',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <div>
          <button className='btn btn-primary mr-2' >
            Edit
          </button>
          <button className='btn btn-danger' onClick={() => handleDeleteUser(params)} >
            Delete
          </button>
        </div>
      )
    },
  ];

  
  
  return (
    <div className="user">
      <div className="user-header">
        <h5>User List</h5>
        <button className="btn btn-success" onClick={handleOpenDialog}>Add User</button>
      </div>
      <div>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={listUser}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </div>
      <AddUserDialog 
        open={isDialog} 
        handleClose={handleCloseDialog}
        getUsers={handleGetUser}
      />
    </div>
  );
}

export default UsersComponent;