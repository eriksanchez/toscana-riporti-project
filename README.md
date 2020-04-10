# Toscana Riporti

## Quick Start

1.  Clone the repo `git clone ssh://git@repo.zerynth.com:10022/toi/toscana-riporti-frontend.git`
2.  Go to your project folder from your terminal
3.  Run: `npm install` or `yarn install`
4.  After install, run: `npm run start` or `yarn start`
5.  It will open your browser(http://localhost:3000)
6.  Next, Go to your project folder from your terminal and run: 'python3 Toscana_Riporti_Flask_Sample.py' to start up the Flask API with mock operators to populate the operator selection form.
7.  Finally, go to project folder once again from your terminal and navigate to your SampleApi folder
8.  Run: 'npm start' to start your Json Server API with mock barcode data

## Step One

Arrivo in postazione.
Input operatore e scansione barcode scheda di lavorazione. Su lettura barcode il sistema gestionale registra la fase di 'arrivo in postazione', ed invia al bene 1 i numeri ricetta dell'ancorante e del riporto relativi all'ordine da lavorare.
![React Reduction](public/images/IngressoScreenshot.png?raw=true "React Reduction")

## Step Two

Attrezzaggio.
Vengono visualizzati i dati informativi dell'ordine di lavorazione, azioni per sospensione attrezzaggio, attrezzaggio completato. Il sistema gestionale registra la fase di attrezzaggio.
![React Reduction](public/images/AttrezzaggioScreenshot.png?raw=true "React Reduction")

## Step Three

Riporto.
Il bene 1 trasmette al sistema gestionale, in tempo reale, i dati rilevati(numero pezzi lavorati, quantità plvere ed ancorante utilizzati, tempi di lavorazione); l'applicazione visualizza a sua volta, in tempo reale, il numero di pezzi lavorati, oltre alle data /ora ultimo dato ricevuto. Il sistema gestionale registra la fase di riporto.
![React Reduction](public/images/RiportoScreenshot.png?raw=true "React Reduction")

## Step Four

Chiusura lavorazione. Riepilogo pezzi lavorati, quantità riporto ed ancorante utilizzati, tempo di lavorazione impiegato. Su lettura barcode il sistema gestionale registra la fase di 'uscita da postazione', il tempo di lavorazione e le quantità dei componenti utilizzati.
![React Reduction](public/images/ChiusuraScreenshot.png?raw=true "React Reduction")

# Developer's Guide

## File Structure

For most of Toscana Riporti javascript and JSX code will be held in the src file inside the project folder. Inside the App folder will be the majority of the components utilized inside the application except for the Modal component, the API components, and the index.js.Inside the redux folder holds the Action creators, Action Tyes, and Reducers that pertain to the Redux store created in the index.js.

### App

Inside the App folder are the Attrezzaggio, Chiusura, Ingresso, Riporto, Routers, and shared folders along with the index.js for App. Inside the Routers folder you can find three files: Auth.js, history.js, and the index.js. Inside the index.js the routes were created to point to their corresponding components, including the PrivateRoute component. 

### Private Routing

Private routing was implemented to prohibit operatores to navigate to phases of the operation that they were not yet on. Instead of importing {BroswerRouter as Router} from 'react-router-dom' I instead created a custom router simply by importing {Router} from 'react-router-dom' for the purpose of utilizing the 'history' instance in my redux action creators. Thus I can import the history.js anywhere in my application I need to use it, like for example where I needed it in my Redux action creators. When using fetchStatusCheck() and checking for a certain status of the barcode, I would need to use the history instance in order to navigate to the appropiate component.

### Auth

The isAuthenticated state value in Auth.js determines whether private routes can be navigated to or not. In toscana riporti the isAuthenticated state value is initially false and is changed to true by the authenticate() function which is triggered by the handlClick() inside src/App/Ingresso/index.js. Auth.authenticate() will only be triggered if the ID number inputed by the operatore exist in the api. This is done in the fetchBarcodeCheck() asynchronous action creator in the src/Redux/actions/index.js.

### Action Creators

As for all of my action creators in Redux, all of them are utilizing axios to get and patch from the api. In the asynchronous action creator fetchBarcodeCheck() for example, takes in the parameter the selected barcode that is inputed by the operator. A JsonServerApi component is imported where I have initially created the axios object with the path to the api, in src/JsonServerApi.js. I chose axios over fetch because I skip the step of having to pass the results of the http request to the .json() method, instead it just returns the data object. Inside fetchStatusCheck is where the conditional navigation occurs. Depending on the status of the operation, the operatore will be navigated to the appropiate stage from the Ingresso page.
For all of my action creators that are asynchronous I am using Redux-Thunk as my middleware. I have to pass 'thunk' to my applyMiddleware function that is being passed to the Redux store on creation in the src/index.js because when using my asynchronous action creaters I am returning a function instead of an object. The function receives the dispatch method which is then used to dispatch the synchronous method inside of the asynchronous method.

### Redux store

When creating the Redux store in src/index.js, the compose function was used to be able to pass in the Redux Dev tools extension and utilize it for debugging and testing in the browser. Both the Reducers, Action Types, and Action Creators can be found in the src/Redux folder. All the state in the Redux store can be found in the src/Redux/reducers.

### Modals and Outside Imports

Modals have been utilized to be triggered to display dialog boxes that consult confirmation of the operatore's action. The modal component is in the src/Modal.js and then tagged beside the <root> tag in public/index.html.
If you want to remove a modal, or do not want this feature during proceeding operations such as prompting the user if they are sure they are done with the Chiusura ODP, simply go to the Chiusura's index file at /src/App/Chiusura/index.js for example and in the render() function locate the modal that is prompted when clicking the 'Chiusura ODP' button and delete the component. You will also want to delete the local state associated with it which is: showModalChiusura. Also delete the renderActionsChiusuraBtn() and renderContentChiusuraBtn() functions that were utilized by the modal's props 'action' and 'content'.
Outside imports in this project were the import of the React-CreatableSelect component inside the src/App/Ingresso/Operatore.js and the stylesheet from UI-Semantic which can be found in the public/index.html.
The Operatore.js component, however, contains it's logic in the OperatoreCon.js. In this container where the logic is held, I call fetchOperatore() to fetch the api of the existing operatores (if operatore is not in the list, they have the ability to type their name in regardless). In order to use fetchOperatore which is an action creator from Redux I had to use the connect function to tie my Redux into my React component.

### React-Redux

mapStateToProps brings in my state from the Redux store and allows my component that is being connected to use it. I also pass in the actionCreators that I have imported from 'src/Redux/actions' to be able to use all the actionCreators I need.
The same structure is carried out throughout the Attrezzaggio, Riporto, Chiusura. Each of these components are connected to the Redux store and calls on the state and action creators.
Redux/actions/types.js is a way for me to assign my actions into variables to export into the action creators so that it is easier to debug if there are any spelling issues.

### Local State

Local state is often used for example in Attrezzaggio when working with buttton visibility and modal visibility. The sospendi and riprendi buttons are only visible if one or the other is visible. Modal's state changes when clicking 'Indietro' and prompting the operatore if they are sure they want to leave the current stage.

# Components

## Ingresso.js

| React Compoonents | Helper Functions                         | Local State         | Redux Calls                       |
| ----------------- | ---------------------------------------- | ------------------- | --------------------------------- |
| OperatoreCon.js   | handlClick()                             | doesExist {boolean} | BarcodeSelected                   |
| BarcodeCon.js     | renderActions()                          | showModal {boolean} | fetchBarcodeCheck()               |
| Header.js         | renderContent()                          |                     | setStartTime(startTime)           |
| Modal.js          | render()                                 |                     | fetchStatusCheck(selectedBarcode) |
| Auth.js           | mapStateToProps(state)                   |                     |
|                   | connect(mapStateToProps, actionCreators) |

## Attrezzaggio.js

| React Compoonents | Helper Functions                         | Local State            | Redux Calls                                  |
| ----------------- | ---------------------------------------- | ---------------------- | -------------------------------------------- |
| Header.js         | handlClick()                             | buttonOption {boolean} | BarcodeSelected                              |
| InputDataCon.js   | renderActions()                          | showModal {boolean}    | fetchCliente(barcodeSelected)                |
| Header.js         | renderContent()                          | sospendi {boolean}     | fetchArticle(barcodeSelected)                |
| Modal.js          | render()                                 |                        | fetchNote(barcodeSelected)                   |
| history.js        | mapStateToProps(state)                   |                        | fetchQuantita(barcodeSelected)               |
|                   | connect(mapStateToProps, actionCreators) |                        | fetchRicettaAncorante(barcodeSelected)       |
|                   |                                          |                        | fetchRicettaRiporto(barcodeSelected)         |
|                   |                                          |                        | editBarcodeStatus(barcodeSelected)           |
|                   |                                          |                        | addSospendi(new Date())                      |
|                   |                                          |                        | setAttrezzaggioSospeso()                     |
|                   |                                          |                        | editBarcodeStatus(barcodeSelected, {status}) |
|                   |                                          |                        | setCompletatoAtrrezzaggio(completato)        |
|                   |                                          |                        | setAttrezzaggioCompletato()                  |

## Riporto.js

| React Compoonents | Helper Functions                         | Local State            | Redux Calls                                  |
| ----------------- | ---------------------------------------- | ---------------------- | -------------------------------------------- |
| Header.js         | handlClick()                             | buttonOption {boolean} | BarcodeSelected                              |
| InputDataCon.js   | renderActions()                          | showModal {boolean}    | fetchCliente(barcodeSelected)                |
| Header.js         | renderContent()                          | sospendi {boolean}     | fetchArticle(barcodeSelected)                |
| Modal.js          | render()                                 |                        | fetchNote(barcodeSelected)                   |
| history.js        | mapStateToProps(state)                   |                        | fetchQuantita(barcodeSelected)               |
|                   | connect(mapStateToProps, actionCreators) |                        | fetchRicettaAncorante(barcodeSelected)       |
|                   |                                          |                        | fetchRicettaRiporto(barcodeSelected)         |
|                   |                                          |                        | fetchDataOra(barcodeSelected)                |
|                   |                                          |                        | fetchNumPezzi(barcodeSelected)               |
|                   |                                          |                        | setAttrezzaggioSospeso()                     |
|                   |                                          |                        | editBarcodeStatus(barcodeSelected, {status}) |
|                   |                                          |                        | setCompletatoAtrrezzaggio(completato)        |
|                   |                                          |                        | setRiportoCompletato()                       |

## Chiusura.js

| React Compoonents | Helper Functions                         | Local State            | Redux Calls                                  |
| ----------------- | ---------------------------------------- | ---------------------- | -------------------------------------------- |
| Header.js         | handlClick()                             | buttonOption {boolean} | BarcodeSelected                              |
| InputDataCon.js   | renderActions()                          | showModal {boolean}    | fetchCliente(barcodeSelected)                |
| Header.js         | renderContent()                          | sospendi {boolean}     | fetchArticle(barcodeSelected)                |
| Modal.js          | render()                                 |                        | fetchNote(barcodeSelected)                   |
| history.js        | mapStateToProps(state)                   |                        | fetchQuantita(barcodeSelected)               |
|                   | connect(mapStateToProps, actionCreators) |                        | fetchRicettaAncorante(barcodeSelected)       |
|                   |                                          |                        | fetchRicettaRiporto(barcodeSelected)         |
|                   |                                          |                        | fetchDataOra(barcodeSelected)                |
|                   |                                          |                        | fetchNumPezzi(barcodeSelected)               |
|                   |                                          |                        | setAttrezzaggioSospeso()                     |
|                   |                                          |                        | editBarcodeStatus(barcodeSelected, {status}) |
|                   |                                          |                        | setCompletatoAtrrezzaggio(completato)        |
|                   |                                          |                        | setRiportoCompletato()                       |

## Routers.js

| Routes       | Protected | Path            | Component                   |
| ------------ | --------- | --------------- | --------------------------- |
| Ingresso     |           | "/"             |                             | "/Ingresso" | Ingresso |
| Attrezzaggio | Yes       | "/Attrezzaggio" | Attrezzaggio                |
| Riporto      | Yes       | "/Riporto"      | Riporto                     |
| Chiusura     | Yes       | "/Chiusura"     | Chiusura                    |
| \*           |           | "/\*"           | "Error 404: Page Not Found" |

# Redux Store

BarcodeReducer.js

| Store State             | Action Creators                         | Action Types                  |
| ----------------------- | --------------------------------------- | ----------------------------- |
| BarcodeSelected         | selectBarcode(barcode)                  | SELECT_BARCODE                |
| Status                  | fetchClient(selectedBarcode)            | BARCODE_CHECK                 |
| Cliente                 | fetchArticolo(selectedBarcode)          | GET_CLIENTE                   |
| Articolo                | fetchNote(selectedBarcode)              | GET_ARTICOLO                  |
| Note                    | fetchQuantita(selectedBarcode)          | GET_NOTE                      |
| Quantita                | fetchRicettaAncorante(selectedBarcode)  | GET_QUANTITA                  |
| RicettaAncorante        | fetchRicettaRiporto(selectedBarcode)    | GET_RICETTA_ANCORANTE         |
| RicettaRiporto          | fetchNumPezzi(selectedBarcode)          | GET_RICETTA_RIPORTO           |
| NumPezzi                | fetchDataOra(selectedBarcode)           | GET_NUM_PEZZI                 |
| DataOra                 | fetchQuantitaAncorUtil(selectedBarcode) | GET_DATA_ORA                  |
| QuantitaAncoranteUtiliz | fetchQuantitaRiporUtil(selectedBarcode) | GET_QUANTITA_ANCORANTE_UTILIZ |
| QuantitaRiportoUtilz    | fetchDurataLavorazione(selectedBarcode) | GET_QUANTITA_RIPORTO_UTILZ    |
| DurataLavorazione       | fetchBarcodeCheck(selectedBarcode)      | GET_DURATA_LAVORAZIONE        |
|                         | fetchStatusCheck(selectedBarcode)       |

OperatoreReducer.js

| Store State       | Action Creators            | Action Types     |
| ----------------- | -------------------------- | ---------------- |
| OperatoreList     | fetchOperatore()           | GET_OPERATORE    |
| OperatoreSelected | selectOperatore(operatore) | SELECT_OPERATORE |

TimeStampReducer.js

| Store State            | Action Creators                 | Action Types                |
| ---------------------- | ------------------------------- | --------------------------- |
| startTimeAttrezzaggio  | setStartTime(Date)              | SET_START_ATTREZZAGGIO      |
| sospendiLog            | addSospendi(Date)               | ADD_SOSPENDI_DATE           |
| riprendiLog            | addRiprendi(Date)               | ADD_RIPRENDI_DATE           |
| completatoAttrezzaggio | setCompletatoAtrrezzaggio(Date) | SET_COMPLETATO_ATTREZZAGGIO |

# API

Hello World!

## ** Operatores **

Returns json data with operatores.

- **URL**

  /operatore

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : 12, name : "Erik Sanchez" }`

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

* **Sample Call:**

  ```javascript
  //JsonServerApi.js
  import axios from "axios";
  export default axios.create({ baseURL: "http://localhost:3001" });
  // Redux/actions/index.js
  import JsonServerApi from "./JsonServerApi.js";
  const response = await JsonServerApi.get("/barcode");
  ```
