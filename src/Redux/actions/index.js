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
  CHIUSURA_ODP
} from "./types";

import FlaskApi from "../../FlaskApi";
import JsonServerApi from "../../JsonServerApi";
import history from "../../App/Routers/history";

export const startTime = time => ({
  type: START_TIME,
  payload: time
});
//Operatore action creators

export const fetchOperatore = () => async dispatch => {
  const response = await FlaskApi.get("/operatore");
  dispatch({ type: GET_OPERATORE, payload: response.data });
};

export const selectOperatore = operatore => ({
  type: SELECT_OPERATORE,
  payload: operatore
});

//Barcode action creators
export const selectBarcode = barcode => ({
  type: SELECT_BARCODE,
  payload: barcode
});
//using json server
export const fetchCliente = selectedBarcode => async dispatch => {
  const response = await JsonServerApi.get("/barcode");
  const barcodeSelectedData = response.data.filter(
    bsd => bsd.id === parseInt(selectedBarcode)
  );
  const clienteFromBarcodeSelected = barcodeSelectedData[0].cliente;
  dispatch({ type: GET_CLIENTE, payload: clienteFromBarcodeSelected });
};

export const fetchArticolo = selectedBarcode => async dispatch => {
  const response = await JsonServerApi.get("/barcode");
  const barcodeSelectedData = response.data.filter(
    bsd => bsd.id === parseInt(selectedBarcode)
  );
  const articoloFromBarcodeSelected = barcodeSelectedData[0].articolo;

  dispatch({ type: GET_ARTICOLO, payload: articoloFromBarcodeSelected });
};

export const fetchNote = selectedBarcode => async dispatch => {
  const response = await JsonServerApi.get("/barcode");
  const barcodeSelectedData = response.data.filter(
    bsd => bsd.id === parseInt(selectedBarcode)
  );
  const noteFromBarcodeSelected = barcodeSelectedData[0].note;
  dispatch({ type: GET_NOTE, payload: noteFromBarcodeSelected });
};

export const fetchQuantita = selectedBarcode => async dispatch => {
  const response = await JsonServerApi.get("/barcode");
  const barcodeSelectedData = response.data.filter(
    bsd => bsd.id === parseInt(selectedBarcode)
  );
  const quantitaFromBarcodeSelected = barcodeSelectedData[0].quantita;
  dispatch({ type: GET_QUANTITA, payload: quantitaFromBarcodeSelected });
};

export const fetchRicettaAncorante = selectedBarcode => async dispatch => {
  const response = await JsonServerApi.get("/barcode");
  const barcodeSelectedData = response.data.filter(
    bsd => bsd.id === parseInt(selectedBarcode)
  );
  const ricettaAncoranteFromBarcodeSelected =
    barcodeSelectedData[0].ricettaAncorante;
  dispatch({
    type: GET_RICETTA_ANCORANTE,
    payload: ricettaAncoranteFromBarcodeSelected
  });
};

export const fetchRicettaRiporto = selectedBarcode => async dispatch => {
  const response = await JsonServerApi.get("/barcode");
  const barcodeSelectedData = response.data.filter(
    bsd => bsd.id === parseInt(selectedBarcode)
  );
  const ricettaRiportoFromBarcodeSelected =
    barcodeSelectedData[0].ricettaRiporto;
  dispatch({
    type: GET_RICETTA_RIPORTO,
    payload: ricettaRiportoFromBarcodeSelected
  });
};

export const fetchNumPezzi = selectedBarcode => async dispatch => {
  const response = await JsonServerApi.get("/barcode");
  const barcodeSelectedData = response.data.filter(
    bsd => bsd.id === parseInt(selectedBarcode)
  );
  const numPezziFromBarcodeSelected = barcodeSelectedData[0].numPezziLavorati;
  dispatch({ type: GET_NUM_PEZZI, payload: numPezziFromBarcodeSelected });
};

export const fetchDataOra = selectedBarcode => async dispatch => {
  const response = await JsonServerApi.get("/barcode");
  const barcodeSelectedData = response.data.filter(
    bsd => bsd.id === parseInt(selectedBarcode)
  );
  const dataOraFromBarcodeSelected = barcodeSelectedData[0].dataOra;
  dispatch({ type: GET_DATA_ORA, payload: dataOraFromBarcodeSelected });
};

