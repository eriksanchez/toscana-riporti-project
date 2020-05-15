import {
  START_TIME,
  GET_OPERATORE,
  SELECT_OPERATORE,
  SELECT_BARCODE,
  BARCODE_CHECK,
  GET_CLIENTE,
  GET_ARTICOLO,
  GET_NOTE,
  GET_QUANTITA,
  GET_RICETTA_ANCORANTE,
  GET_RICETTA_RIPORTO,
  GET_NUM_PEZZI,
  GET_DATA_ORA,
  GET_QUANTITA_ANCORANTE_UTILIZ,
  GET_QUANTITA_RIPORTO_UTILZ,
  GET_DURATA_LAVORAZIONE,
  SET_START_ATTREZZAGGIO,
  ADD_SOSPENDI_DATE,
  ADD_RIPRENDI_DATE,
  SET_COMPLETATO_ATTREZZAGGIO,
  ATTREZZAGGIO_START_STATUS,
  ATTREZZAGGIO_SOSPESO_STATUS,
  ATTREZZAGGIO_RIPRESO_STATUS,
  ATTREZZAGGIO_COMPLETATO_STATUS,
  RIPORTO_COMPLETATO_STATUS,
  CHIUSURA_ODP,
} from "./types";

//import FlaskApi from "../../FlaskApi";
import JsonServerApi from "../../JsonServerApi";
import history from "../../App/Routers/history";

export const startTime = (time) => ({
  type: START_TIME,
  payload: time,
});

//Operatore action creators
export const fetchOperatore = () => async (dispatch) => {
  try {
    const response = await JsonServerApi.get("/operatores");
    dispatch({ type: GET_OPERATORE, payload: response.data });
  } catch (e) {
    console.log("Error: ", e.message);
  }
};

export const selectOperatore = (operatore) => ({
  type: SELECT_OPERATORE,
  payload: operatore,
});

//Barcode action creators
export const selectBarcode = (barcode) => ({
  type: SELECT_BARCODE,
  payload: barcode,
});
//using json server
export const fetchForAttrezzaggio = (selectedBarcode) => async (dispatch) => {
  try {
    const response = await JsonServerApi.get(`/barcode/${selectedBarcode}`);
    const clienteFromBarcodeSelected = response.data.cliente;
    const articoloFromBarcodeSelected = response.data.articolo;
    const noteFromBarcodeSelected = response.data.note;
    const quantitaFromBarcodeSelected = response.data.quantita;
    const ricettaAncoranteFromBarcodeSelected = response.data.ricettaAncorante;
    const ricettaRiportoFromBarcodeSelected = response.data.ricettaRiporto;

    dispatch({ type: GET_CLIENTE, payload: clienteFromBarcodeSelected });
    dispatch({ type: GET_ARTICOLO, payload: articoloFromBarcodeSelected });
    dispatch({ type: GET_NOTE, payload: noteFromBarcodeSelected });
    dispatch({ type: GET_QUANTITA, payload: quantitaFromBarcodeSelected });
    dispatch({
      type: GET_RICETTA_ANCORANTE,
      payload: ricettaAncoranteFromBarcodeSelected,
    });
    dispatch({
      type: GET_RICETTA_RIPORTO,
      payload: ricettaRiportoFromBarcodeSelected,
    });
  } catch (e) {
    console.log("Error: ", e.message);
  }
};

export const fetchForRiporto = (selectedBarcode) => async (dispatch) => {
  try {
    const response = await JsonServerApi.get(`/barcode/${selectedBarcode}`);
    const clienteFromBarcodeSelected = response.data.cliente;
    const articoloFromBarcodeSelected = response.data.articolo;
    const noteFromBarcodeSelected = response.data.note;
    const quantitaFromBarcodeSelected = response.data.quantita;
    const ricettaAncoranteFromBarcodeSelected = response.data.ricettaAncorante;
    const ricettaRiportoFromBarcodeSelected = response.data.ricettaRiporto;
    const numPezziFromBarcodeSelected = response.data.numPezziLavorati;
    const dataOraFromBarcodeSelected = response.data.dataOra;

    dispatch({ type: GET_CLIENTE, payload: clienteFromBarcodeSelected });
    dispatch({ type: GET_ARTICOLO, payload: articoloFromBarcodeSelected });
    dispatch({ type: GET_NOTE, payload: noteFromBarcodeSelected });
    dispatch({ type: GET_QUANTITA, payload: quantitaFromBarcodeSelected });
    dispatch({
      type: GET_RICETTA_ANCORANTE,
      payload: ricettaAncoranteFromBarcodeSelected,
    });
    dispatch({
      type: GET_RICETTA_RIPORTO,
      payload: ricettaRiportoFromBarcodeSelected,
    });
    dispatch({ type: GET_NUM_PEZZI, payload: numPezziFromBarcodeSelected });
    dispatch({ type: GET_DATA_ORA, payload: dataOraFromBarcodeSelected });
  } catch (e) {
    console.log("Error: ", e.message);
  }
};
export const fetchForChiusuraLavorazione = (selectedBarcode) => async (
  dispatch
) => {
  try {
    const response = await JsonServerApi.get(`/barcode/${selectedBarcode}`);
    const clienteFromBarcodeSelected = response.data.cliente;
    const articoloFromBarcodeSelected = response.data.articolo;
    const noteFromBarcodeSelected = response.data.note;
    const quantitaFromBarcodeSelected = response.data.quantita;

    const numPezziFromBarcodeSelected = response.data.numPezziLavorati;
    const dataOraFromBarcodeSelected = response.data.dataOra;
    const quantitaAncorFromBarcodeSelected = response.data.quantitaAncorante;
    const quantitaRiporFromBarcodeSelected = response.data.quantitaRiporto;
    const durataLavorazioneFromBarcodeSelected =
      response.data.durataLavorazione;

    dispatch({ type: GET_CLIENTE, payload: clienteFromBarcodeSelected });
    dispatch({ type: GET_ARTICOLO, payload: articoloFromBarcodeSelected });
    dispatch({ type: GET_NOTE, payload: noteFromBarcodeSelected });
    dispatch({ type: GET_QUANTITA, payload: quantitaFromBarcodeSelected });
    dispatch({ type: GET_NUM_PEZZI, payload: numPezziFromBarcodeSelected });
    dispatch({ type: GET_DATA_ORA, payload: dataOraFromBarcodeSelected });
    dispatch({
      type: GET_QUANTITA_ANCORANTE_UTILIZ,
      payload: quantitaAncorFromBarcodeSelected,
    });
    dispatch({
      type: GET_QUANTITA_RIPORTO_UTILZ,
      payload: quantitaRiporFromBarcodeSelected,
    });
    dispatch({
      type: GET_DURATA_LAVORAZIONE,
      payload: durataLavorazioneFromBarcodeSelected,
    });
  } catch (e) {
    console.log("Error: ", e.message);
  }
};

