import {
  Avatar,
  Button,
  CircularProgress,
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 420,
    margin: "auto",
  },
  modalPaper: {
    padding: "10px",
    backgroundColor: "#363a3e",
    outline: "none",
    borderRadius: "10px",
    height: "500px",
    width: "500px",
    textAlign: "center",
    boxShadow: theme.shadows[5],
    "& p": {
      padding: "5px",
      color: "gray",
    },
    "& h3": {
      color: "white",
    },
  },
  closeButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
  uploadButtton: {
    backgroundColor: "#7389da",
    color: "white",
    "&:hover": {
      backgroundColor: "#7389da",
      color: "white",
    },
  },
}));

function Home() {
  const [loading, setLoading] = useState(false);
  const [vehicalData, setVehicalData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const imageRef = useRef();
  const classes = useStyles();
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    await axios
      .get("http://pikpart-staging.herokuapp.com/api/vehicle/models")
      .then((response) => {
        console.log(response.data.data[0]);
        setVehicalData(response.data.data);
      });
    setLoading(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setImage(null);
  };

  const getImage = () => {
    imageRef.current.click();
  };

  const getImageFromFile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      handleModalOpen();
    }
  };

  const uploadImage = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setOpenModal(false);
    }, 1000);
    setTimeout(() => {
      setOpenSnackBar(true);
    }, 2000);
  };

  return (
    <HomeContainer>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackBar(false)}
        message="Image Uploaded Successfully"
      ></Snackbar>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.modalPaper}>
            {!uploading ? (
              <>
                <div className={classes.closeButton}>
                  <IconButton onClick={handleModalClose}>
                    <Close style={{ color: "white" }}></Close>
                  </IconButton>
                </div>
                <div>
                  {image && (
                    <img
                      style={{
                        height: "400px",
                        width: "400px",
                        objectFit: "contain",
                      }}
                      src={URL.createObjectURL(image)}
                    />
                  )}
                  <Button
                    onClick={uploadImage}
                    className={classes.uploadButtton}
                    fullWidth
                  >
                    Upload
                  </Button>
                </div>
              </>
            ) : (
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  height: "100%",
                }}
              >
                <CircularProgress />

                <p>Please Wait.....</p>
              </div>
            )}
          </div>
        </Fade>
      </Modal>
      <CardContainer>
        {vehicalData.length > 0 &&
          !loading &&
          vehicalData.map((data) => {
            return (
              <Card key={data.id}>
                <img
                  style={{
                    height: "100px",
                    width: "100px",
                  }}
                  src={data.imageUrl}
                ></img>
                <h2>{data.name}</h2>
                <h4>{data.vehicleType}</h4>
                <input
                  onChange={getImageFromFile}
                  ref={imageRef}
                  hidden
                  type="file"
                  accept="image/*"
                ></input>
                <Button
                  style={{ backgroundColor: "#1dacfc", color: "white" }}
                  onClick={getImage}
                >
                  Update Image
                </Button>
              </Card>
            );
          })}
      </CardContainer>

      {loading && (
        <div
          style={{
            width: "100%",
            height: "90vh",
            display: "grid",
            placeItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  /* background-color: #77aa77;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 2 1'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%2377aa77'/%3E%3Cstop offset='1' stop-color='%234fd'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23cf8' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23cf8' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='2' y2='2'%3E%3Cstop offset='0' stop-color='%23cf8' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23cf8' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='2' height='1'/%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23b)' points='0 1 0 0 2 0'/%3E%3Cpolygon fill='url(%23c)' points='2 1 2 0 0 0'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover; */
  height: 100vh;
  padding: 10px;
`;

const CardContainer = styled.div`
  display: grid;
  max-width: 1000px;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 15px;
  background: rgb(255, 60, 131);
  background: linear-gradient(
    90deg,
    rgba(255, 60, 131, 0.9) 0%,
    rgba(255, 159, 74, 0.7) 100%
  );
  > h2 {
    color: white;
    margin-top: 10px;
  }
  > h4 {
    margin-top: 0;
    color: white;
  }
`;

const HomeInnerContainer = styled.div`
  display: grid;
  place-content: center;
`;