export const fetchQuantitaAncorUtil = selectedBarcode => async dispatch => {
  const response = await JsonServerApi.get("/barcode");
  const barcodeSelectedData = response.data.filter(
    bsd => bsd.id === parseInt(selectedBarcode)
  );
  const quantitaAncorFromBarcodeSelected =
    barcodeSelectedData[0].quantitaAncorante;
  dispatch({
    type: GET_QUANTITA_ANCORANTE_UTILIZ,
    payload: quantitaAncorFromBarcodeSelected
  });
};

export const fetchQuantitaRiporUtil = selectedBarcode => async dispatch => {
  const response = await JsonServerApi.get("/barcode");
  const barcodeSelectedData = response.data.filter(
    bsd => bsd.id === parseInt(selectedBarcode)
  );
  const quantitaRiporFromBarcodeSelected =
    barcodeSelectedData[0].quantitaRiporto;
  dispatch({
    type: GET_QUANTITA_RIPORTO_UTILZ,
    payload: quantitaRiporFromBarcodeSelected
  });
};

export const fetchDurataLavorazione = selectedBarcode => async dispatch => {
  const response = await JsonServerApi.get("/barcode");
  const barcodeSelectedData = response.data.filter(
    bsd => bsd.id === parseInt(selectedBarcode)
  );
  const durataLavorazioneFromBarcodeSelected =
    barcodeSelectedData[0].durataLavorazione;
  dispatch({
    type: GET_DURATA_LAVORAZIONE,
    payload: durataLavorazioneFromBarcodeSelected
  });
};
//with api use barcodeSelectedData = response.data.filter(bsd ...)
//with apiTest(Json Server) barcodeSelectedData = response.data.barcode(bsd ...)
export const fetchBarcodeCheck = selectedBarcode => async dispatch => {
  const response = await JsonServerApi.get("/barcode");
  const barcodeSelectedData = response.data.filter(bsd => {
    return bsd.id === parseInt(selectedBarcode);
  });
  if (barcodeSelectedData.length) {
    dispatch({ type: BARCODE_CHECK, payload: barcodeSelectedData });
    return true;
  } else return false;
};
export const fetchStatusCheck = selectedBarcode => async dispatch => {
  const response = await JsonServerApi.get("/barcode");
  response.data.filter(bsd => {
    if (bsd.id === parseInt(selectedBarcode)) {
      if (
        bsd.status === "Attrezzaggio Sospeso" ||
        bsd.status === "Attrezzaggio Ripreso"
      ) {
        dispatch({
          type: ATTREZZAGGIO_RIPRESO_STATUS
        });
        history.push("/Attrezzaggio");
      } else if (bsd.status === "Attrezzaggio Completato") {
        dispatch({ type: ATTREZZAGGIO_COMPLETATO_STATUS, payload: bsd.status });
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
};

//Time stamps action creators
export const setStartTime = startTime => ({
  type: SET_START_ATTREZZAGGIO,
  payload: startTime
});

export const addSospendi = sospendiTime => ({
  type: ADD_SOSPENDI_DATE,
  payload: sospendiTime
});

export const addRiprendi = reprendiTime => ({
  type: ADD_RIPRENDI_DATE,
  payload: reprendiTime
});

export const setCompletatoAtrrezzaggio = completato => ({
  type: SET_COMPLETATO_ATTREZZAGGIO,
  payload: completato
});

//Status action creators
export const setAttrezzaggioStarted = status => ({
  type: ATTREZZAGGIO_START_STATUS,
  payload: status
});

export const setAttrezzaggioSospeso = status => ({
  type: ATTREZZAGGIO_SOSPESO_STATUS,
  payload: status
});

export const setAttrezzaggioRipreso = status => ({
  type: ATTREZZAGGIO_RIPRESO_STATUS,
  payload: status
});

export const setAttrezzaggioCompletato = status => ({
  type: ATTREZZAGGIO_COMPLETATO_STATUS,
  payload: status
});

export const setRiportoCompletato = status => ({
  type: RIPORTO_COMPLETATO_STATUS,
  payload: status
});

export const setChiusuraODP = status => ({
  type: CHIUSURA_ODP,
  payload: status
});

//Test posting to api

export const editBarcodeStatus = (id, status) => async dispatch => {
  const response = await JsonServerApi.patch(`/barcode/${id}`, status);

  dispatch({ type: ATTREZZAGGIO_SOSPESO_STATUS, payload: response.data });
};
