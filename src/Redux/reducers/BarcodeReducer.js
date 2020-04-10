const initialState = {
  BarcodeSelected: null,
  Status: "",
  BarcodeCheck: null,
  Cliente: "",
  Articolo: "",
  Note: "",
  Quantita: "",
  RicettaAncorante: "",
  RicettaRiporto: "",
  NumPezzi: "",
  DataOra: "",
  QuantitaAncoranteUtiliz: "",
  QuantitaRiportoUtilz: "",
  DurataLavorazione: ""
};

const BarcodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_BARCODE":
      return {
        ...state,
        BarcodeSelected: action.payload
      };
    case "BARCODE_CHECK":
      return {
        ...state,
        BarcodeCheck: action.payload
      };
    case "ATTREZZAGGIO_START_STATUS":
      return {
        ...state,
        Status: "Attrezzaggio Started"
      };
    case "ATTREZZAGGIO_SOSPESO_STATUS":
      return {
        ...state,
        Status: "Attrezzaggio Sospeso"
      };
    case "ATTREZZAGGIO_RIPRESO_STATUS":
      return {
        ...state,
        Status: "Attrezzaggio Ripreso"
      };
    case "ATTREZZAGGIO_COMPLETATO_STATUS":
      return {
        ...state,
        Status: "Attrezzaggio Completato"
      };
    case "RIPORTO_COMPLETATO_STATUS":
      return {
        ...state,
        Status: "Riporto Completato"
      };
    case "CHIUSURA_ODP":
      return {
        ...state,
        Status: "Chiusura ODP"
      };
    case "GET_CLIENTE":
      return {
        ...state,
        Cliente: action.payload
      };
    case "GET_ARTICOLO":
      return {
        ...state,
        Articolo: action.payload
      };
    case "GET_NOTE":
      return {
        ...state,
        Note: action.payload
      };
    case "GET_QUANTITA":
      return {
        ...state,
        Quantita: action.payload
      };
    case "GET_RICETTA_ANCORANTE":
      return {
        ...state,
        RicettaAncorante: action.payload
      };
    case "GET_RICETTA_RIPORTO":
      return {
        ...state,
        RicettaRiporto: action.payload
      };
    case "GET_NUM_PEZZI":
      return {
        ...state,
        NumPezzi: action.payload
      };
    case "GET_DATA_ORA":
      return {
        ...state,
        DataOra: action.payload
      };
    case "GET_QUANTITA_ANCORANTE_UTILIZ":
      return {
        ...state,
        QuantitaAncoranteUtiliz: action.payload
      };
    case "GET_QUANTITA_RIPORTO_UTILZ":
      return {
        ...state,
        QuantitaRiportoUtilz: action.payload
      };
    case "GET_DURATA_LAVORAZIONE":
      return {
        ...state,
        DurataLavorazione: action.payload
      };
    default:
      return state;
  }
};

export default BarcodeReducer;