//with api use barcodeSelectedData = response.data.filter(bsd ...)
//with apiTest(Json Server) barcodeSelectedData = response.data.barcode(bsd ...)
export const fetchBarcodeCheck = (selectedBarcode) => async (dispatch) => {
  try {
    const response = await JsonServerApi.get("/barcode");
    const barcodeSelectedData = response.data.filter((bsd) => {
      return bsd.id === parseInt(selectedBarcode);
    });
    if (barcodeSelectedData.length) {
      dispatch({ type: BARCODE_CHECK, payload: barcodeSelectedData });
      return true;
    } else return false;
  } catch (e) {
    console.log("Error: ", e.message);
  }
};
export const fetchStatusCheck = (selectedBarcode) => async (dispatch) => {
  try {
    const response = await JsonServerApi.get("/barcode");
    response.data.filter((bsd) => {
      if (bsd.id === parseInt(selectedBarcode)) {
        if (
          bsd.status === "Attrezzaggio Sospeso" ||
          bsd.status === "Attrezzaggio Ripreso"
        ) {
          dispatch({
            type: ATTREZZAGGIO_RIPRESO_STATUS,
          });
          history.push("/Attrezzaggio");
        } else if (bsd.status === "Attrezzaggio Completato") {
          dispatch({
            type: ATTREZZAGGIO_COMPLETATO_STATUS,
            payload: bsd.status,
          });
          history.push("/Riporto");
        } else if (bsd.status === "Riporto Completato") {
          dispatch({ type: RIPORTO_COMPLETATO_STATUS, payload: bsd.status });
          history.push("/Chiusura");
        } else if (bsd.status === "Chiusura ODP") {
          dispatch({ type: CHIUSURA_ODP, payload: bsd.status });
          history.push("/Chiusura");
        } else {
          history.push("/Attrezzaggio");
          if (bsd.status === "") setAttrezzaggioStarted();
        }
      }
    });
  } catch (e) {
    console.log("Error: ", e.message);
  }
};

//Time stamps action creators
export const setStartTime = (startTime) => ({
  type: SET_START_ATTREZZAGGIO,
  payload: startTime,
});

export const addSospendi = (sospendiTime) => ({
  type: ADD_SOSPENDI_DATE,
  payload: sospendiTime,
});

export const addRiprendi = (reprendiTime) => ({
  type: ADD_RIPRENDI_DATE,
  payload: reprendiTime,
});

export const setCompletatoAtrrezzaggio = (completato) => ({
  type: SET_COMPLETATO_ATTREZZAGGIO,
  payload: completato,
});

//Status action creators
export const setAttrezzaggioStarted = (status) => ({
  type: ATTREZZAGGIO_START_STATUS,
  payload: status,
});

export const setAttrezzaggioSospeso = (status) => ({
  type: ATTREZZAGGIO_SOSPESO_STATUS,
  payload: status,
});

export const setAttrezzaggioRipreso = (status) => ({
  type: ATTREZZAGGIO_RIPRESO_STATUS,
  payload: status,
});

export const setAttrezzaggioCompletato = (status) => ({
  type: ATTREZZAGGIO_COMPLETATO_STATUS,
  payload: status,
});

export const setRiportoCompletato = (status) => ({
  type: RIPORTO_COMPLETATO_STATUS,
  payload: status,
});

export const setChiusuraODP = (status) => ({
  type: CHIUSURA_ODP,
  payload: status,
});

//Test posting to api

export const editBarcodeStatus = (id, status) => async (dispatch) => {
  try {
    const response = await JsonServerApi.patch(`/barcode/${id}`, status);

    dispatch({ type: ATTREZZAGGIO_SOSPESO_STATUS, payload: response.data });
  } catch (e) {
    console.log("Error: ", e.message);
  }
};
