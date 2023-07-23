import { Box, getBottomNavigationUtilityClass } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AddUserDialog from "../Modals/AddUserDialog";
import { getUsers, addUser, deleteUser } from "../Services/LoginService";
import EditUserDialog from "../Modals/EditUserDialog";
import AddUserExcel from "../Modals/AddUserExcel";
import "../css/users.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
function UsersComponent() {
  const [listUser, setListUser] = useState([]);
  const [isDialog, setIsDialog] = useState(false);
  const [isExcel, setIsExcel] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [dataEdit, setDataEdit] = useState(getBottomNavigationUtilityClass);
  const handleOpenDialog = () => {
    setIsDialog(true);
  };
  const handleOpenExcel = () => {
    setIsExcel(true);
  };
  const handleCloseDialog = () => {
    setIsDialog(false);
    setEditUser(false);
    setIsExcel(false);
  };

  const handleDeleteUser = (data) => {
    deleteUser((res) => {
      if (res.statusCode === 200) {
        getUsers((res) => {
          setListUser(res.data);
        });
      }
    }, data.id);
  };
  const handleEditUser = (edit) => {
    setEditUser(true);

    setDataEdit(edit.row);
  };
  console.log(typeof dataEdit);
  const handleGetUser = () => {
    getUsers((res) => {
      setListUser(res.data);
    });
  };

  useEffect(() => {
    handleGetUser();
  }, []);
  console.log(listUser[1]);
  const columns = [
    {
      field: "username",
      headerName: "User Name",
      width: 350,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 100,
      editable: true,
    },
    {
      field: "password",
      headerName: "Password",
      width: 100,
      editable: true,
    },
    {
      field: "courses",
      headerName: "Courses",
      width: 200,
      editable: true,
      renderCell: (params) => {
        console.log(params.value[0]);
        return (
          <div>
            {params.value.map((item, key) => {
              return <span key={key}> {item.code + ","}</span>;
            })}
          </div>
        );
      },
    },
    {
      field: "id",
      headerName: "Handle",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <div>
          <Button
            className="btn btn-primary mr-2"
            onClick={() => handleEditUser(params)}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            className="btn btn-danger"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteUser(params)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="user">
      <div className="user-header">
        <h5>User List</h5>
        <button className="btn btn-success" onClick={handleOpenDialog}>
          Add User
        </button>
        <button className="btn btn-success" onClick={handleOpenExcel}>
          Add Users(excel)
        </button>
      </div>
      <div>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={listUser}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            autoHeight
            className="responsive-data-grid"
          />
        </Box>
      </div>
      {isDialog && (
        <AddUserDialog
          open={isDialog}
          handleClose={handleCloseDialog}
          getUsers={handleGetUser}
        />
      )}

      {editUser && (
        <EditUserDialog
          open={editUser}
          handleClose={handleCloseDialog}
          data={dataEdit}
          getUsers={handleGetUser}
        />
      )}
      {isExcel && (
        <AddUserExcel
          handleClose={handleCloseDialog}
          handleGet={handleGetUser}
        />
      )}
    </div>
  );
}

export default UsersComponent;
