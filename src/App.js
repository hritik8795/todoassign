import { Button, Card, TextField, Typography } from "@mui/material";
import "./App.css";
import Box from "@mui/material/Box";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
// import InfoIcon from "@mui/icons-material/Info";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "./component/Dialog";

const bookObject = {
  Title: "",
  Input: "",
};
function App() {
  const [model, Setmodel] = useState(bookObject);
  const [bookList, setbookList] = useState([]);
  const [edit, SetEdit] = useState(false);

  const changehandler = (e) => {
    const value = e.target.value;
    Setmodel((model) => ({
      ...model,
      [e.target.name]: value,
    }));
  };
  const AddBook = () => {
    if (edit) {
      const updateBookList = bookList.map((row) =>
        row.id === model.id ? model : row
      );
      setbookList(updateBookList);
      SetEdit(false);
      Setmodel(bookObject);
    } else {
      let listItems = bookList;
      const item = {
        id: bookList.length,
        ...model,
      };
      listItems = [...bookList, item];
      setbookList(listItems);
      clearData();
    }
  };

  const clearData = () => {
    Setmodel(bookObject);
  };
  const deleteRow = (id) => {
    const filtered = bookList.filter((items) => items.id !== id);
    setbookList(filtered);
  };

  const editRow = (data) => {
    Setmodel(data);
    SetEdit(true);
  };

  console.log(model);
  return (
    <div className="App">
      <Box
        sx={{
          mt: 2,
          border: "1px solid #ed8c05",
        }}
      >
        <h1 style={{ textAlign: "left", color: "#fff" }}>
          GYIZER
          <br />
          Todo App
        </h1>
        {/* <h4 style={{ textAlign: "left", color: "#fff" }}>Todo App</h4> */}
      </Box>

      <div className="info">
        <Box style={{ width: "100%", color: "#000" }}>
          <TextField
            label="Title..."
            name="Title"
            varient="outlined"
            onChange={changehandler}
            style={{
              width: "60%",
              backgroundColor: "#4d4b49",
              color: "#000",
            }}
            sx={{ mr: 2, mb: 2 }}
            value={model.Title}
          />
          <TextField
            label="Input..."
            name="Input"
            varient="outlined"
            style={{ width: "60%" }}
            onChange={changehandler}
            style={{
              width: "60%",
              backgroundColor: "#4d4b49",
              color: "#000",
            }}
            sx={{ mr: 2, mb: 2 }}
            value={model.Input}
          />
        </Box>
        <Box
          sx={{
            mt: 2,
            border: "1px solid #ed8c05",
            p: 2,

            flexDirection: "row",
          }}
        >
          <Button
            variant="contained"
            onClick={AddBook}
            style={{
              border: "2px solid #ed8c05",
              backgroundColor: "#4a4f4c",
              width: "20%",
            }}
          >
            {edit ? "Update" : <AddIcon />}
          </Button>
        </Box>
      </div>

      <Box
        sx={{
          m: 2,
          p: 2,
          border: "1px solid #ed8c05",
        }}
      >
        <div>
          {bookList &&
            bookList.map((row, index) => (
              <div className="row" style={{ flexDirection: "row" }}>
                <div
                  className=" card col-sm-4 m-2 d-inline"
                  style={{ flexDirection: "row" }}
                >
                  <Typography sx={{ textAlign: "start", p: 2 }}>
                    Title: {row.Title}
                  </Typography>
                  <Typography sx={{ textAlign: "start", p: 2 }}>
                    Description: {row.Input}
                  </Typography>
                  <Typography>
                    <EditIcon
                      sx={{ textAlign: "end" }}
                      style={{
                        color: "green",
                        cursor: "pointer",
                      }}
                      onClick={() => editRow(row)}
                    />
                    <ClearIcon
                      sx={{ textAlign: "end", ml: 2 }}
                      style={{
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteRow(row.id)}
                    />
                    <Dialog />
                  </Typography>
                </div>
              </div>
            ))}
        </div>
      </Box>
    </div>
  );
}

export default App;
