import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ValidationAlertMessage from "./validationAlertMessage";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Form = () => {
  const [inputs, setInputs] = useState({ hobby: [], sex: "male" });
  const [tableData, setTableData] = useState([]);
  const [editID, setEditId] = useState("");
  const [getCountry, setCountry] = useState([]);
  const [getState, setState] = useState([]);
  const [getCity, setCity] = useState([]);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const hobby = [];
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("vall", value, name);
    if (name == "hobby") {
      if (event.target.checked) {
        setInputs((values) => ({
          ...values,
          [name]: [...values.hobby, value],
        }));
      } else {
        setInputs((values) => ({
          ...values,
          [name]: values?.hobby?.filter((item) => item != value),
        }));
      }
    } else {
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };
  function getUserData() {
    axios.get("http://localhost:8000/users").then((res) => {
      setTableData(res.data);
    });
  }
  function getData() {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/iso")
      .then((res) => {
        setCountry([
          { name: "Select Country", Iso2: "", Iso3: "" },
          ...res.data.data,
        ]);
      });
    setCity([]);
  }

  useEffect(() => {
    const request = {
      country: inputs.countries,
    };
    if (inputs.countries) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/states", request)
        .then((res) => {
          setState([
            { name: "Select states", state_code: "" },
            ...res.data.data.states,
          ]);
          console.log("[getState, ...res.data.data.states] ", [
            getState,
            ...res.data.data.states,
          ]);
        });
    }
  }, [inputs.countries]);

  useEffect(() => {
    const request1 = {
      country: inputs.countries,
      state: inputs.state,
    };
    if (inputs.state) {
      console.log("request1", request1, inputs);
      axios
        .post(
          "https://countriesnow.space/api/v0.1/countries/state/cities",
          request1
        )
        .then((res) => {
          setCity(["select City", ...res.data.data]);
          console.log("[getCity, ...res.data.data] ", [
            getCity,
            ...res.data.data,
          ]);
        });
    }
  }, [inputs.state]);
  console.log(getState, "html");
  console.log(isSubmitted, "error");

  // function handleChangeDropdown(event) {
  //   const name = event.target.name;
  //   const value = event.target.value;

  //   setInputs((values) => ({ ...values, [name]: value }));
  // }
  const handleSubmit = (event) => {
    console.log(isSubmitted, "submit");
    event.preventDefault();
    if (editID) {
      axios.put(`http://localhost:8000/users/${editID}`, inputs).then((res) => {
        getUserData();
      });
      setEditId(null);
      setInputs({ hobby: [], sex: "male", username: "", age: "" });
    } else {
      axios.post("http://localhost:8000/users", inputs).then((res) => {
        getUserData();
      });
      setInputs({
        hobby: [],
        sex: "male",
        username: "",
        age: "",
        city: "",
        countries: "",
        state: "",
      });
      setCountry([]);
      setCity([]);
      setState([]);
    }
    navigate("/logIn");
  };

  const handleUpdate = async (id) => {
    await axios.get(`http://localhost:8000/users/${id}`).then((res) => {
      setInputs(res.data);
      console.log(inputs);
      setEditId(res.data.id);
    });
  };
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/users/${id}`).then((res) => {
      getUserData();
    });
  };

  console.log("input", inputs);

  useEffect(() => {
    getUserData();
    getData();
  }, []);
  // function validation() {
  //   if (!inputs?.username) {
  //     alert("fill the name");
  //   }
  // }
  return (
    <div className="container col-sm-3">
      <header>
        <h1>SignUp Form</h1>
        <p className="">create your Account</p>
      </header>
      <form
        action=""
        className="form"
        onSubmit={(event) => {
          if (
            !inputs?.username ||
            !inputs?.hobby ||
            !inputs?.sex ||
            !inputs?.city ||
            !inputs?.age
          ) {
            event.preventDefault();
            setMessage("This field is required.");
            setIsSubmitted(true);
          } else {
            handleSubmit(event);
          }
        }}
      >
        <div className="formGroup age">
          <label htmlFor="" style={alert}>
            Enter your name:
          </label>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          />
          <TextField
            error={!inputs.username && isSubmitted}
            id="outlined-basic"
            label="username"
            variant="outlined"
            name="username"
            type="text"
            value={inputs.username}
            placeholder="username"
            onChange={handleChange}
          />
          {!inputs.username && <ValidationAlertMessage message={message} />}
        </div>
        <br />
        <div className="formGroup age">
          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              error={!inputs.sex && isSubmitted}
            >
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              defaultValue="Male"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
                checked={inputs.sex == "female"}
                name="sex"
                onChange={handleChange}
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                checked={inputs.sex == "male"}
                label="Male"
                name="sex"
                onChange={handleChange}
              />
            </RadioGroup>
          </FormControl>
          <div>
            {!inputs.sex && <ValidationAlertMessage message={message} />}
          </div>
        </div>
        <br />
        <div className="formGroup age">
          <label htmlFor="" style={alert}>
            Enter your age
          </label>
          <TextField
            error={!inputs.age && isSubmitted}
            id="outlined-basic"
            label="age"
            variant="outlined"
            name="age"
            type="text"
            value={inputs.age}
            placeholder="age"
            onChange={handleChange}
          />
          {!inputs.age && <ValidationAlertMessage message={message} />}
        </div>
        <br />
        <div className="formGroup">
          <label htmlFor="" style={alert}>
            Enter your city:
          </label>
          <div className="select">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">country</InputLabel>
              <Select
                error={!inputs.countries && isSubmitted}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="countries"
                value={inputs?.countries || ""}
                label="country"
                onChange={handleChange}
              >
                {getCountry.map((item, index) => (
                  <MenuItem value={item.name} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">state</InputLabel>
              <Select
                error={!inputs.state && isSubmitted}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="state"
                value={inputs?.state || ""}
                label="state"
                onChange={handleChange}
              >
                {getState.map((item, index) => (
                  <MenuItem value={item.name} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">city</InputLabel>
              <Select
                error={!inputs.city && isSubmitted}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="city"
                value={inputs?.city || ""}
                label="city"
                onChange={handleChange}
              >
                {getCity.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            {!inputs.city && <ValidationAlertMessage message={message} />}
          </div>
        </div>
        <br />
        <div className="formGroup">
          <label className="form-check-label" htmlFor="" style={alert}>
            enter your Hobby:
          </label>
          <div className="form-check">
            <FormGroup>
              <FormControlLabel
                error={!inputs.hobby && isSubmitted}
                control={<Checkbox defaultChecked />}
                label="singing"
                value="singing"
                checked={inputs?.hobby?.includes("singing")}
                onChange={handleChange}
                name="hobby"
              />
              <FormControlLabel
                error={!inputs.hobby && isSubmitted}
                control={<Checkbox />}
                label="playing-cricket"
                checked={inputs?.hobby?.includes("playing-cricket")}
                value="playing-cricket"
                onChange={handleChange}
                name="hobby"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="teaching"
                checked={inputs?.hobby?.includes("teaching")}
                value="teaching"
                onChange={handleChange}
                name="hobby"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="teaching"
                checked={inputs?.hobby?.includes("dancing")}
                value="dancing"
                onChange={handleChange}
                name="hobby"
              />
            </FormGroup>
          </div>
          {inputs.hobby.length == 0 && (
            <ValidationAlertMessage message={message} />
          )}
        </div>
        <br />
        {editID ? (
          <Stack direction="row">
            <Button
              variant="contained"
              value={"update"}
              name="submit"
              type="submit"
            >
              submit
            </Button>
          </Stack>
        ) : (
          <Stack direction="row">
            <Button variant="contained" name="submit" type="submit">
              submit
            </Button>
          </Stack>
        )}
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">age</th>
            <th scope="col">city</th>
            <th scope="col">Hobby</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>{item.age}</td>
              <td>{item.city}</td>
              <td>{item.hobby.join(",")}</td>
              <td>
                <button onClick={() => handleUpdate(item.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(item.id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Form;
